import CancelPresentationRoundedIcon from "@mui/icons-material/CancelPresentationRounded";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_ALERT } from "../../redux/reducers/types/mainType";
import {
  ADD_TO_CART_SAGA,
  DELETE_CART_SAGA,
  EDIT_CART_SAGA,
} from "../../redux/sagas/types/main";
import ProgressBar from "./../../components/ProgressBar/ProgressBar";

import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { useDebounce } from "../../utils/Hooks/useDebounce";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const ProductCart = ({ item, itemPromotion }) => {
  const dispatch = useDispatch();
  const [itemQuantity, setItemQuantity] = useState(item.quantity)
  let quantityDebounce = useDebounce(itemQuantity, 300);
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(
    () => {
      let data = {
        idUser: user._id,
        productId: item.product.productId,
        idCart: item.cartId,
        quantity: quantityDebounce,
      }
      checkPromotion(data?.quantity, 0);
      dispatch({
        type: ADD_TO_CART_SAGA,
        data
      })
    }, [quantityDebounce]
  )

  const [notify, setNotify] = useState("");



  const checkPromotion = (quantity, index) => {
    console.log("quantity :: ", quantity);


    if (quantity === itemPromotion[index]?.promotionItems[0]?.quantity) {
      setNotify(
        `Yay! Bạn đã tiết kiệm được ${itemPromotion[
          index
        ]?.discountValue.toLocaleString("en-US", {
          currency: "USD",
        })}đ`
      );
      setTimeout(() => {
        setNotify('')
      }, 1500)
    }
  };



  return (
    <div className="border-[1px] border-gray-300 mt-5 rounded-xl shadow-xl">
      {itemPromotion[0]?.soLuongMuaThem ? (
        <>
          <ProgressBar
            text={
              notify === '' ?
                `Mua thêm ${itemPromotion[0]?.soLuongMuaThem
                } sản phẩm để được giảm ${itemPromotion[0]?.discountValue.toLocaleString(
                  "en-US",
                  {
                    currency: "USD",
                  }
                )} ${itemPromotion[0]?.discountType === "percentage" ? "%" : "đ"
                } `
                : notify}
            item={
              itemPromotion[0]?.promotionItems[0]?.quantity -
              itemPromotion[0]?.soLuongMuaThem
            }
            itemQuantity={itemPromotion[0]?.promotionItems[0]?.quantity}
            onClick={handleClickOpen}
            notify={notify}
          />
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

              <ul>
                {itemPromotion.map((p, index) => (
                  <li
                    className="p-2 hover:cursor-pointer flex justify-between items-center"
                    key={index}
                  >
                    <span className="text-[12px] sm:text-[14px] ml-2">
                      {`Mua thêm ${p?.soLuongMuaThem
                        } sản phẩm để được giảm ${p?.discountValue.toLocaleString(
                          "en-US",
                          {
                            currency: "USD",
                          }
                        )}`}{" "}
                      {p?.discountType === "percentage" ? "%" : "đồng"}
                    </span>
                    <button
                      className="hover:bg-[#ccc] p-2 rounded-md"
                      onClick={async () => {
                        let data = {
                          idUser: user._id,
                          idCart: item._id,
                          productId: item?.product.productId,
                          quantity: p?.promotionItems[0].quantity,
                        };
                        checkPromotion(data?.quantity, index);
                        dispatch({
                          type: ADD_TO_CART_SAGA,
                          data,
                        });
                        handleClose();
                      }}
                    >
                      Chọn
                    </button>
                  </li>
                ))}
              </ul>
            </DialogContent>
          </BootstrapDialog>
        </>
      ) : null}
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
                  });
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
                  setItemQuantity(itemQuantity - 1)
                }
              }}
              className={`border-[1px] ${item.quantity === 1 ? "bg-gray-100" : ""
                }  text-red-500 font-semibold py-1 px-2 rounded-sm`}
            >
              -
            </button>
            <button className=" border-[1px] text-black py-1 px-2 rounded-sm">
              {itemQuantity}
            </button>

            <button
              onClick={async () => {
                setItemQuantity(itemQuantity + 1)
                let data = {
                  idUser: user._id,
                  productId: item.product.productId,
                  idCart: item.cartId,
                  quantity: item.quantity + 1,
                };


              }}
              className=" border-[1px] font-semibold text-minLink py-1 px-2 rounded-sm"
            >
              +
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductCart;
