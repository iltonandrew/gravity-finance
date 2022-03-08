import { Container, Stack, Image } from "@chakra-ui/react";

import styles from '../styles/HomePage.module.css'


export default function GravityFinanceBackground({ children }) {
    return (
        <Container className={styles.root} h='100vh' maxW='100%' position='relative' bgImage='/stars.jpg' bgSize='cover' p={0}>

            <Stack spacing={30} direction='column' w='100%' h='100%' p={50} justify='center' align='center' bg='linear-gradient(174deg, rgba(34,47,70,1) 0%, rgb(213 167 65 / 58%) 100%)'>
                {children}
            </Stack>
        </Container>
    );
}