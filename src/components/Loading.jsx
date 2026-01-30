import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Loading = () => {
    return (
        <SkeletonTheme baseColor="#e3f2fd" highlightColor="#e9edc9" borderRadius={20}>
            <div>


                <div className="container" >
                   <Skeleton height={400}/>
                </div>
            </div>
        </SkeletonTheme>

    )
}

export default Loading
