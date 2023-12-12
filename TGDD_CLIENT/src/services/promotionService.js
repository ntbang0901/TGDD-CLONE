import axios from "axios"

export const getKMTN = async (totalQuantity, totalPrice, products) => {
    return await axios.post(
        "http://localhost:8080/api/v1/bankservice/getrate",
        {
            totalQuantity,
            totalPrice,
            products,
        }
    )
}
