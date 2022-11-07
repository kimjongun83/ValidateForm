import ApiHepler from "../services/services.js";
import { parseObjectToFormData } from '../utils/function.js'
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const form = document.querySelector('form');
const button = document.querySelector('.register-submit');

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
form.addEventListener('submit', e => {
        e.preventDefault();
    
        validateInputs();
       
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        console.log("data",data);
        login(data)
    
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
      
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();
      
      
    
     
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
        
    
    
    };
    
    
    const login = async (values) => {
        try {
          
            button.setAttribute('disabled', true)
            button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span><span class="visually-hidden">Login...</span>`;
            const resposne = await ApiHepler.post({ path: 'auth/login', payload: parseObjectToFormData(values)});
            console.log("response",resposne);
            if (resposne.success === true) {
                button.innerHTML = 'Login';
             
                swal("Login Success","", "success");
                setTimeout(function() {
                    window.location.href = "../public/login.html";
                  }, 3000);
               
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
