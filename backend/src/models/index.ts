import { Options, Sequelize } from 'sequelize';
import Quote from './quote';
import User from './user';
import config from '../config.json';

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    <Options> config.development.options
);

Quote.initialize(sequelize);
User.initialize(sequelize);

void sequelize.sync({ force: true });

export {
    sequelize as db,
    Quote,
    User
};