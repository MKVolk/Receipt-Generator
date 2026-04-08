

const downloadHandler = (fileName,content,extension) => {
    const text =content ;
    const element = document.createElement('a');
    const mimeType = 'application/octect-stream';
    var type = extension;

    const file = new Blob([text], {type: mimeType});

    element.href = URL.createObjectURL(file);
    element.download = fileName + '.' + type;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const addItem = () => {
    const formItemsElement = document.querySelector('formItems');


  }