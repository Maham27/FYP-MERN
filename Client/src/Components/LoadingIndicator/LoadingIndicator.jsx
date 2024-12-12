import React from 'react'
import './style/loadingIndicator.css'
import {AiOutlineLoading3Quarters} from 'react-icons/ai'

const LoadinIndicator = () => {
    return (
        <div className = 'Loading__indicator'>
            <AiOutlineLoading3Quarters  className = 'Loading__indicator__icon'/>
        </div>
    )
}

export default LoadinIndicator


