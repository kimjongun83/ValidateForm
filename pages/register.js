import ApiHelper from "../services/services.js";
import dat from 'login'
const name = document.querySelector(".name");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const confirm_password = document.querySelector(".confirm_password");
const button = document.querySelector(".register-submit");
const form = document.querySelectorAll(".inputs");
const togglePassword = document.querySelectorAll(".toggle");

togglePassword.forEach((item) => {
  item.addEventListener("click", function () {
    const input = this.previousElementSibling;
    const inputType = input.getAttribute("type");
    if (inputType === "password") {
      input.setAttribute("type", "text");
    } else {
      input.setAttribute("type", "password");
    }
  });
});

button.addEventListener("click", (e) => {
  console.log(111);
 
  let validEmail = emailValidate(email);
  let validPassword = passwordValidate(password, confirm_password);

  let validName = namelValidate(name);
  let validPasswordMatch = passwordMatch(password, confirm_password);
  if (validEmail && validPassword && validPasswordMatch && validName) {
    const object = {
      email: email.value,
      password: password.value,
      name: name.value,
      confirm_password: confirm_password.value,
    };
    console.log("Object", object);
    register(object);
  } else {
  }
});
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
const passwordValidate = (password, confirm_password) => {
  const passwordValue = password.value.trim();
  const passwordConfirmValue = confirm_password.value.trim();

  if (!passwordValue && !passwordConfirmValue) {
    setError(password, "Password is required");
    setError(confirm_password, "PasswordConfirnm is required");
    return false;
  } else if (passwordValue.length < 8 && passwordConfirmValue.length < 8) {
    setError(password, "Password must be at least 8 character.");
    setError(confirm_password, "Password must be at least 8 character.");
    return false;
  } else if (passwordValue.length > 16 && passwordConfirmValue.length > 16) {
    setError(password, "Password must be at maximum 16 character.");
    setError(confirm_password, "Password must be at maximum 16 character.");
    return false;
  } else if (
    !/[A-Z]/.test(passwordValue) &&
    !/[A-Z]/.test(passwordConfirmValue)
  ) {
    setError(
      password,
      "password should contain at least 1 uppercase character"
    );
    setError(
      confirm_password,
      "password should contain at least 1 uppercase character."
    );
    return false;
  } else if (
    !/[0-9]/.test(passwordValue) &&
    !/[0-9]/.test(passwordConfirmValue)
  ) {
    setError(password, "password should contain at least 1 number character");
    setError(
      confirm_password,
      "password should contain at least 1 number character"
    );
    return false;
  } else if (
    !/[$@%^&*()}{[\]}!]/.test(passwordValue) &&
    !/[$@%^&*()}{[\]}!]/.test(passwordConfirmValue)
  ) {
    setError(password, "password should contain at least 1 special character");
    setError(
      confirm_password,
      "password should contain at least 1 special character"
    );
    return false;
  } else {
    setSuccess(password);
    setSuccess(confirm_password);
    return true;
  }
};
const checkEmptyError = (listInput) => {
  let isEmptyError = false;
  listInput.forEach((input) => {
    input.value = input.value.trim();
    if (!input.value) {
      isEmptyError = true;
      setError(input, "Field cannot be blank");
    } else {
      setSuccess(input);
    }
  });

  return isEmptyError;
};
const namelValidate = (name) => {
  const nameValue = name.value.trim();
  if (!nameValue) {
    setError(name, "Name is required");
    return false;
  } else {
    setSuccess(name);
    return true;
  }
};
const passwordMatch = (password, confirm_password) => {
  const passwordValue = password.value.trim();
  const passwordConfirmValue = confirm_password.value.trim();
  if (!passwordConfirmValue) {
    setError(confirm_password, "Please confirm your password");
    return false;
  } else if (passwordConfirmValue !== passwordValue) {
    setError(confirm_password, "Passwords doesn't match");
    return false;
  } else {
    setSuccess(confirm_password);
    return true;
  }
};

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
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const register = async (values) => {
  try {
    ApiHelper.setJwtToken(null);
    button.setAttribute("disabled", true);
    button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">Register...</span>`;
    const resposne = await ApiHelper.post({
      path: "auth/register",
      payload: JSON.stringify(values),
    });
    if (resposne.success === true) {
      button.removeAttribute("disabled");
      button.innerHTML = "";
      swal({
        title: "Register Success",

        icon: "success",
      })
      .then((willRedirect) => {
        resetForm({ name, email, password, confirm_password });
        form.forEach((item)=>{
          
          item.classList.remove("success")
        })
        if (willRedirect) {
          setTimeout(function () {
            window.location.href = "slogin.html";
          }, 2000);
        }
      });
    }
  } catch (error) {
   
    button.innerHTML = "Register";
    swal({
      title: "Register Success",
      text:  error?.data?.email[0],
      icon: "error",
    })
    .then(() => {
      resetForm({ name, email, password, confirm_password });
 
    });
    button.removeAttribute("disabled");
    form.forEach((item)=>{
    
      item.classList.remove("success")
    })
 
  }
};
const resetForm = (data) => {
  data.name.value = "";
  data.email.value = "";
  data.password.value = "";
  data.confirm_password.value = "";
  data.passwordConfirm = "";
};
