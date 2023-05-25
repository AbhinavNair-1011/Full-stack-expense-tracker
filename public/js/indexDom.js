async function addUser(userDetails){
return await axios.post("http://localhost:3000/api/add-user",userDetails)
}

window.addEventListener("DOMContentLoaded",()=>{
   
    let registerForm=document.querySelector("#registerForm");
    let registerBtn=document.querySelector("#register");

    let loginForm=document.querySelector("#loginForm");
    letloginBtn=document.querySelector("#login");

    let registerShift=document.querySelector("#registerShift");
    registerShift.style.textDecoration="underline"
    registerShift.style.textDecorationColor="red";

    let loginShift=document.querySelector("#loginShift");

    let loginEmail=document.querySelector("#loginEmail")
    let loginPassword=document.querySelector("#loginPassword")


    let name=document.querySelector("#name");
    let email=document.querySelector("#email");
    let phoneNumber=document.querySelector("#phoneNumber");
 

    password.value="*********";
    password.addEventListener("click",(e)=>{
        password.value="";
    })
    name.value="";   
    email.value="";
    phoneNumber.value="";
    

   
    registerShift.addEventListener("click",(e)=>{
        e.preventDefault()
         registerShift.style.textDecoration="underline";
         loginShift.style.textDecoration="none";
         registerShift.style.textDecorationColor="red";
         registerForm.style.opacity=1;
         loginForm.style.opacity=0;
         loginForm.style.zIndex=0;

     
    });
     loginShift.addEventListener("click",(e)=>{
        e.preventDefault()
        
    
        registerShift.style.textDecoration="none";
        loginShift.style.textDecoration="underline";
        loginShift.style.textDecorationColor="red";
        registerForm.style.opacity=0;
        loginForm.style.opacity=1;
        setTimeout(()=>{
            loginForm.style.zIndex=1;
        },420)
        loginEmail.value="";
        loginPassword.value=""
               
        
    });
      
    let userDetails={
        name:null,email:null,phoneNumber:null,password:null
    }
    

    registerBtn.addEventListener("click",(e)=>{
        e.preventDefault();
        if(name.value && email.value && phoneNumber.value && password.value){

            userDetails.name=name.value;
            userDetails.email=email.value;
            userDetails.phoneNumber=phoneNumber.value;
            userDetails.password=password.value;

            addUser(userDetails)
         .then(result=>{
            name.value="";
            email.value="";
            phoneNumber.value="";
            password.value="";


            loginEmail.value=""
            loginPassword=""
            
            registerShift.style.textDecoration="none";
        loginShift.style.textDecoration="underline";
        loginShift.style.textDecorationColor="red";
        registerForm.style.opacity=0;
        loginForm.style.opacity=1;
        setTimeout(()=>{
            loginForm.style.zIndex=1;
        },420)

         })
          .catch(err=>{
                console.log(err.response.data);
                if(err.response.data.errorName==="SequelizeUniqueConstraintError"){
                   

                    if(err.response.data.errorType==="email"){
                       
                        let p=document.createElement("p");
                        p.innerHTML=`*User with email : ${err.response.data.errorValue} already exists`;
                        p.setAttribute("class","duplicateEntry")
                     registerForm.insertBefore(p,email.parentElement.nextElementSibling);
                     email.value=""
                    }
                    else if(err.response.data.errorType==="phoneNumber"){
                        let p=document.createElement("p");
                        p.innerHTML=`*User with phoneNumber : ${err.response.data.errorValue} already exists`;
                        p.setAttribute("class","duplicateEntry")
                     registerForm.insertBefore(p,phoneNumber.parentElement.nextElementSibling);
                     phoneNumber.value=""
                    }

                }

                
            })
        }else if(!name.value || !email.value || !phoneNumber.value || !password.value){
            if(!name.value){
                if(name.parentElement.nextElementSibling.className==="duplicateEntry"){
 
                }else {
                    let p=document.createElement("p");
                    p.setAttribute("class","duplicateEntry")
                    p.innerHTML="*Name required"
                    registerForm.insertBefore(p,email.parentElement)
                }
                
            }
            if(!email.value){
                if(email.parentElement.nextElementSibling.className==="duplicateEntry"){
 
                }else {
                let p=document.createElement("p");
            p.setAttribute("class","duplicateEntry")
            p.innerHTML="*Email required"
            registerForm.insertBefore(p,phoneNumber.parentElement)
            }
        }
            if(!phoneNumber.value){
                if(phoneNumber.parentElement.nextElementSibling.className==="duplicateEntry"){
 
                }else {
                let p=document.createElement("p");
                p.setAttribute("class","duplicateEntry")
                p.innerHTML="*PhoneNumber required"
                registerForm.insertBefore(p,password.parentElement)
            }
        }
            if(!password.value){
                if(password.parentElement.nextElementSibling.className==="duplicateEntry"){
 
                }else {
                let p=document.createElement("p");
                p.setAttribute("class","duplicateEntry")
                p.innerHTML="*Password required"
                registerForm.insertBefore(p,registerBtn.parentElement)
            }
        }
            

        }
         if(name.value || email.value || phoneNumber.value || password.value){
            
               if(name.value){
                if(name.parentElement.nextElementSibling.className==="duplicateEntry"){
                    registerForm.removeChild(name.parentElement.nextElementSibling)
                }
                     }
               if(email.value){
                if(email.parentElement.nextElementSibling.className==="duplicateEntry"){
                    registerForm.removeChild(email.parentElement.nextElementSibling)
                }  
             }
               if(phoneNumber.value){
                if(phoneNumber.parentElement.nextElementSibling.className==="duplicateEntry"){
                registerForm.removeChild(phoneNumber.parentElement.nextElementSibling)
            }  

               }
               if(password.value){
                if(password.parentElement.nextElementSibling.className==="duplicateEntry"){
                    registerForm.removeChild(password.parentElement.nextElementSibling)
                }  
               }
        }
      
        
        
        
    })

 

})
