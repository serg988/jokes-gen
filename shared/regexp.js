export const allAnekdot = (resData) => {
  const headerCutText = resData.slice(218)
  const tailCutText = headerCutText.split('<br /><br />')
  const arr = tailCutText.map((w) => w.replace(/<br \/>/g, ' '))
  const newArr = arr.map((w) => w.replace(/<\/p>\'/g, ''))
  return newArr
}

export const anekdot = (resData) => {
  const headerCutText = resData.slice(138)
  const tailCutText = headerCutText.split("]')")[0]
  const arr = tailCutText.split('\\",\\"').slice(0, -1)
  const newArray = arr.map((w) => w.replace(/<br>/g, ' '))
  const newArray1 = newArray.map((a) => a.replace(/\\\\\\/g, ' '))
  const newArr = newArray1.map((a) => a.replace(/\\r/g, ''))
  return newArr
}


