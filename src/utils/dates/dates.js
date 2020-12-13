import { parseISO, format, isDate as checkDate } from 'date-fns';

export const isDate = (date) => {
  return checkDate(parseISO(date))
}


export const parse = (date) => {
  let formatedDate = format(new Date(date), "yyyy-MM-dd HH:mm:ss 'Z'")
  let parsedDate = parseISO(formatedDate)
  return parsedDate
}

export const formatDate = (date) => {
  let formatedDate = format(new Date(date), "yyyy-MM-dd HH:mm:ss 'Z'")
  return formatedDate
}

