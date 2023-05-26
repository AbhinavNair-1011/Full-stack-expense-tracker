async function addUser(userDetails) {
    return await axios.post("http://localhost:3000/api/add-user", userDetails)
}
async function validateUser(userDetails) {
    return await axios.post("http://localhost:3000/api/validate-user", userDetails)
}


window.addEventListener("DOMContentLoaded", () => {

    let registerForm = document.querySelector("#registerForm");
    let registerBtn = document.querySelector("#register");

    let loginForm = document.querySelector("#loginForm");
    let loginBtn = document.querySelector("#login");

    let registerShift = document.querySelector("#registerShift");
    registerShift.style.textDecoration = "underline"
    registerShift.style.textDecorationColor = "black";

    let loginShift = document.querySelector("#loginShift");

    let loginEmail = document.querySelector("#loginEmail")
    let loginPassword = document.querySelector("#loginPassword")


    let name = document.querySelector("#name");
    let email = document.querySelector("#email");
    let phoneNumber = document.querySelector("#phoneNumber");
     
    email.value = "";
    password.value = `********************************`;
    password.addEventListener("click", (e) => {
        password.value = "";
    })
    name.value = "";
    
    phoneNumber.value = "";



    registerShift.addEventListener("click", (e) => {
        e.preventDefault()
        registerShift.style.textDecoration = "underline";
        loginShift.style.textDecoration = "none";
        registerShift.style.textDecorationColor = "black";
        registerForm.style.opacity = 1;
        loginForm.style.opacity = 0;
        loginForm.style.zIndex = 0;


    });
    loginShift.addEventListener("click", (e) => {
        e.preventDefault()


        registerShift.style.textDecoration = "none";
        loginShift.style.textDecoration = "underline";
        loginShift.style.textDecorationColor = "black";
        registerForm.style.opacity = 0;
        loginForm.style.opacity = 1;
        setTimeout(() => {
            loginForm.style.zIndex = 1;
        }, 420)
        loginEmail.value = "";
        loginPassword.value = ""


    });

    let userDetails = {
        name: null, email: null, phoneNumber: null, password: null
    }


    registerBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (name.value && email.value && phoneNumber.value && password.value) {

            userDetails.name = name.value;
            userDetails.email = email.value;
            userDetails.phoneNumber = phoneNumber.value;
            userDetails.password = password.value;

            addUser(userDetails)
                .then(result => {
                    name.value = "";
                    email.value = "";
                    phoneNumber.value = "";
                    password.value = "";


                    loginEmail.value = ""
                    loginPassword = ""

                    registerShift.style.textDecoration = "none";
                    loginShift.style.textDecoration = "underline";
                    loginShift.style.textDecorationColor = "black";
                    registerForm.style.opacity = 0;
                    loginForm.style.opacity = 1;
                    setTimeout(() => {
                        loginForm.style.zIndex = 1;
                    }, 420)

                })
                .catch(err => {
                    if (err.response.data.errorName === "SequelizeUniqueConstraintError") {


                        if (err.response.data.errorType === "email") {

                            let p = document.createElement("p");
                            p.innerHTML = `*User with email : ${err.response.data.errorValue} already exists`;
                            p.setAttribute("class", "duplicateEntry")
                            registerForm.insertBefore(p, email.parentElement.nextElementSibling);
                            email.value = ""
                        }
                        else if (err.response.data.errorType === "phoneNumber") {
                            let p = document.createElement("p");
                            p.innerHTML = `*User with phoneNumber : ${err.response.data.errorValue} already exists`;
                            p.setAttribute("class", "duplicateEntry")
                            registerForm.insertBefore(p, phoneNumber.parentElement.nextElementSibling);
                            phoneNumber.value = ""
                        }

                    }


                })
        } else if (!name.value || !email.value || !phoneNumber.value || !password.value) {
            if (!name.value) {
                if (name.parentElement.nextElementSibling.className === "duplicateEntry") {

                } else {
                    let p = document.createElement("p");
                    p.setAttribute("class", "duplicateEntry")
                    p.innerHTML = "*Name required"
                    registerForm.insertBefore(p, email.parentElement)
                }

            }
            if (!email.value) {
                if (email.parentElement.nextElementSibling.className === "duplicateEntry") {

                } else {
                    let p = document.createElement("p");
                    p.setAttribute("class", "duplicateEntry")
                    p.innerHTML = "*Email required"
                    registerForm.insertBefore(p, phoneNumber.parentElement)
                }
            }
            if (!phoneNumber.value) {
                if (phoneNumber.parentElement.nextElementSibling.className === "duplicateEntry") {

                } else {
                    let p = document.createElement("p");
                    p.setAttribute("class", "duplicateEntry")
                    p.innerHTML = "*PhoneNumber required"
                    registerForm.insertBefore(p, password.parentElement)
                }
            }
            if (!password.value) {
                if (password.parentElement.nextElementSibling.className === "duplicateEntry") {

                } else {
                    let p = document.createElement("p");
                    p.setAttribute("class", "duplicateEntry")
                    p.innerHTML = "*Password required"
                    registerForm.insertBefore(p, registerBtn.parentElement)
                }
            }


        }
        if (name.value || email.value || phoneNumber.value || password.value) {

            if (name.value) {
                if (name.parentElement.nextElementSibling.className === "duplicateEntry") {
                    registerForm.removeChild(name.parentElement.nextElementSibling)
                }
            }
            if (email.value) {
                if (email.parentElement.nextElementSibling.className === "duplicateEntry") {
                    registerForm.removeChild(email.parentElement.nextElementSibling)
                }
            }
            if (phoneNumber.value) {
                if (phoneNumber.parentElement.nextElementSibling.className === "duplicateEntry") {
                    registerForm.removeChild(phoneNumber.parentElement.nextElementSibling)
                }

            }
            if (password.value) {
                if (password.parentElement.nextElementSibling.className === "duplicateEntry") {
                    registerForm.removeChild(password.parentElement.nextElementSibling)
                }
            }
        }




    })

     loginBtn.addEventListener("click",(e)=>{
        e.preventDefault();

        let loginEmail = document.querySelector("#loginEmail")
    let loginPassword = document.querySelector("#loginPassword")
        let userDetails={};

        if (loginEmail.value && loginPassword.value){
            userDetails.email=loginEmail.value;
            userDetails.password=loginPassword.value;

            validateUser(userDetails)
            .then(result=>{
                if(result.data.authentication===true){



                }else if(result.data.authentication===false){
                    if (loginEmail.parentElement.nextElementSibling.className === "loginDuplicateEntry") {

                    } else {
                        let p = document.createElement("p");
                        p.setAttribute("class", "loginDuplicateEntry")
                        p.innerHTML = "*Incorrect password"
                        loginForm.insertBefore(p, loginBtn.parentElement);
                        loginPassword.value="";
                        
                    }
                    
                }
                

            })
            .catch(err=>{
                if(err.response.data.user==="not found"){
                if (loginEmail.parentElement.nextElementSibling.className === "loginDuplicateEntry") {

                } else {
                    let p = document.createElement("p");
                    p.setAttribute("class", "loginDuplicateEntry")
                    p.innerHTML = "*User not found"
                    loginForm.insertBefore(p, loginPassword.parentElement);
                    
                }
            }
            })
        }
        else if(!loginEmail.value || !loginPassword.value){
            if (!loginEmail.value) {
                if (loginEmail.parentElement.nextElementSibling.className === "loginDuplicateEntry") {

                } else {
                    let p = document.createElement("p");
                    p.setAttribute("class", "loginDuplicateEntry")
                    p.innerHTML = "*Email required"
                    loginForm.insertBefore(p, loginPassword.parentElement)
                }

            }
            if (!loginPassword.value) {
                if (loginPassword.parentElement.nextElementSibling.className === "loginDuplicateEntry") {

                } else {
                    let p = document.createElement("p");
                    p.setAttribute("class", "loginDuplicateEntry")
                    p.innerHTML = "*Password required"
                    loginForm.insertBefore(p, loginBtn.parentElement)
                }
            }

        }
       
             if (loginEmail.value || loginPassword.value) {

                if (loginEmail.value) {
                    if (loginEmail.parentElement.nextElementSibling.className === "loginDuplicateEntry") {
                        loginForm.removeChild(loginEmail.parentElement.nextElementSibling)
                    }
                }
                if (loginPassword.value) {
                    if (loginPassword.parentElement.nextElementSibling.className === "loginDuplicateEntry") {
                        loginForm.removeChild(loginPassword.parentElement.nextElementSibling)
                    }
                }
            }
    
   


     })



})
