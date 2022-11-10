import ApiHepler from "../services/services.js";
import { parseObjectToFormData } from "../utils/function.js";
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const form = document.querySelectorAll(".inputs");
const button = document.querySelector(".register-submit");

const togglePassword = document.querySelector(".toggle");

togglePassword.addEventListener("click", function () {
  const input = this.previousElementSibling;
  const inputType = input.getAttribute("type");
  if (inputType === "password") {
    input.setAttribute("type", "text");
  } else {
    input.setAttribute("type", "password");
  }
});
button.addEventListener("click", (e) => {
  e.preventDefault();
  let validEmail = emailValidate(email);
  let validPassword = passwordValidate(password);
 
  if (validEmail && validPassword) {
    const object = {
      email: email.value,
      password: password.value,
      
  };
      login(object);
      console.log("data", object);
 
    
  } else {
    swal("NHẬP LẠI ĐI BẠN ƠI", "", "error");
  }
});

const setError = (input, message) => {
  const inputControl = input.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (input) => {
  const inputControl = input.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexEmail.test(String(email).toLowerCase());
};
const emailValidate = (email) => {
  const emailValue = email.value.trim();
  if (!emailValue) {
    setError(email, "Email is required");
    return false;
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address");
    return false;
  } else {
    setSuccess(email);
    return true;
  }
  //   return
};
const passwordValidate = (password) => {
  const passwordValue = password.value.trim();
  if (!passwordValue) {
    setError(password, "Password is required");
    return false;
  } else if (passwordValue.length < 8) {
    setError(password, "Password must be at least 8 character.");
    return false;
  } else if (passwordValue.length > 16) {
    setError(password, "Password must be at maximum 16 character.");
    return false;
  } else if (!/[A-Z]/.test(passwordValue)) {
    setError(
      password,
      "password should contain at least 1 uppercase character"
    );
    return false;
  } else if (!/[0-9]/.test(passwordValue)) {
    setError(password, "password should contain at least 1 number character");
    return false;
  } else if (!/[$@%^&*()}{[\]}!]/.test(passwordValue)) {
    setError(password, "password should contain at least 1 special character");
    return false;
  } else {
    setSuccess(password);
    return true;
  }
};


const login = async (values) => {
  console.log(values);
  try {
    button.setAttribute("disabled", true);
    button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">Login...</span>`;
    const resposne = await ApiHepler.post({
      path: "auth/login",
      payload: parseObjectToFormData(values),
    });
    console.log("response", resposne);
    console.log("ResponseStatusText",resposne);
    if (resposne.success === true) {
      button.removeAttribute('disabled')
      button.innerHTML = "Login";
      ApiHepler.storeAccessToken(resposne.data.access_token);
   
      swal({
        title: "Login Success",
      
        icon: "success",
        
      })
      .then((willRedirect) => {
        resetForm({
          email,
          password
      });
      form.forEach((item)=>{
     
        item.classList.remove("success")
      });
        if (willRedirect) {
          setTimeout(function() {
            window.location.href = "../public/index.html";
          }, 3000);
        }
      });

    }

   
    
  } catch (error) {
   
    button.innerHTML = "Login";
    swal({
      title: "Login Failed",
      text: error.message,
      icon: "error",
      
    })
    .then(() => {
      resetForm({
        email,
        password
    });
    form.forEach((item)=>{
     
      item.classList.remove("success")
    });
    button.removeAttribute("disabled");
    });



};
const resetForm = (data) => {
  data.email.value = "";
  data.password.value = "";
 
  data.passwordConfirm = "";
}
}
