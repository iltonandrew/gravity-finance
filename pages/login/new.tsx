import { Heading, Input, Stack, Image, Button, FormControl, FormErrorMessage, useToast, useBoolean } from "@chakra-ui/react";
import GravityFinanceBackground from "components/GravityFinanceBackground";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import _ from "lodash";
import { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";

type NewUserType = {
    cpf: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
  }

export default function NewUser() {

    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('campo obrigatório'),
        lastName: Yup.string()
            .required('campo obrigatório'),
        cpf: Yup.string()
            .required('campo obrigatório')
            .matches(/^[0-9]{3}[\.][0-9]{3}[\.][0-9]{3}[\-][0-9]{2}$/, 'CPF fora do formato XXX.XXX.XXX-XX'),
        password: Yup.string()
            .min(6, 'senha precisa ter ao menos 6 caracteres')
            .required('campo obrigatório'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'senhas não conferem')
            .required('campo obrigatório'),
        
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, formState } = useForm<NewUserType>(formOptions);
    const { errors } = formState;
    
    const toast = useToast();
    const { signUp } = useContext(AuthContext);
    
    const onSubmit = (newUser: NewUserType) => {
        toast({
            title: 'Cadastrando Usuário...',
            status: 'info',
        })
        signUp(_.omit(newUser, 'confirmPassword')).catch((err) => {
            toast({
                title: `Erro: ${err.data.msg}`,
                status: 'error',
                isClosable: true,
            })
        })
    }

    const onError = () => {}


    return (
        <GravityFinanceBackground>
            <Image src='/planet.png' alt='logo' width='80px' height='80px' />

            <Heading textAlign='center' fontWeight={500} fontSize={35} color='#bdbdbd' fontFamily='Poppins'>
                Novo Usuário
            </Heading>

            <Stack
                bg={'gray.50'}
                rounded={'xl'}
                p={{ base: 4, sm: 6, md: 8 }}
                spacing={{ base: 8 }}
                maxW={{ lg: 'lg' }}
            >
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <Stack spacing={4}>
                        <FormControl isInvalid={!!errors?.firstName}>
                            <Input
                                placeholder="Nome"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    fontSize: 12,
                                    color: 'gray.500',
                                    fontFamily: 'Poppins'
                                }}
                                {...register('firstName')}
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                            />
                            <FormErrorMessage>
                                {errors.firstName && errors.firstName.message}
                            </FormErrorMessage>
                        </FormControl>
                        
                        <FormControl isInvalid={!!errors?.lastName}>
                            <Input
                                placeholder="Sobrenome"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    fontSize: 12,
                                    color: 'gray.500',
                                    fontFamily: 'Poppins'
                                }}
                                {...register('lastName')}
                            />
                            <FormErrorMessage>
                                {errors.lastName && errors.lastName.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors?.cpf}>
                            <Input
                                placeholder="CPF"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    fontSize: 12,
                                    color: 'gray.500',
                                    fontFamily: 'Poppins'
                                }}
                                {...register('cpf')}
                            />
                            <FormErrorMessage>
                                {errors.cpf && errors.cpf.message}
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl isInvalid={!!errors?.password}>
                            <Input
                                type="password"
                                placeholder="Senha"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    fontSize: 12,
                                    color: 'gray.500',
                                    fontFamily: 'Poppins'
                                }}
                                {...register('password')}
                            />
                            <FormErrorMessage>
                                {errors.password && errors.password.message}
                            </FormErrorMessage>
                        </FormControl>
                        
                        <FormControl isInvalid={!!errors?.confirmPassword}>
                            <Input
                                type="password"
                                placeholder="Confirme a Senha"
                                bg={'gray.100'}
                                border={0}
                                color={'gray.500'}
                                _placeholder={{
                                    fontSize: 12,
                                    color: 'gray.500',
                                    fontFamily: 'Poppins'
                                }}
                                {...register('confirmPassword')}
                            />
                            <FormErrorMessage>
                                {errors.confirmPassword && errors.confirmPassword.message}
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
                        >
                            Cadastrar
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </GravityFinanceBackground>
    );
}