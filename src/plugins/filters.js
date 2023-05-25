import moment from "moment";

function dateFormat(date) {
  return date ? moment(date).format('LL') : '-'
}


function monthFormat(date) {
  return date ? moment(date).format('MMMM, YYYY') : '-'
}

function timeStamp(date) {
  return date ? moment(date).format('LLL') : '-'
}

function hoursMinutes(date) {
  return date ? moment(date).format('h:mm A') : '-'
}

function time(date) {
  return date ? moment(date, 'H:mm:ss').format('LT') : '-'
}

function dateFromNow(date) {
  return moment(date).fromNow()
}

function dateFromNowUtc(date) {
  return moment.utc(date).fromNow()
}

export function registerFilters(app) {
  app.config.globalProperties.$filters = {
    dateFormat,
    monthFormat,
    timeStamp,
    hoursMinutes,
    time,
    dateFromNow,
    dateFromNowUtc
  }
}

