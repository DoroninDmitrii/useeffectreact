import React, { useEffect, useState } from 'react';

type TimerProps = {
  second: number
  onChange: (actualTime: number) => void
}

const Timer = (props: TimerProps) => {

  const [time, setTime] = useState(60)

  useEffect(() => {
    setTime(props.second)
  }, [props.second])

  useEffect(() => {
    props.onChange(time)
  }, [time])

  useEffect(() => {
    setInterval(() => {
      setTime((prev) => prev - 1)
    }, 1000)
  }, [])

  return (
    <div>
      {time}
    </div>
  );
};

export default Timer;
