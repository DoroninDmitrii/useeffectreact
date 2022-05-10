import React, { useEffect, useState } from 'react';

type TypePropsTime = {
  second: number
  setSecond: (actualSecond: number) => void
  timerKey: number
}

const Timer = (props: TypePropsTime) => {

  const [time, setTime] = useState(10);

  useEffect(() => {
    setTime(props.second)
  }, [props.second])

  useEffect(() => {
    props.setSecond(time)
  }, [time])

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('clock')
      setTime((prev) => prev - 1)
    }, 1000)
    return () => { clearInterval(intervalId) }
  }, [props.timerKey])


  return (
    <div>
      {time}
    </div>
  );
};

export default Timer;
