import axios from "axios"
import { AUTH_TOKEN } from "@/common/constants"

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    // Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
    "API-KEY": import.meta.env.VITE_API_KEY,
  },
})

// интерсептор, переводится перехватчик, нужен для того чтобы до того за запрос отправился, вставить что-то в запрос.
// Либо же до того как пришёл респонс, что-то вставить в респонс
instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(AUTH_TOKEN)
    config.headers.Authorization = `Bearer ${token}`
    return config
  },
  // здесь можно обрабатывать ошибки, но мы этого делать не будем
  // , function (error) {
  //   return Promise.reject(error)
  //   }
)
