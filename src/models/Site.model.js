import mongoose from 'mongoose';

const SiteSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'name is required!'],
        },
        timezone: {
            type: String,
            required: [true, 'timezone is required!'],
        },
        startingHour: {
            type: Number,
            required: [true, 'startingHour is required'],
        },
        endingHour: {
            type: Number,
            required: [true, 'endingHour is required'],
        },
        lateThreshold: {
            type: Number,
            required: [true, 'lateThreshold is required'],
        },
        admin: new mongoose.Schema({
            name: {
                type: String,
                required: [true, 'name is required!'],
            },
            email: {
                type: String,
                required: [true, 'email is required!'],
            },
        }),
        workers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Worker' }],
    },
    {
        timestamps: true,
    }
);
SiteSchema.index({ 'admin._id': 1 }); // schema level

module.exports = mongoose.model('Site', SiteSchema);
