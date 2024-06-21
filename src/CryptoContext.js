import React, { createContext, useContext, useEffect, useState } from 'react'

const Crypto = createContext();

const CryptoContext = ({ children }) => {

    const [currency, setCurrency] = useState("PKR");
    const [symbol, setSymbol] = useState("Rs");

    useEffect(() => {
      
        if (currency === "INR") setSymbol("₹");
        else if (currency === "USD") setSymbol("$");
        else if (currency === "PKR") setSymbol("Rs");
      
    }, [currency])
    

  return (
    <Crypto.Provider value={{currency, symbol, setCurrency}}>
        { children }
    </Crypto.Provider>
  )
}

export default CryptoContext

export const CryptoState = () => {
    return useContext(Crypto);
}