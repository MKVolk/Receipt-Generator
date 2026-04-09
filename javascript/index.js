var receiptCounter = 0;
var itemCounter = 0;

// STARTUP
/** Fills the fields that can be automatically filled with changing information*/
const setData = () => {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;

    const receiptNumber = document.getElementById('receipt_n');
    receiptNumber.value = receiptCounter;
    receiptCounter ++;
    console.log('Date and number set');
};

window.onload = function() { setData(); };

// TOTAL CALCULATIONS |3 chained functions: calcSubTotal() -> calcSaleTax() -> calcTotal|
const calcSubTotal = () => {
    var sum = 0;
    const field = document.getElementById('sub_total');

    for(let i =0; i < itemCounter; i++){
        const item = document.getElementById('it_ext-price-' + i);

        if(item && item.value){
            const itemValue = parseFloat(item.value);

            if(!isNaN(itemValue)){
                sum += itemValue;
            }
        }
    }

    field.value = sum.toFixed(2);

    calcSaleTax();
};

const calcSaleTax = () =>{
    const field = document.getElementById('sales_tax');
    const taxRate = document.getElementById('tax_rate').value || 0;
    const subTotal = document.getElementById('sub_total').value || 0;

    const taxAmount = subTotal * (taxRate / 100);

    field.value = taxAmount.toFixed(2);

    calcTotal();
};

const calcTotal = () => {
    const field = document.getElementById('total');
    const salesTax = parseFloat(document.getElementById('sales_tax').value) || 0;
    const subTotal = parseFloat(document.getElementById('sub_total').value) || 0;

    var total = salesTax + subTotal;
    console.log('TOTAL:' + total.toString()); //debug

    field.value = total.toFixed(2);

    console.log('Calculations finished!')
};


// ITEMS FUNCTIONS
const addItem = () => {
    const formItemsElement = document.querySelector('formItems');
    const currentIndex = Math.floor(itemCounter).toString();
    console.log(currentIndex);

    var item = document.createElement('item');
    var itName = document.createElement('input');
    var itPrice = document.createElement('input');
    var itQty = document.createElement('input');
    var itExtPrice = document.createElement('input');
    var itDel = document.createElement('button');

    itName.id = 'it_name-' + currentIndex;
    itName.type = "text";
    itName.style = "max-width: 10em";

    itPrice.id = 'it_price-' + currentIndex;
    itPrice.type = 'number';
    itPrice.style = 'max-width: 3em';
    itPrice.onchange = function (){
        calcExtPrice(currentIndex.toString());
    };

    itQty.id = 'it_qty-' + currentIndex;
    itQty.type = 'number';
    itQty.style = 'max-width: 3em';
    itQty.value = 1;
    itQty.onchange = function (){
        calcExtPrice(currentIndex.toString());
    };

    itExtPrice.id = 'it_ext-price-' + currentIndex;
    itExtPrice.type = 'number';
    itExtPrice.style = "max-width: 3em";
    itExtPrice.readOnly = true;

    itDel.id = 'it_del-' + currentIndex;
    itDel.textContent = ' x ';
    itDel.style = "background-color: #ff55a6; box-shadow: none; box-shadow: none; color: #fff; padding: 0.3em; margin: 0.2em;";
    itDel.onclick = function () {
        delItem(currentIndex.toString());
    };

    item.id = 'item-' + currentIndex;
    item.appendChild(itName);
    item.appendChild(itPrice);
    item.appendChild(itQty);
    item.appendChild(itExtPrice);
    item.appendChild(itDel);

    formItemsElement.appendChild(item);
    itemCounter ++;

    console.log('addItem() executed');
}

const delItem = (iIndex) => {
    const index = iIndex;
    const item = document.getElementById('item-' + index);

    item.remove();

    calcSubTotal();
};

const clearItems = () => {
    for(let i =0; i < itemCounter; i++){
        var item = document.getElementById('item-' + i.toString());
        if(item){
            item.remove();
            console.log('Item: ' + 'item-' + i.toString() + ' cleared'); //DEBUG
        }
    }
    calcSubTotal();
    console.log('All Items Cleared'); //DEBUG
};

const fillRandom = () => {


    calcSubTotal();
    console.log("form filled with random data"); //DEBUG
};


// ITEM CALCULATIONS
const calcExtPrice = (iIndex) => {
    const index = iIndex;
    var total = 0;

    const itPrice = document.getElementById('it_price-' + index);
    const itQty = document.getElementById('it_qty-' + index);
    const itExtPrice = document.getElementById('it_ext-price-' + index);

    const price = parseFloat(itPrice.value);
    const quantity = parseInt(itQty.value);

    console.log('price: ' + price + ', quantity: ' + quantity); //DEBUG
    total = price * quantity;
    itExtPrice.value = total.toString();

    calcSubTotal();

    console.log('Price for item ' + index.toString() + ' is:' + total.toString()); //DEBUG
};


// FILE GENERATION FUNCTIONS and OBJECT

class ReceiptObj {

}

class ReceiptItem {
    constructor(name, uPrice, qty, totalPrice){
        this.name = name;
        this.uPrice = uPrice;
        this.qty = qty;
        this.totalPrice = totalPrice;
    }
}

const downloadHandler = () => {
    const fileName = 'Receipt-' + receiptCounter.toString();
    const fileExtension = 'srec';
    var content = '';


    //Fetch data into Object

    //Encode data into file

    //Download File    
    downloadFile(fileName,content, fileExtension);
};

const downloadFile = (fileName,content,extension) => {
    const text = content ;
    const element = document.createElement('a');
    const mimeType = 'application/octect-stream';
    var type = extension;

    const file = new Blob([text], {type: mimeType});

    element.href = URL.createObjectURL(file);
    element.download = fileName + '.' + type;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    console.log("Receipt Download"); //DEBUG
};