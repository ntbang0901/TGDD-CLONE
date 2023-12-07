import axios from "axios"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const PotentialPromotion = () => {
    const [cartPromotion, setCartPromotion] = useState([])
    const [itemPromotion, setItemPromotion] = useState([])
    const { shoppingCarts, loadingShoppingCart, quantityShoppingCart } =
        useSelector((state) => state.global)
    const productPayload = shoppingCarts.map((cart) => {
        const obj = {}
        obj.id = cart.idProduct
        obj.quantity = cart.quantity
        return obj
    })

    useEffect(() => {
        const getKMTN = async () => {
            const response = await axios.post(
                "http://localhost:8080/bankservice/getrate",
                {
                    totalQuantity: quantityShoppingCart,
                    totalPrice: shoppingCarts.reduce(
                        (res, curentPro, index) => {
                            return (
                                res +
                                curentPro.product.price * curentPro.quantity
                            )
                        },
                        0
                    ),
                    products: productPayload,
                }
            )

            setCartPromotion(response.data.cartPromotion)
            setItemPromotion(response.data.itemPromotion)
        }
        getKMTN()
    }, [])

    return (
        <div>
            {cartPromotion.slice(0, 3).map((p) => (
                <div key={JSON.stringify(p)}>
                    {`Mua thêm ${p.tienmuathem} để được giảm ${p.value}`}
                </div>
            ))}
        </div>
    )
}

export default PotentialPromotion
