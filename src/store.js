import { create } from 'zustand'
import { subscribeWithSelector } from "zustand/middleware"
import { getPartOfDay } from './util'

const store = (set) => ({

  initialRealTime: new Date(),
  simulatedTime: new Date(),
  partOfDay: getPartOfDay(new Date().getHours()),
  speedMultiplier: 1,
  nextEventTime: null,

  setPartOfDay: newTime => set({ partOfDay: newTime }),
  
  setSpeedMultiplier: newSpeed => set({ speedMultiplier: newSpeed }),
  
  updateSimulatedTime: () => set(state => {
    const currentRealTime = new Date()
    const realTimeElapsed = currentRealTime - state.initialRealTime
    const simulatedTimeElapsed = realTimeElapsed * state.speedMultiplier
    
    return { 
      simulatedTime: new Date(state.initialRealTime.getTime() + simulatedTimeElapsed),
      partOfDay: getPartOfDay(state.simulatedTime.getHours())
    }
  }),
  
  startDayCycle: () => {
    console.log('ZUSTAND: start()')
    set((state) => {
      const partOfDay = getPartOfDay(state.simulatedTime.getHours())

      console.log("user started experience at part of day: " + partOfDay, state.simulatedTime)
      
      return { partOfDay: partOfDay}
    })
  },

  setNextEventTime: (milliseconds) => {
    set(()=> {
      const nextTimeMs = new Date().getTime() + milliseconds
      const nextTime = new Date(nextTimeMs)
      console.log(nextTime)
      return {nextEventTime: nextTime}
    })
  }
  
})

export const useStore = create(subscribeWithSelector(store))
