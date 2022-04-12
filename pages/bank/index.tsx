import { Button, Flex, FormControl, FormLabel, FormErrorMessage, Heading, HStack, PinInput, PinInputField, Radio, RadioGroup, Select } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import BankCard from "components/bank/BankCard";
import Content from "components/PageComponents/content/Content";
import LoggedPageContainer from "components/PageComponents/LoggedPageContainer";
import RightPanelComponent from "components/PageComponents/RightPanelComponent";
import Sidebar from "components/PageComponents/sidebar/Sidebar";
import { AuthContext } from "contexts/AuthContext";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';

type NewBankType = {
  bank: string;
  accessKey: string;
}

export default function Bank() {

    let { user } = useContext(AuthContext);

    const validationSchema = Yup.object().shape({
      bank: Yup.string()
          .required('campo obrigatório'),
      accessKey: Yup.string()
          .required('campo obrigatório')
          .min(5, 'Insira os 5 digitos do código de acesso')
          .max(5, 'Insira os 5 digitos do código de acesso')
          
    });
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState, setValue } = useForm<NewBankType>(formOptions);
    const { errors } = formState;

    let banks: string[] = ['BTG', 'BanKoga', 'Nubank']

    const handleAccessKeyChange = (accessKey: string) => {
      setValue('accessKey', accessKey)
    }

    const onSubmit = (data: NewBankType) => {
      console.log(data)
    }

    return (
        
    <LoggedPageContainer>
      {/* Column 1 */}
      <Sidebar></Sidebar>

      {/* Column 2 */}
      <Content title="Meus Bancos">
        {
          banks.map((bankName) => {
            return (
              <BankCard name={bankName}></BankCard>
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
                <option>Nubank</option>
              </Select>
              <FormErrorMessage>
                  {errors.bank && errors.bank.message}
              </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors?.accessKey}>
            <FormLabel htmlFor='accessKey'>Chave de Acesso</FormLabel>
            <HStack>
                className={`form-control ${errors.accessKey ? 'is-invalid' : ''}`}
              <PinInput
                type='alphanumeric'
                onChange={handleAccessKeyChange}
                >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
            <FormErrorMessage>
                {errors.accessKey && errors.accessKey.message}
            </FormErrorMessage>
          </FormControl>
          
          <Button
            disabled={!formState.isValid}
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