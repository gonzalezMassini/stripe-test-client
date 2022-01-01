export const getProduct =async(id)=>{
  let product;
  await fetch(`https://api.stripe.com/v1/products/${id}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",'Access-Control-Allow-Origin':'*','Authorization': 'Bearer sk_test_51KAo2HDhrjzxPiXMoTYrFT5mTgtSG8MxzypiD33V7tGaj8UItxYmXDsD7Fm6Hceg3Ro1VQaFnqDT2nR7aGcqhdl800LcBXhQ6i'
  },
}).then(res => {
    if (res.ok) return res.json()
    return res.json().then(json => Promise.reject(json))
  })
  .then((prods) => {
    product = prods
  })
  .catch(e => {
    console.error(e)
  })
  return product
}

export const getProducts =async()=>{
  let products;
  await fetch(`https://api.stripe.com/v1/products`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",'Access-Control-Allow-Origin':'*','Authorization': 'Bearer sk_test_51KAo2HDhrjzxPiXMoTYrFT5mTgtSG8MxzypiD33V7tGaj8UItxYmXDsD7Fm6Hceg3Ro1VQaFnqDT2nR7aGcqhdl800LcBXhQ6i'
  },
}).then(res => {
    if (res.ok) return res.json()
    return res.json().then(json => Promise.reject(json))
  })
  .then((prods) => {
    products = prods
  })
  .catch(e => {
    console.error(e)
  })
  return products
}

export const getPrices =async()=>{
  let prices;
  await fetch("https://api.stripe.com/v1/prices", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",'Access-Control-Allow-Origin':'*','Authorization': 'Bearer sk_test_51KAo2HDhrjzxPiXMoTYrFT5mTgtSG8MxzypiD33V7tGaj8UItxYmXDsD7Fm6Hceg3Ro1VQaFnqDT2nR7aGcqhdl800LcBXhQ6i'
  },
}).then(res => {
    if (res.ok) return res.json()
    return res.json().then(json => Promise.reject(json))
  })
  .then((priceList) => {
    prices = priceList
  })
  .catch(e => {
    console.error(e)
  })
  return prices
}