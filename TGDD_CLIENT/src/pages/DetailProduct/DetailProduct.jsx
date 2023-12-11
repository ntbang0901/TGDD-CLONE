import { createTheme, ThemeProvider } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import { GET_DETAIL_PRODUCT_SAGA } from "../../redux/sagas/types/main"
import ContentLeft from "./ContentLeft"
import ContentRight from "./ContentRight"
import Title from "./Title"
import axios from "axios"
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
    console.log(productDetail)
    const [cartPromotion, setCartPromotion] = useState([])
    const [itemPromotion, setItemPromotion] = useState([])

    useEffect(() => {
        const getKMTN = async () => {
            const response = await axios.get(
                `http://localhost:8080/promotion/product-suggest-promotion/${productDetail.productId}`
            )

            setItemPromotion(response.data.productPromotion)
        }
        if (productDetail.productId) {
            getKMTN()
        }
    }, [productDetail])

    useEffect(() => {
        const arrPathName = location.pathname.split("/")
        if (arrPathName[1] && arrPathName[2]) {
            const category = arrPathName[1]
            const _id = arrPathName[2]
            dispatch({
                type: GET_DETAIL_PRODUCT_SAGA,
                category,
                _id,
            })
        }
    }, [dispatch, location.pathname])
    return (
        <ThemeProvider theme={theme}>
            <div className="px-4 sm:px-12 py-4">
                <Title
                    name={productDetail?.name}
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
                            images={productDetail?.images}
                            name={productDetail?.name}
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
                        />
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default DetailProduct
