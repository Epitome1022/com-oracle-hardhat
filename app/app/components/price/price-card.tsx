import { Card, CardBody, CardHeader, Image, Heading } from "@chakra-ui/react";
import { useEffect } from "react";

export default function PriceCard(props: any) {
    const token = props.token;
    useEffect(()=> {

    }, [props]);
    return (
        <Card bg="gray.900">
            <CardHeader>
                <Image
                src={token.logoURI}
                w="2rem"
                h="2rem"
                alt='LOGO'
                me={5} />
            </CardHeader>
            <CardBody>
                <Heading size="md" color='wheat'>
                {token.name}
                </Heading>
            </CardBody>
        </Card>
    )
}