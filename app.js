const express = require('express');
const app = express();


const cookieparser = require('cookie-parser');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieparser());
app.set('view engine','ejs');

app.get("/",(req,res)=>{
    res.send('heyy');
});

app.listen(3000);