import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import ModeIcon from "@mui/icons-material/Mode"
import StarOutlineIcon from "@mui/icons-material/StarOutline"
import { Button, Pagination } from "@mui/material"
import { memo, useState } from "react"
import { useDispatch } from "react-redux"
import Comment from "../../../components/Comment/Comment"
import { OPEN_MODAL_HOC } from "../../../redux/reducers/types/mainType"
import {
    CREATE_COMMENT_SAGA,
    GET_COMMENT_SAGA
} from "../../../redux/sagas/types/main"

function Comments(props) {
    const dispatch = useDispatch()
    const { images, name, id, category, user, isLogin, comments } = props
    const [showPaginate, setShowPaginate] = useState(false)

    const renderStar = (quantity) => {
        let jsx = []
        for (let i = 0; i < quantity; i++) {
            jsx.push(
                <StarOutlineIcon
                    key={i}
                    style={{ fontSize: "18px" }}
                    className="text-orange-600"
                />
            )
        }
        return jsx
    }
    const renderComment = () => {
        return <p className="text-center mt-2 text-xl">Không có đánh giá nào</p>
        
    }

    const renderRateEvaluate = () => {
        let jsx = []
        for (let i = 5; i >= 1; i--) {
            jsx.push(
                <div className="my-2" key={i}>
                    <div className="flex gap-1 items-center">
                        <span className="text-[16px]">{i}</span>
                        <StarOutlineIcon style={{ fontSize: "16px" }} />
                        <span
                            style={{ width: `${i + 2}0%` }}
                            className={`h-[5px] rounded-sm block bg-orange-500`}
                        ></span>
                    </div>
                </div>
            )
        }
        return jsx
    }

    return (
        <>
            <h1 className="font-semibold text-xl text-center sm:text-left sm:text-xl my-2 text-struncate">
                Đánh giá {name}
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 border-b-[1px] pb-4">
                <div className="col-span-1 lg:border-r-[1px]">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-orange-600 text-2xl">
                            4.0
                        </span>
                        <span className="font-semibold flex gap-1 items-center">
                            {renderStar()}
                        </span>
                        <span className="">
                            {comments?.total || 0} đánh giá
                        </span>
                    </div>
                    {renderRateEvaluate()}
                </div>
            </div>

            {renderComment()}

            <div className="py-4 flex-col items-center flex flex-wrap gap-2 justify-center">
                <div className="flex items-center flex-col gap-2">
                    <Button
                        onClick={() => {
                            setShowPaginate(true)
                        }}
                        variant="outlined"
                        color="primary"
                    >
                        <span className="text-center text-[10px] si:text-sm">
                            <ArrowRightIcon className="" />
                            Xem thêm đánh giá
                        </span>
                    </Button>
                </div>
                <Button
                    onClick={() => {
                        dispatch({
                            type: OPEN_MODAL_HOC,
                            ComponentContentModal: (
                                <Comment
                                    action={CREATE_COMMENT_SAGA}
                                    value=""
                                    category={category}
                                    firstImage={images}
                                    idProduct={id}
                                    user={user}
                                    isLogin={isLogin}
                                    name={name}
                                />
                            ),
                        })
                    }}
                    variant="contained"
                    color="primary"
                >
                    <span className="text-center text-[10px] si:text-sm">
                        <span className="hidden si:inline-block mr-2">
                            <ModeIcon />
                        </span>
                        Viết đánh giá
                    </span>
                </Button>
                {showPaginate && (
                    <Pagination
                        onChange={(e, page) => {
                            dispatch({
                                type: GET_COMMENT_SAGA,
                                data: {
                                    idProduct: id,
                                    page: page,
                                },
                            })
                        }}
                        count={
                            comments?.total ? Math.ceil(comments.total / 10) : 0
                        }
                        variant="outlined"
                        color="primary"
                    />
                )}
            </div>
        </>
    )
}

export default memo(Comments)
