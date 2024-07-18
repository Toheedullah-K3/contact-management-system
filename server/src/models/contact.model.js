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
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        relationShip: {
            type: String,
            enum: ['Friend', 'Family', 'Colleague', 'Other'],
            required: true,
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
        SocialMedia: {
            facebook: {type: String, trim: true},
            instagram: {type: String, trim: true},
            linkedIn: {type: String, trim: true},
            github: {type: String, trim: true}
        }
    },
    {
        timestamps: true
    }
)

export const Contact = mongoose.model("Contact", contactSchema)