import { motion } from 'framer-motion';
import React from 'react';

const CraftleLogo = () => {
  const pathVariants = {
    hidden: { 
      pathLength: 0, 
      opacity: 0, 
      strokeDasharray: "1000", 
      strokeDashoffset: "1000"
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      strokeDasharray: "1000",
      strokeDashoffset: "0",
      transition: {
        duration: 3,
        ease: [0.42, 0, 0.58, 1]
      }
    }
  };

  const rectVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5, 
      rotate: 45
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { 
        duration: 0.5, 
        ease: 'easeOut',
        scale: { type: 'spring', stiffness: 300, damping: 20 },
        rotate: { type: 'spring', stiffness: 300, damping: 20 }
      }
    }
  };

  return (
    <motion.svg
      width="94"
      height="94"
      viewBox="0 0 94 94"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial="hidden"
      animate="visible"
    >
      <motion.path
        d="M63.5 2H87C89.7614 2 92 4.23858 92 7V33.5M63.5 2V92M63.5 2H32M63.5 92H87C89.7614 92 92 89.7614 92 87V62.5M63.5 92H32M32 92H7C4.23858 92 2 89.7614 2 87V62.5M32 92V2M32 2H7C4.23858 2 2 4.23858 2 7V33.5M92 33.5H2M92 33.5V62.5M2 33.5V62.5M2 62.5H92"
        stroke="black"
        strokeWidth="3"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
      />
      <motion.g
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { transition: { staggerChildren: 0.3 } },
          visible: { transition: { staggerChildren: 0.3 } }
        }}
      >
        <motion.rect
          x="42"
          y="12"
          width="10"
          height="10"
          rx="2.5"
          fill="#5B8B32"
          variants={rectVariants}
        />
        <motion.rect
          x="72"
          y="12"
          width="10"
          height="10"
          rx="2.5"
          fill="#5B8B32"
          variants={rectVariants}
        />
        <motion.rect
          x="42"
          y="42"
          width="10"
          height="10"
          rx="2.5"
          fill="#D14852"
          variants={rectVariants}
        />
        <motion.rect
          x="42"
          y="72"
          width="10"
          height="10"
          rx="2.5"
          fill="#E5A92F"
          variants={rectVariants}
        />
        <motion.rect
          x="12"
          y="42"
          width="10"
          height="10"
          rx="2.5"
          fill="#5B8B32"
          variants={rectVariants}
        />
      </motion.g>
    </motion.svg>
  );
};

export default CraftleLogo;
