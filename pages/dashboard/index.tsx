import React, { useContext, useEffect, useState } from "react";
import { Flex, Heading, Text, Icon, Box, Button } from "@chakra-ui/react";
import { FiCreditCard } from "react-icons/fi";
import MyChart from "components/MyChart";
import Sidebar from "components/PageComponents/sidebar/Sidebar";
import { AuthContext } from "contexts/AuthContext";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { api, Api } from "services/api";
import { FinanceDataType } from "public/model/FinanceData";
import StatementTable from "components/statementTable/StatementTable";
import LoggedPageContainer from "components/PageComponents/LoggedPageContainer";

type DashboardPropsType = {
  timestamp: Date;
  financeDataItems: FinanceDataType[];
};

export default function Dashboard(props: DashboardPropsType) {
  const [value, changeValue] = useState(1);
  const [chartData, setChartData] = useState<number[]>([]);
  const [statements, setStatements] = useState<FinanceDataType[]>(props.financeDataItems as FinanceDataType[]);
  const [timestamp, setTimestamp] = useState(new Date(props.timestamp));
  const [meusGastos, setMeusGastos] = useState<number>(0);

  let { user } = useContext(AuthContext);

  function calculateChartData(statements: FinanceDataType[]) {
    const chartDataArray = Array(new Date().getMonth() + 1).fill(0);
    let tempMeusGastos = 0;
    statements.forEach(statement => {
      chartDataArray[new Date(statement.referenceDate).getMonth()] += statement.value;
      tempMeusGastos += statement.value;
    });
    setChartData(chartDataArray);
    setMeusGastos(tempMeusGastos);
  }

  useEffect(() => {
    calculateChartData(statements);
  }, []);

  const hadleRefresh = () => {
    api.get("/financeData/update").then(res => {
      console.log(res.data);
      setStatements(res.data.financeData.financeDataItems);
      setTimestamp(res.data.financeData.timestamp);
      calculateChartData(statements);
    });
  };

  return (
    <LoggedPageContainer>
      {/* Column 1 */}
      <Sidebar></Sidebar>

      {/* Column 2 */}
      <Flex w={["100%", "100%", "60%", "60%", "55%"]} p="3%" flexDir="column" overflow="auto" minH="100vh">
        <Heading fontWeight="normal" mb={4} letterSpacing="tight" fontFamily="Poppins">
          Bem vindo,{" "}
          <Flex display="inline-flex" fontWeight="semibold">
            {user?.firstName}
          </Flex>
        </Heading>
        <Text color="gray" fontSize="sm">
          Meus Gastos
        </Text>
        <Text fontWeight="bold" fontSize="2xl">
          ${meusGastos.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Text>

        <Flex flex="1" alignItems="center">
          <MyChart dataItems={chartData} />
        </Flex>

        <StatementTable
          title="Transações"
          statements={statements}
          lastUpdate={timestamp}
          onRefreshClicked={hadleRefresh}
        ></StatementTable>
      </Flex>

      {/* Column 3 */}
      <Flex
        w={["100%", "100%", "30%"]}
        p="3%"
        flexDir="column"
        overflow="auto"
        minW={[null, null, "300px", "300px", "400px"]}
        backdropFilter="blur(5px)"
      >
        <Box
          position="absolute"
          bgColor="rgba(245, 245, 255, 0.35);"
          zIndex={100}
          justifySelf="flex-start"
          minW={[null, null, "00px", "300px", "400px"]}
          h="100vh"
          backdropFilter="blur(2px)"
          alignContent="center"
          textAlign={["center", "center"]}
          lineHeight="100vh"
          p="10%"
        >
          <Text fontSize="4xl" fontWeight="bold">
            Em breve...
          </Text>
        </Box>
        <Heading letterSpacing="tight">Faturas</Heading>
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
                  <Text>Nubank</Text>
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
                  <Text>BTG</Text>
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
                  <Text>BanKoga</Text>
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
      </Flex>
    </LoggedPageContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async ctx => {
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
    .then(res => {
      let timestamp: Date;
      let financeDataItems: FinanceDataType[] = [];

      if (!res.data) {
        return {
          props: { financeDataItems },
        };
      }

      financeDataItems = res.data.financeDataItems as FinanceDataType[];
      timestamp = res.data.timestamp as Date;

      return {
        props: { timestamp, financeDataItems },
      };
    })
    .catch(() => {
      return {
        props: {},
      };
    });
};
