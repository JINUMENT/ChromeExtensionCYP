document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("btn-setting").addEventListener("click", function() {
    chrome.tabs.create({ url: '/src/setting/default.html' });
  });
});
