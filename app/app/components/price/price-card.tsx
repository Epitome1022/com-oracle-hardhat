import { Card, CardBody, CardHeader, Image, Heading, HStack, Text, Spacer, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { useEffect } from "react";

export default function PriceCard(props: any) {
    const token = props.token;
    const url = `/price/${token.symbol}`

    useEffect(()=> {

    }, [props]);

    return (
        <LinkBox>
            <Card bg="gray.900" border='1px' borderColor='gray.200'>
                <CardHeader>
                    <HStack>
                        <Image
                        src={token.logoURI}
                        w="2rem"
                        h="2rem"
                        alt='LOGO'
                        me={5} />
                        <Spacer></Spacer>
                        <LinkOverlay href={url}>
                            <Heading size="md" color='wheat'>
                                {token.symbol}
                            </Heading>
                        </LinkOverlay>                    
                    </HStack>
                </CardHeader>
                <CardBody>
                    <HStack>
                        
                        <Text color='wheat'>${token.value.toFixed(2)}</Text>
                    </HStack>
                    
                </CardBody>
            </Card>
        </LinkBox>
        
    )
}