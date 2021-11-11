import React, { useEffect, useState } from "react";
import facade from "../apiFacade";
import { Server_URL } from "./Urls";


function handleHttpErrors(res) {
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() });
    }
    return res.json();
  }

const BuyCoins = () =>{
    const emptyCoin = {name:"", amount:"",buyPrice:""};

    const [selectedCoin,setSelectedCoin] = useState(emptyCoin);
    
    
    const handleChange = (evt) => {
        setSelectedCoin({ ...selectedCoin, [evt.target.id]: evt.target.value });
      };


      const handleSubmit = (evt) => {
        evt.preventDefault();
        const options = facade.makeOptions("POST", true, selectedCoin);
        fetch(Server_URL + "/api/coin/createOrder", options).then((res) =>
          handleHttpErrors(res)
        );
      };


    return(<>
        <div className="form-group" onSubmit={handleSubmit}
        onChange={handleChange}>
          <label htmlFor="coinName">CoinName</label>
          <input type="text" id="CoinName" name="CoinName" ></input>
          <label htmlFor="Amount">Amount</label>
          <input type="number" id="Amount" name="Amount" ></input>
          <label htmlFor="buyPrice">loot</label>
          <input type="number" id="buyPrice" name="buyPrice" ></input>

          <button type="submit" className="btn btn-success" id="buy">Buy</button>
        </div>
    </>);
};

export default BuyCoins;