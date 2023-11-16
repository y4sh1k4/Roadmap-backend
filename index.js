const express=require("express");
const mongoose=require("mongoose");
const app=express();
const {Schema}=mongoose;
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended:true}))


async function main(){
    await mongoose.connect(process.env.MONGO_URI);
}
try{
    main();
    console.log("database connected")
}
catch(e){
    console.log(e);
}
const RSchema=new Schema({
    name:String,
    nodes:[Object],
    edges:[Object]
})

const Rmodel=mongoose.model("Rmodel",RSchema);

app.get("/:name",async (req,res)=>{
    const Rname=req.params.name;
    const Rdata= await Rmodel.find({name:Rname});
    res.send(Rdata);
})
app.post("/",async (req,res)=>{
    const data=req.body;
    console.log(data);
    const roadmap= new Rmodel(data);
    try{
        await roadmap.save();
        res.send("data added")
    }
    catch(e){
        res.json(e)
    }
})


app.listen(3000,()=>{
    console.log("server started");
})