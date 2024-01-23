import { create } from 'zustand'
import { subscribeWithSelector } from "zustand/middleware"
import { getPartOfDay } from './util'

const useStore = create(subscribeWithSelector((set) => ({
  partOfDay: null,
  speedMultiplier: 5000,
  setPartOfDay: newTime => set({ partOfDay: newTime }),
  setSpeedMultiplier: newSpeed => set({ speedMultiplier: newSpeed }),
  
  start: () => {
    console.log('ZUSTAND: start()')
    set(() => {
      const startTime = new Date()
      const hour = startTime.getHours()
      console.log("user started experience at part of day: " + getPartOfDay(hour), hour)
      const partOfDay = getPartOfDay(hour)
      return { partOfDay: partOfDay}
    })
  }
  
})))

export default useStore
