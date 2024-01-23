import { useState } from "react"
import  useStore  from "./store"

export default function Overlay() {
    console.log("overlay rerender")

    const timeOfDay = useStore((state) => state.timeOfDay)
    const setSpeedMultiplier = useStore((state) => state.setSpeedMultiplier)
    const speedMultiplier = useStore((state)=>state.speedMultiplier)
        
    return <div className="container">
        <h1>Zustand State of Day Test</h1>
        <p>Current Day State: {timeOfDay}</p>

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
                max={10000}
                value={speedMultiplier}
                onChange={event => {
                    setSpeedMultiplier(event.target.value)
                }}
            />
        </form>

        <p>
            <strong>Current value: </strong>{speedMultiplier}x faster than real REAL LIFE
        </p>
    </div>
}