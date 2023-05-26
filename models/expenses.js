const sequelize=require("../database/connection")
const Sequelize=require("sequelize")
const {users,Users}=require("./users")


const expenses=sequelize.define("expenses",{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    expenseItem:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    expensePrice:{
        type:Sequelize.BIGINT,
        allowNull:false
    }
})


class Data{
    constructor(expenseItem,expensePrice,email){
        this.item=expenseItem;
        this.price=expensePrice;
        this.email=email
    }
    static fetchAll(email){
        return users.findOne({where:{
            email:email
         }})
         .then(result =>{
            
    return expenses.findAll({
        where:{
userId:result.dataValues.id
    }
})
         })
 
    }
    insertIntoDatabase(){
        
  return users.findOne({where:{
    email:this.email
 }})
 .then(result=>{
  let userId=result.dataValues.id
    return expenses.create({
        expenseItem:this.item.toUpperCase(),
        expensePrice:this.price,
        userId:userId
     })
 })
 
    }

    static updateData(data){
return users.findOne({where:{
    email:data.email
}})
.then(result=>{
let id=result.dataValues.id;
 return expenses.findOne({where:{
    userId:id,
    expenseItem:data.currentExpenseItem

}})
})
.then(result=>{
    if(data.todo==="onlyItemName"){
    return result.update({
        expenseItem:data.newExpenseItem.toUpperCase()
        })
}else if(data.todo==="onlyItemPrice"){
    return result.update({
        expensePrice:data.newExpensePrice
        })
}else if(data.todo==="itemName&itemPrice"){
    return result.update({
        expenseItem:data.newExpenseItem.toUpperCase(),
        expensePrice:data.newExpensePrice

        })
}

})
    }

    static deleteFromDatabase(name ,email){
        return users.findOne({where:{
             email:email
        }})

        .then(result=>{
            let id=result.dataValues.id
            return expenses.findOne({
                where:{
                    userId:id,
                    expenseItem:name
                }
            })
         })

      
    }
}

module.exports={Data,expenses};