import {
    Text,
    Heading,
    Divider,
    VStack,
    Box,
    Code
} from '@chakra-ui/react';


export default function CallAPI() {
    const contractcode = `contract OtherContract {
        CommuneAPIConsumer apiConsumer;
    
        constructor(address _communeAPIAddress) public {
            apiConsumer = CommuneAPIConsumer(_communeAPIAddress);
        }
    
        function requestApiData(string memory url, string memory path, int256 times) public {
            apiConsumer.requestData(url, path, times);
        }
    
        function getApiData() public view returns (uint256) {
            return apiConsumer.data();
        }
    }`;
    
    const frontcode = `const provider = new ethers.providers.JsonRpcProvider("rpc url");
    const signer = new ethers.Wallet("wallet private key", provider);
    
    const contract = new ethers.Contract("contract address", abi, signer);
    
    const result = await contract.requestData(
        "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD",
        "RAW,ETH,USD,VOLUME24HOUR",
        "1000000000000000000"
    );
    const res = await result.wait(1);
    const requestId = res.events[0].topics[1];
    
    contract.on("ChainlinkFulfilled", async (id) => {
        console.log("request received");
        const rr = await contract.data();
        console.log(rr);
    })`;
    return (
        <>
            <VStack color={"white"} alignItems={"flex-start"}>
                <Heading>Call API</Heading>
                <Divider />
                <Text my={4}>
                    Interact with off-chain APIs, facilitating a smooth exchange of valuable data between on-chain and off-chain sources.
                </Text>
                <Heading>How to use it</Heading>
                <Divider />
                <Box padding={4} width={"100%"}>
                    <Text>To invoke the requestData from another contract, you need an instance of the CommuneAPIConsumer contract. Once the request is made, you have to listen to an event or manually call the function that returns the data stored in the CommuneAPIConsumer contract.</Text>
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