import { LoginPayload } from "features/Auth/services/authSlice"
import { ApiResponse } from "models/Common"
import axiosClient from "./axiosClient"

export const authApi={
    login(data:LoginPayload):Promise<ApiResponse>{
        const url="/auth/login"
        return axiosClient.post(url,data)
    },
    checkToken(token:string):Promise<ApiResponse>{
        const url="/auth/checkToken"
        return axiosClient.post(url,{token})
    },
}

