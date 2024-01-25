export function getPartOfDay(hour) {
  if(hour >= 6 && hour < 12) return 'morning'
  else if(hour >= 12 && hour < 17) return 'midday'
  else if(hour >= 17 && hour < 21) return 'evening'
  else return 'night'
}