import {BASE_URL} from './constants'

type CredentialsType = {
    cpf: string,
    password: string
}

export async function auth({cpf, password}:CredentialsType) {
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
    return content;
  };