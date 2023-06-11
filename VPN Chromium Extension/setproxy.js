document.getElementsById('setproxy').onclick(()=> {
  var config = {
    mode: "pac_script",
    pacScript: {
      data:
        "function FindProxyForURL(url, host) {\n" +
        " if (host == 'www.google.com' )\n" +
        "   return 'PROXY 34.73.175.255:5050';\n" +
        " return 'DIRECT';\n" +
        "}",
    },
  };

  chrome.proxy.settings.set(
    { value: config, scope: "regular" },
    function () {}
    );
  })
  
  document.getElementById('unsetproxy').onclick(()=> {
    chrome.proxy.settings.set(
      { value: { mode: "direct"}, scope: "regular" },
      function () {}
    );
  
  })
