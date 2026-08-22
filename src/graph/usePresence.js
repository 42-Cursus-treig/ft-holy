import { useEffect, useState } from "react";

export const usePresence = (active, duration = 400) => {
  const [previous, setPrevious] = useState(active);
  const [lingering, setLingering] = useState(false);

  if (previous !== active) {
    setPrevious(active);
    setLingering(!active);
  }

  useEffect(() => {
    if (active || !lingering) return;
    const timer = setTimeout(() => setLingering(false), duration);
    return () => clearTimeout(timer);
  }, [active, lingering, duration]);

  return {
    mounted: active || lingering,
    exiting: !active && lingering,
  };
};
