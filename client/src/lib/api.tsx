import axios from "axios";
export const api = axios.create({

    baseURL: "https://fluxodocapital.com.br/hostmidea"
    // baseURL: process.env.NODE_ENV === 'development'
    //     ? "https://hp.gedagro.com.br/api"
    //     : "https://hp.gedagro.com.br/api"
})

// "https://hp.gedagro.com.br/api"