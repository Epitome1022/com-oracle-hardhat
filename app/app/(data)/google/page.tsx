import {
  LinkBox,
  LinkOverlay,
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Spacer,
  Wrap,
  WrapItem,
  Image,
  InputGroup,
  InputLeftElement,
  Input,
  SimpleGrid,
  Grid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Heading,
  Center,
  Tag,
  Stack,
  GridItem
} from "@chakra-ui/react";

import GoogleOracles from "@/app/common/google";

export default function Google() {
  return (
    <Box maxW="full" className="body" pl={8} pr={8} bg="gray.800">
      <VStack>
        <Flex py={16} w="60vw">
          <HStack>
            <Image src="/google.png" alt="google" h="80px" />
            <Spacer></Spacer>
            <Heading color='wheat'>on Commune</Heading>
          </HStack>
          <Spacer></Spacer>
        </Flex>

        <SimpleGrid columns={3} spacing="30px" w="60vw" pb={4}>
          {GoogleOracles.map((oracle: any, index: any) => (
            <LinkBox key={index}>
              <Card maxW='sm' height={"45vh"} bg='gray.900'>
                <CardBody>
                  <VStack>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                      <LinkOverlay href={'/google/maps'}>
                        <Box>
                          <Heading size='sm' color='wheat'>{oracle.name}</Heading>
                          <Text  color='wheat' >communeai.org</Text>
                        </Box>
                      </LinkOverlay>
                    </Flex>
                    <Text  color='wheat'>
                      {oracle.description}
                    </Text>
                  </VStack>
                </CardBody>
                <CardFooter>
                  <Image
                    objectFit='cover'
                    src={oracle.imgUrl}
                    alt='Chakra UI'
                    p={4}
                  />
                </CardFooter>
              </Card>
            </LinkBox>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}
