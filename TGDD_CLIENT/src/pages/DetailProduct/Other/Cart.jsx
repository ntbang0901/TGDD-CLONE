import { Button, createTheme, ThemeProvider } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { showMess } from "../../../redux/actions/globalAction"
import { HIDE_CARD_PRODUCT, SHOW_ALERT } from "../../../redux/reducers/types/mainType"
import { ADD_TO_CART_SAGA } from "../../../redux/sagas/types/main"
import { DOMAIN2 } from "../../../utils/Settings/global"
const theme = createTheme({
    palette: {
        primary: {
            main: "#3f51d5",
        },
        secondary: {
            main: "#ffc400",
        },
    },
})
function Cart(props) {
    const { productDetail, user } = props
    const [indexColor, setIndexColor] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()

    const handleAddToCart = () => {
        const { name, category, productId, price } =
            productDetail
        let images = [productDetail.photo]
        const product = {
            name,
            category,
            _id: productId,
            price,
            images,
        }
        if (quantity > 0) {
            const data = {
                productId: productDetail.productId,
                idUser: user.idUser,
                idColor: images[0].colorValue,
                product,
                quantity,
            }
            // addCart(data)
            dispatch({
                type: ADD_TO_CART_SAGA,
                data,
            })
            dispatch({
                type: SHOW_ALERT,
                success:true,
                mess: "Thêm vào giỏ hàng thành công"
            })
            handleCloseModal()
        } else {
            alert("Số lượng sản phẩm phải lớn hơn 0")
        }
    }

    const handleCloseModal = () => {
        
        dispatch({
            type: HIDE_CARD_PRODUCT,
        });
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="w-[375px]">
                <div className="pb-2 border-b-gray-300 border-b-[1px]">
                    <h1 className="mb-2 text-[18px]">{productDetail?.name}</h1>
                    <p className="text-red-600">
                        {productDetail?.price.toLocaleString("en-US", {
                            currency: "USD",
                        })}
                        ₫
                    </p>
                </div>
                <div className="mt-2 pb-2 border-b-gray-300 border-b-[1px]">
                    {/* imgaes */}
                    <div className="">
                        <h1 className="font-semibold mb-2">Chọn màu</h1>
                        <div className="grid grid-cols-6 gap-2">
                            {productDetail?.images?.map((item, index) => (
                                <div
                                    key={index}
                                    className=""
                                    onClick={() => {
                                        setIndexColor(index)
                                    }}
                                >
                                    <div
                                        className={`border py-2 rounded-md ${
                                            index === indexColor
                                                ? "border-orange-400"
                                                : ""
                                        }`}
                                    >
                                        <img
                                            className="w-[50px] h-[50px] object-contain"
                                            src={item}
                                            alt=""
                                        />
                                    </div>
                                    <p className="text-[12px] my-2 text-center">
                                        {item?.colorName}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* quantity */}

                    <div className="">
                        <h1 className="font-semibold mb-2">Chọn số lượng: </h1>
                        <div className="flex gap-2">
                            <Button
                                onClick={() => {
                                    if (quantity > 0) {
                                        setQuantity(quantity - 1)
                                    }
                                }}
                                variant="contained"
                                size="small"
                                disabled={quantity <= 1}
                            >
                                -
                            </Button>

                            <Button variant="outlined" size="small">
                                {quantity}
                            </Button>
                            <Button
                                onClick={() => {
                                    setQuantity(quantity + 1)
                                }}
                                variant="contained"
                                size="small"
                            >
                                +
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    <span className="text-sm">
                        Nhập mã DMX100 giảm 3% tối đa 100.000đ khi thanh toán
                        quét QRcode qua App của ngân hàng
                    </span>
                </div>
                <Button
                    onClick={handleAddToCart}
                    style={{ width: "100%", marginTop: "8px" }}
                    variant="contained"
                    color="primary"
                >
                    <span className="text-[12px] sm:text-[14px] text-white" onClick={handleCloseModal}>
                        Thêm vào giỏ hàng
                    </span>
                </Button>
            </div>
        </ThemeProvider>
    )
}

export default Cart
