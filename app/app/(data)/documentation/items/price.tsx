import {
    Text,
    Heading,
    Divider,
    VStack,
    Box,
    Code
} from '@chakra-ui/react';


export default function PriceFeed() {
    const contractcode = `import "./Main.sol";
    
    contract Other {
        Main main;
    
        constructor(address _mainAddress) {
            main = Main(_mainAddress);
        }
    
        function getLatestBTCPrice() public view returns (uint256) {
            bytes32 dataFeedId = bytes32("BTC");
            return main.getLatestValueForDataFeed(dataFeedId);
        }
    }
    `
    
    const frontcode = `const mainContract = new web3.eth.Contract(mainABI, mainAddress);
    
    async function getLatestETHPrice() {
        const price = await mainContract.methods.getLatestETHPrice().call();
        console.log(price);
    }
    
    getLatestETHPrice();`;
    return (
        <>
            <VStack color={"white"} alignItems={"flex-start"}>
                <Heading>Price Feed</Heading>
                <Divider />
                <Text my={4}>
                    Access real-time price feeds for various cryptocurrencies, commodities, and other financial data, providing the necessary external data for your smart contracts.
                </Text>
                <Heading>How to use it</Heading>
                <Divider />
                <Box padding={4} width={"100%"}>
                    <Text>To use these functions in another contract, you need to first import this contract and then instantiate it.</Text>
                    <Code ml={4} my={4} padding={2} width={"100%"} display={"block"} whiteSpace={"pre"} overflow={"auto"}>
                        {contractcode}
                    </Code>
                    <Text>On the frontend you can use the web3.js or ethers.js libraries to interact with the smart contract.</Text>
                    <Code ml={4} my={4} padding={2} width={"100%"} display={"block"} whiteSpace={"pre"} overflow={"auto"}>
                        {frontcode}
                    </Code>
                </Box>                
            </VStack>
        </>
    )
}