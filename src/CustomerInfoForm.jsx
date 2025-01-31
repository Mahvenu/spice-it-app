import React, { useState } from "react";
import axios from 'axios'

const CustomerInforForm = () => {
    cons[customerInfo, setCustomerInfo] = useState({
        customerName: '',
        phoneNumber: '',
        address: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (e) => {
        const { customerName, value } = e.target;
        setCustomerInfo({
            ...customerInfo,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const response = await axios.post('https://y9y5qfpgt8.execute-api.us-east-2.amazonaws.com/getAllCustomers', customerInfo);
            if (response.status == 200) {
                alert('Customer Info saved Successfully!');
                setCustomerInfo({ name: '', phoneNumber: '', address: '' });
            }
        } catch (error) {
            setErrorMessage('There was an error saving the customer info');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Cusomer Information</h2>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={customerInfo.customerName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={customerInfo.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={customerInfo.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>

        </div>
    );
}

export default CustomerInfoForm