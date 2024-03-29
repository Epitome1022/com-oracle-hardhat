
import { Box, HStack, Image, Flex, Spacer, Text, AbsoluteCenter  } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
    return (
        <Box maxW='full' h={20} className="header" pr={8} pl={8} bg='gray.900'>
            <HStack py={5}>
                <Image alt='logo' src='/commune.webp' w='40px' h='40px'/>
                <Text color='wheat' fontSize='2xl'>COMMUNE ORACLE</Text>
                <Spacer></Spacer>
                <Flex py={[4, null, null, 0]} gap={4} px={5}>
                    <Link href="/" color='wheat' _hover={{color: 'blue.500'}}>Home</Link>
                    <Link href="/price" color='wheat' _hover={{color: 'blue.500'}}>Price Feeds</Link>
                    <Link href="/google" color='wheat' _hover={{color: 'blue.500'}}>Google</Link>
                    <Link href="/github" color='wheat' _hover={{color: 'blue.500'}}>GitHub</Link>
                    <Link href="/documentation" color='wheat' _hover={{color: 'blue.500'}}>Docs</Link>
                </Flex>
                <ConnectButton/>
            </HStack>
        </Box>
    )
}