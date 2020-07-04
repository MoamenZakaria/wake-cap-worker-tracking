import { Seeder } from 'mongoose-data-seed';
import mongoose from 'mongoose';
import * as models from '../src/models';

const data = [
    {
        _id: new mongoose.Types.ObjectId('5eff514d5a90b564e86ece84'),
        name: 'mall of emirates',
        timezone: '+04:00',
        startingHour: 9,
        endingHour: 5,
        lateThreshold: 15,
        admin: { name: 'moamen', email: 'moamen.zakaria.z@gmail.com' },
        workers: [
            new mongoose.Types.ObjectId('5eff4b306fa7eb5e098abfdf'),
            new mongoose.Types.ObjectId('5eff4b306fa7eb5e098abfff'),
        ],
    },
    {
        _id: new mongoose.Types.ObjectId('5eff514d5a90b564e86ece44'),
        name: 'Alexandria City Center',
        timezone: '+02:00',
        startingHour: 9,
        endingHour: 5,
        lateThreshold: 15,
        admin: { name: 'john', email: 'john.z@gmail.com' },
        workers: [
            new mongoose.Types.ObjectId('5eff4b306fa7eb5e098abf4f'),
            new mongoose.Types.ObjectId('5eff4b306fa7eb5e091abf4f'),
        ],
    },
];

class SiteSeeder extends Seeder {
    constructor() {
        super();
        this.Site = models.Site;
    }

    async shouldRun() {
        return this.Site.countDocuments()
            .exec()
            .then((count) => count === 0);
    }

    async run() {
        return this.Site.create(data);
    }
}

export default SiteSeeder;
