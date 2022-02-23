import { Container, Stack, Box, Heading, Button } from '@chakra-ui/react'
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'

import styles from '../styles/HomePage.module.css'


export default function HomePage() {

  const router = useRouter()

  return (

    <div className={styles.root}>
      <Head>
        <title>Gravity Finance</title>
        <link rel="icon" href="/planet.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,900;1,100;1,200;1,300;1,400;1,500&display=swap" rel="stylesheet" />
      </Head>
      <FirstSection router={router} />
    </div>
  );
}


// First section: headers and titles
function FirstSection(props : any) {

  let router = props.router

  return (

    <Container h='100vh' maxW='100%' position='relative' bgImage='/stars.jpg' bgSize='cover' p={0}>

      {/* Main title and subtitle */}
      <Stack direction='column' w='100%' h='100%' p={10} justify='space-evenly' align='center' bg='linear-gradient(174deg, rgba(34,47,70,1) 0%, rgb(213 167 65 / 58%) 100%)'>
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
      </Stack>

    </Container>

  );
}