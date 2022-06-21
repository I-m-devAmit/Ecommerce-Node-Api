const mongoose = require('mongoose');



mongoose.connect("mongodb+srv://amitecomweb:Amit2106@cluster0.crv3c.mongodb.net/ecommerce?retryWrites=true&w=majority")
.then(()=> console.log("Connection Established Successfully"))
.catch(err => console.log("Error"));





