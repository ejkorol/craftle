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
import { getsession } from "./CraftingTableActions";

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

  useEffect(() => {
    if (currentTry >= 0 && currentTry < tries.length) {
      setTries((prevTries) =>
        prevTries.map((item, idx) =>
          idx === currentTry ? { ...item, success: item.success === null ? false : item.success } : item
        )
      );
    }
  }, [currentTry]);

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
        idx === currentTry
          ? { ...item, success: exactMatch, recipe: craftingTable, percentage }
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
      await getsession(tries);
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

    console.log(currentTry)
    if (currentTry + 2 === 6) {
      setIsFailed(true);
      await getsession(tries);
    };

    return exactMatch;
  };

  const handleBoxClick = (rowIndex: number, colIndex: number) => {
    setSelectedSquare({ row: rowIndex, col: colIndex });
    onOpen();
  };

  const handleSelect = (selectedItem: Item) => {
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
  };

  return (
    <main className="flex flex-col h-[90vh] w-full justify-center items-center">
      <section className="flex w-full justify-center items-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isFailed ? 0 : 1 }}
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
          animate={{ opacity: isFailed ? 0 : 1, scale: isFailed ? 0.4 : 1 }}
          transition={{ duration: 0.4, delay: 1.75 }}
        >
          <RecipeTries tries={tries} currentTry={currentTry} />
        </motion.div>
        <div className="crafting">
          <div className="crafting__table">
            {craftingTable.map((row, rowIndex) => (
              <motion.div variants={rowVariants} initial={{ opacity: 1, scale: 1 }} animate={isFailed ? "animate" : "initial"} key={rowIndex} className="crafting__row">
                {row.map((box, colIndex) => (
                  <motion.div
                    key={colIndex}
                    className="crafting__box"
                    onClick={!isFailed ? () => handleBoxClick(rowIndex, colIndex) : undefined}
                    style={{ border: box?.borderColor ? `2px solid ${box.borderColor}` : "1px solid gray" }}
                    variants={boxVariants}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit="exit"
                    transition={{ duration: 0.3, delay: getRandomDelay() }}
                  >
                    {box && !isFailed && (
                      <img
                        height={40}
                        width={40}
                        src={`http://minecraft-api.minko.industries${box.image}`}
                        alt={`item ${box.name}`}
                      />
                    )}
                    {isFailed && colIndex % Math.floor(Math.random()*10) !== 0  && (
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
              animate={{ opacity: isFailed ? 0 : 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 2.25 }}
                  className={isFailed ? 'hidden' : 'flex'}
            >
              <Button
                className="font-medium text-md"
                color="primary"
                radius="lg"
                variant="shadow"
                onPress={handleCraft}
              >
                {`Craft -->`}
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isFailed ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
                  className={!isFailed ? 'hidden' : 'flex'}
            >
              <Button
                className="font-medium text-md"
                color="primary"
                radius="full"
                variant="bordered"
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
          tries={tries}
          isOpen={statsModal.isOpen}
          onClose={statsModal.onClose}
          onOpenChange={statsModal.onOpenChange}
        />
      </section>
      <div className="hidden md:flex w-[212px] ml-16 justify-start">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isFailed ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="recipe__next"
        />
      </div>
    </section>
      <section className="absolute bottom-0 mb-32">
        {foundItems.length !== 0 && (
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
                src={`http://minecraft-api.minko.industries${item.image}`}
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
