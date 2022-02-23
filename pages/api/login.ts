import {BASE_URL} from './constants'

type CredentialsType = {
    cpf: string,
    password: string
}

export async function logIn({cpf, password}:CredentialsType) {
  console.log(cpf, password)
  const rawResponse = await fetch(`${BASE_URL}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    },
    body: JSON.stringify({cpf ,password})
  });
  const content = await rawResponse.json();
  localStorage.setItem('token', content.token)
  return content;
};

export async function logOut() {
  localStorage.removeItem('token')
  // redirect to '/'
  return;
}