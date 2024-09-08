import React, { createContext, useState } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [order, setOrder] = useState({
        cart: [],
        total: 0,
        location: { latitude: null, longitude: null }
    });

    const setOrderDetails = (cart, total, location) => {
        setOrder({ cart, total, location });
    };

    return (
        <OrderContext.Provider value={{ order, setOrderDetails }}>
            {children}
        </OrderContext.Provider>
    );
};
