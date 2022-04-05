import { Flex, Heading, Avatar, Text } from "@chakra-ui/react";
import { FiHome, FiPieChart, FiDollarSign, FiBox } from "react-icons/fi";
import SidebarItem from "./SidebarItems";
import { User } from "../../public/model/User";

type SidebarPropsType = {
  userInfo: User | null;
};

export default function Sidebar(props: SidebarPropsType) {
  return (
    <Flex
      w={["100%", "100%", "10%", "15%", "15%"]}
      flexDir="column"
      alignItems="center"
      bgImage="/stars.jpg"
      color="#fff"
    >
      <Flex
        flexDir="column"
        h={[null, null, "100vh"]}
        justifyContent="space-between"
        bg="linear-gradient(174deg, rgba(34,47,70,1) 0%, rgb(213 167 65 / 58%) 100%)"
      >
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
          <Avatar
            my={2}
            src="https://scontent.fcgh9-1.fna.fbcdn.net/v/t1.6435-9/79971664_2691079274268461_4592629501938106368_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFpPSIdZLcAjTJOYH755xEAI80_X0rBZhQjzT9fSsFmFJLkK_R72lopQimuAxCmi4Jw0tTnjM7heESdqubYhrpY&_nc_ohc=wDMl2rwNscoAX-oHLeT&_nc_ht=scontent.fcgh9-1.fna&oh=00_AT9ikZtKXG9Os2l-Z2ep75E58droWiHYHtejvpM_R8l0fg&oe=624CE0A8"
          />
          <Text textAlign="center">
            {props.userInfo?.firstName} {props.userInfo?.lastName}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
