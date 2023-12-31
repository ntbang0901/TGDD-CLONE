import React, { useEffect, useMemo, useState } from "react"

import CancelPresentationRoundedIcon from "@mui/icons-material/CancelPresentationRounded"
import { styled } from "@mui/material/styles"
import { useDispatch, useSelector } from "react-redux"
import {
    ADD_TO_CART_SAGA,
    DELETE_CART_SAGA,
    EDIT_CART_SAGA,
    GET_HISTORY_LAST_PROMOTION,
} from "../../redux/sagas/types/main"
import ProgressBar from "./../../components/ProgressBar/ProgressBar"

import CloseIcon from "@mui/icons-material/Close"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import IconButton from "@mui/material/IconButton"
import { useNavigate } from "react-router-dom"
import { useDebounce } from "../../utils/hooks/useDebounce"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}))

const ProductCart = ({ item, itemPromotion, suggestLoading, getKMTN }) => {
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.user)
    const [open, setOpen] = useState(false)
    const [itemQuantity, setItemQuantity] = useState(item.quantity)
    let quantityDebounce = useDebounce(itemQuantity, 200)
    const navigate = useNavigate()
    const [notify, setNotify] = useState("")

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    console.log("promotionItem:: -> ", itemPromotion)

    useEffect(() => {
        if (quantityDebounce !== item.quantity) {
            let data = {
                idUser: user.idUser,
                productId: item.product.productId,
                idCart: item.cartId,
                quantity: quantityDebounce,
            }
            checkPromotion(itemQuantity, 0)

            dispatch({
                type: ADD_TO_CART_SAGA,
                data,
            })
        }
    }, [quantityDebounce])

    const checkPromotion = (quantity, index) => {
        if (quantity === itemPromotion[index]?.promotionProducts[0]?.quantity) {
            setNotify(
                `Yay! Bạn đã tiết kiệm được ${itemPromotion[index]?.discountValue.toLocaleString("en-US", {
                    currency: "USD",
                })}${itemPromotion[0]?.discountType === "percentage" ? "%" : " đồng"} `
            )
            setTimeout(() => {
                setNotify("")
            }, 1500)
        }
    }

    return (
        <div className="border-[1px] border-gray-300 mt-5 rounded-xl shadow-xl">
            {itemPromotion[0]?.additionalQuantity || suggestLoading ? (
                <>
                    {itemPromotion.length > 0 && (
                        <ProgressBar
                            text={
                                notify === ""
                                    ? `Mua thêm ${
                                          itemPromotion[0]?.additionalQuantity
                                      } sản phẩm để được giảm ${itemPromotion[0]?.discountValue.toLocaleString(
                                          "en-US",
                                          {
                                              currency: "USD",
                                          }
                                      )}${itemPromotion[0]?.discountType === "percentage" ? "%" : " đồng"} `
                                    : notify
                            }
                            cartItemQuantity={itemQuantity}
                            conditionQuantity={
                                itemPromotion[0]?.promotionProducts[0]?.quantity ||
                                itemPromotion[0]?.promotionProducts[0]?.minProduct
                            }
                            onClick={handleClickOpen}
                            notify={notify}
                            loading={suggestLoading}
                        />
                    )}
                    <BootstrapDialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={open}
                        maxWidth={"sm"}
                        fullWidth
                    >
                        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                            Ưu đãi
                        </DialogTitle>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>

                        <DialogContent dividers>
                            {itemPromotion?.length ? (
                                <ul>
                                    {itemPromotion.map((p, index) => (
                                        <li
                                            className="p-2 hover:cursor-pointer flex justify-between items-center"
                                            key={index}
                                        >
                                            <span className="text-[12px] sm:text-[14px] ml-2">
                                                {`Mua thêm ${
                                                    p?.additionalQuantity
                                                } sản phẩm để được giảm ${p?.discountValue.toLocaleString("en-US", {
                                                    currency: "USD",
                                                })}`}
                                                {p?.discountType === "percentage" ? "%" : " đồng"}
                                            </span>
                                            <button
                                                className="hover:bg-[#ccc] p-2 rounded-md"
                                                onClick={async () => {
                                                    checkPromotion(
                                                        itemPromotion[index]?.promotionProducts[0]?.quantity,
                                                        index
                                                    )
                                                    setItemQuantity(
                                                        p?.promotionProducts[0].quantity ||
                                                            p?.promotionProducts[0].minProduct
                                                    )
                                                    handleClose()
                                                }}
                                            >
                                                Chọn
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : null}
                        </DialogContent>
                    </BootstrapDialog>
                </>
            ) : null}
            <div className="flex flex-col items-center md:flex-row py-4 px-4 justify-between ">
                {/* Info  */}

                <div className="flex flex-col md:flex-row gap-2">
                    <div className="flex flex-col items-center justify-center">
                        <img className="w-[80px] h-[80px] object-contain" src={item?.product?.photo} alt="" />
                        <CancelPresentationRoundedIcon
                            onClick={() => {
                                // let newResult = last_promotions.filter((pro) =>
                                //     listHistory.some((pro1) => pro1.id === pro.id)
                                // )

                                // dispatch({
                                //     type: GET_HISTORY_LAST_PROMOTION,
                                //     promotion: newResult,
                                // })
                                dispatch({
                                    type: DELETE_CART_SAGA,
                                    data: {
                                        idUser: user.idUser,
                                        productId: item.product.productId,
                                        idCart: item.cartId,
                                    },
                                })
                            }}
                            className="cursor-pointer text-red-500 pt-2"
                        />
                    </div>
                    <div className="">
                        <h1
                            className="font-semibold text-struncate text-center md:text-left cursor-pointer"
                            onClick={() => navigate(`/${item?.product.productId}`)}
                        >
                            {item?.product?.productName}
                        </h1>
                        {/* <p className="my-2 text-sm text-minLink text-center md:text-left">
                            <span>Khuyến mãi đã áp dụng : </span>{" "}
                            {promotionUsed.length}
                        </p> */}
                        <p className="my-2 text-sm text-minLink text-center md:text-left">
                            {/* {itemPromotion?.item.length} */}
                        </p>
                        {/* <p className="text-sm capitalize text-minLink text-center md:text-left">
                            màu: {item?.product.color}
                        </p> */}
                    </div>
                </div>
                {/* Action  */}
                <div className="flex flex-col gap-5">
                    <p className="text-red-600">
                        {item?.product?.price.toLocaleString("en-US", {
                            currency: "USD",
                        })}
                        đ
                    </p>

                    <div className="flex">
                        <button
                            onClick={async () => {
                                if (itemQuantity > 1) {
                                    setItemQuantity((e) => e - 1)
                                }
                            }}
                            className={`border-[1px] ${
                                item.quantity === 1 ? "bg-gray-100" : ""
                            }  text-red-500 font-semibold py-1 px-2 rounded-sm`}
                        >
                            -
                        </button>
                        <button className=" border-[1px] text-black py-1 px-2 rounded-sm">{itemQuantity}</button>

                        <button
                            onClick={async () => {
                                setItemQuantity((e) => e + 1)
                            }}
                            className=" border-[1px] font-semibold text-minLink py-1 px-2 rounded-sm"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>
            {/* <div className={``}>
                <ul
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
                                    p.additionalQuantity
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
                </ul> :  null}
                {itemPromotion.length > 3 && (
                    <ButtonStyles onClick={() => setOpen(!open)}>
                        {open ? "Thu gọn" : "Xem thêm"}
                    </ButtonStyles>
                )}
            </div> */}
        </div>
    )
}

export default ProductCart
