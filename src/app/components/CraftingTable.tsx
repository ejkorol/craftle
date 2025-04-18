"use client";
import { useState, useEffect } from "react";
import RecipeTries from "./RecipeTries";
import { useDisclosure, Button, Tooltip } from "@nextui-org/react";
import InventoryModal from "./InventoryModal";
import RecipeSuccess from "./RecipeSuccess";
import RecipeTryAttempt from "./RecipeAttempt";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { StatsModal } from "./StatsModal";
import { getsession, getCookie } from "./CraftingTableActions";

const animationVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

const boxVariants = {
  initial: { opacity: 0, scale: 0.6 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

const rowVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1 } },
};

interface Item {
  id: number;
  name: string;
  displayName: string;
  image: string;
  stackSize: number;
  enchantCategories: any;
  repairWith: any;
  maxDurability: any;
}

interface FoundItem {
  name: string;
  image: string;
}

interface Recipe {
  id: number;
  name: string;
  displayName: string;
  recipe: string[][][];
  ingredients: any;
  stackSize: number;
  quantity: number;
}

interface CraftingTableProps {
  items: Item[];
  recipe: Recipe[];
}

interface RecipeAttempt {
  name: string | null;
  image: string | null;
  borderColor?: string | null;
}

interface Try {
  try: number;
  success: boolean | null;
  recipe: any;
  percentage: number;
}

interface Data {
  image: string;
  name: string;
  displayName: string;
  tries: number;
}

