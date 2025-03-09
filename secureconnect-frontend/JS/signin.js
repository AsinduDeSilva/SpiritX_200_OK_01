const username = document.getElementById('si-username');
const password = document.getElementById('si-inputPassword5');

function validate() {
    if (username.value) {
        username.classList.remove("is-invalid")
        username.classList.add("is-valid")
        document.getElementById("si-un-validation").innerText="";
    }else{
        username.classList.remove("is-valid")
        username.classList.add("is-invalid")
        document.getElementById("si-un-validation").innerText="Username field is required";
    }

    if (password.value) {
        password.classList.remove("is-invalid")
        password.classList.add("is-valid")
        document.getElementById("si-pww-validation").innerText="";
    }else{
        password.classList.remove("is-valid")
        password.classList.add("is-invalid")
        document.getElementById("si-pww-validation").innerText="Password field is required";
    }

    return username.value && password.value;
}
const form = document.getElementById('myForm1');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validate()) {
        fetch(`${backendUrl}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username.value,
                password: password.value
            })
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("loggedUser", username.value)
            if(data.success){
                location.href = "index.html";
            }else{
                alert(data.message)
            }
        
        })
    }
});
