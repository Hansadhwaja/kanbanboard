import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ColumnSkeleton = ({ number }) => {
    return (
        <div className='skeleton-header'>
            <Skeleton height={25} width={`40%`} />
            {[...Array(number)].map((_, index) => (
                <div className="skeleton-card" key={index}>
                    <Skeleton height={30} width={`10%`} style={{ marginBottom: 10 }} />
                    <Skeleton height={20} width={`90%`} style={{ marginBottom: 5 }} />
                    <Skeleton height={15} width={`40%`} />
                </div>
            ))}
        </div>
    )
}

export default ColumnSkeleton