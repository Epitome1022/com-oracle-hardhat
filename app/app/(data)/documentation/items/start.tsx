import {
    Text,
    Heading,
    Divider,
    VStack,
    Box,
    Code
} from '@chakra-ui/react';

export default function GettingStart() {
    return (
        <>
            <VStack color={"white"} alignItems={"flex-start"}>
                <Heading>Introduction</Heading>
                <Divider />
                <Text my={4}>
                    Commune Oracle Marketplace is an innovative platform designed to bridge the gap between real-world data and blockchain technology. 
                </Text>
                <Heading>Getting Started</Heading>
                <Divider />
                <Box padding={4} width={"100%"}>
                    <Text>1. Clone the repository.</Text>
                    <Code ml={4} my={4} padding={2} width={"100%"}>
                        git clone https://github.com/repository.git
                    </Code>
                    <Text>2. Install Dependencies.</Text>
                    <Code ml={4} my={4} padding={2} width={"100%"}>
                        npm install
                    </Code>
                    <Text ml={4}>or</Text>
                    <Code ml={4} my={4} padding={2} width={"100%"}>
                        yarn install
                    </Code>
                    <Text>3. Run the Project.</Text>
                    <Code ml={4} my={4} padding={2} width={"100%"}>
                        npm run start
                    </Code>
                </Box>                
            </VStack>
        </>
    )
}