// clicked remove button
$(document).on("click", ".btn-remove", function(e) {
  $(e.target).parents("tr").remove();
})

$(document).ready(function() {
  setPatternList();

  // clicked add button
  $("#btn-addPattern").click(function() {
    $("#mod-patternList").append(getPatternTemplate());
  })

  // clicked save button
  $("#btn-savePatterns").click(function() {
    // get list formatting
    let patterns = getPatternList();
    console.log(patterns);
    if ( patterns != 'error' ) {
      // save patterns
      savePatterns(patterns);
    }
  })
});

function setPatternList() {
  chrome.storage.local.get('patterns', function (items) {
    var patterns = Object.values(items['patterns']);

    patterns.forEach(function(pattern) {
      $("#mod-patternList").append(getPatternTemplate(pattern['patternType'], pattern['pattern'], pattern['message']));
    });
  });
}

function savePatterns(patterns) {
   chrome.storage.local.set({'patterns': patterns}, function () {
     alert("Saved successfully");
   });
}

function getPatternList() {
  const indexPatternType = 0
  ,     indexPattern = 1
  ,     indexMessage = 2
  ;

  var list = {}
  ,   error = ''
  ;

  $(".pattern").each(function(index) {
    var datas = $(this).children()
    ,   patternType = $(datas[indexPatternType]).find("select option:selected").val()
    ,   pattern = $(datas[indexPattern]).find("input").val()
    ;

    if ( !['regex', 'wildcard'].includes(patternType) ) {
      alert('Incorrect pattern type entered.');
      error = 'error';
    }

    if ( !pattern ) {
      alert('There are no input pattern.');
      error = 'error';
    }

    list[index] = {
      'patternType': patternType,
      'pattern': pattern,
      'message': $(datas[indexMessage]).find("input").val()
    };
  });

  if ( error == 'error' ) {
    return error
  }

  return list;
}

function getPatternTemplate(argPatternType = "", argPattern = "", argMessage = "") {
  var selectedRegex = "selected"
  ,   selectedWildcard = ""
  ;

  if (argPatternType == "wildcard") {
    selectedRegex = "";
    selectedWildcard = "selected";
  }

  let patternType = "<td><select name='pattern-type'><option value='regex' " + selectedRegex + ">regex</option><option value='wildcard' " + selectedWildcard + ">wildcard</option></select></td>"
  ,   pattern = "<td><input class='input-xlarge' type='text' placeholder='enter pattern' value='" + argPattern +"'></td>"
  ,   message = "<td><input class='input-xlarge' type='text' placeholder='enter message' value='" + argMessage +"'></td>"
  ,   remove= "<td><button type='button' class='btn btn-danger btn-remove'>Remove</button></td>"
  ;

  let patternTemplate = "<tr class='pattern'>" + patternType + pattern + message + remove + "</tr>";

  return patternTemplate;
}
