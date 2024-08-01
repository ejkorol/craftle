"use client";

interface RecipeTriesProps {
  tries: Try[];
  currentTry: number;
}

interface Try {
  try: number;
  success: null | boolean;
}

const RecipeTries = ({ tries, currentTry }: RecipeTriesProps) => {
  console.log(tries)
  return (
    <div className="tries">
      {tries.map((attempt, idx) => {
        let className = "";

        if (attempt.success === true) {
          className = "tries__success"
        } else if (attempt.success === false) {
          className = "tries__failed";
        } else if (attempt.success === null) {
          className = "tries__unused";
        } else if (idx === currentTry) {
          className = "tries__current"
        }

        return (
          <div key={attempt.try} className={className} />
        );
      })}
    </div>
  );
}

export default RecipeTries;
