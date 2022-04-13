import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";

import { logIn, recoverUserInfo, register } from "../services/auth";
import { api } from "../services/api";
import { User } from "public/model/User";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (data: CredentialsType) => Promise<unknown>;
  signUp: (data: NewUserType) => Promise<unknown>;
  logout: () => void;
};

type CredentialsType = {
  cpf: string;
  password: string;
};

type NewUserType = {
  cpf: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const AuthContext = createContext({} as AuthContextType);

type AuthProviderProps = {
  children?: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    const { token } = parseCookies();

    if (token) {
      recoverUserInfo(token).then((response) => {
        setUser(response.user);
      });
    }
  }, []);

  async function signIn({ cpf, password }: CredentialsType) {
    return new Promise((resolve, reject) => {
      logIn({
        cpf,
        password,
      }).then((res: any) => {
        const { token, user } = res;

        setCookie(undefined, "token", token, {
          maxAge: 60 * 60 * 1, // 1hour
        });
    
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
        setUser(user);
        Router.push("/dashboard");
      }, (err) => reject(err));
    })
  }

  async function signUp({ cpf, password, firstName, lastName }: NewUserType) {

    return new Promise((resolve, reject) => {
      register({
        cpf,
        password,
        firstName,
        lastName
      }).then((res: any) => {
  
        const { token, user } = res;
  
        setCookie(undefined, "token", token, {
          maxAge: 60 * 60 * 1, // 1hour
        });
    
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
        setUser(user);
        Router.push("/bank");
  
      }, (err) => reject(err));
    })
    
    
  }

  function logout() {

    delete api.defaults.headers.common["Authorization"];
    
    setUser(null);
    destroyCookie({}, 'token');
    Router.push("/");
  }

  return <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, logout }}>{children}</AuthContext.Provider>;
}
