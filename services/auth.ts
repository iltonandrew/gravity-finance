import {BASE_URL, BASE_URL_DEV} from '../pages/api/constants'
import { api } from './api';

type CredentialsType = {
    cpf: string,
    password: string
}

export async function logIn({cpf, password}:CredentialsType) {

  return api.post('/auth', {cpf, password})
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
};

export async function recoverUserInfo(token: string) {
  return api.get('/user/recoverInfo', {})
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
}

export async function logOut() {
  localStorage.removeItem('token')
  // redirect to '/'
  return;
}