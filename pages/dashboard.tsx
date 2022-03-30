import React, { useContext, useState, useEffect } from "react";
import {
  Flex,
  Heading,
  Avatar,
  AvatarGroup,
  Text,
  Icon,
  IconButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Divider,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FiDollarSign, FiCalendar, FiChevronDown, FiChevronUp, FiCreditCard, FiSearch, FiBell } from "react-icons/fi";
import { MyChart } from "components/MyChart";
import Sidebar from "components/sidebar/Sidebar";
import { AuthContext } from "contexts/AuthContext";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { Api } from "services/api";
import axios from "axios";
import Statment from "components/Statement";

export default function Dashboard() {
  const [display, changeDisplay] = useState("hide");
  const [value, changeValue] = useState(1);
  const [statements, setStatements] = useState([]);

  const config = {
    headers: {
      Authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcGYiOiI0MDQ1NzE2Mjg5OSJ9.NdcQen3CPKLXe54OgfuEKtyXAxL2v6OhGBMEuqB9PFA",
    },
  };

  const getRequest = axios.get("https://470w0jp9q6.execute-api.us-east-1.amazonaws.com/dev/statement/get/0", config);

  let { user } = useContext(AuthContext);

  if (!user) {
    user = {
      cpf: "426.123.420-00",
      name: "Ilton Andrew",
      firstName: "Ilton",
      lastName: "Andrew",
    };
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRequest;
      console.log(response.data);
      setStatements(response.data);
    };
    fetchData();
  }, []);

  return (
    <Flex h={[null, null, "100vh"]} maxW="2000px" flexDir={["column", "column", "row"]} overflow="hidden">
      {/* Column 1 */}
      <Sidebar userInfo={user}></Sidebar>

      {/* Column 2 */}
      <Flex w={["100%", "100%", "60%", "60%", "55%"]} p="3%" flexDir="column" overflow="auto" minH="100vh">
        <Heading fontWeight="normal" mb={4} letterSpacing="tight">
          Welcome back,{" "}
          <Flex display="inline-flex" fontWeight="bold">
            {user?.firstName}
          </Flex>
        </Heading>
        <Text color="gray" fontSize="sm">
          My Balance
        </Text>
        <Text fontWeight="bold" fontSize="2xl">
          $5,750.20
        </Text>
        <MyChart />
        <Flex justifyContent="space-between" mt={8}>
          <Flex align="flex-end">
            <Heading as="h2" size="lg" letterSpacing="tight">
              Transactions
            </Heading>
            <Text fontSize="small" color="gray" ml={4}>
              Apr 2021
            </Text>
          </Flex>
          <IconButton icon={<FiCalendar />} aria-label="aa" />
        </Flex>
        <Flex flexDir="column">
          <Flex overflow="auto">
            <Table variant="unstyled" mt={4}>
              <Thead>
                <Tr color="gray">
                  <Th>Name of transaction</Th>
                  <Th>Category</Th>
                  <Th isNumeric>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {statements.map((statement) => (
                  <Statment {...statement} />
                ))}
                {display == "show" && (
                  <>
                    {statements.map((statement) => (
                      <Statment {...statement} />
                    ))}
                  </>
                )}
              </Tbody>
            </Table>
          </Flex>
          <Flex align="center">
            <Divider />
            <IconButton
              icon={display == "show" ? <FiChevronUp /> : <FiChevronDown />}
              onClick={() => {
                if (display == "show") {
                  changeDisplay("none");
                } else {
                  changeDisplay("show");
                }
              }}
              aria-label="aaa"
            />
            <Divider />
          </Flex>
        </Flex>
      </Flex>

      {/* Column 3 */}
      <Flex
        w={["100%", "100%", "30%"]}
        bgColor="#F5F5F5"
        p="3%"
        flexDir="column"
        overflow="auto"
        minW={[null, null, "300px", "300px", "400px"]}
      >
        <Flex alignContent="center">
          <InputGroup bgColor="#fff" mb={4} border="none" borderColor="#fff" borderRadius="10px" mr={2}>
            <InputLeftElement pointerEvents="none" children={<FiSearch color="gray" />} />
            <Input type="number" placeholder="Search" borderRadius="10px" />
          </InputGroup>
          <IconButton icon={<FiBell />} fontSize="sm" bgColor="#fff" borderRadius="50%" p="10px" aria-label="aa" />
          <Flex
            w={30}
            h={25}
            bgColor="#B57295"
            borderRadius="50%"
            color="#fff"
            align="center"
            justify="center"
            ml="-3"
            mt="-2"
            zIndex="100"
            fontSize="xs"
          >
            2
          </Flex>
        </Flex>
        <Heading letterSpacing="tight">My Cards</Heading>
        {value == 1 && (
          <Box borderRadius="25px" mt={4} w="100%" h="200px" bgGradient="linear(to-t, #B57295, #29259A)">
            <Flex p="1em" color="#fff" flexDir="column" h="100%" justify="space-between">
              <Flex justify="space-between" w="100%" align="flex-start">
                <Flex flexDir="column">
                  <Text color="gray.400">Current Balance</Text>
                  <Text fontWeight="bold" fontSize="xl">
                    $5,750.20
                  </Text>
                </Flex>
                <Flex align="center">
                  <Icon mr={2} as={FiCreditCard} />
                  <Text>Gravity Finance</Text>
                </Flex>
              </Flex>
              <Text mb={4}>**** **** **** 1289</Text>
              <Flex align="flex-end" justify="space-between">
                <Flex>
                  <Flex flexDir="column" mr={4}>
                    <Text textTransform="uppercase" fontSize="xs">
                      Valid Thru
                    </Text>
                    <Text fontSize="lg">12/23</Text>
                  </Flex>
                  <Flex flexDir="column">
                    <Text textTransform="uppercase" fontSize="xs">
                      CVV
                    </Text>
                    <Text fontSize="lg">***</Text>
                  </Flex>
                </Flex>
                <Icon as={FiCreditCard} />
              </Flex>
            </Flex>
          </Box>
        )}
        {value == 2 && (
          <Box borderRadius="25px" mt={4} w="100%" h="200px" bgGradient="linear(to-t, yellow.300, blue.500)">
            <Flex p="1em" color="#fff" flexDir="column" h="100%" justify="space-between">
              <Flex justify="space-between" w="100%" align="flex-start">
                <Flex flexDir="column">
                  <Text color="gray.400">Current Balance</Text>
                  <Text fontWeight="bold" fontSize="xl">
                    $350.00
                  </Text>
                </Flex>
                <Flex align="center">
                  <Icon mr={2} as={FiCreditCard} />
                  <Text>Gravity Finance.</Text>
                </Flex>
              </Flex>
              <Text mb={4}>**** **** **** 8956</Text>
              <Flex align="flex-end" justify="space-between">
                <Flex>
                  <Flex flexDir="column" mr={4}>
                    <Text textTransform="uppercase" fontSize="xs">
                      Valid Thru
                    </Text>
                    <Text fontSize="lg">9/24</Text>
                  </Flex>
                  <Flex flexDir="column">
                    <Text textTransform="uppercase" fontSize="xs">
                      CVV
                    </Text>
                    <Text fontSize="lg">***</Text>
                  </Flex>
                </Flex>
                <Icon as={FiCreditCard} />
              </Flex>
            </Flex>
          </Box>
        )}
        {value == 3 && (
          <Box borderRadius="25px" mt={4} w="100%" h="200px" bgGradient="linear(to-t, orange.300, pink.600)">
            <Flex p="1em" color="#fff" flexDir="column" h="100%" justify="space-between">
              <Flex justify="space-between" w="100%" align="flex-start">
                <Flex flexDir="column">
                  <Text color="gray.400">Current Balance</Text>
                  <Text fontWeight="bold" fontSize="xl">
                    $2,150.72
                  </Text>
                </Flex>
                <Flex align="center">
                  <Icon mr={2} as={FiCreditCard} />
                  <Text>Gravity Finance.</Text>
                </Flex>
              </Flex>
              <Text mb={4}>**** **** **** 8353</Text>
              <Flex align="flex-end" justify="space-between">
                <Flex>
                  <Flex flexDir="column" mr={4}>
                    <Text textTransform="uppercase" fontSize="xs">
                      Valid Thru
                    </Text>
                    <Text fontSize="lg">11/22</Text>
                  </Flex>
                  <Flex flexDir="column">
                    <Text textTransform="uppercase" fontSize="xs">
                      CVV
                    </Text>
                    <Text fontSize="lg">***</Text>
                  </Flex>
                </Flex>
                <Icon as={FiCreditCard} />
              </Flex>
            </Flex>
          </Box>
        )}
        <Flex justifyContent="center" mt={2}>
          <Button bgColor={value == 1 ? "gray.600" : "gray.400"} size="xs" mx={1} onClick={() => changeValue(1)} />
          <Button bgColor={value == 2 ? "gray.600" : "gray.400"} size="xs" mx={1} onClick={() => changeValue(2)} />
          <Button bgColor={value == 3 ? "gray.600" : "gray.400"} size="xs" mx={1} onClick={() => changeValue(3)} />
        </Flex>
        <Flex flexDir="column" my={4}>
          <Flex justify="space-between" mb={2}>
            <Text>Balance</Text>
            <Text fontWeight="bold">$140.42</Text>
          </Flex>
          <Flex justify="space-between">
            <Text>Credit Limit</Text>
            <Text fontWeight="bold">$150.00</Text>
          </Flex>
        </Flex>
        <Heading letterSpacing="tight" size="md" my={4}>
          Send money to
        </Heading>
        <Flex>
          <AvatarGroup size="md" max={3}>
            <Avatar src="avatar-3.jpg" />
            <Avatar src="avatar-3.jpg" />
            <Avatar src="avatar-4.jpg" />
            <Avatar src="avatar-4.jpg" />
            <Avatar src="avatar-4.jpg" />
          </AvatarGroup>
          <Avatar src="avatar-3.jpg" ml={2} color="#fff" bgColor="gray.300" />
        </Flex>
        <Text color="gray" mt={10} mb={2}>
          Card number
        </Text>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<FiCreditCard color="gray.700" />} />
          <Input type="number" placeholder="xxxx xxxx xxxx xxxx" />
        </InputGroup>
        <Text color="gray" mt={4} mb={2}>
          Sum
        </Text>
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<FiDollarSign color="gray.700" />} />
          <Input type="number" placeholder="130.00" />
        </InputGroup>
        <Button mt={4} bgColor="blackAlpha.900" color="#fff" p={7} borderRadius={15}>
          Send money
        </Button>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  const apiClient = Api(ctx);

  // if(!token) {
  //     return {
  //         redirect: {
  //             destination: '/login',
  //             permanent: false,
  //         }
  //     }
  // }

  return {
    props: {},
  };
};
