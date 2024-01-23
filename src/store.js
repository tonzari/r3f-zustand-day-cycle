import { create } from 'zustand'
import { subscribeWithSelector } from "zustand/middleware"
import { getPartOfDay } from './util'

const useStore = create(subscribeWithSelector((set) => ({
  timeOfDay: null,
  speedMultiplier: 5000,
  setTimeOfDay: newTime => set({ timeOfDay: newTime }),
  setSpeedMultiplier: newSpeed => set({ speedMultiplier: newSpeed }),
  
  start: () => {
    console.log('ZUSTAND: start()')
    set(() => {
      const startTime = new Date()
      const hour = startTime.getHours()
      console.log("user started experience at part of day: " + getPartOfDay(hour), hour)
      const partOfDay = getPartOfDay(hour)
      return { timeOfDay: partOfDay}
    })
  }
  
})))

export default useStore
