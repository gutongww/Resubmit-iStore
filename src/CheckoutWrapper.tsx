import React from 'react'
import Checkout from './Components/Checkout'

interface CheckoutWrapperProps {
    isModalVisible: boolean;
    onBackdropClick: ()=> void;
}

const CheckoutWrapper : React.FC<CheckoutWrapperProps> = ({onBackdropClick, isModalVisible}) => {
    if (!isModalVisible){
        return null
    }
    return (<Checkout onBackdropClick = {onBackdropClick} />);
}

export default CheckoutWrapper