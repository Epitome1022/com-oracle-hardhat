import { Heading, Box, Image, VStack, Stack, Link, Text, Spacer, Flex, Button, Wrap, SimpleGrid, Circle, ButtonGroup } from "@chakra-ui/react";
import chains from "./common/chains";
export default function Index() {
  return (
    <Box maxW='full' className="body" pl={8} pr={8} bg='gray.800'>
      <VStack>
        <Flex pt={16} w='60vw'>
          <VStack>
            <Wrap align='start' mt={24}>
              <Text fontSize={50} fontWeight={800} color='wheat'>{`Highly Reliable Data Feeds`}</Text>
              <Text fontSize={20} color='gray.400'>Commune is a revolutionary protocol that connects developer tools, fostering collaboration, interoperability, and innovation within the development community.</Text>
              <ButtonGroup>
                <Button bg='green.400' color='wheat'>Contact Us</Button>
                <Button bg='green.400' color='wheat'><Link href="/price">View Our Data</Link></Button>
              </ButtonGroup>
            </Wrap>
          </VStack>
          <Image src='/commune.webp' alt='diagram' w='30vw'></Image>
        </Flex>
        <VStack mb={8}  w='60vw'>
          <Heading mt={16} mb={16} color='gray.200'>Supported Chains</Heading>
          <SimpleGrid columns={6} spacing={6}>
            {chains.map((chain: any, index: any) => (
              <VStack key={index}>
                <Image src={chain.image} alt={chain.name} w='50px' h='50px'/>
                <Text color='gray.200'>{chain.name}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>
        <VStack mb={8}  w='60vw'>
          <Heading mt={16} mb={16} color='gray.200'>Architecture</Heading>
          <Image src='/diagram.jpg' alt='diagram'></Image>
        </VStack>
      </VStack>
    </Box>
  );
}
