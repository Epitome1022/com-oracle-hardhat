"use client";
import {
  Box,
  Flex,
  VStack,
  Text,
  Wrap,
  Image,
  InputGroup,
  InputLeftElement,
  Input,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Heading,
  Center,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

import TokenList from "@/app/common/tokens";
import PriceCard from "@/app/components/price/price-card";

export default function Price() {
  const itemsPerPage = 24;
  const [tokensForPage, setTokensForPage] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const showPage = (currentPage: number) => {
    const updatedStartIndex = (currentPage - 1) * itemsPerPage;
    const updatedEndIndex = updatedStartIndex + itemsPerPage;
    const updatedTokensForPage = [
      ...TokenList.slice(updatedStartIndex, updatedEndIndex)
    ];

    setTokensForPage(updatedTokensForPage);
  };

  useEffect(() => {
    showPage(currentPage);
  }, [currentPage]);

  return (
    <Box maxW="full" className="body" pl={8} pr={8} bg="gray.800">
      <VStack>
        <Flex pt={16} w="60vw">
          <VStack>
            <Wrap align="start" mt={24}>
              <Text
                fontSize={50}
                fontWeight={800}
                color='wheat'
              >{`Oracle Price Feeds`}</Text>
              <Text fontSize={20} color="gray.400">
                Explore the decentralized oracle networks powered by Commune
                Oracle.
              </Text>
              <InputGroup>
                <Input type="text" placeholder="Search Price Feeds" />
              </InputGroup>
            </Wrap>
          </VStack>
          <Image src="/commune.webp" alt="diagram" w="30vw"></Image>
        </Flex>
        <SimpleGrid columns={4} w="60vw" spacing={4}>
          {tokensForPage.length > 0 &&
            tokensForPage.map((token: any, index: any) => (
              <PriceCard
                token={token}
                key={index}
              />
            ))}
        </SimpleGrid>
        <Flex my={4} justify="center">
          <Button
            disabled={currentPage <= 1}
            onClick={() => {
              if (currentPage <= 1) setCurrentPage(1);
              else setCurrentPage(currentPage - 1);
            }}
            mr={2}
            colorScheme="blue"
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              if (currentPage > TokenList.length / 24)
                setCurrentPage(TokenList.length);
              else setCurrentPage(currentPage + 1);
            }}
            ml={2}
            colorScheme="blue"
          >
            Next
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
}
