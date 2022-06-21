const express = require('express');
const userRouter = require('./routers/user')
const itemRouter = require('./routers/item')
const cartRouter = require('./routers/cart')
require("./db/mongoose");

var port = process.env.PORT || 3000; //PORT NUMBER

const app = express()
app.use(express.json())
app.use(userRouter)
app.use(itemRouter)
app.use(cartRouter)


app.listen(port , () => {
    console.log(`Server listening on port ${port}`);
})

