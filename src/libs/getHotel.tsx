export default async function getHotel(id:string) {

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotels/${id}` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })

    if(!response.ok) throw new Error("Failed to fetch hotel")

    return await response.json()
}