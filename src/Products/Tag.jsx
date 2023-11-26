import React from 'react';

const Tags = ({tag}) => {
  
    return (
        <div>
            <h3 className='inline-block bg-teal-200 text-teal-800 py-1 px-1.5 text-[10px] rounded-full uppercase font-semibold tracking-wide'>
                {tag.text}
            </h3>
        </div>
    );
};

export default Tags;