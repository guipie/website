import parser from 'ua-parser-js'

export const uaParser = (userAgent) => {
  const parseResult = (parser)(userAgent || '')
  const browserName = String(parseResult.browser.name).toLowerCase()
  const isBrowser = (browsers) => {
    return browsers.some(browser => browser.toLowerCase() === browserName)
  }
  return {
    result: parseResult,
    isIE: isBrowser(['compatible', 'MSIE', 'IE']),
    isEdge: isBrowser(['Edge']),
    isFirefox: isBrowser(['Firefox']),
    isChrome: isBrowser(['Chrome', 'Chromium']),
    isSafari: isBrowser(['Safari']),
    isWechat: isBrowser(['Wechat']),
    isIos: parseResult.os.name === 'iOS',
    isAndroid: parseResult.os.name === 'Android',
    isMobile: parseResult.device.type === 'mobile'
  }
}
export const DateDiff = (dateTime) => {
  var str = dateTime;
  let result = ''
  //将字符串转换成时间格式
  var timePublish = new Date(str);
  var timeNow = new Date();
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var month = day * 30;
  var year = month * 12;
  var diffValue = timeNow - timePublish;
  var diffMonth = diffValue / month;
  var diffWeek = diffValue / (7 * day);
  var diffDay = diffValue / day;
  var diffHour = diffValue / hour;
  var diffMinute = diffValue / minute;
  var diffYear = diffValue / year;
  if (diffValue < 0)
  {
    result = "刚刚发表";
  } else if (diffYear > 1)
  {
    result = parseInt(diffYear) + "年前";
  } else if (diffMonth > 1)
  {
    result = parseInt(diffMonth) + "月前";
  } else if (diffWeek > 1)
  {
    result = parseInt(diffWeek) + "周前";
  } else if (diffDay > 1)
  {
    result = parseInt(diffDay) + "天前";
  } else if (diffHour > 1)
  {
    result = parseInt(diffHour) + "小时前";
  } else if (diffMinute > 1)
  {
    result = parseInt(diffMinute) + "分钟前";
  } else
  {
    result = "刚刚发表";
  }
  return result;
}