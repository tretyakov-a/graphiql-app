import slideAnimations from './slide.module.scss';
import slideYAnimations from './slideY.module.scss';
import fadeAnimations from './fade.module.scss';

export type AnimationName = 'slide' | 'slideY' | 'fade';

export const animations: Record<AnimationName, CSSModuleClasses> = {
  slide: slideAnimations,
  slideY: slideYAnimations,
  fade: fadeAnimations,
};
