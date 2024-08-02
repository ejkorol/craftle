"use client";
import { motion } from "framer-motion";

interface Attempt {
  try: number;
  success: boolean | null;
  recipe: RecipeAttempt[][]
};

interface RecipeAttemptProps {
  attempts: Attempt[];
  currentTry: number
};

interface RecipeAttempt {
  name: string | null;
  image: string | null;
  borderColor?: string | null;
};

const popUpVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1 },
};

const RecipeAttempt = ({ attempts, currentTry }: RecipeAttemptProps) => {

  console.log(attempts, currentTry);

  if (currentTry === -1) {
    return (
      <div className="recipe__previous" />
    );
  };

  return (
    <motion.div
      className="grid gap-4"
      variants={popUpVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
    >
      {attempts[currentTry].recipe.map((row, rowIdx) => (
        <div key={rowIdx} className="grid grid-cols-3 gap-4">
          {row.map((col, colIdx) => (
            <div
              key={colIdx}
              className="flex flex-col items-center justify-center h-[60px] w-[60px] border-2 border-solid border-secondary rounded-lg"
              style={{ border: col?.borderColor ? `2px solid ${col.borderColor}` : "1px solid gray" }}
            >
              {col && (
                <img
                  height={30}
                  width={30}
                  src={`http://minecraft-api.minko.industries${col.image}`}
                  alt={`item ${col.name}`}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </motion.div>
  );
}

export default RecipeAttempt;
