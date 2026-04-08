var receiptCounter = 0;
var itemCounter = 0;

const clear = () => {

};

const fillRandom = () => {

    console.log("form filled with random data");
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
    const currentIndex = Math.floor(itemCounter).toString;

    var item = document.createElement('item');
    var itName = document.createElement('input');
    var itPrice = document.createElement('input');
    var itQty = document.createElement('input');
    var itExtPrice = document.createElement('input');

    itName.id = 'it_name-' + currentIndex;
    itName.type = "text";

    itPrice.id = 'it_price-' + currentIndex;
    itPrice.type = 'number';

    itQty.id = 'it_qty-' + currentIndex;
    itQty.type = 'number';

    itExtPrice.id = 'it_ext-price-' + currentIndex;
    itExtPrice.type = 'number';

    item.id = 'item-' + currentIndex;
    item.appendChild(itName);
    item.appendChild(itPrice);
    item.appendChild(itQty);
    item.appendChild(itExtPrice);

    formItemsElement.appendChild(item);

  }