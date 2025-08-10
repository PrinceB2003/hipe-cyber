import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function SlideInText({ children }) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center"
      style={{
        willChange: 'transform, opacity',
        backgroundColor: '#09090B', 
        minHeight: '100vh',         
      }}
    >
      {children}
    </motion.div>
  );
}

export default SlideInText;