export default async function createHotel(token : string , hotelData : any) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/hotels` , {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
        body : JSON.stringify(hotelData)
    })
    
    if(!response.ok) throw new Error("Failed to create hotel")

    return await response.json()
}