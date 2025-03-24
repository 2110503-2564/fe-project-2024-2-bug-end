const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User',
        required : true
    },
    hotel : {
        type : mongoose.Schema.ObjectId,
        ref : 'Hotel',
        required : true
    },
    checkIn : {
        type : Date,
        required : true
    },
    checkOut: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Booking = mongoose.models.Booking ||mongoose.model('Booking' , BookingSchema);

export default Booking;