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
function parseReciept(receiptLang){
const lines = recieptLang.split('\n');
let subtotal= 0;
let tips = 0;
lines.forEach(line =>{
if (line.includes("PRICE")){
const price = parseFloat(line.match(/PRICE (\d+\.\d+)/)[1]);
const qty = parseInt(line.match(/QTY (\d+)/)[1]);
subtotal += (price * qty);
}
})
if (line.includes("TIPS")){
const tax = parseFloat(line.match(/TAX (\d+\.\d+)/)[1]);
return {
        total: subtotal + tax + tip,
        taxAndTips: tax + tip
    };


}
