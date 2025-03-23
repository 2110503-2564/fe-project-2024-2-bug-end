import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        unique: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address'],
        unique: true
    },
    telephoneNumber: {
        type: String,
        required: [true, 'Please add a telephone number'],
        unique: true,
        match : [
            /^(\+?[1-9][0-9]{1,4}[\s\-]?[0-9]{6,15}|0[0-9]{9,15})$/,
            'Please add a valid phone number'
        ]
    }
});

const Hotel = mongoose.models.Hotel || mongoose.model('Hotel', HotelSchema);

export default Hotel;