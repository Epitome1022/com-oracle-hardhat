"use client";
import {
  Box,
  Flex,
  VStack,
  Text,
  Wrap,
  Image,
  InputGroup,
  Input,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

// import TokenList from "@/app/common/tokens";
import PriceCard from "@/app/components/price/price-card";

export default function Price() {
  const itemsPerPage = 24;
  const [tokensForPage, setTokensForPage] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const getTokens = async (offset: any, limit: any, search: any) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/tokens?offset=${offset}&limit=${limit}&search=${search}`;
      const response = await fetch(url);
      const data = await response.json();
      setTokensForPage(data)
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  }

  const handleSearch = (e: any)=>{
    if (e.keyCode == 13) {
      setSearch(e.target.value);
      setCurrentPage(1);
    }
  }

  useEffect(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    getTokens(offset, itemsPerPage, search);
  }, [currentPage, search]);

  return (
    <Box maxW="full" className="body" pl={8} pr={8} bg="gray.800">
      <VStack spacing={10} pb={8}>
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
                <Input type="text" placeholder="Search Price Feeds" color={'wheat'} onKeyUp={handleSearch}/>
              </InputGroup>
            </Wrap>
          </VStack>
          <Image src="/commune.webp" alt="diagram" maxW="30vw"></Image>
        </Flex>
        {Object.keys(tokensForPage).length > 0 &&
          <>
            <SimpleGrid columns={4} w="60vw" spacing={4}>
              {Object.keys(tokensForPage).map((token: any, index: any) =>
                // tokensForPage[token].logoURI != 'empty' &&
                  <PriceCard
                    token={tokensForPage[token]}
                    key={index}
                  />
              )}
            </SimpleGrid>
            <Flex my={4} justify="center">
            <Button
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
              mr={2}
              colorScheme="blue"
            >
              Previous
            </Button>
            <Button
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
              ml={2}
              colorScheme="blue"
            >
              Next
            </Button>
            </Flex>
          </>
          
        }
      </VStack>
    </Box>
  );
}
