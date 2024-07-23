const mongoose = require('mongoose');
const express = require('express');
const app =express();
const port = 8080;
app.use(express.static('public'));
app.use(express.json());
app.get('/',function(req, res){
    res.redirect('index.html');
});
mongoose.connect('mongodb://localhost:27017/money_tracker');
mongoose.connection.on('connected', ()=> {
    console.log('connected successfully');
});
mongoose.connection.on('error', (err)=> {
    console.log('error occured', err);
});
const Schema = mongoose.Schema;
const userSchema = new Schema({
    selector : {
        type : String,
        require : true
    },
    info : {
        type : String,
        require : true
    },
    amount : {
        type : Number,
        require : true
    },
    dateFormat : {
        type : Date,
        require : true
    }
});
const User = mongoose.model('datas',userSchema);
app.post('/addData', async (req,res)=>{
    try
    {
        const newData = new User(req.body);
        const user = await newData.save();
        res.status(200).json(user);
        console.log(newData);
    }catch(error) {
        console.log(error);
    }
});
app.listen(port,(err)=>{
    if(err) {
        console.log('Some Error',err);
    }
    console.log(`Server is ready to pair on port ${port}`);
});