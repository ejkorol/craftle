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
  return (
    <div className="tries">
      {tries.map((attempt, idx) => {
        let className = "";

        switch (true) {
          case idx === currentTry + 1:
            className = "tries__current";
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

        return <div key={attempt.try} className={className} />;
      })}
    </div>
  );
}

export default RecipeTries;
