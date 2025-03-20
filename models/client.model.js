import mongoose from "mongoose";

const clientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    phone: {
        type: Number,
        required: true
    },
    company: {
        type: String,
    },
    service: {
        type: String 
    },
    message: {
        type: String
    }
},
{
    timestamps: true, // This will add createdAt and updatedAt fields automatically
}
)

const Client = mongoose.model("Client", clientSchema)

export default Client