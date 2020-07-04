import { Seeder } from 'mongoose-data-seed';
import mongoose from 'mongoose';

import * as models from '../src/models';

const data = [
    {
        name: 'Futtiam',
        bio: 'carffouer ',
        sites: [new mongoose.Types.ObjectId('5eff514d5a90b564e86ece84')],
    },
];

class ClientSeeder extends Seeder {
    constructor() {
        super();
        this.Client = models.Client;
    }

    async shouldRun() {
        return this.Client.countDocuments()
            .exec()
            .then((count) => count === 0);
    }

    async run() {
        return this.Client.create(data);
    }
}

export default ClientSeeder;
