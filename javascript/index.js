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

    const tip = parseFloat(document.getElementById('custom_tip').value) || 0; // Add Tip

    var total = salesTax + subTotal + tip;
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
    constructor(phone, store, date, subtotal, tip, tax){
        this.phone = phone;
        this.store = store;
        this.date = date;
        this.subTotal = subtotal;
        this.tip = tip;
        this.tax = tax;
        this.total = subtotal + tip + tax;
    }

}

class ReceiptItem {
    constructor(name, uPrice, qty){
        this.name = name;
        this.uPrice = uPrice;
        this.qty = qty;
        this.totalPrice = uPrice * qty;
    }
}

//calls generationHandler and displays its return into 'lang_box'
const generateReceipt = () => {
    //Generate text
    const genLang = generationHandler();
    //Display text
    const langBox = document.getElementById('lang_box');
    langBox.value = genLang;
    console.log("generateReceipt()" + genLang); //DEBUG
};


const downloadFile = () => {
    const fileName = 'Receipt-' + receiptCounter.toString();
    const fileExtension = 'srec';

    //Fetch data from lang_box into content
    const content = document.getElementById('lang_box').value;

    //Download File    
    downloadHandler(fileName,content, fileExtension);
};

// Gets data from the forms, creates a REceiptObj, converts it to text and returns it
const generationHandler = () => {
    let text = '';

    // HEADER DATA
    const phone = document.getElementById('custom_phone')?.value || '';
    const store = document.getElementById('store_name')?.value || '';
    const date = document.getElementById('date')?.value || '';

    const subtotal = parseFloat(document.getElementById('sub_total')?.value || '0');
    const tax = parseFloat(document.getElementById('sales_tax')?.value || '0');
    const total = parseFloat(document.getElementById('total')?.value || '0');

    const tip = parseFloat(document.getElementById('custom_tip')?.value || '0');

    // START RECEIPT
    text += `RECEIPT {\n`;
    text += `  PHONE: "${phone}"\n`;
    text += `  STORE: "${store}"\n`;
    text += `  DATE: "${date}"\n\n`;

    // ITEMS
    for (let i = 0; i < itemCounter; i++) {
        const nameEl = document.getElementById('it_name-' + i);
        const priceEl = document.getElementById('it_price-' + i);
        const qtyEl = document.getElementById('it_qty-' + i);

        if (!nameEl || !priceEl || !qtyEl) continue;

        const name = nameEl.value || '';
        const price = parseFloat(priceEl.value || '0').toFixed(2);
        const qty = parseInt(qtyEl.value || '0');

        //Skip
        if (name === '' && qty === 0) continue;

        text += `  ITEM {\n`;
        text += `    NAME: "${name}"\n`;
        text += `    QTY: ${qty}\n`;
        text += `    PRICE: ${price}\n`;
        text += `  }\n\n`;
    }

    // totals
    text += `  SUBTOTAL: ${subtotal.toFixed(2)}\n`;
    text += `  TAX: ${tax.toFixed(2)}\n`;
    text += `  TIP: ${tip.toFixed(2)}\n`;
    text += `  TOTAL: ${total.toFixed(2)}\n`;
    text += `}`;

    console.log("generationHandler() executed" + text); //DEBUG
    return text;
};

const downloadHandler = (fileName,content,extension) => {
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
