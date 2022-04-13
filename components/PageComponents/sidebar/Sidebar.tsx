import { Flex, Heading, Avatar, Text, Image, Button } from "@chakra-ui/react";
import { FiHome, FiPieChart, FiDollarSign, FiBox } from "react-icons/fi";
import SidebarItem from "./SidebarItems";
import { User } from "../../../public/model/User";
import { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";

export default function Sidebar() {
  let { user, logout } = useContext(AuthContext);

  function handleLogout() {
    logout();
  }

  return (
    <Flex flexDir="column" alignItems="center" bgImage="/stars.jpg" color="#fff">
      <Flex
        flexDir="column"
        h={[null, null, "100vh"]}
        justifyContent="space-between"
        bg="linear-gradient(174deg, rgba(34,47,70,1) 0%, rgb(213 167 65 / 58%) 100%)"
      >
        <Flex flexDir="column" as="nav" mt={50}>
          <Flex justifyContent="center">
            <Image src="/planet.png" alt="logo" width="80px" height="80px" />
          </Flex>
          <Heading
            mt="24px"
            ml={4}
            mb={[25, 50, 100]}
            fontSize={["4xl", "4xl", "2xl", "3xl", "4xl"]}
            alignSelf="center"
            letterSpacing="tight"
            color="#dbdbdb"
            fontWeight={500}
            fontFamily="Poppins"
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
            <SidebarItem name="Home" icon={FiHome} url="/dashboard"></SidebarItem>
            <SidebarItem name="Maiores Despesas" icon={FiPieChart} url="/expenses"></SidebarItem>
            <SidebarItem name="Extrato" icon={FiDollarSign} url="/statement"></SidebarItem>
            <SidebarItem name="Meus Bancos" icon={FiBox} url="/bank"></SidebarItem>
          </Flex>
        </Flex>
        {/* Bottom */}
        <Flex flexDir="column" alignItems="center" mb={10} mt={5}>
          <Avatar my={2} />
          <Text textAlign="center">
            {user?.firstName} {user?.lastName}
          </Text>
          <Button
            className="sidebar-items"
            variant="link"
            colorScheme="Orange"
            color="#dbdbdb"
            fontWeight={500}
            fontFamily="Poppins"
            onClick={handleLogout}
          >
            logout
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
