import React from 'react';
import 'react-loading-skeleton/dist/skeleton.css';
import ColumnSkeleton from './ColumnSkeleton';

const Loading = () => {
    return (
        <div className='loading-skeleton'>
            <ColumnSkeleton number={2} />
            <ColumnSkeleton number={3}/>
            <ColumnSkeleton number={1}/>
            <ColumnSkeleton number={4}/>
            <ColumnSkeleton number={2}/>
        </div>
    );
};

export default Loading;
