import { api } from "./api";

type CredentialsType = {
  cpf: string;
  password: string;
};

type NewUserType = {
  cpf: string;
  password: string;
  firstName: string;
  lastName: string;
};

export async function logIn({ cpf, password }: CredentialsType) {
  return new Promise((res, reject) => {
    api
      .post("/auth", { cpf, password })
      .then((response) => {
        res(response.data);
      })
      .catch((error) => {
        reject(error.response)
      });
  })
}

export async function register({ cpf, password, firstName, lastName }: NewUserType) {
  return new Promise((res, reject) => {
    api
      .post("/auth/register", { cpf, password, firstName, lastName })
      .then((response) => {
        res(response.data);
      })
      .catch((error) => {
        reject(error.response)
      });
  })
}


export async function recoverUserInfo(token: string) {
  return api
    .get("/user/recoverInfo", {})
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
