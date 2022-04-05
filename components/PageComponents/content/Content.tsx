import { Flex, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

type ContentPropsType = {
    title: string;
    children?: ReactNode;
}

export default function Content(props: ContentPropsType) {

    return (
        <Flex w={["100%", "100%", "60%", "60%", "55%"]} p="3%" flexDir="column" overflow="auto" minH="100vh">
            <Heading mb={4} letterSpacing="tight" fontWeight={500} fontFamily='Poppins'>
                {props.title}
            </Heading>
            {props.children}
        </Flex>
    )
}