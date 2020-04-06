checkUrl();

function checkUrl() {
  var currentUrl = window.location.href;

  chrome.storage.local.get('patterns', function (items) {
    var patterns = Object.values(items['patterns']);

    patterns.forEach(function(pattern) {
      switch (pattern['patternType']) {
        case 'regex':
          var regex = "/" + pattern['pattern'] + "/"

          if (currentUrl.match(regex)) {
            alert(pattern['message']);
          }
          break;
        case 'wildcard':
          if (currentUrl == pattern['pattern']) {
            alert(pattern['message']);
          }
          break;
      }
    });
  });
}
