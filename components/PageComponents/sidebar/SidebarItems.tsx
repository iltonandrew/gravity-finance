import { Button, Icon, Spacer, Text } from "@chakra-ui/react";
import Router from "next/router";
import { IconType } from "react-icons/lib";

type SidebarItemPropsType = {
    icon: IconType,
    name: string,
    url: string
}

export default function SidebarItem( props: SidebarItemPropsType ) {

    function onClick() {
        Router.push(props.url)
    }

    return (
        <>
        <Button
            className="sidebar-items"
            m='8px'
            variant='link'
            colorScheme='Orange'
            onClick={onClick}
        >
            <Icon as={props.icon} fontSize="2xl" mx='8px' className="active-icon" />
            <Spacer marginBottom={2}/>
            <Text
                className="active"
                color='#dbdbdb'
                fontWeight={500}
                fontFamily='Poppins'
            >
                {props.name}
            </Text>
        </Button>
        </>

    );
}