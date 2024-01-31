import { useState } from "react"
import  {useStore}  from "./store"
import Clock from "./Clock"

export default function Overlay() {
    console.log("overlay rerender")

    const partOfDay = useStore((state) => state.partOfDay)
    const setSpeedMultiplier = useStore((state) => state.setSpeedMultiplier)
    const speedMultiplier = useStore((state)=>state.speedMultiplier)
        
    return <div className="container">
        <h1>R3F Zustand Day Cycle Sprite Scheduler Test</h1>
        <p>Current Day State: {partOfDay}</p>

        <form
            onSubmit={(event) => {
                event.preventDefault();
            }}
        >
            <label htmlFor="time-multiplier">
                Time multiplier:
            </label>
            <input
                type="range"
                id="time-multiplier"
                min={1}
                max={500}
                value={speedMultiplier}
                onChange={event => {
                    setSpeedMultiplier(event.target.value)
                }}
            />
        </form>

        <p>
            <strong>Current value: </strong>{speedMultiplier}x faster than real REAL LIFE
        </p>

        <Clock />
    </div>
}