// getNumber generates a different random number in the inclusive range [0, 4]
export const getNumber = (function () {
  let previous = NaN
  return function () {
    const min = 0
    const max = 19 + (!isNaN(previous) ? -1 : 0)
    let value = Math.floor(Math.random() * (max - min + 1)) + min
    if (value >= previous) {
      value += 1
    }
    previous = value
    return value
  }
})()
