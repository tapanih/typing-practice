import { Model, DataTypes, Sequelize } from "sequelize";

class Quote extends Model {

    public id!: number;
    public createdAt!: Date;
    public updatedAt!: Date;

    public content!: string;

    public static initialize(sequelize: Sequelize): void {
        this.init({
            content: DataTypes.STRING(512)
        }, {
            sequelize: sequelize,
            name: {
                singular: 'quote',
                plural: 'quotes'
            }
        });
    }
}

export default Quote;