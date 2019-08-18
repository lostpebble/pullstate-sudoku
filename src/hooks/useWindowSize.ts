import { useEffect, useState } from "react";

interface IWindowSize {
  width?: number;
  height?: number;
}

export function useWindowSize(): IWindowSize {
  const isClient = typeof window === "object";

  function getSize(): IWindowSize {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}
