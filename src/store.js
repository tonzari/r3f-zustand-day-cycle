import { create } from 'zustand'
import { subscribeWithSelector } from "zustand/middleware"
import { getPartOfDay } from './util'
import spriteData from './SpriteData.json'

const store = (set) => ({

  initialRealTime: new Date(),
  simulatedTime: new Date(),
  partOfDay: getPartOfDay(new Date().getHours()),
  speedMultiplier: 1,
  nextEventTime: null,
  currentSprite: null,

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

  updateDayCycle: () => {
      const partOfDayDurationInMs = 21600000
      const interval = () => {
        set(state => {
          const currentRealTime = new Date()
          const realTimeElapsed = currentRealTime - state.initialRealTime
          const simulatedTimeElapsed = realTimeElapsed * state.speedMultiplier
          setTimeout(interval, partOfDayDurationInMs / state.speedMultiplier);
          return { 
            simulatedTime: new Date(state.initialRealTime.getTime() + simulatedTimeElapsed),
            partOfDay: getPartOfDay(state.simulatedTime.getHours())
          }
        })
      }
      interval()
  },

  setNextEvent: (milliseconds) => {
    set(()=> {
      // set next sprite at random
  
      const randomInt = Math.floor(Math.random() * spriteData.length)
      const sprite = spriteData[randomInt]
      
      // set next event timestamp
      const nextTimeMs = new Date().getTime() + milliseconds
      const nextTime = new Date(nextTimeMs)

      return { 
        nextEventTime: nextTime,
        currentSprite: sprite
      }
    })
  }
  
})

export const useStore = create(subscribeWithSelector(store))
