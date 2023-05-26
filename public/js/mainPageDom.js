
async function fetchData(userEmail) {
  return await axios.get(`http://localhost:3000/api/fetch-data/${userEmail}`);
  
}
async function addData(details) {
 return await axios.post("http://localhost:3000/api/add-data", details)
 
}
async function deleteData(itemName,userEmail){
  let lower=itemName.toLowerCase()
 return  await axios.delete(`http://localhost:3000/api/delete-data/${userEmail}/${lower}`)
}

async function updateData(updatedData){
  return await axios.patch(`http://localhost:3000/api/update-data`,updatedData)
}
document.addEventListener("DOMContentLoaded", (e) => {
  let expenseItems = document.querySelector("#expenseInput");
  let expensePrice = document.querySelector("#expensePrice");
  let submitBtn = document.querySelector("#submitBtn");
  let list = document.querySelector("#detailsList");
  let details = {}
  expenseItems.value = "";
  expensePrice.value = "";

  list.style.border = "1px solid white";
  submitBtn.style.backgroundColor = "grey";

  let pombajomba;
  let localStorageKey = [];
  let totalExpense = 0;

  let userName=localStorage.getItem("name")
 let userNameParagrah=document.querySelector("#userName");
 userNameParagrah.innerText="Welcome " + userName;

 let userEmail=localStorage.getItem("email")
 
 
    fetchData(userEmail)
    .then((res)=>{

    let data=res.data.data.result
  for (each of data){
    
    
  let x = each.expenseItem.toUpperCase();
  let y =each.expensePrice;
  localStorageKey.push(x.toUpperCase());
  localStorage.setItem(x,y)
 
  totalExpense += y
  let editBtn = document.createElement("button");
  let deleteBtn = document.createElement("button");

  editBtn.appendChild(document.createTextNode("EDIT"));
  deleteBtn.appendChild(document.createTextNode("DETELE"));
  editBtn.setAttribute("class", "edit");
  deleteBtn.setAttribute("class", "delete");
  editBtn.style.float = "right";
  deleteBtn.style.float = "right";

  let li = document.createElement("li");
  let span = document.createElement("span");

  let span2 = document.createElement("span");

  li.appendChild(document.createTextNode("Expense Item :  "));
  span.appendChild(document.createTextNode(x));
  li.appendChild(span);
  li.appendChild(document.createTextNode("        Price :  "));

  span2.appendChild(document.createTextNode(y));
  li.appendChild(span2);



  li.setAttribute("class", "value");

  li.style.fontWeight = "bold";
  li.style.fontSize = "21px";
  editBtn.style.fontSize = "14px";
  deleteBtn.style.fontSize = "14px";
  editBtn.style.backgroundColor = "yellow";
  deleteBtn.style.backgroundColor = "red";
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);
  list.appendChild(li);


  }

  let inputForm = document.querySelector("#inputForm");
  

  
  let t = document.createElement("p");
  let span4 = document.createElement("span");
  span4.innerText = totalExpense;
  span4.setAttribute("id", "totalSpan");
  
  t.setAttribute("class", "total");
  t.appendChild(document.createTextNode("Total Expense : "));
  t.appendChild(span4);
  inputForm.appendChild(t);

    })
    .catch(err=>{
  
      for (let i = 0; i < localStorage.length; i++) {
        let x = localStorage.key(i);
        localStorageKey.push(x.toUpperCase());
        let y = localStorage.getItem(x);
        totalExpense += Number(y);
        let editBtn = document.createElement("button");
        let deleteBtn = document.createElement("button");
      
        editBtn.appendChild(document.createTextNode("EDIT"));
        deleteBtn.appendChild(document.createTextNode("DETELE"));
        editBtn.setAttribute("class", "edit");
        deleteBtn.setAttribute("class", "delete");
        editBtn.style.float = "right";
        deleteBtn.style.float = "right";
      
        let li = document.createElement("li");
        let span = document.createElement("span");
      
        let span2 = document.createElement("span");
      
        li.appendChild(document.createTextNode("Expense Item :  "));
        span.appendChild(document.createTextNode(x));
        li.appendChild(span);
        li.appendChild(document.createTextNode("        Price :  "));
      

        span2.appendChild(document.createTextNode(localStorage.getItem(x)));
        li.appendChild(span2);
      
      
      
        li.setAttribute("class", "value");
      
        li.style.fontWeight = "bold";
        li.style.fontSize = "21px";
        editBtn.style.fontSize = "14px";
        deleteBtn.style.fontSize = "14px";
        editBtn.style.backgroundColor = "yellow";
        deleteBtn.style.backgroundColor = "red";
        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        list.appendChild(li);
      }
      
      let inputForm = document.querySelector("#inputForm");
      
      let t = document.createElement("p");
      let span = document.createElement("span");
      span.innerText = totalExpense;
      span.setAttribute("id", "totalSpan");
      
      t.setAttribute("class", "total");
      t.appendChild(document.createTextNode("Total Expense : "));
      t.appendChild(span);
      
      inputForm.appendChild(t);
      // let newdiv = document.createElement("div");
    })
   
  


submitBtn.addEventListener("click", (e) => {
  e.preventDefault();



  let s = document.querySelector("#totalSpan");
  let eiValue = expenseItems.value.trim();
  let epValue = expensePrice.value.trim();
  let allList = document.querySelectorAll(".value");




  if (!eiValue || !epValue) {
  //   let inputForm=document.querySelector("#inputform");

  //   if (eiValue) {
  //     if (expenseItem.parentElement.nextElementSibling.className === "duplicateEntry") {

  //     } else {
  //         let p = document.createElement("p");
  //         p.setAttribute("class", "duplicateEntry")
  //         p.innerHTML = "*Item name required"
  //         inputForm.insertBefore(p, expensePrice.parentElement)
  //     }

  // }
  // if (!epValue) {
  //     if (expensePrice.parentElement.nextElementSibling.className === "duplicateEntry") {

  //     } else {
  //         let p = document.createElement("p");
  //         p.setAttribute("class", "duplicateEntry")
  //         p.innerHTML = "*Email required"
  //         inputForm.insertBefore(p,submitBtn.parentElement)
  //     }
  } else if (eiValue && epValue) {
    details.expenseItem = eiValue;
    details.expensePrice = epValue;

    details.email=localStorage.getItem("email")

    addData(details);
    
    if (localStorageKey.indexOf(eiValue.toUpperCase()) != -1 &&
      localStorageKey.length) {



      totalExpense += Number(epValue);

      s.innerText = totalExpense;
      let value = localStorage.getItem(eiValue.toUpperCase());
      let newValue = Number(value) + Number(epValue)
      localStorage.setItem(eiValue.toUpperCase(), newValue)

      for (let each of allList) {

        if (each.children[0].textContent == eiValue.toUpperCase()) {


          let oldPrice = each.children[1].textContent;
          let newPrice = Number(oldPrice) + Number(epValue);
          each.children[1].textContent = newPrice;
          // console.log(each.children[1].textContent)


        }


      }

      eiValue = "";
      epValue = "";


    } else {


      localStorageKey.push(eiValue.toUpperCase());
      // console.log(`new added ${localStorageKey}`)

      let editBtn = document.createElement("button");
      let deleteBtn = document.createElement("button");

      editBtn.appendChild(document.createTextNode("EDIT"));
      deleteBtn.appendChild(document.createTextNode("DETELE"));
      editBtn.setAttribute("class", "edit");
      deleteBtn.setAttribute("class", "delete");
      editBtn.style.float = "right";
      deleteBtn.style.float = "right";

      let li = document.createElement("li");
      let span = document.createElement("span");

      let span2 = document.createElement("span");

      li.appendChild(document.createTextNode("Expense Item :  "));
      span.appendChild(document.createTextNode(eiValue.toUpperCase()));
      li.appendChild(span);
      li.appendChild(document.createTextNode("        Price :  "));

      span2.appendChild(document.createTextNode(epValue));
      li.appendChild(span2);

      totalExpense += Number(epValue);

      s.innerText = totalExpense;


      li.setAttribute("class", "value");

      li.style.fontWeight = "bold";

      li.style.fontSize = "21px";
      editBtn.style.fontSize = "14px";
      deleteBtn.style.fontSize = "14px";
      editBtn.style.backgroundColor = "yellow";
      deleteBtn.style.backgroundColor = "red";

      li.appendChild(deleteBtn);
      li.appendChild(editBtn);
      list.appendChild(li);


      let obj = {
        item: eiValue.toUpperCase(),
        price: epValue,

      };
      localStorage.setItem(obj.item, obj.price);
      expenseItems.value = "";
      expensePrice.value = "";
    }
  }
  expenseItems.value = "";
  expensePrice.value = "";

});


let s = document.querySelector("#search");
s.value = "";

list.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("delete")) {

    let ts = document.querySelector("#totalSpan");

    let deletedPrice = e.target.parentElement.childNodes[3].textContent;

    ts.innerText = Number(ts.textContent) - Number(deletedPrice);
    totalExpense = Number(ts.innerText);
    let ol = document.querySelector("#detailsList");

    let li = e.target.parentElement;
    let itemName = e.target.parentElement.children[0].textContent;
    let userEmail=localStorage.getItem("email")

    
    deleteData(itemName,userEmail)

    let indexofItem = localStorageKey.indexOf(itemName);
    ol.removeChild(li);
    localStorageKey.splice(indexofItem, 1);


    // localStorageKey.slice()



    localStorage.removeItem(e.target.parentElement.childNodes[1].innerText);
   } else if (e.target.classList.contains("edit")) 
  {
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
      }

    });
    let newdiv = document.createElement("div");
    let updatedData={};
    let updateDataTracker=false;


    pombajomba = e.target.parentElement.childNodes[3].textContent;

    let btn = document.createElement("button");
    let btn2 = document.createElement("button");

    if (submitBtn.style.display != "none") {
      submitBtn.style.display = "none";
     
      newdiv.setAttribute("class", "row close");

      btn2.appendChild(document.createTextNode("Edit"));

      btn.appendChild(document.createTextNode("Cancel"));
      btn.setAttribute("class", "col-4");
      btn2.setAttribute("class", "col");
      btn.style.backgroundColor = "red";
      btn2.style.backgroundColor = "green";
      btn.style.color = "white";
      btn2.style.color = "white";

      newdiv.appendChild(btn2);
      newdiv.appendChild(btn);
      document.querySelector("#inputForm").appendChild(newdiv);

      document.getElementById("expenseInput").value =
        e.target.parentElement.childNodes[1].innerText;

      document.getElementById("expensePrice").value =
        e.target.parentElement.childNodes[3].innerText;
    }

    let x = e.target.parentElement;

    let upperE = e.target.parentElement;

    btn2.addEventListener("click", (e) => {
      e.preventDefault();
      let oldValue = localStorage.getItem(upperE.childNodes[1].innerText);
      let sameValue = false;
      let oldKey = upperE.childNodes[1].innerText;

      let flag = false;

      updatedData.email=localStorage.getItem("email");

      if (
        document.getElementById("expenseInput").value !=
        upperE.childNodes[1].innerText &&
        document.getElementById("expenseInput").value != "" &&
        document.getElementById("expensePrice").value ==
        upperE.childNodes[3].innerText
      ) {

        for (let i = 0; i < localStorage.length; i++) {
          let x = localStorage.key(i);
          if (x == document.getElementById("expenseInput").value.toUpperCase().trim()) {
            flag = true;
            alert("item already exists,please click that items edit")
          }
        }

        if (!flag) {



          localStorage.removeItem(oldKey);

          upperE.childNodes[1].innerText = document
            .getElementById("expenseInput")
            .value.toUpperCase();
          localStorage.setItem(upperE.childNodes[1].innerText, oldValue);
        }
        updateDataTracker=true;
        updatedData.todo="onlyItemName"
          updatedData.newExpenseItem=document.getElementById("expenseInput").value;
                    updatedData.currentExpenseItem=oldKey;
          

      } else if (
        document.getElementById("expensePrice").value !=
        upperE.childNodes[3].innerText &&
        document.getElementById("expensePrice").value != "" &&
        document.getElementById("expenseInput").value ==
        upperE.childNodes[1].innerText
      ) {

        if (document.getElementById("expensePrice").value == 0) {

        } else {
          localStorage.setItem(
            upperE.childNodes[1].innerText,
            document.getElementById("expensePrice").value
          );
          upperE.childNodes[3].innerText =
            document.getElementById("expensePrice").value;
        
            updateDataTracker=true;
            updatedData.todo="onlyItemPrice"

        updatedData.currentExpenseItem=oldKey;
        updatedData.newExpensePrice=document.getElementById("expensePrice").value;
        
          }

      } else if (
        document.getElementById("expensePrice").value !=
        upperE.childNodes[3].innerText &&
        document.getElementById("expenseInput").value !=
        upperE.childNodes[1].innerText &&
        document.getElementById("expensePrice").value != "" &&
        document.getElementById("expenseInput").value != ""
      ) {
        flag = false;
        for (let i = 0; i < localStorage.length; i++) {
          let x = localStorage.key(i);
          if (x == document.getElementById("expenseInput").value.toUpperCase().trim()) {
            flag = true;
            alert("item already exists,please click that items edit")
          }
        }
        if (!flag) {
          upperE.childNodes[1].innerText = document
            .getElementById("expenseInput")
            .value.toUpperCase();
          upperE.childNodes[3].innerText =
            document.getElementById("expensePrice").value;
          localStorage.removeItem(oldKey);

          localStorage.setItem(
            document.getElementById("expenseInput").value.toUpperCase(),
            document.getElementById("expensePrice").value 
            );
            updateDataTracker=true;
            updatedData.todo="itemName&itemPrice"
            
            updatedData.currentExpenseItem=oldKey;
             updatedData.newExpenseItem=document.getElementById("expenseInput").value;
             updatedData.newExpensePrice= document.getElementById("expensePrice").value;
            
        }
      } else if (
        document.getElementById("expensePrice").value ==
        upperE.childNodes[3].innerText &&
        document.getElementById("expenseInput").value ==
        upperE.childNodes[1].innerText
      ) {
        let x = confirm("Same price, do u want to change the price?");
        if (x === true) {
          sameValue = true;
        }
      } else {
        alert("Empty values not allowed");
      }

      if (
        document.getElementById("expensePrice").value != pombajomba &&
        document.getElementById("expensePrice").value != "" &&
        document.getElementById("expenseInput").value != ""
      ) {
        if (document.getElementById("expensePrice").value == 0) {
          alert("invalid amount - 0");
        } else if (!flag) {

          let ts1 = document.querySelector("#totalSpan");

          let result = 0;
          result = Number(ts1.textContent) - Number(pombajomba);
          totalExpense =
            result + Number(document.getElementById("expensePrice").value);
          ts1.innerText = totalExpense;

        }
        
      }
      if (!sameValue) {
        expenseItems.value = "";
        expensePrice.value = "";
        inputForm.removeChild(newdiv)
        x.style.backgroundColor = "rgba(4, 221, 241, 0.625)";
        submitBtn.style.display = "unset";
      } else {
        expensePrice.value = "";
      }
      // document.querySelector("#inputForm").removeChild(newdiv)
      if( updateDataTracker===true ){
      updateData(updatedData)
    .then(result=>console.log(result))
    .catch(err=> console.log(err))
      }
    });

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      expenseItems.value = "";
      expensePrice.value = "";
      inputForm.removeChild(newdiv)
      submitBtn.style.display = "unset";
    });

    

    
  }
});

function filter(e) {
  let del = document.querySelectorAll(".delete");
  let ol = document.querySelectorAll(".value");


  for (let each of ol) {

    let result = each.children[0].innerText.toLowerCase();
    let x = e.target.value[0] || ""
    if (result[0] !== x.toLowerCase()) {
      if (x === "") {
        each.style.display = "unset"
        for (let each of del) {
          each.style.display = "unset"
        }
      } else {
        each.style.display = "none"
      }
    }

    else if (result.indexOf(e.target.value.toLowerCase()) == -1) {
      each.style.display = "none";

    }
    else {
      each.style.display = "block";


    }
  }

}

search.addEventListener("keyup", filter);
  
});
