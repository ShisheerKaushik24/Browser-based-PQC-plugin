function generateRandomKey(minLength, maxLength) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let key = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      key += characters.charAt(randomIndex);
    }
    return key;
  }
  
  function saveKeyToFile(key) {
    const element = document.createElement('a');
    const file = new Blob([key], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'generated_key.txt';
    element.click();
  }
  
  function openKeyWindow(key) {
    const windowFeatures = 'width=400,height=300';
    const keyWindow = window.open('', '_blank', windowFeatures);
    if (keyWindow) {
      const content = `
        <html>
          <head>
            <style>
              body { margin: 10px; }
              p { word-break: break-all; color: #222222; }
            </style>
          </head>
          <body>
            <div>
              <p>${key}</p>
            </div>
          </body>
        </html>
      `;
      keyWindow.document.write(content);
    } else {
      alert('Popup window could not be opened.');
    }
  }
  
  function setQRK() {
    const keyLenElement = document.getElementById("keyLen");
    if (keyLenElement) {
      const len = parseInt(keyLenElement.value);
      if (isNaN(len) || len < 10 || len > 128) {
        keyLenElement.value = '';
        return;
      }
      const key = generateRandomKey(len, len);
      openKeyWindow(key);
  
      const downloadButton = document.getElementById("downloadBtn");
      if (downloadButton) {
        downloadButton.onclick = () => {
          saveKeyToFile(key);
          downloadButton.style.display = 'none';
        };
      }
    }
  }
  
  let btnElement = document.getElementById("btn");
  if (btnElement) {
    btnElement.onclick = setQRK;
  }
  
  setQRK();
  
