const form = document.getElementById('form');
const ussername = document.getElementById('username');
const name = document.getElementById('name');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input,message){
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
    
}

// no special characters
function isValidEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email.value).toLowerCase())){
       showSuccess(email);
    }else{
        showError(email,'not valid');
    }
    
}

// check required field
function checkRequired(inputArr){
  inputArr.forEach(input => {
       if(input.value.trim() === ''){
           showError(input,`${getFieldName(input)} is required`)
       }else{
           showSuccess(input);
       }
  });
}

// Get field Name
 function getFieldName(input){
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
 }

 // check input length
 function checkLength(input,min,max){
     if(input.value.length<min){
         showError(input,`${getFieldName(input)} must be atleast ${min} characters`)
     }else if(input.value.length>max){
        showError(input,`${getFieldName(input)} must not exceed ${max} characters`)
     }else{
         showSuccess(input);
     }
 }

// Event Listeners
form.addEventListener('submit',(e)=>{
    e.preventDefault();
   
    checkRequired([username,email,password,password2]);
     checkLength(username,3, 15);
     checkLength(password,6, 25);
     isValidEmail(email);
     checkPasswordMatch(password,password2);
});