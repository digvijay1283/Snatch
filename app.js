const express = require('express');
const app = express();
const db = require('./config/mongoose-connection');
const ownersRouter = require('./routes/ownersRouter');
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const indexRouter = require('./routes/index');
const cookieparser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieparser());
app.set('view engine','ejs');





app.use('/owners',ownersRouter);
app.use('/users',usersRouter);
app.use('/products',productsRouter);
app.use('/',indexRouter)




app.listen(3000);


























// app.get("/index",(req,res)=>{
//     res.render('index', { error: "" });
// });
// app.get("/admin",(req,res)=>{
//     res.render('admin');
// });
// app.get("/cart",(req,res)=>{
//     res.render('cart');
// });
// app.get("/createproducts",(req,res)=>{
//     res.render('createproducts');
// });
// app.get("/ownerlogin",(req,res)=>{
//     res.render('owner-login');
// });
// app.get("/shop",(req,res)=>{
//     res.render('shop');
// });
// app.get("/",(req,res)=>{
//     res.redirect('/index');
// });