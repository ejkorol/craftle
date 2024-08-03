import CraftingTable from "../components/CraftingTable";
import dailyRecipes from "@/utils/dailyRecipes";

const fetchItems = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/item`);
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e)
  };
};

const fetchRecipe = async () => {
  try {
    const d = new Date();
    const today = (d.toISOString().split('T')[0]);
    const todaysRecipe = dailyRecipes[`${today}`];
    const res = await fetch(`${process.env.API_URL}/api/recipe/${todaysRecipe}`, { cache: 'no-cache' });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e)
  };
}

const Craftle = async () => {
  const items = await fetchItems();
  const recipe = await fetchRecipe();

  return (
    <>
      <CraftingTable recipe={recipe} items={items} />
    </>
  )
};

export default Craftle;
