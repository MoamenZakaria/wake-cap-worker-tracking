import mongoose from 'mongoose';
import config from 'config';
import ClientSeeder from './seeders/client.seeder';
import SiteSeeder from './seeders/site.seeder';
import WorkerSeeder from './seeders/worker.seeder';

const { url } = config.get('db');

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
export const seedersList = { ClientSeeder, SiteSeeder, WorkerSeeder };
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
export const connect = () =>
    mongoose.connect(url, { useNewUrlParser: true, autoIndex: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
export const dropdb = () => mongoose.connection.db.dropDatabase();
