import { Options, Sequelize } from 'sequelize';
import Quote from './quote';
import User from './user';
import config from '../config.json';
import Result from './result';

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    <Options> config.development.options
);

Quote.initialize(sequelize);
User.initialize(sequelize);
Result.initialize(sequelize);

User.hasMany(Result, { foreignKey: 'userId', onDelete: 'cascade'});
Quote.hasMany(Result, { foreignKey: 'quoteId'});

void sequelize.sync({ force: true });

export {
    sequelize as db,
    Quote,
    User,
    Result
};