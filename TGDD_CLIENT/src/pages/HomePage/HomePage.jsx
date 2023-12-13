import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import DetailPageSwatch from "../DetailPage/DetailPageSwatch/DetailPageSwatch"

function HomePage(props) {
    const dispatch = useDispatch()
    const { dataHomePage } = useSelector((state) => state.page)
    let finalIndexDataHomePage = dataHomePage.length - 1

    useEffect(() => {}, [dispatch])
    return (
        // <div className="bg-[#f3f3f3]">
        //     <Banner
        //         banner={dataHomePage[finalIndexDataHomePage]?.firstBanner}
        //     />
        //     <div className="hidden sm:block -translate-y-24 px-2 sm:px-16  md:-translate-y-32">
        //         <Slider
        //             sliders={dataHomePage[finalIndexDataHomePage]?.firstSliders}
        //         />
        //     </div>
        //     <div className="translate-y-2 sm:-translate-y-32 px-2 lg:px-16">
        //         <PromoteOption />
        //     </div>
        //     <div className="translate-y-4 sm:-translate-y-24 px-2 lg:px-16">
        //         <div className="hidden sm:block pl-2">
        //             <Light />
        //         </div>
        //         <BannerProductSlider
        //             backgroundColor="#ffd400"
        //             id=""
        //             banner={dataHomePage[finalIndexDataHomePage]?.saleBanner}
        //             products={
        //                 dataHomePage[finalIndexDataHomePage]?.productSales
        //             }
        //         />
        //     </div>
        //     <div className="translate-y-8  sm:-translate-y-16 px-2 lg:px-16">
        //         <TitleBannerProduct
        //             title={dataHomePage[finalIndexDataHomePage]?.titleEvents}
        //             banner={dataHomePage[finalIndexDataHomePage]?.bannerEvents}
        //             products={
        //                 dataHomePage[finalIndexDataHomePage]?.productEvents
        //             }
        //         />
        //     </div>
        //     <div className="translate-y-12 sm:-translate-y-8 px-2 lg:px-16">
        //         <Trend
        //             products={
        //                 dataHomePage[finalIndexDataHomePage]?.productTrends
        //             }
        //         />
        //     </div>
        //     <div className="translate-y-16 sm:-translate-y-4 px-2 lg:px-16">
        //         <HotCategory />
        //     </div>
        //     <div className="translate-y-20 sm:translate-y-0 px-2 lg:px-16">
        //         <SaleOnline
        //             sliders={
        //                 dataHomePage[finalIndexDataHomePage]?.sliderPayOnlines
        //             }
        //         />
        //     </div>
        //     <div className="translate-y-24 sm:translate-y-0 px-2 lg:px-16">
        //         <Recommend
        //             products={
        //                 dataHomePage[finalIndexDataHomePage]?.productRecommends
        //             }
        //         />
        //     </div>
        //     <div className="mt-[5rem] sm:mt-0 px-0 sm:-translate-y-4 lg:px-16">
        //         <Brand
        //             sliders={dataHomePage[finalIndexDataHomePage]?.sliderBrands}
        //         />
        //     </div>
        //     <div className="hidden lg:px-16 sm:block">
        //         <NewHotDeal
        //             sliders={dataHomePage[finalIndexDataHomePage]?.sliderDeals}
        //         />
        //     </div>
        // </div>
        <DetailPageSwatch />
    )
}

export default HomePage
