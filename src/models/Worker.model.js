import mongoose from 'mongoose';

const WorkerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: '{name} is required!',
        },
        email: {
            type: String,
            required: '{timezone} is required!',
        },
        site: { type: mongoose.Schema.Types.ObjectId, ref: 'Site' },
        attendance: {
            date: { type: mongoose.Schema.Types.Date },
            isAbsent: { type: mongoose.Schema.Types.Boolean },
            isLate: { type: mongoose.Schema.Types.Boolean },
        },
        dailyActivity: [
            {
                isActive: {
                    type: mongoose.Schema.Types.Boolean,
                    required: [true, 'isActive is required'],
                },
                duration: {
                    type: Number,
                    required: [true, 'duration is required'],
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Worker', WorkerSchema);
