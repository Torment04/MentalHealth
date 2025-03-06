declare module 'framer-motion' {
  export const motion: any;
  export interface AnimatePresenceProps {
    children?: React.ReactNode;
    custom?: any;
    initial?: boolean;
    onExitComplete?: () => void;
    exitBeforeEnter?: boolean;
  }
  export const AnimatePresence: React.FC<AnimatePresenceProps>;
} 