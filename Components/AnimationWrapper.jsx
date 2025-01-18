import React from 'react';
import { motion } from 'framer-motion';

export default function AnimationWrapper({ children, keyValue,className, initial = { opacity: 0 }, animate = { opacity: 1 }, transition = { duration: 0.5 } }) {
  return (
    <motion.div
      key={keyValue}
      initial={initial}
      animate={animate}
      exit={{ opacity: 0 }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
