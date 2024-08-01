import CraftingTable from "../components/CraftingTable";

const fetchItems = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/item`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e)
  };
};

const fetchRecipe = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}/api/recipe`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
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
