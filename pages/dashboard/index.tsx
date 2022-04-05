import React, { useContext, useState } from "react";
import {
  Flex,
  Heading,
  Text,
  Icon,
  IconButton,
  Divider,
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FiCalendar, FiChevronDown, FiChevronUp, FiCreditCard, FiSearch, FiBell } from "react-icons/fi";
import { MyChart } from "components/MyChart";
import { DoughnutChart } from "components/Doughnut";
import { BarChart } from "components/StackedBar";
import Sidebar from "components/sidebar/Sidebar";
import { AuthContext } from "contexts/AuthContext";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { Api } from "services/api";
import { FinanceDataType } from "public/model/FinanceData";
import StatementTable from "components/StatementTable";

type DashboardPropsType = {
  timestamp: Date;
  financeDataItems: FinanceDataType[];
};

export default function Dashboard(props: DashboardPropsType) {
  const [display, changeDisplay] = useState("hide");
  const [value, changeValue] = useState(1);
  const [chartValue, changeChartValue] = useState(1);
  const [statements, setStatements] = useState<FinanceDataType[]>(props.financeDataItems as FinanceDataType[]);

  let { user } = useContext(AuthContext);

  return (
    <Flex h={[null, null, "100vh"]} maxW="2000px" flexDir={["column", "column", "row"]} overflow="hidden">
      {/* Column 1 */}
      <Sidebar></Sidebar>

      {/* Column 2 */}
      <Flex w={["100%", "100%", "60%", "60%", "55%"]} p="3%" flexDir="column" overflow="auto" minH="100vh">
        <Heading fontWeight="normal" mb={4} letterSpacing="tight">
          Welcome back,{" "}
          <Flex display="inline-flex" fontWeight="bold">
            {user?.firstName}
          </Flex>
        </Heading>
        <Flex justifyContent="center" mt={2}>
          <Button
            title="Line Chart"
            bgColor={chartValue == 1 ? "gray.600" : "gray.400"}
            size="xs"
            mx={1}
            onClick={() => changeChartValue(1)}
          />
          <Button
            title="Doughnut Chart"
            bgColor={chartValue == 2 ? "gray.600" : "gray.400"}
            size="xs"
            mx={1}
            onClick={() => changeChartValue(2)}
          />
          <Button
            title="Bar Chart"
            bgColor={chartValue == 3 ? "gray.600" : "gray.400"}
            size="xs"
            mx={1}
            onClick={() => changeChartValue(3)}
          />
        </Flex>
        <Text color="gray" fontSize="sm">
          My Balance
        </Text>
        <Text fontWeight="bold" fontSize="2xl">
          $5,750.20
        </Text>

        <Flex flex="1" alignItems="center">
          {chartValue == 1 && <MyChart />}
          {chartValue == 2 && <DoughnutChart />}
          {chartValue == 3 && <BarChart />}
        </Flex>

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
            <StatementTable statements={statements}></StatementTable>
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
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const apiClient = Api(ctx);

  return apiClient
    .get("/financeData")
    .then((res) => {
      let timeStamp: Date;
      let financeDataItems: FinanceDataType[];

      if (!res.data) {
        return {
          props: { financeDataItems: [] },
        };
      }

      financeDataItems = res.data.financeDataItems as FinanceDataType[];
      timeStamp = res.data.timeStamp;

      return {
        props: { timeStamp, financeDataItems },
      };
    })
    .catch(() => {
      return {
        props: {},
      };
    });
};