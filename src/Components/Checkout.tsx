import React, {useState, useRef} from 'react'
import ReactDOM from 'react-dom'
import TextField from './TextField'

interface CheckoutProps{
    onBackdropClick: () => void;
}
    

    const Checkout : React.FC<CheckoutProps> = ({onBackdropClick, children}) => {

        const [val, setVal] = useState("");
        const inputRef = useRef(null);

    return ReactDOM.createPortal (
        <div> 
        <p> haha </p>
        </div>, document.getElementById('Checkout-root')!);
    }

    export default Checkout;
