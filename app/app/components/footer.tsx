import { Box, Center, Flex, HStack, Spacer, Text } from "@chakra-ui/react"
export default function Footer() {
    return (
        <Box maxW='full' className="footer" bg='black' h='60px' pr={8} pl={8} py={4}>
            <HStack>
                <Spacer></Spacer>
                <Text color='wheat'>copyright@2024 communeai.org all right reserved</Text>
                <Spacer></Spacer>
            </HStack>
            
        </Box>
    )
}