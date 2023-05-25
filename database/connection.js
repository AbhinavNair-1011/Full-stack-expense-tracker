const Sequelize=require("sequelize").Sequelize;

const sequelize= new Sequelize("expense_tracker_backend","root","Abhinav@1011",{
dialect:"mysql",
host:"localhost"
})

module.exports=sequelize;