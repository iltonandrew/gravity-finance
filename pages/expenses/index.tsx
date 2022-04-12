import { Flex } from "@chakra-ui/react";
import DoughnutChart from "components/Doughnut";
import Content from "components/PageComponents/content/Content";
import LoggedPageContainer from "components/PageComponents/LoggedPageContainer";
import RightPanelComponent from "components/PageComponents/RightPanelComponent";
import Sidebar from "components/PageComponents/sidebar/Sidebar";
import StackedBarChart from "components/StackedBar";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { Api } from "services/api";

type ExpensesPagePropsType ={
    itemsBycategory: {type: string, value: number}[]
    itemsByCategoryHistorical: {type: string, value: number[]}[]
}

export default function ExpensesPage(props: ExpensesPagePropsType) {
    
    return (
        <LoggedPageContainer>
            <Sidebar></Sidebar>
            <Content title="Maiores Despesas">
                <Flex flexDir='column'>
                    <Flex h='400px'>
                      <StackedBarChart data={props?.itemsByCategoryHistorical}></StackedBarChart>
                    </Flex>
                </Flex>
            </Content>
            <RightPanelComponent title="Este Mês">
              
            <Flex h='400px'>
                        <DoughnutChart data={props?.itemsBycategory}/>
                    </Flex>
            </RightPanelComponent>
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
      .get("/financeData/category")
      .then((res) => {
        let itemsBycategory: {type: string, value: number}[];
        let itemsByCategoryHistorical: {type: string, values: number[]}[];
  
        if (!res.data) {
          return {
            props: { itemsBycategory: [], itemsByCategoryHistorical: [] },
          };
        }
  
        itemsBycategory = res.data.currentMonth as {type: string, value: number}[];
        itemsByCategoryHistorical = res.data.historical as {type: string, values: number[]}[];
  
        return {
          props: { itemsBycategory, itemsByCategoryHistorical },
        };
      })
      .catch(() => {
        return {
          props: {},
        };
      });
  };