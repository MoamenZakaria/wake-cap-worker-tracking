import { Seeder } from 'mongoose-data-seed';
import mongoose from 'mongoose';
import * as models from '../src/models';

const data = [
    {
        _id: new mongoose.Types.ObjectId('5eff4b306fa7eb5e098abfdf'),
        name: 'moamen',
        email: 'moamen.zakaria.z@gmail.com',
        site: new mongoose.Types.ObjectId('5eff514d5a90b564e86ece84'),
        attendance: {
            date: new Date(),
            isAbsent: false,
            isLate: false,
        },
        dailyActivity: [
            { isActive: true, duration: 180 },
            { isActive: false, duration: 180 },
            { isActive: true, duration: 180 },
        ],
    },
    {
        _id: new mongoose.Types.ObjectId('5eff4b306fa7eb5e098abfff'),
        name: 'amgad',
        email: 'amgad@gmail.com',
        site: new mongoose.Types.ObjectId('5eff514d5a90b564e86ece84'),
        attendance: {
            date: new Date(),
            isAbsent: false,
            isLate: false,
        },
        dailyActivity: [
            { isActive: false, duration: 180 },
            { isActive: false, duration: 180 },
            { isActive: true, duration: 180 },
        ],
    },
    {
        _id: new mongoose.Types.ObjectId('5eff4b306fa7eb5e098abf4f'),
        name: 'adam',
        email: 'adam@gmail.com',
        site: new mongoose.Types.ObjectId('5eff514d5a90b564e86ece44'),
        attendance: {
            date: new Date(),
            isAbsent: false,
            isLate: false,
        },
        dailyActivity: [
            { isActive: false, duration: 180 },
            { isActive: false, duration: 180 },
            { isActive: true, duration: 180 },
            { isActive: true, duration: 180 },
            { isActive: true, duration: 180 },
            { isActive: true, duration: 180 },
        ],
    },
    {
        _id: new mongoose.Types.ObjectId('5eff4b306fa7eb5e091abf4f'),
        name: 'adam',
        email: 'adam@gmail.com',
        site: new mongoose.Types.ObjectId('5eff514d5a90b564e86ece44'),
        attendance: {
            date: new Date(),
            isAbsent: true,
            isLate: false,
        },
        dailyActivity: [],
    },
];

class WorkerSeeder extends Seeder {
    constructor() {
        super();
        this.Worker = models.Worker;
    }

    async shouldRun() {
        return this.Worker.countDocuments()
            .exec()
            .then((count) => count === 0);
    }

    async run() {
        return this.Worker.create(data);
    }
}

export default WorkerSeeder;
