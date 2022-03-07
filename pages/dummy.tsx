import { Container, Stack, Box, Heading, Button, Text, Input } from '@chakra-ui/react'
import Image from 'next/image'
import Head from 'next/head'
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies'


import styles from '../styles/HomePage.module.css'

export default function Login() {


    return (

        <div className={styles.root}>
            <Head>
                <title>Gravity Finance</title>
                <link rel="icon" href="/planet.png" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,900;1,100;1,200;1,300;1,400;1,500&display=swap" rel="stylesheet" />
            </Head>
            <FirstSection />
        </div>
    );
}

// First section: headers and titles
function FirstSection() {

    const { user } = useContext(AuthContext)
    return (

        <Container h='100vh' maxW='100%' position='relative' bgImage='/stars.jpg' bgSize='cover' p={0}>

            {/* Main title and subtitle */}
            <Stack spacing={30} direction='column' w='100%' h='100%' p={50} justify='center' align='center' bg='linear-gradient(174deg, rgba(34,47,70,1) 0%, rgb(213 167 65 / 58%) 100%)'>
                <Image src='/planet.png' alt='logo' width='80px' height='80px' />

                <Stack
                    bg={'gray.50'}
                    rounded={'xl'}
                    p={{ base: 4, sm: 6, md: 8 }}
                    spacing={{ base: 8 }}
                    maxW={{ lg: 'lg' }}
                >
                    <Box as={'form'}>
                        Dummy Page:
                        <br/>
                        olá {user?.name}
                    </Box>

                </Stack>

            </Stack>

        </Container>

    );
  
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { token } = parseCookies(ctx)

    if(!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }
    return {
        props: {}
    }
}