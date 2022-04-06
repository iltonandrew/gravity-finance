import { Flex } from "@chakra-ui/react";
import MultipleLineChart from "components/MultipleLineChart";
import Content from "components/PageComponents/content/Content";
import LoggedPageContainer from "components/PageComponents/LoggedPageContainer";
import Sidebar from "components/PageComponents/sidebar/Sidebar";
import StatementTable from "components/statementTable/StatementTable";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { FinanceDataType } from "public/model/FinanceData";
import { Api } from "services/api";
import { format } from "date-fns";

type StatementPagePropsType = {
    timestamp: Date;
    financeDataItems: FinanceDataType[];
  };

export default function StatementPage(props: StatementPagePropsType) {

    const lineChartData: {[id: string]: number[]} = {};

    // generate line chart data
    const currentMonth: number = new Date().getMonth() + 1;
    
    props.financeDataItems.forEach((item: FinanceDataType) => {
        if(!(item.originInstitution in lineChartData)) 
            lineChartData[item.originInstitution] = Array(currentMonth).fill(0)
        
        const month: number = new Date(item.referenceDate).getMonth()
        lineChartData[item.originInstitution][month] += item.value
    })

    return (
        <LoggedPageContainer>
            <Sidebar></Sidebar>
            <Content title="Extrato">
                <Flex height='50vh'>
                    <MultipleLineChart data={lineChartData}/>
                </Flex>
                <StatementTable title="Extrato" statements={props.financeDataItems} lastUpdate={props.timestamp}></StatementTable>
            </Content>
        </LoggedPageContainer>
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
      let timestamp: Date;
      let financeDataItems: FinanceDataType[];

      if (!res.data) {
        return {
          props: { financeDataItems: [] },
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