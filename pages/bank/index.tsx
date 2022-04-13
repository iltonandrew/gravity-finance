import { Button, FormControl, FormLabel, FormErrorMessage, Heading, HStack, PinInput, PinInputField, Radio, RadioGroup, Select } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import BankCard from "components/bank/BankCard";
import Content from "components/PageComponents/content/Content";
import LoggedPageContainer from "components/PageComponents/LoggedPageContainer";
import RightPanelComponent from "components/PageComponents/RightPanelComponent";
import Sidebar from "components/PageComponents/sidebar/Sidebar";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { Bank } from "public/model/Bank";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api, Api } from "services/api";
import * as Yup from 'yup';

type NewBankType = {
  bank: string;
  accessCode: string;
}

type BankPage = {
  bankItems: Bank[]
}

export default function BankPage(props: BankPage) {

    const validationSchema = Yup.object().shape({
      bank: Yup.string()
          .required('campo obrigatório'),
      accessCode: Yup.string()
          .required('campo obrigatório')
          .min(6, 'Insira os 6 digitos do código de acesso')
          .max(6, 'Insira os 6 digitos do código de acesso')
          
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState, setValue } = useForm<NewBankType>(formOptions);
    const { errors } = formState;

    const [banks, setBanks] = useState<Bank[]>(props.bankItems)

    const handleAccessCodeChange = (accessCode: string) => {
      setValue('accessCode', accessCode)
    }

    const onSubmit = (data: NewBankType) => {
      api.post('/banks/new', data).then((res) =>{
        setBanks(res.data.banks)
      })
    }

    return (
      <LoggedPageContainer>
        {/* Column 1 */}
        <Sidebar></Sidebar>

        {/* Column 2 */}
        <Content title="Meus Bancos">
          {
            banks.map((bank) => {
              return (
                <BankCard name={bank.name}></BankCard>
              )
            })
          }

        </Content>

        {/* Column 3 */}
        <RightPanelComponent title="Adicionar Banco">
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors?.bank}>
              <FormLabel htmlFor='bank'>Banco</FormLabel>
                <Select id='bank' placeholder='selecione o banco' {...register('bank')}  mb="8px">
                  <option>BTG</option>
                  <option>BanKoga</option>
                  <option>NuBank</option>
                </Select>
                <FormErrorMessage>
                    {errors.bank && errors.bank.message}
                </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors?.accessCode}>
              <FormLabel htmlFor='accessCode'>Chave de Acesso</FormLabel>
              <HStack>
                  className={`form-control ${errors.accessCode ? 'is-invalid' : ''}`}
                <PinInput
                  type='alphanumeric'
                  onChange={handleAccessCodeChange}
                  >
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
              <FormErrorMessage>
                  {errors.accessCode && errors.accessCode.message}
              </FormErrorMessage>
            </FormControl>
            
            <Button
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, secondary.main,primary.main)"
              color={"white"}
              _hover={{
                  bgGradient: "linear(to-r, secondary.main, primary.main)",
                  boxShadow: "xl",
              }}
              loadingText="Enviando"
              type="submit"
            >Adicionar</Button>
          </form>
        </RightPanelComponent>
      </LoggedPageContainer>
    )
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
    .get("/banks")
    .then((res) => {
      let bankItems: Bank[] = [];

      if (!res.data) {
        return {
          props: { bankItems },
        };
      }

      bankItems = res.data.banks as Bank[];

      return {
        props: { bankItems },
      };
    })
    .catch(() => {
      return {
        props: {},
      };
    });
};
