import { Flex, Heading } from "@chakra-ui/react";
import { title } from "process";
import { ReactNode } from "react";

type ContentPropsType = {
    title: string;
    children?: ReactNode;
}

export default function Content(props: ContentPropsType) {

    return (
        <Flex w={["100%", "100%", "60%", "60%", "55%"]} p="3%" flexDir="column" overflow="auto" minH="100vh">
            <Heading fontWeight="normal" mb={4} letterSpacing="tight">
                {props.title}
            </Heading>
            {props.children}
        </Flex>
    )
}