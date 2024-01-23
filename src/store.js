import { create } from 'zustand'
import { subscribeWithSelector } from "zustand/middleware"
import { getPartOfDay } from './util'

const useStore = create(subscribeWithSelector((set) => ({
  timeOfDay: null, // Initial time of day
  speedMultiplier: 50000, // Initial speed multiplier
  setTimeOfDay: newTime => set({ timeOfDay: newTime }),
  setSpeedMultiplier: newSpeed => set({ speedMultiplier: newSpeed }),
  
  start: () => {
    console.log('ZUSTAND: start()')
    set(() => {
      const startTime = new Date()
      const hour = startTime.getHours()
      console.log("part of day: " + getPartOfDay(hour), hour)
      const partOfDay = getPartOfDay(hour)
      return { timeOfDay: partOfDay}
    })
  }
  
})))

export default useStore
