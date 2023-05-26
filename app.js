let express=require("express");
let app=express();
let cors=require("cors");

let sequelize=require("./database/connection");
let Sequelize=require("sequelize");

let addUser=require("./routes/addUser");
let validateUser=require("./routes/validateUser");

const fetchData=require("./routes/fetchData");
const addData=require("./routes/addData")
const deleteData=require("./routes/deleteData");
const updateData=require("./routes/updateData")

const{users}=require("./models/users")
const{expenses}=require("./models/expenses")

users.hasMany(expenses);



app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(express.static(__dirname+"/public"));

app.use(addUser);
app.use(validateUser);

app.use(fetchData)
app.use(addData)
app.use(deleteData)
app.use(updateData);



sequelize.sync()
.then(result=>{
    app.listen(3000,()=>{
        console.log("connected")
    })
})
.catch(err=>{
    console.log(err)
})

