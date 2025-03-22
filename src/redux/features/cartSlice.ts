import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingItem } from "../../../interfaces";

type CartState = {
    bookItems: BookingItem[]
}

const initialState: CartState = { bookItems: [] }

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addBooking: (state, action:PayloadAction<BookingItem>)=> {
            state.bookItems.push(action.payload)
        },
        removeBooking: (state, action:PayloadAction<BookingItem>)=> {
            const remainItems = state.bookItems.filter(obj => {
                return ((obj.hotelName !== action.payload.hotelName)
                || (obj.checkInDate !== action.payload.checkInDate)
                || (obj.checkOutDate !== action.payload.checkOutDate))
            })

            state.bookItems = remainItems
        }
    }
})

export const { addBooking , removeBooking } = cartSlice.actions
export default cartSlice.reducer