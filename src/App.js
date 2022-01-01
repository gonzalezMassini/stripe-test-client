import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm.js'
import React, { useState, useEffect } from "react";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
import { getProduct, getPrices, getProducts } from "./api";



// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51KAo2HDhrjzxPiXMeZepdOserC9kTHfqaLmStEYY5lEhApFBTFAT94f4X9mexeIppGSkN7dJdWtAw4g8olRL4s6r00jahQQKln'
);

function App() {
  const [clientSecret, setClientSecret] = useState("");
  const { isAuthenticated, isLoading } = useAuth0();
  // const [products, setProducts] = useState()
  const [prices, setPrices] = useState([])

  const getSingleProduct=async(id)=>{
    const response = await getProduct(id)
    console.log(response)
    const product = response.data
    return product
  }

  const getAllPrices=async()=>{
    const response = await getPrices()
    const products = await getProducts()
    const prices = response.data
    const prods = products.data

    let newPrices = prices.map(price=>{
      let prod  = prods.filter((prod)=>price.product === prod.id)[0]
      price = {...price, productInfo: prod}
      return price
    })
    setPrices(newPrices)
  }

  useEffect(()=>{
    getAllPrices()
  },[])

  if (isLoading) {
    return <div>Loading ...</div>;
  }


  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };


  const handleCheckout=()=>{
    fetch(process.env.STRIPE_SERVER +"/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",'Access-Control-Allow-Origin':'*',
    },
    body: JSON.stringify({
      items: [
        { id: 1, quantity: 3 },
        { id: 2, quantity: 1 },
      ],
    }),
  }).then(res => {
      if (res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    })
    .then(({ url }) => {
      window.location = url
    })
    .catch(e => {
      console.error(e)
    })
  }

  return (
    <div className="App">
      <LoginButton/>
      <LogoutButton/>
      <Profile/>
      {isAuthenticated && <button onClick={handleCheckout}>check out</button>}
      {isAuthenticated && (clientSecret && (
        <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        ))
      }

      {
        isAuthenticated && (
          prices.map((price)=>{
            console.log(price)
            return(
              <div>
                {price.active ? (<><p>{price.productInfo.name}</p>
                <img width={75} height={75} src={price.productInfo.images[0]}/>
                <p>{(price.unit_amount)/100}</p></>):null}
              </div>
            )
          })
        )
      }
    </div>
  );
}

export default App;
