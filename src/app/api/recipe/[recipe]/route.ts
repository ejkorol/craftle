export const GET = async (
  _request: Request,
  { params }: { params: { recipe: number } } ) => {

  try {
    const slug = params.recipe;
    console.log(slug)
    const res = await fetch(`http://minecraft-api.minko.industries/api/recipe/${params.recipe}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json();
    return Response.json(data)
  } catch (e) {
    return Response.json({ error: e })
  };
};
