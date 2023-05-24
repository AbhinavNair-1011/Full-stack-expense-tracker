window.addEventListener("DOMContentLoaded",()=>{
   
    let registerForm=document.querySelector("#registerForm");
    let loginForm=document.querySelector("#loginForm");

    let registerShift=document.querySelector("#registerShift");
    let loginShift=document.querySelector("#loginShift");

    registerShift.style.textDecoration="underline"
    registerShift.style.textDecorationColor="red";

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
        
        // loginForm.style.display="flex";
        registerShift.style.textDecoration="none";
        loginShift.style.textDecoration="underline";
        loginShift.style.textDecorationColor="red";
        registerForm.style.opacity=0;
        loginForm.style.opacity=1;
        setTimeout(()=>{
            loginForm.style.zIndex=1;
        },420)
        

        
        
    })

})
