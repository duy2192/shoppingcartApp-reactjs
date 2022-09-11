import { IProductFilters, Product } from "models"
import { ApiResponse } from "models/Common"
import axiosClient from "./axiosClient"

export const productApi={
    getAllProduct(params:IProductFilters):Promise<ApiResponse<Product[]>>{
        const url="/product/"
        return axiosClient.get(url,{params})
    },
    getProductById(id:string):Promise<ApiResponse<Product>>{
        const url=`/product/${id}`
        return axiosClient.get(url)
    }
}

