import { Flex, Heading, Avatar, Text } from "@chakra-ui/react";
import { FiHome, FiPieChart, FiDollarSign, FiBox } from "react-icons/fi";
import SidebarItem from "./SidebarItems";
import { User } from '../../public/model/User'

type SidebarPropsType = {
    userInfo: User | null
}

export default function Sidebar(props: SidebarPropsType) {
    return(
        <Flex
        w={["100%", "100%", "10%", "15%", "15%"]}
        flexDir="column"
        alignItems="center"
        backgroundColor="#020202"
        color="#fff"
      >
        <Flex flexDir="column" h={[null, null, "100vh"]} justifyContent="space-between">
          <Flex flexDir="column" as="nav">
            <Heading
              mt={50}
              ml={4}
              mb={[25, 50, 100]}
              fontSize={["4xl", "4xl", "2xl", "3xl", "4xl"]}
              alignSelf="center"
              letterSpacing="tight"
            >
              Gravity Finance
            </Heading>
            {/* Lista de items */}
            <Flex
              flexDir={["row", "row", "column", "column", "column"]}
              align={["center", "center", "center", "flex-start", "flex-start"]}
              wrap={["wrap", "wrap", "nowrap", "nowrap", "nowrap"]}
              justifyContent="center"
            >
              <SidebarItem name="Home" icon={FiHome}></SidebarItem>
              <SidebarItem name="Credit" icon={FiPieChart}></SidebarItem>
              <SidebarItem name="Wallet" icon={FiDollarSign}></SidebarItem>
              <SidebarItem name="Services" icon={FiBox}></SidebarItem>
            </Flex>

          </Flex>
          {/* Bottom */}
          <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
            <Avatar my={2} src="avatar-1.jpg" />
            <Text textAlign="center">{ props.userInfo?.firstName } { props.userInfo?.lastName }</Text>
          </Flex>
        </Flex>
      </Flex>
    );
}