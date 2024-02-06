import format from 'date-fns/format'
import { useStore } from './store'

function TimeDebugDisplay() {
  const { simulatedTime, nextEventTime, currentSprite} = useStore()
  const realTime = useStore((state) => state.realTime)

  return (
    <div className='time-debug-container'>
      <span>Real time:</span> {format(realTime, 'hh:mm:ss a')} <br />
      <span>Simulated time:</span> {format(simulatedTime, 'hh:mm:ss a')}<br />
      <span>Next Event:</span> {nextEventTime && format(nextEventTime, 'hh:mm:ss a')}<br />
      <span>Simulated time:</span> {format(simulatedTime, 'MMMM eeee hh:mm:ss a')}<br />
      <span>Current:</span> {currentSprite?.sprite}<br />
    </div>
  )
}

export default TimeDebugDisplay