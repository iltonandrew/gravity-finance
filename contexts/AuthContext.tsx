import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";

import { logIn, recoverUserInfo } from "../services/auth";
import { api } from "../services/api";
import { User } from "public/model/User";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (data: CredentialsType) => Promise<void>;
};

type CredentialsType = {
  cpf: string;
  password: string;
};

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
    const { token, user } = await logIn({
      cpf,
      password,
    });

    setCookie(undefined, "token", token, {
      maxAge: 60 * 60 * 1, // 1hour
    });

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setUser(user);
    Router.push("/dashboard");
  }

  return <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>{children}</AuthContext.Provider>;
}
