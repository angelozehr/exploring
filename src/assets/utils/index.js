/* takes in an array of seven values containing Mo-So in Format 08:15-12:00 14:20-02:00 */
export function isOpen(openingHours = true, delimeter1 = ' ', delimeter2 = '-') {

  if(!Array.isArray(openingHours)) return openingHours

  let now = new Date()
  const minuteOfTheWeek = ((now.getDay() - 1) * 24 + now.getHours()) * 60 + now.getMinutes()

  for (let i = 0; i < openingHours.length; i++ ) {
    
    if (openingHours[i] === null) continue

    let groups = openingHours[i].split(delimeter1)

    for (let j = 0; j < groups.length; j++) {
      const group = groups[j].split(delimeter2)

      if (group[0].length > 0 && group[1].length > 0) {
        const startHour = parseInt(group[0].substr(0, group[0].indexOf(':')), 10)
        const startMinute = parseInt(group[0].substr(group[0].indexOf(':')+1), 10)
        const endHour = parseInt(group[1].substr(0, group[1].indexOf(':')), 10)
        const endMinute = parseInt(group[1].substr(group[1].indexOf(':')+1), 10)
        /* calculate minute of the week for start and end time */
        const open = (i * 24 + startHour) * 60 + startMinute
        const close = (i * 24 + endHour) * 60 + endMinute
        const offset = close < open ? 24 * 60 : 0 /* add 24 hours if is over midnight */
        if (close + offset > (7 * 24 * 60)) { /* if is sunday after midnight */
          if (minuteOfTheWeek <= close + offset - (7 * 24 * 60)) return true
        } else {
          if (minuteOfTheWeek >= open && minuteOfTheWeek <= close + offset) return true
        }
      }
    }
  }
  return false
}

export const getParams = string => {
  if (typeof string !== 'string') return []
  return string.split('/').filter(entry => entry.length > 0)
}

export const sequence = (max, step = 1) => {
  var array = [];
  for (var i = 1; i <= max; i = i + step) {
     array.push(i);
  }
  return array
}