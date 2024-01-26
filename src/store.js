import { create } from 'zustand'
import { subscribeWithSelector } from "zustand/middleware"
import { getPartOfDay } from './util'

const store = (set) => ({

  initialRealTime: new Date(),
  simulatedTime: new Date(),
  partOfDay: getPartOfDay(new Date().getHours()),
  speedMultiplier: 1,
  nextEventTime: null,
  nextSprite: null,

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
      

      // todo: create list of available sprites in app
      // for now just debug with a random or alternating sprite choice
      const randomInt = Math.random() > .5 ? 1 : 0
      const sprites = ['bmo.png','procreateTest.png']
      const nextSprite = '/' + sprites[randomInt]
      // todo: ^^^^^^^^
      console.log('next up: ', nextSprite, nextTime)

      return { 
        nextEventTime: nextTime,
        nextSprite: nextSprite 
      }
    })
  }
  
})

export const useStore = create(subscribeWithSelector(store))
