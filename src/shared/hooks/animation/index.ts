import { AnimationName, animations } from './animations';
import React, { useEffect, useRef, useState } from 'react';

type AnimationState = 'idle' | 'opening' | 'closing';

const useOpenCloseAnimation = (
  elementRef: React.RefObject<HTMLElement>,
  trigger: boolean,
  options: {
    duration?: number;
    display?: string;
    isActive?: boolean;
    animationName?: AnimationName;
  }
) => {
  const prevTriggerState = useRef(trigger);
  const [animationState, setAnimationState] = useState<AnimationState>('idle');
  const { duration = 200, display = 'block', isActive = true, animationName = 'slide' } = options;
  const animation = animations[animationName];

  useEffect(() => {
    if (!isActive) return;
    if (trigger === prevTriggerState.current) return;

    let timer: ReturnType<typeof setTimeout>;
    if (trigger) {
      setAnimationState('opening');
      elementRef.current!.style.display = display;
      elementRef.current!.style.animation = `${duration}ms ease-in ${animation.in} forwards`;
    } else {
      setAnimationState('closing');
      elementRef.current!.style.animation = `${duration}ms ease-in ${animation.out} forwards`;
      timer = setTimeout(() => {
        elementRef.current!.style.animation = '';
        elementRef.current!.style.display = 'none';
        setAnimationState('idle');
      }, duration);
    }

    prevTriggerState.current = trigger;

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [trigger, display, duration, elementRef, isActive, animation]);

  return { animationState };
};

export default useOpenCloseAnimation;
