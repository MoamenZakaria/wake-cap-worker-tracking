import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'name is required!'],
        },
        bio: {
            type: String,
        },
        website: {
            type: String,
        },
        sites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Site' }],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Client', ClientSchema);
