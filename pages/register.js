import ApiHelper from '../../services/services.js'
const name = document.querySelector('.name');
const email = document.querySelector('.email')
const password = document.querySelector('.password');
const passwordConfirm = document.querySelector('.confirm_password');
const button = document.querySelector('.register-submit');
const form = document.getElementById('form');
const togglePassword = document.querySelectorAll(".toggle");

togglePassword.forEach((item)=>{
    
    item.addEventListener("click", function () {
        const input = this.previousElementSibling;
        const inputType = input.getAttribute("type");
        if (inputType === "password") {
          input.setAttribute("type", "text");
        } else {
          input.setAttribute("type", "password");
        }
      });
})

form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
   
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    console.log("data",data);
    register(data)

});

const setError = (input, message) => {
    const inputControl = input.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = input => {
    const inputControl = input.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const passwordConfirmValue = passwordConfirm.value.trim();
  

    if(nameValue === '') {
        setError(name, 'Username is required');
    } else {
        setSuccess(name);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } 
    else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character.');
    
    } else if (passwordValue.length > 16) {
        setError(password, 'Password must be at maximum 16 character.')
    }
    else if (!/[A-Z]/.test(passwordValue)){
        setError(password , 'password should contain at least 1 uppercase character')
    }
    else if (!/[0-9]/.test(passwordValue)){
        setError(password , 'password should contain at least 1 number character')
    }
    else if (!/[$@%^&*()}{[\]}!]/.test(passwordValue)){
        setError(password , 'password should contain at least 1 special character')
    }
     else {
        setSuccess(password);
    }
    

    if(passwordConfirmValue === '') {
        setError(passwordConfirm, 'Please confirm your password');
    } else if (passwordConfirmValue !== passwordValue) {
        setError(passwordConfirm, "Passwords doesn't match");
    } else {
        setSuccess(passwordConfirm);
    }

};


const register = async (values) => {
    try {
        ApiHelper.setJwtToken(null);
        button.setAttribute('disabled', true)
        button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">Register...</span>`;
        const resposne = await ApiHelper.post({ path: 'auth/register', payload: JSON.stringify(values) })
        if (resposne.success === true) {
            
            
            button.innerHTML='';
            swal("Register Success","", "success");
            setTimeout(function() {
                window.location.href = "../public/login.html";
              }, 3000);
           
           
            resetForm({email,password})
        }
    } catch (e) {
        button.innerHTML = 'Login';
        console.log("ERROR",e);
    }
}
const resetForm = (data) => {
    data.email.value = '';
    data.password.value = '';
    data.passwordConfirm.value = '';
    data.passwordConfirm= '';
}