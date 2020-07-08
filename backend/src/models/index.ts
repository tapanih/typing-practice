import { Options, Sequelize } from 'sequelize';
import Quote from './quote';
import User from './user';
import config from '../config.json';
import Result from './result';

const sequelize = process.env.POSTGRES_USER && process.env.POSTGRES_PASSWORD && process.env.POSTGRES_IP
? new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_IP}/${process.env.POSTGRES_USER}`)
: new Sequelize(
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

export {
    sequelize as db,
    Quote,
    User,
    Result
};