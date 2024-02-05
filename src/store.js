import { create } from 'zustand'
import { subscribeWithSelector } from "zustand/middleware"
import { getPartOfDay } from './util'
import spriteData from './SpriteData.json'

const store = (set) => ({

  // Stores the initial real time and simulated time, and calculates the initial part of the day.
  initialRealTime: new Date(),
  realTime: new Date(),
  simulatedTime: new Date(),
  partOfDay: getPartOfDay(new Date().getHours()),
  speedMultiplier: 1,
  nextEventTime: null,
  currentSprite: null,
  dayCycleTimeoutId: null,
  clockTimeoutId: null,

  // Updates the part of day based on new time.
  setPartOfDay: newTime => set({ partOfDay: newTime }),
  
  // Sets a new speed multiplier for time simulation.
  setSpeedMultiplier: newSpeed => set({ speedMultiplier: newSpeed }),
  
  // Updates simulated time and part of day, based on real-time elapsed and speed multiplier.
  updateSimulatedTime: () => set(state => {
    const currentRealTime = new Date()
    const realTimeElapsed = currentRealTime - state.initialRealTime
    const simulatedTimeElapsed = realTimeElapsed * state.speedMultiplier
    
    return { 
      simulatedTime: new Date(state.initialRealTime.getTime() + simulatedTimeElapsed),
    }
  }),

  // Continuously updates the day cycle based on real-time elapsed, adjusting for speed multiplier.
  updateDayCycle: () => {
      const partOfDayDurationInMs = 21600000 // Full day divided to 4 parts, as milliseconds
      const interval = () => {
        set(state => {
          clearTimeout(state.timeoutId)
          const newTimeoutId = setTimeout(interval, partOfDayDurationInMs / state.speedMultiplier)
          console.log("update day cycle", state.speedMultiplier)
          return { 
            partOfDay: getPartOfDay(state.simulatedTime.getHours()),
            timeoutId: newTimeoutId
          }
        })
      }
      interval()
  },

  startClock: () => {
    const tick = () => {
      set(state => {
        clearTimeout(state.clockTimeoutId)
        const time = new Date()
        const newTimeoutId = setTimeout(tick, 1000)
        state.updateSimulatedTime()
        state.updateDayCycle()

        return { 
          realTime: time,
          clockTimeoutId: newTimeoutId
        }
      })
    }
    tick()
  },

  // Sets the next event, including a new sprite and event timestamp.
  setNextEvent: (milliseconds) => {
    set((state)=> {

      // set next sprite at random, loop to enforce no repeats
      let sprite = state.currentSprite

      while(sprite === state.currentSprite) {
        const randomInt = Math.floor(Math.random() * spriteData.length)
        sprite = spriteData[randomInt]
      }
      
      // set next event timestamp
      const nextTimeMs = state.realTime.getTime() + milliseconds
      const nextTime = new Date(nextTimeMs)

      return { 
        nextEventTime: nextTime,
        currentSprite: sprite
      }
    })
  },

  // CLEAR TIMEOUTS - - - - - - - 

  clearDayCycle: () => set(state => {
    clearTimeout(state.timeoutId)
    return { dayCycleTimeoutId: null }
  }),

  clearClockCycle: () => set(state => { 
    clearTimeout(state.clockTimeoutId)
    return { clockTimeoutId: null}
  }),

})

export const useStore = create(subscribeWithSelector(store))
