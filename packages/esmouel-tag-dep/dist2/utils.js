"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runEnv = runEnv;
exports.getQueryString = getQueryString;
exports.dataChangeDay = dataChangeDay;
exports.getDurationText = getDurationText;
exports.browser = exports.copyText = exports.getStrLength = exports.getUserInfoByCookies = exports.getPlatform = exports.sendErrorToParentFrame = exports.doCustomTimes = exports.countModalHeight = exports.dateFormat = exports.depClone = void 0;

var _jsCookie = _interopRequireDefault(require("js-cookie"));

var _iview = require("iview");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function runEnv() {
  if (window) {
    var location = window.location.hostname;

    if (location.indexOf('.dev.') > -1 || process.env.NODE_ENV === 'development' || sessionStorage.getItem('currentEnv') === 'dev') {
      return 'dev';
    } else if (location.indexOf('beta-one') > -1) {
      return 'external';
    } else if (location.indexOf('.net') > -1) {
      return 'beta';
    } else {
      return 'prod';
    }
  }
}

function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var regRewrite = new RegExp('(^|/)' + name + '/([^/]*)(/|$)', 'i');
  var r = window.location.search.substr(1).match(reg);
  var q = window.location.pathname.substr(1).match(regRewrite);

  if (r != null) {
    return unescape(r[2]);
  } else if (q != null) {
    return unescape(q[2]);
  } else {
    return null;
  }
} // 深拷貝


var depClone = function depClone(obj1, obj2) {
  obj1 = obj1 || {};

  for (var k in obj2) {
    if (obj2[k] && _typeof(obj2[k]) === 'object') {
      obj1[k] = obj2[k].constructor === Array ? [] : {};
      depClone(obj1[k], obj2[k]);
    } else {
      obj1[k] = obj2[k];
    }
  }
}; // 时间格式化


exports.depClone = depClone;

var dateFormat = function dateFormat(time, format) {
  if (!time) return '';
  time = typeof time === 'string' ? parseInt(time) : time;
  time = time.toString().length === 10 ? time * 1000 : time;
  var t = new Date(time);

  var tf = function tf(i) {
    return (i < 10 ? '0' : '') + i;
  };
  /* 添加冗余判断 */


  format = format || 'yyyy-MM-dd HH:mm:ss';
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear());

      case 'MM':
        return tf(t.getMonth() + 1);

      case 'mm':
        return tf(t.getMinutes());

      case 'dd':
        return tf(t.getDate());

      case 'HH':
        return tf(t.getHours());

      case 'ss':
        return tf(t.getSeconds());
    }
  });
};

exports.dateFormat = dateFormat;

var countModalHeight = function countModalHeight() {
  var winHeight = document.documentElement.clientHeight;
  /* 220 留白 */

  var list = document.querySelectorAll('.ivu-modal-body');

  if (list.length) {
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      item.style.maxHeight = (winHeight - 220 < 300 ? 300 : winHeight - 220) + 'px';
      item.style.overflow = 'auto'; // item.scrollTop = 0;
    }
  }
};
/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */


exports.countModalHeight = countModalHeight;

var doCustomTimes = function doCustomTimes(times, callback) {
  var i = -1;

  while (++i < times) {
    callback(i);
  }
};
/**
 * 发送错误数据到父页面
 * @param msg
 */


exports.doCustomTimes = doCustomTimes;

var sendErrorToParentFrame = function sendErrorToParentFrame(msg) {
  window.parent.postMessage(msg + config.postMessageTag, '*');
};

exports.sendErrorToParentFrame = sendErrorToParentFrame;

var getPlatform = function getPlatform() {
  return sessionStorage.getItem('X-Ca-platform') || 'service';
};

exports.getPlatform = getPlatform;

var getUserInfoByCookies = function getUserInfoByCookies(USER_KEY) {
  var userInfo = JSON.parse(decodeURIComponent(_jsCookie.default.get(USER_KEY)));
  if (userInfo) return userInfo;else return false;
};

exports.getUserInfoByCookies = getUserInfoByCookies;

var getStrLength = function getStrLength(str, len, ellipsis) {
  if (!str || !len) {
    return '';
  }

  if (str.length && str.length > len && ellipsis) {
    return str.substring(0, len) + '...';
  } else {
    return str.substring(0, len);
  }
};

exports.getStrLength = getStrLength;

var copyText = function copyText(setVal) {
  var el = document.getElementById('copy-input-item');

  if (!el) {
    var newEl = document.createElement('input');
    newEl.type = 'text';
    newEl.id = 'copy-input-item';
    document.body.appendChild(newEl);
    el = document.getElementById('copy-input-item');
  }

  el.value = setVal;
  el.select();

  if (setVal && document.execCommand('Copy')) {
    _iview.Message.success('复制成功');
  } else {
    _iview.Message.success('复制失败');
  }
};

exports.copyText = copyText;

var browser = function browser() {
  var Sys = {};
  var s;
  var ua = navigator.userAgent.toLowerCase(); // eslint-disable-next-line no-unused-expressions

  (s = ua.match(/edge\/([\d.]+)/)) ? Sys.edge = s[1] : (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] : (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] : (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] : (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] : (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
  return Sys;
};

exports.browser = browser;

function dataChangeDay(date) {
  if (date) {
    var dayList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var day = new Date(date).getDay();
    return dayList[day];
  }
}

function getDurationText(ms) {
  var allSeconds = parseInt(ms / 1000);
  var result = '';
  var hours, minutes, seconds;

  if (allSeconds >= 3600) {
    hours = parseInt(allSeconds / 3600);
    result += ('00' + hours).slice(-2) + ' : ';
  }

  if (allSeconds >= 60) {
    minutes = parseInt(allSeconds % 3600 / 60);
    result += ('00' + minutes).slice(-2) + ' : ';
  } else {
    result += '00 : ';
  }

  seconds = parseInt(allSeconds % 3600 % 60);
  result += ('00' + seconds).slice(-2);
  return result;
}