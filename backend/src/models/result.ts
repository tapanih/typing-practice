import { Model, DataTypes, Sequelize } from "sequelize";

class Result extends Model {

    public id!: number;
    public createdAt!: Date;
    public updatedAt!: Date;

    public wpm!: number;
    public accuracy!: number;

    public static initialize(sequelize: Sequelize): void {
        this.init({
            wpm: DataTypes.INTEGER,
            accuracy: DataTypes.INTEGER,
        }, {
            sequelize: sequelize,
            name: {
                singular: 'result',
                plural: 'results'
            }
        });
    }
}

export default Result;