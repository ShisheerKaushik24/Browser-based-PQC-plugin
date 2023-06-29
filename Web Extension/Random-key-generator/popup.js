function generateRandomKey(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    key += characters.charAt(randomIndex);
  }
  return key;
}

function load(bounds, len, web = false) {
    if (len === 1) {
        document.getElementById("rn").innerText = generateRandomKey(10);
        if (!web && !rn.qrn) {
            document.getElementById("rn").title = "Error: PRNG";
            document.getElementById("rn").style.color = "#666666";
        }
    }
    else {
        if (rn.win) rn.win.close();
        let qrns = [];
        for (let i = 0; i < len; i++) qrns.push(generateRandomKey(10));
        rn.win = window.open("", "_blank", "width=175,height=120", true);
        rn.win.document.write("<a href=data:text/plain,"+qrns+" download='qrns-"+bounds+"'>Save</a>" + (web || rn.qrn ? "<p style='word-break: break-all; color: #222222;'>"+qrns+"</p>" : "<p style='word-break: break-all; color: #666666;' title='Error: PRNG'>"+qrns+"</p>"));
    }
    document.body.style.cursor = "auto";
}

function request(bounds, len) {
    document.body.style.cursor = "progress";
    rn.qrn = null; // Reset the QRN variable as it won't be used
    load(bounds, len, true); // Call load directly with the generated random key
}

function setQRN() {
    let len = parseInt(document.getElementById("len").value);
    if (!len > 0) {
        len = 1;
        document.getElementById("len").value = len;
    }
    request(null, len); // Pass null instead of bounds as it won't be used
}

let rn = {index: 0};
document.getElementById("btn").onclick = setQRN;
setQRN();
