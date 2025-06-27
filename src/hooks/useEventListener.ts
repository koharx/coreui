import { useEffect, useRef } from 'react';

type EventMap = WindowEventMap & HTMLElementEventMap & DocumentEventMap;

export function useEventListener<
  K extends keyof EventMap,
  T extends Window | HTMLElement | Document = Window
>(
  eventName: K,
  handler: (event: EventMap[K]) => void,
  element?: T | null,
  options?: boolean | AddEventListenerOptions
): void {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const targetElement: T | Window = element ?? window;
    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }

    const eventListener = (event: Event) => {
      savedHandler.current(event as EventMap[K]);
    };

    targetElement.addEventListener(eventName, eventListener, options);

    return () => {
      targetElement.removeEventListener(eventName, eventListener, options);
    };
  }, [eventName, element, options]);
} 