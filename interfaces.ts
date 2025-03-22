export interface BookingItem {
    HotelId: string
    hotelName: string
    numOfDays: number
    pickupDate: string
    returnDate: string
    location: string
}

export interface HotelItem {
    id: string
    hotelName: string
    picture: string
}

export interface HotelJson {
    count: number
    data: HotelItem[]
}