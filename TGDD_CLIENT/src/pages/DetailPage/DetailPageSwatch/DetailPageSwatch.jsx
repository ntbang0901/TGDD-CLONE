import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
    GET_ALL_PRODUCT,
    GET_CART_SAGA,
    GET_DATA_SWATCH_PAGE_SAGA,
} from "../../../redux/sagas/types/main"
import BannerProducts from "../global/BannerProducts"
import Slider from "../global/Slider"
import TitleProduct from "../global/TitleProduct"
import Brand from "./Brand"
function DetailPageSwatch(props) {
    const { dataSwatchPage } = useSelector((state) => state.page)
    const { products } = useSelector((state) => state.product)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({
            type: GET_ALL_PRODUCT,
        })
       
        let {idUser} = JSON.parse(localStorage.getItem("user"))
        dispatch({
            type: GET_CART_SAGA,
            idUser
        })
    }, [dispatch])

    // console.log("products: ->> ", products)
    // console.log("dataSwatchPage: ->> ", dataSwatchPage)
    let finalIndex = dataSwatchPage.length - 1
    return (
        <div className="bg-[#f3f3f3]">
            {/* <Brand />
            <div className="px-2 lg:px-16">
                <TitleProduct
                    title={dataSwatchPage[finalIndex]?.titleEvents}
                    products={dataSwatchPage[finalIndex]?.productSwatchEvents}
                    id={"hot-deal"}
                />
            </div>
            <div className="px-2 lg:px-16 sm:block hidden">
                <Slider sliders={dataSwatchPage[finalIndex]?.sliders} />
            </div> */}
            <div className="px-2 lg:px-16 bg-gray-900 py-4 my-4">
                <BannerProducts
                    urlFilter="/swatch"
                    banner={dataSwatchPage[finalIndex]?.bannerSwatch}
                    products={products}
                    colorBtn={"#ffd400"}
                    id=""
                />
            </div>
        </div>
    )
}

export default DetailPageSwatch
