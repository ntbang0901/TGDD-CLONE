import CheckIcon from "@mui/icons-material/Check";
import LocalAirportOutlinedIcon from "@mui/icons-material/LocalAirportOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import { Button } from "@mui/material";
import _, { forEach } from "lodash";
import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SimpleSkeleton from "../../components/Skeleton/SimpleSkeleton";
import { OPEN_MODAL_HOC } from "../../redux/reducers/types/mainType";
import {
  dataKeyAcessory,
  dataKeyLaptop,
  dataKeyPC,
  dataKeySmartphone,
  dataKeySwatch,
  dataKeyTablet,
  selectColor,
  selectStorageLaptop,
  selectStoragePC,
  selectStorageSmartPhone,
  selectStorageTablet,
} from "../../utils/Settings/data";
import Cart from "./Other/Cart";
function ContentRight(props) {
  const {
    productDetail,
    category,
    isLogin,
    user,
    itemPromotion,
    productPayload,
    selectedProduct,
    promotionMap,
  } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [steps, setStep] = useState({
    stepsItems: [],
    currentStep: 0,
  });
  const [progressValue, setProgressValue] = useState();

  useEffect(() => {
    calculateProductInCart();
  }, [selectedProduct, promotionMap]);

  function calculateProductInCart() {
    if (selectedProduct !== undefined && promotionMap.length !== 0) {
      const { quantity } = selectedProduct;

      console.log("quantity: ", quantity);
      console.log("step: ", calculateWhichStep(quantity));

      if (
        quantity >=
        promotionMap[promotionMap.length - 1].promotionItems[0].quantity
      ) {
        setProgressValue(97);
        return;
      }

      if (calculateWhichStep(quantity) > 1) {
        const borderRight =
          promotionMap[calculateWhichStep(quantity) - 1].promotionItems[0]
            .quantity;
        const borderLeft =
          promotionMap[calculateWhichStep(quantity) - 2].promotionItems[0]
            .quantity;
        const distance = borderRight - borderLeft;

        console.log("distance: ", distance);
        console.log("borderRight: ", borderRight);
        console.log("borderLeft: ", borderLeft);

        const valueSet =
          ((calculateWhichStep(quantity) - 1) * calculatePagePerStep() +
            (1 / distance) * (quantity - borderLeft) * calculatePagePerStep()) *
          100;
        console.log(
          "value set: ",
          (calculateWhichStep(quantity) - 1) * calculatePagePerStep(),
          "+",
          (1 / distance) * (quantity - borderLeft) * calculatePagePerStep(),
          "* 100 = ",
          valueSet
        );
        ifValueMaxOut(valueSet);
      } else {
        const maxValue =
          promotionMap[calculateWhichStep(quantity) - 1].promotionItems[0]
            .quantity;

        console.log("maxValue: ", maxValue);
        const valueSet =
          (quantity / maxValue) *
          100 *
          (calculatePagePerStep() * calculateWhichStep(quantity));
        console.log("value set: ", valueSet);
        ifValueMaxOut(valueSet);
      }
    } else {
      setProgressValue(0);
    }
    setStep({ stepsItems: promotionMap, currentStep: 2 });
  }

  function ifValueMaxOut(valueSet) {
    if (valueSet >= 97) {
      setProgressValue(97);
      setStep({ stepsItems: promotionMap, currentStep: 4 });
      return;
    } else {
      setProgressValue(valueSet);
      return;
    }
  }
  function calculateLength() {
    return promotionMap.length;
  }

  function calculatePagePerStep() {
    switch (calculateLength()) {
      case 1:
        return 1;
      case 2:
        return 1 / 2;
      case 3:
        return 1 / 3;
      default:
        return 1;
    }
  }

  function calculateWhichStep(quantity) {
    for (let index = 0; index < promotionMap.length; index++) {
      const element = promotionMap[index];
      if (element.promotionItems[0].quantity > quantity) {
        return index + 1;
      }
    }
    return promotionMap.length + 1;
  }

  function archivedStep() {
    if (progressValue >= 97)
    {
      return calculateLength() - 1;
    }
    const realStep = Math.floor(progressValue / (calculatePagePerStep() * 100))
    console.log("calcu: ", progressValue, "/", calculatePagePerStep(), "*", 100, "=", realStep)
    return realStep;
  }

  console.log("archivedStep: ", archivedStep())

  const renderStaticItem1 = () => {
    return !_.isEmpty(productDetail) ? (
      <>
        <div className="my-2 rounded-sm border-[1px]">
          <div className="bg-gray-200 px-2 py-2">
            <h1 className="font-semibold sm:text-left text-center text-base">
              Khuyến mãi sắp đạt được
            </h1>
            <p className="text-[12px] sm:text-[14px] sm:text-left text-center">
              Giá và khuyến mãi dự kiến áp dụng đến khi hết sản phẩm
            </p>
          </div>
          <div>
            <ul
              className={` ${
                !open && promotionMap.length > 3
                  ? "h-[115px] overflow-hidden"
                  : ""
              } transition duration-150 ease-out `}
            >
              {promotionMap.map((p, index) => (
                <li className="p-2" key={index}>
                  <span className="bg-red-600 p-1 rounded-sm text-[12px] text-white">
                    HOT
                  </span>
                  <span className="text-[12px] sm:text-[14px] ml-2">
                    {`Mua từ ${
                      p.additionalQuantity
                    } sản phẩm được giảm ${p.discountValue.toLocaleString(
                      "en-US",
                      {
                        currency: "USD",
                      }
                    )}${
                      promotionMap[index]?.discountType === "percentage"
                        ? "%"
                        : " đồng"
                    }`}
                  </span>
                </li>
              ))}
            </ul>
            {promotionMap.length > 3 && (
              <Button onClick={() => setOpen(!open)}>
                {open ? "Thu gọn" : "Xem thêm"}
              </Button>
            )}
          </div>

          <div className="border-dashed border-t-[1px] py-2 border-gray-300 px-2">
            <p className="text-[12px] sm:text-[14px]">
              <span className="text-red-600">(*)</span> Giá và khuyến mãi dự
              kiến áp dụng đến khi hết sản phẩm
            </p>
          </div>
        </div>

        {/*progress bar*/}
        {console.log("selectedProduct:-->right ", selectedProduct)}
        {console.log("itemPromotion:-->right ", itemPromotion)}
        {console.log("promotionMap:-->right ", promotionMap)}

        {console.log(
          "Math: ",
          Math.floor(progressValue / (calculatePagePerStep() * 100))
        )}

        {promotionMap.length !== 0 ? (
          <div className="max-w-screen-xl mx-auto px-4 md:px-8 my-auto rounded-sm border-[1px] min-w-fit">
            <div className="pt-2">
              <span id="ProgressLabel" className="sr-only">
                Loading
              </span>

              <span
                role="progressbar"
                aria-labelledby="ProgressLabel"
                aria-valuenow="75"
                className="block relative rounded-full bg-gray-200"
              >
                <span
                  style={{ "--progress-width": `${progressValue}%` }}
                  className="block h-3 rounded-full bg-[repeating-linear-gradient(45deg,_var(--tw-gradient-from)_0,_var(--tw-gradient-from)_20px,_var(--tw-gradient-to)_20px,_var(--tw-gradient-to)_40px)] from-indigo-400 to-indigo-500 w-[var(--progress-width)]"
                ></span>
                {promotionMap.map((item, idx) => (
                  <span
                    key={idx}
                    style={{
                      "--leftForStep": `calc(${Math.min(
                        (idx + 1) * (100 / promotionMap.length),
                        97
                      )}%)`,
                    }}
                    className={(idx === (archivedStep())
                        ? `has-tooltip absolute left-[var(--leftForStep)] top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 rounded-full h-4 w-4 ${progressValue === 97 ? 'bg-blue-500 border-white' : 'bg-white border-indigo-500'}`
                        : `hover-tooltip absolute left-[var(--leftForStep)] top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 rounded-full h-4 w-4 ${idx < archivedStep() ? 'bg-blue-500 border-white' : 'bg-white border-indigo-500'}`) 
                    }
                  >
                    <p
                      style={{
                        "--leftForStep": `calc(${Math.min(
                          (idx + 1) * (100 / promotionMap.length),
                          97
                        )}%)`,
                      }}
                      className="tooltip absolute left-[var(--leftForStep)] top-[80%] transform -translate-x-1/2 -translate-y-1/2 rounded shadow-lg p-1 bg-gray-100 text-red-500 mt-8 min-w-max"
                    >
                      {`Mua từ ${
                        item.additionalQuantity
                      } sản phẩm được giảm ${item.discountValue.toLocaleString(
                        "en-US",
                        {
                          currency: "USD",
                        }
                      )}${
                        promotionMap[0]?.discountType === "percentage"
                          ? "%"
                          : " đồng"
                      }`}
                    </p>
                  </span>
                ))}
              </span>
            </div>
            <div aria-label="Steps" className=" text-gray-600 flex">
              {steps.stepsItems.map((item, idx) => (
                <div
                  key={idx}
                  aria-current={steps.currentStep === idx + 1 ? "step" : false}
                  className="flex-1 flex-col"
                >
                  <div className="md:mt-2 flex justify-end">
                    <p
                      className={`text-sm ${
                        steps.currentStep > idx + 1 ? "text-indigo-600" : ""
                      }`}
                    >
                      KM {idx + 1}
                    </p>
                    {/* <p className="mt-1">{item.promotionName}</p> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="my-2">
          <p>
            <LocalAirportOutlinedIcon style={{ color: "#3f51d5" }} /> Giao hàng
            tận nơi
          </p>
          <p className="my-2 text-teal-700 font-semibold text-[12px] sm:text-[14px]">
            Giao hàng Từ 16h - 18h hôm nay (18/06)
          </p>
          <p className="my-2 text-teal-700 font-semibold text-[12px] sm:text-[14px]">
            Miễn phí giao hàng
          </p>

          <p>
            <StorefrontOutlinedIcon style={{ color: "#3f51d5" }} /> Giao Có hàng
            tại tất các siêu thị
          </p>
        </div>
      </>
    ) : (
      <SimpleSkeleton height={200} />
    );
  };
  const renderStaticItem2 = () => {
    return !_.isEmpty(productDetail) ? (
      <div className="my-2 rounded-sm border-[1px]">
        <div className="bg-gray-200 px-2 py-2">
          <h1 className="font-semibold text-sm sm:text-base">
            3 ưu đãi thêm Dự kiến áp dụng đến 23:00 30/06
          </h1>
        </div>
        <div className="">
          <ul>
            <li className="p-2">
              <span className=" p-1 rounded-sm text-[12px] text-white">
                <CheckIcon
                  className="text-green-500"
                  style={{ fontSize: "12px" }}
                />
              </span>
              <span className="text-[12px] sm:text-[14px] ml-2">
                Tặng cho khách lần đầu mua hàng online tại web
              </span>
            </li>
            <li className="p-2">
              <span className=" p-1 rounded-sm text-[12px] text-white">
                <CheckIcon
                  className="text-green-500"
                  style={{ fontSize: "12px" }}
                />
              </span>
              <span className="text-[12px] sm:text-[14px] ml-2">
                Mã giảm 100.000đ áp dụng đơn hàng từ 400.000đ
              </span>
            </li>

            <li className="p-2">
              <span className="p-1 rounded-sm text-[12px] text-white">
                <CheckIcon
                  className="text-green-500"
                  style={{ fontSize: "12px" }}
                />
              </span>
              <span className="text-[12px] sm:text-[14px] ml-2">
                FREEship đơn hàng từ 300.000đ hoặc thành viên VÀNG
              </span>
            </li>
          </ul>
        </div>

        <div className="border-dashed border-t-[1px] py-2 border-gray-300 px-2">
          <p className="text-[12px] sm:text-[14px]">
            <span className="text-red-600">(*)</span> Dự kiến áp dụng đến khi
            hết sản phẩm
          </p>
        </div>
      </div>
    ) : (
      <SimpleSkeleton height={200} />
    );
  };
  const renderButtonStorage = (value) => {
    let data = [];
    if (category === "smartphone") {
      data = selectStorageSmartPhone;
    } else if (category === "tablet") {
      data = selectStorageTablet;
    } else if (category === "pc") {
      data = selectStoragePC;
    } else if (category === "laptop") {
      data = selectStorageLaptop;
    }
    return data?.map((item, index) => (
      <Button
        disabled={item.value !== value}
        key={index}
        variant="contained"
        size="small"
      >
        {item.name}
      </Button>
    ));
  };
  const renderColor = (arrColor) => {
    const checkColor = (color) => {
      let index = arrColor.findIndex(
        (item, index) => item.colorValue === color
      );
      return index === -1;
    };
    if (
      category === "smartphone" ||
      category === "tablet" ||
      category === "pc" ||
      category === "laptop"
    ) {
      return selectColor.map((item, index) => (
        <Button
          disabled={checkColor(item.value)}
          key={index}
          variant="contained"
          size="small"
        >
          <span className="text-[12px] text-struncate"> {item.name}</span>
        </Button>
      ));
    }
  };

  const renderImages = () => {
    if (category === "swatch" || category === "accessory")
      return (
        <img
          src="https://cdn.tgdd.vn/2022/06/banner/Desk-920x230-920x230-15.png"
          alt=""
        />
      );
  };

  const renderConfiguration = () => {
    let data = [];
    let jsx = [];
    if (category === "smartphone") {
      data = dataKeySmartphone;
    } else if (category === "tablet") {
      data = dataKeyTablet;
    } else if (category === "pc") {
      data = dataKeyPC;
    } else if (category === "laptop") {
      data = dataKeyLaptop;
    } else if (category === "accessory") {
      data = dataKeyAcessory;
    } else if (category === "swatch") {
      data = dataKeySwatch;
    }

    for (let i = 0; i < data.length; i++) {
      jsx.push(
        <li
          key={i}
          className={`flex flex-wrap ${i % 2 !== 0 ? "bg-gray-200" : ""}  p-2`}
        >
          <span className="w-[150px] text-[12px] sm:text-[14px]">
            {data[i].value}:
          </span>
          <span className="text-sm sm:text-base">
            {productDetail[data[i]?.key]
              ? productDetail[data[i]?.key]
              : "Đang cập nhật"}
          </span>
        </li>
      );
    }
    return jsx;
  };

  return (
    <>
      {!_.isEmpty(productDetail) ? (
        <>
          {/* Images */}
          {renderImages()}
          {/* Storage */}
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {renderButtonStorage(productDetail?.storage)}
          </div>
          {/* Colors */}
          <div className="grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-4 my-2  gap-2">
            {renderColor(productDetail?.photo)}
          </div>
        </>
      ) : (
        <SimpleSkeleton height={150} />
      )}

      {/* Price */}
      <div className="flex flex-wrap my-2">
        {productDetail?.price ? (
          <>
            <span className="text-red-600 font-semibold text-2xl">
              {productDetail?.price.toLocaleString("en-US", {
                currency: "USD",
              })}
              đ
            </span>
            {/* <span className="text-gray-400 line-through mx-2">
                            {(productDetail?.price * 1.2).toLocaleString(
                                "en-US",
                                {
                                    currency: "USD",
                                }
                            )}
                            đ
                        </span> */}
            {/* <span className="text-red-600">8%</span> */}
            <span className="px-2 leading-7 bg-gray-300 mx-2 rounded-sm text-black  text-[11px]">
              Trả góp 0%
            </span>
          </>
        ) : (
          <SimpleSkeleton height={20} />
        )}
      </div>
      {renderStaticItem1()}
      {/* Add to cart + Order product */}
      <div className="my-2">
        <Button
          onClick={() => {
            dispatch({
              type: OPEN_MODAL_HOC,
              title: "Thêm vào giỏ hàng",
              ComponentContentModal: (
                <Cart user={user} productDetail={productDetail} />
              ),
            });
          }}
          style={{ width: "100%", marginBottom: "8px" }}
          variant="contained"
          color="primary"
        >
          <span className="text-[12px] sm:text-[14px]">Thêm vào giỏ hàng</span>
        </Button>
        <Button
          onClick={() => {
            if (isLogin) {
              dispatch({
                type: OPEN_MODAL_HOC,
                title: "Thêm vào giỏ hàng",
                ComponentContentModal: (
                  <Cart productDetail={productDetail} user={user} />
                ),
              });
            } else {
              navigate("/login");
            }
          }}
          style={{ width: "100%" }}
          variant="contained"
          color="error"
        >
          <span className="text-[12px] sm:text-[14px]"> Đặt hàng</span>
        </Button>
      </div>
      {renderStaticItem2()}
      {/* Configuration */}
      <div className="my-2">
        {productDetail?.productName ? (
          <h1 className="font-semibold text-base text-center sm:text-left sm:text-xl text-struncate">
            Cấu hình {productDetail?.productName}
          </h1>
        ) : (
          <SimpleSkeleton height={20} />
        )}

        {!_.isEmpty(productDetail) ? (
          <div className="my-2">
            <ul>{renderConfiguration()}</ul>
          </div>
        ) : (
          <SimpleSkeleton height={150} />
        )}
      </div>
    </>
  );
}

export default memo(ContentRight);
