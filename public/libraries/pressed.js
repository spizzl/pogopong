'use strict';

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var list = {};
var isListening = false;

var LEFT_COMMAND_STRING = 'left command';
var LEFT_COMMAND = 91;
var RIGHT_COMMAND = 93;
var HIGHEST_MOUSE_CODE = 4;

var mousecode = function mousecode(code) {
  if (typeof code === 'string') {
    if (code.toLowerCase().search(/mouse /) === 0) {
      // return the mouse button code
      code = code.charAt(6);
      if (code >= 0 && code <= HIGHEST_MOUSE_CODE) {
        return code;
      }
    }
  }
  if (typeof code === 'number') {
    if (code >= 0 && code <= HIGHEST_MOUSE_CODE) {
      return 'mouse ' + code;
    }
  }
  return null;
};

var mouseAndKeyCode = function mouseAndKeyCode(key) {
  var code = mousecode(key);
  if (code !== null) {
    return code;
  }
  return (0, _keycode2.default)(key);
};

var pressed = function pressed(key) {
  checkForListener();
  var checkList = function checkList(key) {
    return list[key] !== undefined;
  };

  if (typeof key === 'string') {
    var code = mouseAndKeyCode(key);
    if (isNaN(code)) {
      throw new Error(key + ' is not a supported key name.');
    }

    // Special case for modifier key strings:
    // String representations of command should return true when either the
    // Left or Right Command key is pressed (unless the side is specified).
    if (code === 91) {
      if (key !== LEFT_COMMAND_STRING) {
        return checkList(LEFT_COMMAND) || checkList(RIGHT_COMMAND);
      }
    }
    key = code;
  }

  if (isNaN(key)) {
    throw new Error('`key` must be either an integer key code or a string.');
  }

  return checkList(key);
};

pressed.key = function (key) {
  if (mousecode(key)) {
    throw new Error('pressed.key() only accepts key strings or ints. For mouse clicks, use pressed.mosueButton()');
  }
  return pressed(key);
};

pressed.mouseButton = function (code) {
  if (typeof code !== 'number') {
    throw new Error('pressed.mouseButton() only accepts integer arguments.');
  }
  code = mousecode(code);
  if (code === null) {
    throw new Error('pressed.mouseButton() only works with mouseCodes 0-4');
  }
  return pressed(code);
};

pressed.every = function () {
  for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
    keys[_key] = arguments[_key];
  }

  checkForListener();

  return keys.reduce(function (defined, key) {
    return defined && pressed(key);
  }, true);
};

pressed.some = function () {
  for (var _len2 = arguments.length, keys = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    keys[_key2] = arguments[_key2];
  }

  checkForListener();

  return keys.reduce(function (defined, key) {
    return defined || pressed(key);
  }, false);
};

pressed.listAllKeyCodes = function () {
  return Object.keys(list).map(function (key) {
    return parseInt(key);
  });
};
pressed.listAllKeys = function () {
  return pressed.listAllKeyCodes().map(_keycode2.default);
};

pressed.start = function (eventEmitter) {
  if (!isListening) {
    if (!eventEmitter && undefined !== window) {
      eventEmitter = window;
    }
    if (!eventEmitter.addEventListener || !eventEmitter.removeEventListener) {
      throw new Error('Could not find a valid `eventEmitter` object (usually window). This code will not work outside of a browser environment (i.e. in node) unless you provide a valid object with addEventListener and removeEventListener that dispatches `keydown` and `keyup` events.');
    }
    eventEmitter.addEventListener('keydown', onKeyDown);
    eventEmitter.addEventListener('keyup', onKeyUp);
    eventEmitter.addEventListener('blur', onBlur);
    eventEmitter.addEventListener('mousedown', onMouseDown);
    eventEmitter.addEventListener('mouseup', onMouseUp);
    pressed.reset();
    isListening = true;
  }
};

pressed.reset = function () {
  list = {};
  pressed.list = list;
};
pressed.add = function () {
  for (var _len3 = arguments.length, keys = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    keys[_key3] = arguments[_key3];
  }

  keys.map(function (key) {
    if (typeof key === 'string') {
      key = (0, _keycode2.default)(key);
    }
    list[key] = true;
  });
};
pressed.remove = function () {
  for (var _len4 = arguments.length, keys = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    keys[_key4] = arguments[_key4];
  }

  keys.map(function (key) {
    if (typeof key === 'string') {
      key = (0, _keycode2.default)(key);
    }
    delete list[key];
  });
};

var onKeyDown = function onKeyDown(_ref) {
  var keyCode = _ref.keyCode;

  list[keyCode] = true;
};
var onKeyUp = function onKeyUp(_ref2) {
  var keyCode = _ref2.keyCode;

  delete list[keyCode];
};
var onMouseDown = function onMouseDown(_ref3) {
  var button = _ref3.button;

  onKeyDown({ keyCode: button });
};
var onMouseUp = function onMouseUp(_ref4) {
  var button = _ref4.button;

  onKeyUp({ keyCode: button });
};

var onBlur = function onBlur(event) {
  pressed.reset();
};

pressed.stop = function (eventEmitter) {
  if (isListening) {
    if (!eventEmitter && undefined !== window) {
      eventEmitter = window;
    }
    if (eventEmitter.removeEventListener) {
      eventEmitter.removeEventListener('keydown', onKeyDown);
      eventEmitter.removeEventListener('keyup', onKeyUp);
      eventEmitter.removeEventListener('blur', onBlur);
      pressed.reset();
      isListening = false;
    }
  }
};

pressed.isListening = function () {
  return isListening;
};

var checkForListener = function checkForListener() {
  if (!isListening) {
    throw new Error('Key listener is not running. You must run pressed.start() to initialize the tracker.');
  }
};

module.exports = pressed;
