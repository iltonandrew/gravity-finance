import axios from "axios";
import { BASE_URL, BASE_URL_LOCAL } from "../pages/api/constants";
import { parseCookies } from "nookies";

export const api = Api();

export function Api(ctx?: any) {
  const { token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: BASE_URL_LOCAL,
  });

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return api;
}
