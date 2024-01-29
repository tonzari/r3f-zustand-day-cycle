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

  setNextEvent: (milliseconds) => {
    set(()=> {
  
      // todo: create list of available sprites in app
      //        then include important sprite info, like row and column count, and start/end sprite
      //        for now just debug with a random or alternating sprite choice
      //        but this should be more robust and avoid repeats 
      
      // set next sprite at random
  
      const randomInt = Math.floor(Math.random() * spriteData.length)
      const sprite = spriteData[randomInt]
      
      // todo: ^^^^^^^^

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
