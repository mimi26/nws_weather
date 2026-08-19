import { useState, useEffect, useEffectEvent } from 'react';

export function useTime() {
  const [time, setTime] = useState<Date>(new Date());

  const onTimeUpdate = useEffectEvent(() => {
    setTime(new Date());
  });

  useEffect(() => {
    onTimeUpdate();
    const interval = setInterval(() => {
      onTimeUpdate();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}
