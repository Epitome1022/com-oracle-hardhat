"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { Box, Card, CardBody, CardFooter, Stack, Heading, Text, Image, Divider, ButtonGroup, Button, getToken, VStack, HStack, Container } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { convertTimeStamp } from "@/app/utils/date";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip
);

export default function PriceDetail({ params }: { params: { token: string } }) {
    const [ tokenInfo, setTokenInfo ] = useState<any>({});
    const [labels, setLabels] = useState<any[]>([]);
    const [data, setData] = useState<any[]>([]);
    const tokenName = params.token;

    const getTokenInfo = async(token: string)=>{
        try {
            const url = `${process.env.NEXT_PUBLIC_API_URL}/token?token=${tokenName}`;
            const response = await fetch(url);
            const data = await response.json();
            setTokenInfo(data.tokenPrice);
            console.log(data)

            const history = data.tokenHistory;
            let labelResult: any[] = [], dataResult: any[] = [];
            history.map((info: any)=> {
                labelResult.push(convertTimeStamp(info['timestamp']));
                dataResult.push(info['value']);
            });

            setLabels(labelResult);
            setData(dataResult);
        } catch (error) {
            console.error('Error fetching data from API:', error);
        }
    }

    useEffect(()=>{
        getTokenInfo(tokenName);
    }, [tokenName]);

    return (
        <Box maxW="full" className="body" p={8} bg="gray.800">
            <Card maxW='full' bg={"gray.900"} border='1px' borderColor='gray.200' color="wheat">
                <CardBody>
                    <VStack align={'start'}>
                        <HStack>
                            <Image src={tokenInfo.logoURI} w={30}></Image>
                            <Heading size='md'>{tokenInfo.symbol}</Heading>
                            <Text fontSize={30} fontWeight={700}>${tokenInfo.value}</Text>
                        </HStack>
                        <Container maxW={'full'} bg={'gray.400'}>
                            <Line 
                                data={{
                                    labels: labels,
                                    datasets: [
                                        {
                                            data: data,
                                            fill: false,
                                            borderColor: 'gray.500', // Change the line color here
                                            backgroundColor: "red",
                                            // pointBorderColor: 'wheat', // Change the dot border color here
                                            // pointBackgroundColor: 'wheat', // Change the dot background color here
                                        },
                                    ],
                                }}
                            />
                        </Container>
                        
                    </VStack>
                </CardBody>
                <Divider />
                {/* <CardFooter>
                    <ButtonGroup spacing='2'>
                    <Button variant='solid' colorScheme='blue'>
                        Buy now
                    </Button>
                    <Button variant='ghost' colorScheme='blue'>
                        Add to cart
                    </Button>
                    </ButtonGroup>
                </CardFooter> */}
            </Card>
        </Box>
    )
}