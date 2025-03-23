export interface BookingItem {
    HotelId: string
    hotelName: string
    numOfDays: number
    checkInDate: string
    checkOutDate: string
    location: string
}

export interface HotelItem {
    id: string
    hotelName: string
    image: string
}

export interface HotelJson {
    count: number
    data: HotelItem[]
}