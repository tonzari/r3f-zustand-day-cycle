import useStore from './store'

const timeOfDayOrder = ['morning', 'midday', 'evening', 'night']

export function updateDayCycle() {
  const { timeOfDay, setTimeOfDay } = useStore.getState()

  let nextIndex = (timeOfDayOrder.indexOf(timeOfDay) + 1) % timeOfDayOrder.length
  
  const newPartOfDay = timeOfDayOrder[nextIndex]

  setTimeOfDay(newPartOfDay)

  console.log("Part of day is now: " + newPartOfDay)
}

export function getPartOfDay(hour) {
  if(hour >= 6 && hour < 12) return 'morning'
  else if(hour >= 12 && hour < 17) return 'midday'
  else if(hour >= 17 && hour < 21) return 'evening'
  else return 'night'
}