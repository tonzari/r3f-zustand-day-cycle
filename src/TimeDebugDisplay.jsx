import format from 'date-fns/format'
import { useStore } from './store'

function TimeDebugDisplay() {
  const { simulatedTime, nextEventTime, currentSprite} = useStore()
  const realTime = useStore((state) => state.realTime)

  return (
    <p>
      Real time: {format(realTime, 'hh:mm:ss a')}
      <br />
      Simulated time: {format(simulatedTime, 'hh:mm:ss a')}
      <br />
      Next Event: {nextEventTime && format(nextEventTime, 'hh:mm:ss a')}
      <br />
      Simulated time: {format(simulatedTime, 'MMMM eeee hh:mm:ss a')}
      <br />
      Current: {currentSprite?.sprite}
    </p>
  )
}

export default TimeDebugDisplay