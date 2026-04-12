function handleLogin(){
    const role = document.querySelector('input[name="role"]:checked').value;
    const phone = document.getElementByID('phone').value;
    const password = document.getElementByID('password').value;

    if (phone === 12345 && password ==="pawonboy"){
        localStorage.setItem("UserRole", role);
        localStorage.setItem("userphone", phone);
    
    if (role === "merchant"){
        window.location.href = "index.html";

    }
    else{
        window.location.href ="customer_dashboard.html";
    }
}
else {
    alert("Incorrect phone number or password");
}
}
function handleSignup(){
    alert("we will add a signup page as we update the app")
}
