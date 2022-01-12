import matter from 'gray-matter'

export async function getPlantsData() {
    // fetch plants data from laravel API endpoint
    const res = await fetch(`${process.env.API_URL}`); // handle errors
    return res.json()
}
  