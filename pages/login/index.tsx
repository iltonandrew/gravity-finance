import { useContext, useState } from "react";
import { Stack, Box, Button, Input, Link, useToast } from "@chakra-ui/react";
import Image from "next/image";
import { AuthContext } from "../../contexts/AuthContext";
import NextLink from "next/link";
import GravityFinanceBackground from "components/GravityFinanceBackground";
import Router from "next/router";

export default function Login() {
  const [credentials, setCredentials] = useState({ cpf: "", password: "" });
  const { signIn } = useContext(AuthContext);
  const toast = useToast();

  async function handleLogIn(credentials: { cpf: string; password: string }) {
    toast({
        title: 'Entrando...',
        status: 'info',
    })
    // mostrar msg de erro
    await signIn(credentials).catch((err) => {
      toast({
        title: `${err.data.msg}`,
        status: 'error',
        isClosable: true,
      })  
    })
  }

  return (
    <GravityFinanceBackground>
      <Image src="/planet.png" alt="logo" width="80px" height="80px" />

      <Stack bg={"gray.50"} rounded={"xl"} p={{ base: 4, sm: 6, md: 8 }} spacing={{ base: 8 }} maxW={{ lg: "lg" }}>
        <Box as={"form"}>
          <Stack spacing={4}>
            <Input
              placeholder="CPF"
              bg={"gray.100"}
              border={0}
              color={"gray.500"}
              _placeholder={{
                fontSize: 12,
                color: "gray.500",
                fontFamily: "Poppins",
              }}
              name="cpf"
              value={credentials.cpf}
              onChange={(value) => setCredentials({ ...credentials, cpf: value.currentTarget.value })}
            />
            <Input
              placeholder="Senha"
              bg={"gray.100"}
              border={0}
              color={"gray.500"}
              _placeholder={{
                fontSize: 12,
                color: "gray.500",
                fontFamily: "Poppins",
              }}
              name="password"
              type="password"
              value={credentials.password}
              onChange={(value) => setCredentials({ ...credentials, password: value.currentTarget.value })}
            />
          </Stack>
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
            onClick={() => handleLogIn(credentials)}
          >
            Entrar
          </Button>
          <NextLink href="/login/new" passHref>
            <Link>Novo usuário</Link>
          </NextLink>
        </Box>
      </Stack>
    </GravityFinanceBackground>
  );
}
