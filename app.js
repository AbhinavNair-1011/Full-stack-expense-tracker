let express=require("express");
let app=express();
let cors=require("cors");

let sequelize=require("./database/connection");
let Sequelize=require("sequelize");

let addUser=require("./routes/addUser");


app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(express.static(__dirname+"/public"));

app.use(addUser);

sequelize.sync()
.then(result=>{
    app.listen(3000,()=>{
        console.log("connected")
    })
})
.catch(err=>{
    console.log(err)
})

