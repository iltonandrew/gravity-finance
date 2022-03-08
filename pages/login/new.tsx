import { Box, Container, Heading, Input, Stack, Image, Button, Icon } from "@chakra-ui/react";
import ImageUpload from "components/FileUpload";
import GravityFinanceBackground from "components/GravityFinanceBackground";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiFile } from "react-icons/fi";

type NewUserType = {
    cpf: string;
    password: string;
    name: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
}

export default function NewUser() {
    const [ user, setUser ] = useState<NewUserType>({cpf: "", password: "", name: "", firstName: "", lastName: "", avatarUrl: ""});
    const { register, handleSubmit, formState: { errors } } = useForm<NewUserType>()
    
    const validateFiles = (value: FileList) => {
        console.log(value)
        if (value.length < 1) {
          return 'Files is required'
        }
        for (const file of Array.from(value)) {
          const fsMb = file.size / (1024 * 1024)
          const MAX_FILE_SIZE = 10
          if (fsMb > MAX_FILE_SIZE) {
            return 'Max file size 10mb'
          }
        }
        return true
      }

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
                <Box as={'form'}>
                    <Stack spacing={4}>
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
                            value={user.firstName}
                            onChange={value => setUser({ ...user, firstName: value.currentTarget.value })}
                        />
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
                            value={user.lastName}
                            onChange={value => setUser({ ...user, lastName: value.currentTarget.value })}
                        />
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
                            value={user.cpf}
                            onChange={value => setUser({ ...user, cpf: value.currentTarget.value })}
                        />
                        <ImageUpload></ImageUpload>

                    </Stack>
                </Box>
            </Stack>
        </GravityFinanceBackground>
    );
}