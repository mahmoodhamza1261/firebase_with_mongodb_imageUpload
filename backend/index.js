const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwtKey = 'e-com'
const app = express();
require("./config");
const Product = require("./Product")
const User = require("./User")
// const connectDB=async()=>{
//   const data=await User.find();
//   console.log(data)
// }
// connectDB();
app.use(cors())
app.use(express.json())



app.get("/products", async (req, resp) => {
  const products = await Product.find();
  if (products.length > 0) {
    resp.send(products)
    console.log(products)
  }
  else {
    resp.send({ result: "No Products Found" })
  }
})
app.post("/products", async (req, resp) => {
  const product = new Product(req.body);
  const result = await product.save();
  resp.send(result)
})



app.listen(8182)










