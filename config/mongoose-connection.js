const mongoose = require('mongoose');
const config = require("config");
// const dbgr = require('debug')("development:monoo")

mongoose.connect(`${config.get('MONGODB_URL')}/Snatch`)
.then(function(){
    console.log('mongo DB connected!!');
})
.catch(function(err){
    console.log(err);
})

module.exports= mongoose.connection;