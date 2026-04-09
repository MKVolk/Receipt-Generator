var receiptCounter = 0;
var itemCounter = 0;

const clear = () => {

};

const fillRandom = () => {

    console.log("form filled with random data");
};

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
    console.log('Price for item ' + index.toString() + ' is:' + total.toString()); //DEBUG
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
    itDel.style = "background-color: #ffb3ce; box-shadow: none; box-shadow: none; color: #fff; padding: 0.3em; margin: 0.2em;";
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
};