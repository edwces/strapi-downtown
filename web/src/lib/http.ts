import axios from "axios";
import qs from "qs";
import { env } from "../common/utils/env.util";

export const http = axios.create({
  baseURL: env("NEXT_PUBLIC_API_URL", "http://localhost:1337/api"),
  paramsSerializer: (params) => qs.stringify(params),
});
