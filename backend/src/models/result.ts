import { Model, DataTypes, Sequelize } from "sequelize";

class Result extends Model {

    public id!: number;
    public createdAt!: Date;
    public updatedAt!: Date;

    public wpm!: number;

    public static initialize(sequelize: Sequelize): void {
        this.init({
            wpm: DataTypes.INTEGER,
        }, {
            sequelize: sequelize,
            name: {
                singular: 'Test',
                plural: 'Tests'
            }
        });
    }
}

export default Result;