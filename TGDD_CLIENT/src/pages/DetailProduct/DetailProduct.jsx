import { createTheme, ThemeProvider } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { GET_DETAIL_PRODUCT_SAGA } from "../../redux/sagas/types/main"
import { GET_CART_SAGA } from "../../redux/sagas/types/main"
import ContentLeft from "./ContentLeft"
import ContentRight from "./ContentRight"
import Title from "./Title"
import axios from "axios"
import { DOMAIN2 } from "../../utils/Settings/global"
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

function DetailProduct(props) {
    const location = useLocation()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    const { isLogin } = useSelector((state) => state.global)
    const { productDetail } = useSelector((state) => state.product)
    console.log("productDetail large page", productDetail)
    const [cartPromotion, setCartPromotion] = useState([])
    const [itemPromotion, setItemPromotion] = useState([])
    const [useablePromotion, setUseablePromotion] = useState([])
    const [promotionMap, setPromotionMap] = useState([])
    const { shoppingCarts, loadingShoppingCart, quantityShoppingCart } = useSelector((state) => state.global)

    useEffect(() => {
        const arrPathName = location.pathname.split("/")
        if (arrPathName[1]) {
            const _id = arrPathName[1]
            dispatch({
                type: GET_DETAIL_PRODUCT_SAGA,
                _id,
            })
        }
    }, [dispatch, location.pathname])

    useEffect(() => {
        document.title = productDetail?.productName

        const getKMTN = async () => {
            const response = await axios.get(
                `${DOMAIN2}/promotions/product-suggest-promotion/${productDetail.productId}`
            )

            setItemPromotion(response.data.productPromotion)
            setUseablePromotion(response.data.useablePromotion)
        }
        if (productDetail.productId) {
            getKMTN()
        }
    }, [productDetail])

    useEffect(() => {
        function filterUniquePromotion() {
            const promotionMapTemp = []
            itemPromotion.forEach((promotion) => {
                // Tạo một đối tượng để lưu trữ thông tin về số sản phẩm và mức giảm giá tương ứng
                const { additionalQuantity, discountValue } = promotion
                // Kiểm tra xem có thông tin về khuyến mãi với số sản phẩm này chưa
                if (
                    !promotionMapTemp[additionalQuantity] ||
                    promotionMapTemp[additionalQuantity].discountValue < discountValue
                ) {
                    // Nếu chưa có hoặc mức giảm giá mới lớn hơn, cập nhật thông tin khuyến mãi
                    promotionMapTemp[additionalQuantity] = promotion
                }
            })
            const newArray = promotionMapTemp?.filter(Boolean)
            setPromotionMap(newArray)
            console.log("promotionMapTemp: ", promotionMapTemp)
            console.log("newArray: ", newArray)
            console.log("promotionMap: ", promotionMap)
        }
        if (itemPromotion?.length) {
            filterUniquePromotion()
        }
    }, [itemPromotion])

    useEffect(() => {
        if (user.idUser) {
            dispatch({
                type: GET_CART_SAGA,
                idUser: user.idUser,
            })
        }
    }, [dispatch, user.idUser])

    const productPayload = shoppingCarts.map((cart) => {
        const obj = {
            quantity: cart.quantity,
            productId: cart.product.productId,
        }

        return obj
    })

    const selectedProduct = productPayload.find((item) => {
        return item.productId === productDetail.productId
    })

    console.log("shoppingCarts: ", shoppingCarts)
    console.log("selectedProduct-->detail", selectedProduct)
    console.log("productPayload-->detail", productPayload)

    return (
        <ThemeProvider theme={theme}>
            <div className="px-4 sm:px-12 py-4">
                <Title
                    name={productDetail?.productName}
                    brand={productDetail?.brand}
                    category={productDetail.category}
                />
                <div className="flex gap-4">
                    <div className="w-[60%] col-span-1">
                        <ContentLeft
                            user={user}
                            isLogin={isLogin}
                            category={location.pathname.split("/")[1]}
                            id={productDetail?._id}
                            idVideo={productDetail?.idVideo}
                            images={productDetail?.photo}
                            name={productDetail?.productName}
                            description={productDetail?.description}
                        />
                    </div>
                    <div className="w-[40%] py-2">
                        <ContentRight
                            itemPromotion={itemPromotion}
                            user={user}
                            isLogin={isLogin}
                            productDetail={productDetail}
                            category={location.pathname.split("/")[1]}
                            selectedProduct={selectedProduct}
                            productPayload={productPayload}
                            useablePromotion={useablePromotion}
                            promotionMap={promotionMap}
                        />
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default DetailProduct
