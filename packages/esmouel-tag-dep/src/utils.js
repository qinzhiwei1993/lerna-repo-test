import Cookies from 'js-cookie'
import { Message } from 'iview'
export function runEnv () {
  if (window) {
    const location = window.location.hostname
    if (location.indexOf('.dev.') > -1 || process.env.NODE_ENV === 'development' || sessionStorage.getItem('currentEnv') === 'dev') {
      return 'dev'
    } else if (location.indexOf('beta-one') > -1) {
      return 'external'
    } else if (location.indexOf('.net') > -1) {
      return 'beta'
    } else {
      return 'prod'
    }
  }
}

export function getQueryString (name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  const regRewrite = new RegExp('(^|/)' + name + '/([^/]*)(/|$)', 'i')
  const r = window.location.search.substr(1).match(reg)
  const q = window.location.pathname.substr(1).match(regRewrite)
  if (r != null) {
    return unescape(r[2])
  } else if (q != null) {
    return unescape(q[2])
  } else {
    return null
  }
}

// 深拷貝
export const depClone = (obj1, obj2) => {
  obj1 = obj1 || {}
  for (var k in obj2) {
    if (obj2[k] && typeof obj2[k] === 'object') {
      obj1[k] = obj2[k].constructor === Array ? [] : {}
      depClone(obj1[k], obj2[k])
    } else {
      obj1[k] = obj2[k]
    }
  }
}

// 时间格式化
export const dateFormat = function (time, format) {
  if (!time) return ''
  time = typeof time === 'string' ? parseInt(time) : time
  time = time.toString().length === 10 ? time * 1000 : time
  let t = new Date(time)
  let tf = function (i) {
    return (i < 10 ? '0' : '') + i
  }
  /* 添加冗余判断 */
  format = format || 'yyyy-MM-dd HH:mm:ss'

  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear())
      case 'MM':
        return tf(t.getMonth() + 1)
      case 'mm':
        return tf(t.getMinutes())
      case 'dd':
        return tf(t.getDate())
      case 'HH':
        return tf(t.getHours())
      case 'ss':
        return tf(t.getSeconds())
    }
  })
}

export const countModalHeight = () => {
  let winHeight = document.documentElement.clientHeight
  /* 220 留白 */
  const list = document.querySelectorAll('.ivu-modal-body')
  if (list.length) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i]
      item.style.maxHeight = (winHeight - 220 < 300 ? 300 : winHeight - 220) + 'px'
      item.style.overflow = 'auto'
      // item.scrollTop = 0;
    }
  }
}
/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
  let i = -1
  while (++i < times) {
    callback(i)
  }
}
/**
 * 发送错误数据到父页面
 * @param msg
 */
export const sendErrorToParentFrame = (msg) => {
  window.parent.postMessage(msg + config.postMessageTag, '*')
}

export const getPlatform = () => {
  return sessionStorage.getItem('X-Ca-platform') || 'service'
}
export const getUserInfoByCookies = (USER_KEY) => {
  const userInfo = JSON.parse(decodeURIComponent(Cookies.get(USER_KEY)))
  if (userInfo) return userInfo
  else return false
}
export const getStrLength = (str, len, ellipsis) => {
  if (!str || !len) {
    return ''
  }
  if (str.length && str.length > len && ellipsis) {
    return str.substring(0, len) + '...'
  } else {
    return str.substring(0, len)
  }
}

export const copyText = (setVal) => {
  let el = document.getElementById('copy-input-item')
  if (!el) {
    const newEl = document.createElement('input')
    newEl.type = 'text'
    newEl.id = 'copy-input-item'
    document.body.appendChild(newEl)
    el = document.getElementById('copy-input-item')
  }
  el.value = setVal
  el.select()
  if (setVal && document.execCommand('Copy')) {
    Message.success('复制成功')
  } else {
    Message.success('复制失败')
  }
}

export const browser = () => {
  let Sys = {}
  let s
  const ua = navigator.userAgent.toLowerCase();
  // eslint-disable-next-line no-unused-expressions
  (s = ua.match(/edge\/([\d.]+)/)) ? Sys.edge = s[1]
    : (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1]
      : (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1]
        : (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1]
          : (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1]
            : (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1]
              : (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0
  return Sys
}
export function dataChangeDay (date) {
  if (date) {
    let dayList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    let day = new Date(date).getDay()
    return dayList[day]
  }
}

export function getDurationText (ms) {
  var allSeconds = parseInt(ms / 1000)
  var result = ''
  var hours, minutes, seconds
  if (allSeconds >= 3600) {
    hours = parseInt(allSeconds / 3600)
    result += ('00' + hours).slice(-2) + ' : '
  }
  if (allSeconds >= 60) {
    minutes = parseInt(allSeconds % 3600 / 60)
    result += ('00' + minutes).slice(-2) + ' : '
  } else {
    result += '00 : '
  }
  seconds = parseInt(allSeconds % 3600 % 60)
  result += ('00' + seconds).slice(-2)
  return result
}
