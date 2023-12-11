import React from 'react';

import styled from '@emotion/styled';

const progressCustom = styled.div`
    transition: all 0.3s ease-in-out 0s;
`

const ProgressBar = ({text, itemQuantity, item, onClick  }) => {
    return (
        <div className={`h-[40px] bg-[#FFF5C2] rounded-xl relative`}>
            <div className={`h-full bg-[#ffd500] rounded-xl px-5 inline-flex transition-all duration-300 items-center`} 
                style={{width: `${item/itemQuantity*100}%`}}>
            </div>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between text-base px-3 lg:text-base">
                <p>{text}</p>
            <button className='px-2 rounded-xl hover:bg-[#aa9a4a7f]' onClick={onClick}>Show all</button>
            </div>
        </div>
    );
}

export default ProgressBar;