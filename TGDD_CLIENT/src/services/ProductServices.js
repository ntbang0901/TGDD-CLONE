import axios from "axios"
import { BaseService } from "./BaseServices"

export class ProductServices extends BaseService {
    constructor() {
        return super()
    }

    searchRecommendProductApi = (type, keyword) => {
        return this.get(`${type}/searchRecommend?name=${keyword}`)
    }

    searchProductApi = (type, keyword, queryParam) => {
        if (queryParam) {
            console.log("queryParam: ", queryParam)
            return this.get(`${type}/feature?${queryParam}`)
        }
        return this.get(`${type}/feature?search=${keyword}`)
    }

    getProductDetailApi = (type, id) => {
        return this.get(`${type}/${id}`)
    }

    filterProductApi = (type, queryParam) => {
        return this.get(`${type}/filter?${queryParam}`)
    }

    getCartApi = (idUser) => {
        // return this.get(`cart/${idUser}`)
        return axios.get(`http://localhost:8080/cart/${idUser}`)
    }

    addToCartApi = (data) => {
        return axios.post("http://localhost:8080/cart/add", {
            userId: data.idUser,
            cartId: data.cartId,
            productId: data.productId,
            quantity: data.quantity,
        })
    }

    editCartApi = (data) => {
        return this.put(`cart/${data.idCart}`, data)
    }

    deleteCartApi = (data) => {
        console.log(data)
        return axios.post(`http://localhost:8080/cart/delete`, {
            userId: data.idUser,
            productId: data.productId,
        })
    }

    deleteAllCartApi = (idUser) => {
        return this.delete(`cart/deleteCart/${idUser}`)
    }

    getHistoryApi = (idUser, page) => {
        return this.get(`history/${idUser}?page=${page || 1}`)
    }

    addHistoryApi = (data) => {
        return this.post(`history`, data)
    }

    deleteHistoryApi = (idHistory) => {
        return this.delete(`history/${idHistory}`)
    }

    getAllHistoryApi = (page) => {
        return this.get(`history?page=${page}`)
    }

    getHistorySignApi = (page) => {
        return this.get(`history/sign?page=${page}`)
    }

    getHistoryNoSignApi = (page) => {
        return this.get(`history/noSign?page=${page}`)
    }

    signHistoryApi = (idHistory) => {
        return this.put(`history/${idHistory}`)
    }
}

export const productServices = new ProductServices()
