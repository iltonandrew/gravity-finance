import { Flex, Heading, Avatar, Text, Image } from "@chakra-ui/react";
import { FiHome, FiPieChart, FiDollarSign, FiBox } from "react-icons/fi";
import SidebarItem from "./SidebarItems";
import { User } from "../../../public/model/User";
import { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";


export default function Sidebar() {

  let { user } = useContext(AuthContext);

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
        <Flex flexDir="column" as="nav" mt={50}>
          <Flex justifyContent='center'>
            <Image src='/planet.png' alt='logo' width='80px' height='80px' />
          </Flex>
          <Heading
            mt='24px'
            ml={4}
            mb={[25, 50, 100]}
            fontSize={["4xl", "4xl", "2xl", "3xl", "4xl"]}
            alignSelf="center"
            letterSpacing="tight"
            color='#dbdbdb'
            fontWeight={500} 
            fontFamily='Poppins'
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
            <SidebarItem name="Home" icon={FiHome} url='/dashboard'></SidebarItem>
            <SidebarItem name="Maiores Despesas" icon={FiPieChart} url='/expenses'></SidebarItem>
            <SidebarItem name="Extrato" icon={FiDollarSign} url='/statement'></SidebarItem>
            <SidebarItem name="Meus Bancos" icon={FiBox} url='/bank'></SidebarItem>
          </Flex>
        </Flex>
        {/* Bottom */}
        <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
          <Avatar
            my={2}
            src="https://scontent.fcgh9-1.fna.fbcdn.net/v/t1.6435-9/79971664_2691079274268461_4592629501938106368_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFpPSIdZLcAjTJOYH755xEAI80_X0rBZhQjzT9fSsFmFJLkK_R72lopQimuAxCmi4Jw0tTnjM7heESdqubYhrpY&_nc_ohc=wDMl2rwNscoAX-oHLeT&_nc_ht=scontent.fcgh9-1.fna&oh=00_AT9ikZtKXG9Os2l-Z2ep75E58droWiHYHtejvpM_R8l0fg&oe=624CE0A8"
          />
          <Text textAlign="center">
            {user?.firstName} {user?.lastName}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}