import { Flex } from "@chakra-ui/react";
import DoughnutChart from "components/Doughnut";
import Content from "components/PageComponents/content/Content";
import LoggedPageContainer from "components/PageComponents/LoggedPageContainer";
import Sidebar from "components/PageComponents/sidebar/Sidebar";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { Api } from "services/api";

type ExpensesPagePropsType ={
    itemsBycategory: {type: string, value: number}[]
}

export default function ExpensesPage(props: ExpensesPagePropsType) {
    
    return (
        <LoggedPageContainer>
            <Sidebar></Sidebar>
            <Content title="Maiores Despesas">
                <Flex flexDir='column'>
                    <Flex h='400px'>
                        <DoughnutChart data={props?.itemsBycategory}/>
                    </Flex>

                </Flex>
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
      .get("/financeData/category")
      .then((res) => {
        let itemsBycategory: {type: string, value: number}[];
  
        if (!res.data) {
          return {
            props: { financeDataItems: [] },
          };
        }
  
        itemsBycategory = res.data as {type: string, value: number}[];
  
        return {
          props: { itemsBycategory },
        };
      })
      .catch(() => {
        return {
          props: {},
        };
      });
  };