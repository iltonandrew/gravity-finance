import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function ProtectedPage({ children }) {
    
    return (
        <>
            { children }
        </>
    );
}