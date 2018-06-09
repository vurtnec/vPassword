
module.exports = {
  jsonFormat: jsonFormat,
  checkExisted: checkExisted,
  updateItem: updateItem,
  isJSON: isJSON,
  encode: encode,
  decode: decode,
  copyArr: copyArr
};

function jsonFormat(str) {
  return JSON.parse(str);
}

function checkExisted(arr, pass) {
  var isExisted = false;
  for (var i = 0, len = arr.length; i < len; ++i) {
    if (arr[i].name == pass.name) {
      isExisted = true;
    }
  }
  return isExisted;
}

function updateItem(arr, pass) {
  for (var i = 0, len = arr.length; i < len; ++i) {
    if (arr[i].name == pass.name) {
      arr[i] = pass;
    }
  }
}

function isJSON(str) {
  if (typeof str == 'string') {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
}

function encode(code) {
  var c = String.fromCharCode(code.charCodeAt(0) + code.length);
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
  }
  return escape(c);
}

function decode(code) {
  code = unescape(code);
  var c = String.fromCharCode(code.charCodeAt(0) - code.length);
  for (var i = 1; i < code.length; i++) {
    c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
  }
  return c;
}

function copyArr(arr) {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    res.push(arr[i])
  }
  return res
}