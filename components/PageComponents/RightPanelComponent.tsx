import { Flex, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function RightPanelComponent({children, title} : {children: ReactNode, title: string}) {
    return (
        <Flex
            w={["100%", "100%", "30%"]}
            borderColor="#555555"
            borderLeftWidth='5px'
            p="3%"
            flexDir="column"
            overflow="auto"
            minW={[null, null, "300px", "300px", "400px"]}
        >
            <Heading as="h2" size="lg" letterSpacing="tight" mb="8px">
                {title}
            </Heading>
            {children}
        </Flex>
    );
}