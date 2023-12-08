import React, { useState } from "react"
import CancelPresentationRoundedIcon from "@mui/icons-material/CancelPresentationRounded"
import {
    ADD_TO_CART_SAGA,
    DELETE_CART_SAGA,
    EDIT_CART_SAGA,
} from "../../redux/sagas/types/main"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@mui/material"

const ProductCart = ({ item, itemPromotion }) => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.user)
    const [open, setOpen] = useState(false)

    console.log("itemPromotion:: -> ", itemPromotion)

    return (
        <div className="border-b-[1px] border-gray-300">
            <div className="flex flex-col items-center md:flex-row py-4 px-4 justify-between ">
                {/* Info  */}
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex flex-col items-center justify-center">
                        <img
                            className="w-[80px] h-[80px] object-contain"
                            src={
                                "https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-6/407813107_883731056762644_3963513014645724510_n.jpg?stp=dst-jpg_s600x600&_nc_cat=100&ccb=1-7&_nc_sid=3635dc&_nc_ohc=K3MbGfgohoEAX8r-Ovq&_nc_ht=scontent.fhan4-3.fna&oh=00_AfCbEnh32jSXoW5xWMX9POb9RrnzCfl4sqW3k6yACPiy5A&oe=6576C360"
                            }
                            alt=""
                        />
                        <CancelPresentationRoundedIcon
                            onClick={() => {
                                if (
                                    window.confirm(
                                        "Bạn chắc chắn muốn xóa sản phẩm khỏi giõ hàng?"
                                    )
                                ) {
                                    dispatch({
                                        type: DELETE_CART_SAGA,
                                        data: {
                                            idUser: user._id,
                                            productId: item.product.productId,
                                            idCart: item.cartId,
                                        },
                                    })
                                }
                            }}
                            className="cursor-pointer text-red-500 pt-2"
                        />
                    </div>
                    <div className="">
                        <h1 className="font-semibold text-struncate text-center md:text-left">
                            {item?.product?.name}
                        </h1>
                        <p className="my-2 text-sm text-minLink text-center md:text-left">
                            2 khuyến mãi
                        </p>
                        <p className="text-sm capitalize text-minLink text-center md:text-left">
                            màu: {"Blue"}
                        </p>
                    </div>
                </div>
                {/* Action  */}
                <div className="flex flex-col">
                    <p className="text-red-600">
                        {item?.product?.price.toLocaleString("en-US", {
                            currency: "USD",
                        })}
                        đ
                    </p>
                    <p className="line-through text-sm my-1 text-gray-400">
                        {(item?.product?.price * 1.8).toLocaleString("en-US", {
                            currency: "USD",
                        })}
                        đ
                    </p>
                    <div className="flex">
                        <button
                            onClick={async () => {
                                if (item.quantity > 1) {
                                    dispatch({
                                        type: ADD_TO_CART_SAGA,
                                        data: {
                                            idUser: user._id,
                                            productId: item.product.productId,
                                            idCart: item.cartId,
                                            quantity: item.quantity - 1,
                                        },
                                    })
                                }
                            }}
                            className={`border-[1px] ${
                                item.quantity === 1 ? "bg-gray-100" : ""
                            }  text-red-500 font-semibold py-1 px-2 rounded-sm`}
                        >
                            -
                        </button>
                        <button className=" border-[1px] text-black py-1 px-2 rounded-sm">
                            {item?.quantity}
                        </button>

                        <button
                            onClick={async () => {
                                dispatch({
                                    type: ADD_TO_CART_SAGA,
                                    data: {
                                        idUser: user._id,
                                        productId: item.product.productId,
                                        idCart: item.cartId,
                                        quantity: item.quantity + 1,
                                    },
                                })
                            }}
                            className=" border-[1px] font-semibold text-minLink py-1 px-2 rounded-sm"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            <div className={``}>
                <ul
                    className={` ${
                        !open && itemPromotion.length > 3
                            ? "h-[115px] overflow-hidden"
                            : ""
                    } transition duration-150 ease-out `}
                >
                    {itemPromotion.map((p, index) => (
                        <li className="p-2">
                            <span className="bg-red-600 p-1 rounded-sm text-[12px] text-white">
                                HOT
                            </span>
                            <span className="text-[12px] sm:text-[14px] ml-2">
                                {`Mua thêm ${
                                    p.soLuongMuaThem
                                } sản phẩm để được giảm ${p.discountValue.toLocaleString(
                                    "en-US",
                                    {
                                        currency: "USD",
                                    }
                                )}`}{" "}
                                {p.discountType === "percentage" ? "%" : "đ"}
                            </span>
                        </li>
                    ))}
                </ul>
                {itemPromotion.length > 3 && (
                    <Button onClick={() => setOpen(!open)}>
                        {open ? "Thu gọn" : "Xem thêm"}
                    </Button>
                )}
            </div>
        </div>
    )
}

export default ProductCart
