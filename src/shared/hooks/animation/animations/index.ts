import slideAnimations from './slide.module.scss';
import fadeAnimations from './fade.module.scss';

export type AnimationName = 'slide' | 'fade';

export const animations: Record<AnimationName, CSSModuleClasses> = {
  slide: slideAnimations,
  fade: fadeAnimations,
};
