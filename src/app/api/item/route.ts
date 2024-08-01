export async function GET(){
  try {
    const res = await fetch(`http://minecraft-api.minko.industries/api/item`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json();
    return Response.json(data)
  } catch (e) {
    console.log(e);
  };
}