const CraftingTable = ({ items, recipe }: CraftingTableProps) => {
  const initialTable: (RecipeAttempt | null)[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const [craftingTable, setCraftingTable] = useState<(RecipeAttempt | null)[][]>(initialTable);
  const [selectedSquare, setSelectedSquare] = useState({ row: 0, col: 0 });
  const [data, setData] = useState<Data | null>(null);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const recipeSuccess = useDisclosure();
  const statsModal = useDisclosure();

  const [foundItems, setFoundItems] = useState<FoundItem[]>([]);

  const [currentTry, setCurrentTry] = useState<number>(-1);
  const [isMatch, setIsMatch] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [tries, setTries] = useState<Try[]>([
    { try: 1, success: null, recipe: null, percentage: 0 },
    { try: 2, success: null, recipe: null, percentage: 0 },
    { try: 3, success: null, recipe: null, percentage: 0 },
    { try: 4, success: null, recipe: null, percentage: 0 },
    { try: 5, success: null, recipe: null, percentage: 0 },
    { try: 6, success: null, recipe: null, percentage: 0 },
  ]);

  const [dailyCompleted, setDailyCompleted] = useState({
    completed: false,
    success: false,
    tries: tries,
    gamesPlayed: 0,
    currentStreak: 0,
    bestStreak: 0,
    totalWon: 0
  });

  interface CraftleCookie {
    date: string;
    success: boolean;
    tries: Try[];
    gamesPlayed: number;
    currentStreak: number;
    bestStreak: number;
    totalWon: number;
  }

  const checkIfDailyCompleted = async () => {
    try {
      const savedCookie = await getCookie();
      if (savedCookie) {
        const data: CraftleCookie = JSON.parse(savedCookie.value);
        const d = new Date();
        const fd = d.toISOString().split('T')[0];

        if (data.date === fd) {
          setDailyCompleted({
            completed: true,
            success: data.success,
            tries: data.tries,
            gamesPlayed: data.gamesPlayed,
            currentStreak: data.currentStreak,
            bestStreak: data.bestStreak,
            totalWon: data.totalWon
          });
        } else if (data.date !== fd) {
          setDailyCompleted({
            completed: false,
            success: false,
            tries: data.tries,
            gamesPlayed: data.gamesPlayed,
            currentStreak: data.currentStreak,
            bestStreak: data.currentStreak,
            totalWon: data.totalWon
          });
        }
      } else {
        setDailyCompleted({
          completed: false,
          success: false,
          tries: tries,
          gamesPlayed: 0,
          currentStreak: 0,
          bestStreak: 0,
          totalWon: 0
        });
      }
    } catch (e) {
      console.error(e);
    }
};

  useEffect(() => {
    handlePost();
    checkIfDailyCompleted();
    if (currentTry >= 0 && currentTry < tries.length) {
      setTries((prevTries) =>
        prevTries.map((item, idx) =>
          idx === currentTry ? { ...item, success: item.success === null ? false : item.success } : item
        )
      );
    }
  }, [currentTry, isMatch, isFailed]);

  const getRandomDelay = () => Math.random() * 0.5;

  const calculatePercentage = (craftingTable: (RecipeAttempt | null)[][], currentRecipe: string[][][]) => {
    const flattenTable = craftingTable.flat().map((item) => item?.name || "");
    const flattenRecipe = currentRecipe.flat().flat();

    const correctCount = flattenTable.reduce((count, item, index) => {
        return item === flattenRecipe[index] ? count + 1 : count;
    }, 0);

    const percentage = (correctCount / flattenRecipe.length) * 100;

    return Math.round(percentage * 100) / 100;
  };

  const handleCraft = async () => {
    const currentRecipe = recipe[0].recipe;

    const flattenTable = craftingTable.flat().map((item) => item?.name || "");
    const flattenRecipe = currentRecipe.flat().flat();

    const tableIsEmpty = flattenTable.every(item => item === "");

    if (tableIsEmpty) {
      toast('Click a square to craft!', {
        icon: '🪚',
        style: {
          border: '2px solid #fafafa',
          padding: '16px',
          backgroundColor: '#212121',
          color: '#fafafa'
        },
      });
      return;
    };

    if (flattenTable.length !== flattenRecipe.length) {
      setIsMatch(false);
      setCurrentTry((prev) => (prev + 1) % tries.length);
      setTries((prevTries) =>
        prevTries.map((item, idx) =>
          idx === currentTry ? { ...item, success: false, recipe: craftingTable, percentage: 0 } : item
        )
      );
      return;
    }

    const exactMatch = flattenTable.every((item, index) => item === flattenRecipe[index]);

    const updatedTable = craftingTable.map((row, i) =>
      row.map((box, j) => {
        if (box) {
          const recipeItem = currentRecipe[i]?.[j]?.[0];
          box.borderColor = recipeItem && box.name === recipeItem ? "green" : "red";
          return box;
        }
        return box;
      })
    );

    setCraftingTable(updatedTable);

    const percentage = calculatePercentage(craftingTable, currentRecipe);

    // Update tries with percentage
    setTries((prevTries) =>
      prevTries.map((item, idx) =>
        idx === currentTry + 1
          ? { ...item, success: exactMatch, recipe: craftingTable, percentage: percentage }
          : item
      )
    );

    // Correct
    const correctItems = craftingTable.flat().filter((box, index) => {
      const recipeItem = flattenRecipe[index];
      return box && box.name === recipeItem;
    });
    console.log("Correct items:", correctItems.map(item => ({ name: item?.name, image: item?.image })));

    // Partials
    const includedItems = craftingTable.flat().filter((box): box is RecipeAttempt => box !== null && box.name !== null && flattenRecipe.includes(box.name));
    console.log("Included items in the recipe:", includedItems.map(item => ({ name: item.name, image: item.image })));

    includedItems.forEach((item) => {
      if (item && item.name && item.image) {
        const found: FoundItem = {
          name: item.name,
          image: item.image
        };

      setFoundItems((prevItems) => {
        const itemExists = prevItems.some(existingItem =>
          existingItem.name === found.name && existingItem.image === found.image
        );

        if (!itemExists) {
          return [...prevItems, found];
        }

          return prevItems;
        });
      }
    });

    if (exactMatch) {
      setTries((prevTries) =>
        prevTries.map((item, idx) =>
          idx === currentTry + 1 ? { ...item, success: true, recipe: craftingTable } : item
        )
      );
      recipeSuccess.onOpen();
    } else {
      setCurrentTry((prev) => (prev + 1) % tries.length);
      setTries((prevTries) =>
        prevTries.map((item, idx) =>
          idx === currentTry + 1 ? { ...item, success: false, recipe: craftingTable } : item
        )
      );
      toast('Not quite!', {
        icon: '🪚',
        style: {
          border: '2px solid #fafafa',
          padding: '16px',
          backgroundColor: '#212121',
          color: '#fafafa'
        },
      });
      setCraftingTable(initialTable);
    };

    setIsMatch(exactMatch);
    setData({
      image: recipe[0].name,
      name: recipe[0].name,
      displayName: recipe[0].displayName,
      tries: currentTry + 2,
    });

    if (currentTry + 2 === 6) {
      setIsFailed(true);
    };
  };

  const handlePost = async () => {
    if (isFailed) {
      await getsession(tries, false)
    } else if (isMatch) {
      await getsession(tries, true)
    };
  };

  const handleBoxClick = (rowIndex: number, colIndex: number) => {
    setSelectedSquare({ row: rowIndex, col: colIndex });
    onOpen();
  };

  const handleSelect = (selectedItem: (Item | null)) => {
    if (selectedItem) {
      const newTable = craftingTable.map((row, rIdx) =>
        row.map((box, cIdx) => {
          if (rIdx === selectedSquare.row && cIdx === selectedSquare.col) {
            return { name: selectedItem.name, image: selectedItem.image };
          }
          return box;
        })
      );
      setCraftingTable(newTable);
      onClose();
    } else {
      const newTable = craftingTable.map((row, rIdx) =>
        row.map((box, cIdx) => {
          if (rIdx === selectedSquare.row && cIdx === selectedSquare.col) {
            return null
          }
          return box;
        })
      );
      setCraftingTable(newTable);
      onClose();
    }
  };

  return (
    <main className="flex flex-col h-[90vh] w-full justify-center items-center">
      <section className="flex w-full justify-center items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isFailed || dailyCompleted.completed ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.25 }}
          className="hidden md:flex w-[212px] mr-16 justify-end"
        >
          <RecipeTryAttempt attempts={tries} currentTry={currentTry} />
        </motion.div>
      <section className="">
          <motion.div
            initial={{ opacity: !isFailed ? 0 : 1, scale: !isFailed ? 0.4 : 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: isFailed || dailyCompleted.completed ? 0 : 1, scale: isFailed ? 0.4 : 1 }}
            transition={{ duration: 0.4, delay: 1.75 }}
            className="invisible md:visible mb-[-8rem]"
          >
            <RecipeTries tries={tries} currentTry={currentTry}/>
          </motion.div>
          <motion.div
            initial={{ opacity: !isFailed ? 0 : 1, scale: !isFailed ? 0.4 : 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: isFailed || dailyCompleted.completed ? 0 : 1, scale: isFailed ? 0.4 : 1 }}
            transition={{ duration: 0.4, delay: 1.75 }}
            className="visible md:invisible"
          >
              <p className={ currentTry !== -1 ? 'tries__label tries__label--visible' : 'tries__label tries__label--invisible' }>Tap a try to preview</p>
            <RecipeTries tries={tries} currentTry={currentTry}/>
          </motion.div>
        <div className="crafting">
          <div className="crafting__table">
            {craftingTable.map((row, rowIndex) => (
              <motion.div variants={rowVariants} initial={{ opacity: 1, scale: 1 }} animate={isFailed ? "animate" : "initial"} key={rowIndex} className="crafting__row">
                {row.map((box, colIndex) => (
                  <motion.div
                    key={colIndex}
                    className="crafting__box"
                    onClick={!isFailed && !dailyCompleted.completed ? () => handleBoxClick(rowIndex, colIndex) : undefined}
                    variants={boxVariants}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit="exit"
                    transition={{ duration: 0.3, delay: getRandomDelay() }}
                  >
                    {box && !isFailed && !isMatch && (
                      <img
                        height={40}
                        width={40}
                        src={`/api/fetch-image?url=${encodeURIComponent(`http://minecraft-api.minko.industries${box.image}`)}`}
                        alt={`item ${box.name}`}
                      />
                    )}
                    {dailyCompleted.completed && dailyCompleted.success && colIndex % Math.floor(Math.random()*10) !== 0 && (
                      <motion.div  
                        className="h-5 w-5 bg-success rounded-md"
                        variants={boxVariants}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit="exit"
                        transition={{ duration: 0.3, delay: getRandomDelay() }}
                      ></motion.div>
                    )}
                    {dailyCompleted.completed && !dailyCompleted.success && colIndex % Math.floor(Math.random()*10) !== 0 && (
                      <motion.div  
                        className="h-5 w-5 bg-danger rounded-md"
                        variants={boxVariants}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit="exit"
                        transition={{ duration: 0.3, delay: getRandomDelay() }}
                      ></motion.div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center mt-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isFailed || dailyCompleted.completed ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 2.25 }}
              className={isFailed || dailyCompleted.completed ? 'hidden' : 'flex'}
            >
              <Button
                className="font-medium text-md"
                color="primary"
                radius="full"
                variant="shadow"
                onPress={handleCraft}
              >
                {`Craft -->`}
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isFailed || dailyCompleted.completed ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
              className={!isFailed && !dailyCompleted.completed ? 'hidden' : 'flex'}
            >
              <Button
                className="font-medium text-md"
                color="primary"
                radius="full"
                variant="shadow"
                onPress={() => statsModal.onOpen()}
              >
                Statistics
              </Button>
            </motion.div>
        </div>
        <RecipeSuccess
          isOpen={recipeSuccess.isOpen}
          onOpenChange={recipeSuccess.onOpenChange}
          onClose={recipeSuccess.onClose}
          data={data!}
        />
        <InventoryModal
          onOpenChange={onOpenChange}
          isOpen={isOpen}
          onClose={onClose}
          items={items}
          onSelect={handleSelect}
        />
        <StatsModal
          tries={dailyCompleted.tries}
          stats={dailyCompleted}
          isOpen={statsModal.isOpen}
          onClose={statsModal.onClose}
          onOpenChange={statsModal.onOpenChange}
        />
      </section>
      <div className="hidden md:flex w-[212px] ml-16 justify-start">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isFailed || dailyCompleted.completed ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="recipe__next"
        />
      </div>
    </section>
      <section className="absolute bottom-0 mb-12 md:mb-32">
        {foundItems.length !== 0 && !dailyCompleted.completed && (
          foundItems.map((item, idx) => (
            <motion.div
              key={idx} 
              variants={animationVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.3 }}
              className="w-[60px] h-[60px] bg-secondary rounded-lg flex items-center justify-center cursor-pointer hover:shadow-2xl"
            >
            <Tooltip content={item.name}>
              <img
                height={30}
                width={30}
                src={`/api/fetch-image?url=${encodeURIComponent(`http://minecraft-api.minko.industries${item.image}`)}`}
                alt="test"
              />
              </Tooltip>
            </motion.div>
          ))
        )}
      </section>
    </main>
  );
};

export default CraftingTable;
