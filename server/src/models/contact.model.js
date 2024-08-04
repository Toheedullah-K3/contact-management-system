import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        address: {
            type: String,
            trim: true
        },
        relationShip: {
            type: String,
            // enum: ['Friend', 'Family', 'Colleague', 'Other'],
            default: "Friend",
            trim: true
        },
        company: {
            type: String,
            trim: true
        },
        notes: {
            type: String
        },
        isFavorite: {
            type: Boolean,
            default: false
        }, 
        socialMedia: {
            facebook: {type: String, trim: true},
            instagram: {type: String, trim: true},
            linkedIn: {type: String, trim: true},
            github: {type: String, trim: true}
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

export const Contact = mongoose.model("Contact", contactSchema)