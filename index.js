const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const fileupload=require('express-fileupload');


const pro=require("./routing/product");

const port=2000;

const app=express();

app.use(cors());

mongoose.connect('mongodb+srv://aritra:a123456@cluster0.r8cvt.mongodb.net/mean_prac?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
        console.log("database connected");
});


app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(fileupload());

app.use(express.static('public'));

app.get('/', (req,res)=>{

res.json({msg:'Submitted'});
});


app.use("/product",pro);


app.listen(port,()=>{
    console.log('start');
});