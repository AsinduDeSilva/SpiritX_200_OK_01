document.getElementById('inputPassword5').addEventListener('input', function(e) {
    const password = e.target.value;
    const strength = calculatePasswordStrength(password);
    updateStrengthIndicator(strength);
});

const lowercase = document.getElementById('lowercase');
const uppercase = document.getElementById('uppercase');
const number = document.getElementById('number');
const special = document.getElementById('special');
const length = document.getElementById('length');

function calculatePasswordStrength(password) {
    let strength = 0;
    
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const isLong = password.length >= 8;



    if(hasLower){
        lowercase.classList.add("text-success");
        lowercase.classList.remove("text-danger");
        strength++
    }else{
        lowercase.classList.add("text-danger");
        lowercase.classList.remove("text-success");
    }

    if(hasUpper){
        uppercase.classList.add("text-success");
        uppercase.classList.remove("text-danger");
        strength++
    }else{
        uppercase.classList.add("text-danger");
        uppercase.classList.remove("text-success");
    }

    if(hasNumber){
        number.classList.add("text-success");
        number.classList.remove("text-danger");
        strength++
    }else{
        number.classList.add("text-danger");
        number.classList.remove("text-success");
    }

    if(hasSpecial){
        special.classList.add("text-success");
        special.classList.remove("text-danger");
        strength++
    }else{
        special.classList.add("text-danger");
        special.classList.remove("text-success");
    }

    if(isLong){
        length.classList.add("text-success");
        length.classList.remove("text-danger");
        strength++
    }else{
        length.classList.add("text-danger");
        length.classList.remove("text-success");
    }

    return strength;
}

function updateStrengthIndicator(strength) {
    const bar = document.getElementById('strengthBar');
    const text = document.getElementById('strengthText');
    const widthMap = {0: 0, 1: 20, 2: 40, 3: 60, 4: 80, 5: 100};
    
    // Update progress bar width
    bar.style.width = widthMap[strength] + '%';

    // Update colors and text based on strength
    bar.classList.remove('bg-danger', 'bg-warning', 'bg-info', 'bg-success');
    text.classList.remove('text-danger', 'text-warning', 'text-info', 'text-success');

    if (strength <= 1) {
        bar.classList.add('bg-danger');
        text.textContent = 'Weak';
        text.classList.add('text-danger');
    } else if (strength <= 3) {
        bar.classList.add('bg-warning');
        text.textContent = 'Medium';
        text.classList.add('text-warning');
    } else if (strength === 4) {
        bar.classList.add('bg-info');
        text.textContent = 'Strong';
        text.classList.add('text-info');
    } else {
        bar.classList.add('bg-success');
        text.textContent = 'Very Strong';
        text.classList.add('text-success');
    }
}

let username = document.getElementById("username");
let passwordD = document.getElementById("inputPassword5");
let confirmPassword = document.getElementById("inputPasswordCheck5");

function validate(){
    if(username.value){
        username.classList.remove("is-invalid")
        username.classList.add("is-valid")
        document.getElementById("un-validation").innerText="";
    }else{
        username.classList.remove("is-valid")
        username.classList.add("is-invalid")
        document.getElementById("un-validation").innerText="Username field is required";
    }

    if(passwordD.value){
        if(calculatePasswordStrength(passwordD.value)==5){
            passwordD.classList.remove("is-invalid")
            passwordD.classList.add("is-valid")
            document.getElementById("pww-validation").innerText="";
        }else{
            passwordD.classList.remove("is-valid")
            passwordD.classList.add("is-invalid")
            document.getElementById("pww-validation").innerText="Make sure you have a strong password";
        }
        
    }else{
        passwordD.classList.remove("is-valid")
        passwordD.classList.add("is-invalid")
        document.getElementById("pww-validation").innerText="Password field is required"; 
    }

    if(confirmPassword.value && (confirmPassword.value == passwordD.value)){
        confirmPassword.classList.remove("is-invalid")
        confirmPassword.classList.add("is-valid")
        document.getElementById("cw-validation").innerText="";
    }else{
        confirmPassword.classList.remove("is-valid")
        confirmPassword.classList.add("is-invalid")
        document.getElementById("cw-validation").innerText="Enter correct password"; 
    }

    return username.value && passwordD.value && (calculatePasswordStrength(passwordD.value)==5) && confirmPassword.value && (passwordD.value == confirmPassword.value);
}

const form = document.getElementById('myForm1');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if (validate()){

        fetch(`${backendUrl}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username.value,
                password: passwordD.value
            })
        })
        .then(res => res.json())
        .then(data => {

            if(data.success){
                setTimeout(()=> {
                    location.href = "signin.html";
                }, 2000)
        
                alert("Successfully signed up");
            }else{
                alert(data.message)
            }

            
        })

    }
}
)