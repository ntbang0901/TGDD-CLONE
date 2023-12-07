import React, { useState } from "react"
import CancelPresentationRoundedIcon from "@mui/icons-material/CancelPresentationRounded"
import { DELETE_CART_SAGA, EDIT_CART_SAGA } from "../../redux/sagas/types/main"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@mui/material"
import { styled } from '@mui/material/styles';

const ProductCart = ({ item, itemPromotion }) => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.user)
    const [open, setOpen] = useState(false)

    const ButtonStyles = styled(Button) ({
        backgroundColor: "#6DB9EF",
        margin: '5px',
        color: '#333',
        borderRadius: '24px',
        padding: '0 5 0',
        fontSize: '12px',
        "&:hover": {
            backgroundColor: '#6DB9EF',
            color: '#fff',
        }
    })

    console.log(item)

    return (
        <div className="border-b-[1px] border-gray-300">
            <div className="flex flex-col items-center md:flex-row py-4 px-4 justify-between ">
                {/* Info  */}
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex flex-col items-center justify-center">
                        <img
                            className="w-[80px] h-[80px] object-contain"
                            src={item?.product?.images[0]}
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
                                            idCart: item._id,
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
                            màu: {item?.product?.images[0]?.colorName}
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
                                        type: EDIT_CART_SAGA,
                                        data: {
                                            idUser: user._id,
                                            idCart: item._id,
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
                                    type: EDIT_CART_SAGA,
                                    data: {
                                        idUser: user._id,
                                        idCart: item._id,
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
            <div className={`mx-10 rounded-xl mb-5 border-solid border-2`}>
                {<ul
                    className={` ${
                        !open && itemPromotion.length > 3
                            ? "h-[130px] overflow-hidden"
                            : ""
                    } transition duration-150 ease-out p-[5px] `}
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
                                đồng
                            </span>
                        </li>
                    ))}
                </ul>}
                {itemPromotion.length > 3 && (
                    <ButtonStyles onClick={() => setOpen(!open)}>
                        {open ? "Thu gọn" : "Xem thêm"}
                    </ButtonStyles>
                )}
            </div>
        </div>
    )
}

export default ProductCart
