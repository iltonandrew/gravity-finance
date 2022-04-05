import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function LoggedPageContainer({children} : {children: ReactNode}) {
    return (
        <Flex h={[null, null, "100vh"]} maxW="2000px" flexDir={["column", "column", "row"]} overflow="hidden">
            {children}
        </Flex>
    )    
}