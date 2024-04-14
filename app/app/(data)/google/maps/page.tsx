"use client";
import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Input,
  Text,
  Tooltip,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  VStack,
  Flex,
  Image
} from '@chakra-ui/react'
import { BigNumber } from 'ethers'
import { formatFixed } from '@ethersproject/bignumber'
import { useContractFunction, useEthers } from '@usedapp/core'
import { Error } from '../../../components/Error'
import { useContract } from '../../../hooks/useContract';
import { getRequestStatus, getContractError } from '../../../lib/utils'
// @ts-ignore
import { CommuneAPIConsumer } from '../../../types/typechain';

const DEFAULT_MULTIPLIER = '1000000000000000000'
const DEFAULT_URL =
  'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD'
const DEFAULT_PATH = 'RAW,ETH,USD,VOLUME24HOUR'
const URL_REGEX =
  /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
const PATH_REGEX = /^[a-zA-Z_][\w]*(?:,[\w]+)*$/
const MULTIPLIER_REGEX = /^(1(0)*)$/

export default function RequestBuilder(): JSX.Element {
  const { account, error } = useEthers()

  const [url, setURL] = useState(DEFAULT_URL)
  const [path, setPath] = useState(DEFAULT_PATH)
  const [multiplier, setMultiplier] = useState(DEFAULT_MULTIPLIER)
  const [requestId, setRequestId] = useState('')
  const [data, setData] = useState('')

  const communeApi = useContract<CommuneAPIConsumer>('CommuneAPIConsumer')
  const { send, state, events } = useContractFunction(
    communeApi,
    'requestData',
    { transactionName: 'External API Request' }
  )

  const requestData = async () => {
    console.log(communeApi);
    setRequestId('')
    await send(url, path, BigNumber.from(multiplier))
    setData('')
  }

  const readData = useCallback(async () => {
    if (communeApi == null)
      return;
    const res = await communeApi.data()
    const data = formatFixed(
      res,
      multiplier.split('').filter((e) => e === '0').length
    )
    setData(data)
  }, [communeApi, multiplier])

  useEffect(() => {
    if (events) {
      const event = events.find((e) => e.name === 'ChainlinkRequested')
      if (event) {
        setRequestId(event.args.id)
      }
    }
  }, [events])

  useEffect(() => {
    if (communeApi && requestId) {
      communeApi.on('ChainlinkFulfilled', (id: string) => {
        if (requestId === id) {
          readData()
          communeApi.removeAllListeners()
        }
      })
    }
  }, [communeApi, requestId, readData])

  const isLoading =
    state.status === 'Mining' || (state.status === 'Success' && !data)

  const hasError = state.status === 'Exception'

  const isInvalidUrl = !URL_REGEX.test(url)
  const isInvalidPath = !PATH_REGEX.test(path)
  const isInvalidMultiplier = !MULTIPLIER_REGEX.test(multiplier)
  const isInvalid = isInvalidUrl || isInvalidPath || isInvalidMultiplier

  return (
    <>
      <Box maxW="full" className="body" pl={8} pr={8} bg="gray.800">
        <VStack spacing={10} pb={16}>
          <Flex pt={16} w="60vw" align={"center"} justify={"space-around"}>
            <VStack w={"30vw"}>
              {hasError && <Error message={getContractError(state.errorMessage as string)} />}
              <FormControl isInvalid={isInvalidUrl}>
                <FormLabel htmlFor="url" color="white">API</FormLabel>
                <Tooltip
                  label="Set the URL to perform the GET request on"
                  placement="right-start"
                  fontSize="xs"
                  hasArrow
                >
                  <Input
                    value={url}
                    placeholder="Enter API URL..."
                    id="url"
                    bgColor="white"
                    color={"black"}
                    onChange={(event) => setURL(event.target.value)}
                  />
                </Tooltip>
                {isInvalidUrl && <FormErrorMessage>URL is not valid.</FormErrorMessage>}
              </FormControl>

              <FormControl mt="4" isInvalid={isInvalidPath}>
                <FormLabel htmlFor="path" color="white">Path to Number</FormLabel>
                <Tooltip
                  label="Set dot separated path to find the desired data in the API response"
                  placement="right-start"
                  fontSize="xs"
                  hasArrow
                >
                  <Input
                    value={path}
                    placeholder="Enter Path..."
                    id="path"
                    bgColor="white"
                    color={"black"}
                    onChange={(event) => setPath(event.target.value)}
                  />
                </Tooltip>
                {isInvalidPath && (
                    <FormErrorMessage>Path is not valid.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl mt="4" isInvalid={isInvalidMultiplier}>
                <FormLabel htmlFor="multiplier" color="white">Multiplier</FormLabel>
                <Tooltip
                  label="The multiplier from the response value"
                  placement="right-start"
                  id="multiplier"
                  fontSize="xs"
                  hasArrow
                >
                  <Input
                    value={multiplier}
                    placeholder="Enter Multiplier..."
                    bgColor="white"
                    color={"black"}
                    onChange={(event) => setMultiplier(event.target.value)}
                  />
                </Tooltip>
                {isInvalidMultiplier && (
                  <FormErrorMessage color="white">Multiplier is not valid.</FormErrorMessage>
                )}
              </FormControl>

              <Button
                mt="4"
                onClick={requestData}
                isLoading={isLoading}
                loadingText={getRequestStatus(state.status)}
                colorScheme="teal"
                disabled={isInvalid || isLoading || !account || !!error}
              >
                API Request
              </Button>
              {data && (
              <Text fontSize="xl" mt="4" color={"white"}>
                Result: {data}
              </Text>
              )}
            </VStack>
            <Image src="/commune.webp" alt="diagram" maxW="20vw"></Image>
          </Flex>
        </VStack>
      </Box>
    </>
  )
}
