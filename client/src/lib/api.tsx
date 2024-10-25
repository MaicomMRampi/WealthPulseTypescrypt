import axios from "axios";
export const api = axios.create({

    baseURL: "http://localhost:3333/api"
    // baseURL: "https://app.fluxodocapital.com.br/api"
    // baseURL: process.env.NODE_ENV === 'development'
    //     ? "https://hp.gedagro.com.br/api"
    //     : "https://hp.gedagro.com.br/api"
})

// "https://hp.gedagro.com.br/api"