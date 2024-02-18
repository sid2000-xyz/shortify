const express =require("express");
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/urlshortner')
const shorturl=require("./models/shorturl")

const app=express();
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}))



app.get('/',async(req,res)=>{
      const shorturls= await shorturl.find({})
      res.render('index',{shorturls:shorturls})
})

app.post('/shorturls',async(req,res)=>{
    await shorturl.create({full:req.body.fullurl})
    res.redirect('/')
})

app.get('/:shorturl',async(req,res)=>{
    const shorturl=await shorturl.findOne({short:req.params.shorturl})
    if(shorturl==null) return res.sendStatus(404);
    shorturl.clicks++;
    shorturl.save()
    res.redirect(shorturl.full)
})

app.listen(5000,(err,success)=>{
    if(err) throw error;
    console.log("connected");
})