// Defines the available pages in the application
export type PageName = 
  | 'HOME' 
  | 'INTRODUCTION' 
  | 'OXIDATION_NUMBER' 
  | 'BALANCING' 
  | 'SIMULATION'
  | 'QUIZ' 
  | 'AI_TUTOR';

// The interface that EVERY page component must accept
export interface PageProps {
  onNavigate: (page: PageName) => void;
}

// Common animation variants for framer-motion
export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};