import { motion } from 'framer-motion';

interface RecipeTriesProps {
  tries: Try[];
  currentTry: number;
}

interface Try {
  try: number;
  success: null | boolean;
}

const RecipeTries = ({ tries, currentTry }: RecipeTriesProps) => {
  return (
    <div className="tries">
      {tries.map((attempt, idx) => {
        let className = "";
        let animation = {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.8 },
        };

        switch (true) {
          case idx === currentTry + 1:
            className = "tries__current";
            animation = {
              initial: { opacity: 0, scale: 0.5 },
              animate: { opacity: 1, scale: 1.2 },
              exit: { opacity: 0, scale: 0.5 },
            };
            break;
          case attempt.success === true:
            className = "tries__success";
            break;
          case attempt.success === false:
            className = "tries__failed";
            break;
          case attempt.success === null:
            className = "tries__unused";
            break;
          default:
            className = "";
        }

        return (
          <motion.div
            key={attempt.try}
            className={`tries__box ${className}`}
            initial={animation.initial}
            animate={animation.animate}
            exit={animation.exit}
            transition={{ duration: 0.5 }}
          >
          </motion.div>
        );
      })}
    </div>
  );
}

export default RecipeTries;
