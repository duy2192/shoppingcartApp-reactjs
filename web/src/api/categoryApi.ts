import { Category } from "models"
import { ApiResponse } from "models/Common"
import axiosClient from "./axiosClient"

export const categoryApi={
    getAll():Promise<ApiResponse<Category[]>>{
        const url="/category/"
        return axiosClient.get(url)
    }
}