import { Container, Stack, Box, Heading, Button } from '@chakra-ui/react'
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'

import styles from '../styles/HomePage.module.css'
import GravityFinanceBackground from 'components/GravityFinanceBackground'


export default function HomePage() {

  const router = useRouter()

  return (

    <GravityFinanceBackground>
      <Image src='/planet.png' alt='logo' width='80px' height='80px' />
        <Heading textAlign='center' fontWeight={500} fontSize={70} color='#dbdbdb' fontFamily='Poppins'>
          Gravity Finance
        </Heading>
        <Heading fontSize={22} textAlign='center' fontWeight={200} color='white' fontFamily='Poppins' lineHeight={9}>
          Suas finanças ao seu alcance
        </Heading>
        <Button onClick={() => router.push('/login')} color='primary.main' bgColor='secondary.main' variant='filled' size='lg' w={200} h={55} mt={10} _hover={{ bg: '#233146c9'}} style={{borderRadius:20, letterSpacing: 2, fontWeight: 600, cursor: 'pointer' }}>
          LOGIN
        </Button>
    </GravityFinanceBackground>

  );
}