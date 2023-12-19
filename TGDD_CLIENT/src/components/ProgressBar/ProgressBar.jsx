import { Skeleton } from '@mui/material';

const ProgressBar = ({ text, conditionQuantity, cartItemQuantity, onClick, notify, loading }) => {
    conditionQuantity = conditionQuantity || cartItemQuantity
    return (
        <div className={`h-[40px] bg-[#FFF5C2] rounded-xl relative overflow-hidden`}>
            <div className={`h-full bg-[#ffd500] rounded-xl px-5 inline-flex transition-all duration-300 items-center si:text-xs`}
                style={{ width: notify ? '100%' : `${cartItemQuantity / conditionQuantity * 100}%`, backgroundColor: notify ? '#9ADE7B' : '#ffd500' }}>
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between text-base px-3 lg:text-base si:text-xs">
                {loading&&!notify ?
                    <Skeleton style={{ width: `${cartItemQuantity / conditionQuantity * 95}%`} } variant='text' animation="wave" /> :
                    <p>{text}</p>
                }
                <button disabled={loading} className='px-2 rounded-xl hover:bg-[#aa9a4a7f]' onClick={onClick}>Show all</button>
            </div>
            
        </div>
    );
}

export default ProgressBar