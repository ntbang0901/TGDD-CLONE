import React from "react"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import { Button, CircularProgress } from "@mui/material"
import { styled } from "@mui/material/styles"
import { useFormik } from "formik"
import { Collapse } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import * as Yup from "yup"
import axios from "axios"
import {
    ADD_HISTORY_SAGA,
    DELETE_CART_SAGA,
    EDIT_CART_SAGA,
    GET_CART_SAGA,
} from "../../redux/sagas/types/main"
import Info from "./Info"
import PotentialCartPromotion from "./PotentialCartPromotion"
import ProductCart from "./ProductCart"
import { DOMAIN2 } from "../../utils/Settings/global"
function ShoppingCartPage(props) {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    const { last_promotions } = useSelector((state) => state.product)

    const { shoppingCarts, loadingShoppingCart, quantityShoppingCart } = useSelector((state) => state.global)

    const [promotionList, setPromotionList] = useState({
        cart: [],
        item: [],
    })

    const [total, setTotal] = useState(0)

    const productPayload = shoppingCarts.map((cart) => {
        const obj = {
            quantity: cart.quantity,
            productId: cart.product.productId,
        }

        return obj
    })
    console.log("promotionlist:: -> ", promotionList)
    console.log("productPayload:: -> ", productPayload)

    const ButtonStyles = styled(Button)({
        borderRadius: "24px",
    })

    useEffect(() => {
        const getKMTN = async () => {
            let body = {
                totalQuantity: quantityShoppingCart,
                totalPrice: shoppingCarts.reduce((res, curentPro, index) => {
                    return res + curentPro.product.price * curentPro.quantity
                }, 0),
                listCartItems: productPayload,
            }
            const response = await axios.post(
                `${DOMAIN2}/promotion/suggest-promotion`,
                body
            )
            const data = {
                cart: response.data.cartPromotion,
                item: response.data.itemPromotion,
            }

            setPromotionList(data)
        }
        if (shoppingCarts.length > 0) {
            getKMTN()
        }
    }, [shoppingCarts])

    useEffect(() => {
        if (user.idUser) {
            dispatch({
                type: GET_CART_SAGA,
                idUser: user.idUser,
            })
        }
    }, [dispatch, user.idUser])

    const getTotalPrice = useMemo(() => {
        const result = shoppingCarts.reduce((res, curentPro, index) => {
            return res + curentPro.product.price * curentPro.quantity
        }, 0)
        return result
    }, [dispatch, quantityShoppingCart])

    function filterElementsNotInArray(arr1, arr2) {
        const newArray = arr1.filter((item1) => {
            return !arr2.some((item2) => item1.id === item2.id)
        })
        return newArray
    }

    console.log("After result:: --> ", last_promotions)

    const result = filterElementsNotInArray(last_promotions, promotionList.item)

    console.log("result:: --> ", result)

    const { handleSubmit, errors, touched, handleChange, setFieldValue } =
        useFormik({
            enableReinitialize: true,
            initialValues: {
                idUser: user._id,
                gender: "",
                name: "",
                phone: "",
                address: "",
                carts: shoppingCarts,
                totalPrice: getTotalPrice,
            },
            validationSchema: Yup.object({
                gender: Yup.string().required("Bạn không được bỏ trống"),
                name: Yup.string().required("Bạn không được bỏ trống"),
                phone: Yup.string().required("Bạn không được bỏ trống"),
                address: Yup.string().required("Bạn không được bỏ trống"),
            }),
            onSubmit: (values) => {
                console.log("values: ", values)
                if (values.carts.length > 0) {
                    dispatch({
                        type: ADD_HISTORY_SAGA,
                        data: values,
                    })
                } else {
                    alert("Giỏ hàng trống")
                }
            },
        })

        const totalDiscount = () => {
            let total = 0
            shoppingCarts.forEach((item) => {
                let newArray = result.filter(
                    (pro) =>
                        pro.promotionItems[0].productId === item.product.productId
                )
                if (newArray.length > 0) {
                    let promotion = newArray[newArray.length - 1]
    
                    if (promotion.discountType === "value") {
                        total += promotion.discountValue
                    } else {
                        total +=
                            (promotion.discountValue / 100) *
                            (promotion.promotionItems[0].quantity *
                                promotion.promotionItems[0].price)
                    }
                }
            })
    
            return total
        }

    const totalDiscountValue = totalDiscount()

    return (
        <div className="flex bg-[#eee] items-center justify-center p-4">
            {/* {!loadingShoppingCart ? ( */}
            <div className=" rounded-sm bg-white w-[80%] si:w-[60%] sm:w-[55%] py-4 px-4">
                <div className="flex flex-col md:flex-row mb-2 justify-between items-center gap-2 md:gap-4">
                    <Link to="/">
                        <div className="text-minLink hover:opacity-70 cursor-pointer text-struncate">
                            <ChevronLeftIcon />
                            <span>Mua thêm sản phẩm khác</span>
                        </div>
                    </Link>
                    <span className="text-sm">Giỏ hàng của bạn</span>
                </div>

                {/* Products */}
                <div className="rounded-xl shadow-xl">
                    {shoppingCarts?.map((item, index) => (
                        <ProductCart
                            item={item}
                            listHistory={result}
                            promotionUsed={result.filter(
                                (pro) =>
                                    pro.promotionItems[0].productId ===
                                    item.product.productId
                            )}
                            itemPromotion={promotionList.item.filter(
                                (pro) =>
                                    pro.promotionItems[0].productId ===
                                    item.product.productId
                            )}
                            key={index}
                        />
                    ))}
                </div>

                {/* Info */}
                <div className="">
                    <Info
                        touched={touched}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        errors={errors}
                    />
                </div>
                {/* <div>{total}</div> */}
                <div>
                    <p>Ưu đãi cho giỏ hàng</p>
                    <ul className="rounded-xl bg-[#ffd500ae] mt-2">
                        {/* <PotentialCartPromotion /> */}
                        {promotionList.cart.slice(0, 3).map((p, index) => (
                            <li key={JSON.stringify(p)} className="p-2">
                                <span className="p-1 rounded-sm text-[12px] text-black">
                                    {index + 1}
                                </span>
                                <span className="text-[12px] sm:text-[14px] ml-2">
                                    {`Mua thêm ${p.additionalAmount.toLocaleString(
                                        "en-US",
                                        {
                                            currency: "USD",
                                        }
                                    )}đ để được giảm ${p.discountValue.toLocaleString(
                                        "en-US",
                                        {
                                            currency: "USD",
                                        }
                                    )}`}
                                    {p.discountType === "percentage"
                                        ? "%"
                                        : " đồng"}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Total money */}
                <div className="flex flex-col md:flex-row my-2 justify-between items-center gap-2 md:gap-4">
                    <h1 className="font-semibold">Tạm tính: </h1>

                    <span className="text-base text-red-600 font-semibold">
                        {getTotalPrice.toLocaleString("en-US", {
                            currency: "USD",
                        })}
                        đ
                    </span>
                </div>

                <div className="flex flex-col md:flex-row my-2 justify-between items-center gap-2 md:gap-4">
                    <h1 className="font-semibold">Tiền giảm: </h1>

                    <span className="text-base text-red-600 font-semibold">
                        {totalDiscountValue.toLocaleString("en-US", {
                            currency: "USD",
                        })}
                        đ
                    </span>
                </div>
                <div className="flex flex-col md:flex-row my-2 justify-between items-center gap-2 md:gap-4">
                    <h1 className="font-semibold">
                        Tổng tiền ({quantityShoppingCart} sản phẩm):{" "}
                    </h1>

                    <span className="text-base text-red-600 font-semibold">
                        {(getTotalPrice - totalDiscountValue).toLocaleString(
                            "en-US",
                            {
                                currency: "USD",
                            }
                        )}
                        đ
                    </span>
                </div>

                {/* Buy action */}
                <div className="mt-4">
                    <ButtonStyles
                        onClick={handleSubmit}
                        style={{ width: "100%" }}
                        variant="contained"
                        color="error"
                    >
                        Đặt hàng
                    </ButtonStyles>
                </div>
            </div>
            {/* ) : (
                <div className="flex items-center flex-col">
                    <CircularProgress />

                    <p>Loading....</p>
                </div>
            )} */}
        </div>
    )
}

export default ShoppingCartPage
