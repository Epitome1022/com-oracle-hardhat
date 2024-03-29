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
  Stack,
  StackDivider,
  Divider,
  ButtonGroup
} from "@chakra-ui/react";

import GitHubOracles from "@/app/common/github";

export default function Github() {
  return (
    <Box maxW="full" className="body" pl={8} pr={8} bg="gray.800">
      <VStack pb={8}>
        <Flex pt={8} w="60vw">
          <HStack>
            <Image src="/assets/img/github/logo-white.png" alt="github" h="100px" />
            <Spacer></Spacer>
            <Heading color='wheat'>on Commune</Heading>
          </HStack>
          <Spacer></Spacer>
        </Flex>
        <SimpleGrid spacing={5} columns={3} w="60vw">
          {GitHubOracles && GitHubOracles.map((oracle:any, index: any)=> (
            <Card maxW='sm' bg='gray.900' key={index}>
              <CardBody>
                <Image
                  src={oracle.imgUrl}
                  alt='stat'
                  borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                  <Heading size='md' color='wheat'>{oracle.name}</Heading>
                  <Text color='wheat'>
                    {oracle.description}
                  </Text>
                </Stack>
              </CardBody>
              <Divider />
              <CardFooter>
                <ButtonGroup spacing='2'>
                  <Button variant='solid' colorScheme='teal'>
                    Buy now
                  </Button>
                  <Button variant='ghost' colorScheme='teal'>
                    How to use
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>     
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
}
