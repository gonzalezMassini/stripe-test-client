import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm.js'
import React, { useState, useEffect } from "react";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";



// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51KAo2HDhrjzxPiXMeZepdOserC9kTHfqaLmStEYY5lEhApFBTFAT94f4X9mexeIppGSkN7dJdWtAw4g8olRL4s6r00jahQQKln'
);

function App() {
  const [clientSecret, setClientSecret] = useState("");
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }



  // useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    // const url = "localhost:4242"
    // try {
    //   fetch(url +  "/create-payment-intent", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json",'Access-Control-Allow-Origin':'*' },
    //     body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    //     mode: 'cors',
    //   })
    //   .then((res) => res.json())
    //   .then((data) => setClientSecret(data.clientSecret));
    // } catch (error) {
    //   console.log(error)
    // }
  // }, []);

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  const handleCheckout=()=>{
    fetch("https://stripe-test-client.herokuapp.com/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
      console.error(e.error)
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
    </div>
  );
}

export default App;
