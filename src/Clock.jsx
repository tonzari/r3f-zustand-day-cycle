import format from 'date-fns/format'
import { useEffect, useState } from 'react'
import { useStore } from './store'

function Clock() {
  const [time, setTime] = useState(new Date())
  const { simulatedTime, updateSimulatedTime: updateSimulatedTime, nextEventTime, nextSprite} = useStore()

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(new Date())
      updateSimulatedTime()
    }, 1000);

    return () => {
      window.clearInterval(intervalId)
    };
  }, [])

  return (
    <p>
      Real time: {format(time, 'hh:mm:ss a')}
      <br />
      Next Event: {nextSprite} {' '} {nextEventTime && format(nextEventTime, 'hh:mm:ss a')}
      <br />
      Simulated time: {format(simulatedTime, 'MMMM eeee h a')}
    </p>
  );
}

export default Clock