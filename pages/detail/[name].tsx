import router  from 'next/router'
import React from 'react'

interface Props {
    
}

const Detail = (props: Props) => {
    return (
        <div onClick={() => router.back()}>
            detail page
        </div>
    )
}

export default Detail
