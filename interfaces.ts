export interface HotelItem {
    id: string
    name: string
    address: string
    telephoneNumber : string
    image: string
}

export interface HotelJson {
    count: number
    data: HotelItem[]
}

export interface BookingItem {
    _id: string
    hotel: {
        name: string
        address: string
        telephoneNumber: string
    };
    checkIn: string
    checkOut: string
    user: {
        name: string
        email: string
    }
}