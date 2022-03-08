import { Flex, Icon, Link, Spacer, Text } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

type SidebarItemPropsType = {
    icon: IconType,
    name: string
}

export default function SidebarItem( props: SidebarItemPropsType ) {
    return (
        <>
        <Flex className="sidebar-items" mr={[2, 6, 2, 0, 0]}>
            <Spacer marginRight={4}/>
            <Link display={["none", "none", "flex", "flex", "flex"]}>
                <Icon as={props.icon} fontSize="2xl" className="active-icon" />
            </Link>
            <Spacer marginRight={4}/>
            <Link _hover={{ textDecor: "none" }} display={["flex", "flex", "none", "flex", "flex"]}>
                <Text className="active">{props.name}</Text>
            </Link>
        </Flex>
        <Spacer marginBottom={2}/>
        </>

    );
}