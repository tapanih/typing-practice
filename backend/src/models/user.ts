import { Model, DataTypes, Sequelize } from "sequelize";

class User extends Model {

  public id!: number;
  public createdAt!: Date;
  public updatedAt!: Date;

  public username!: string;
  public passwordHash!: string;

  public static initialize(sequelize: Sequelize): void {
    this.init({
      username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      passwordHash: {
        type: DataTypes.STRING(64)
      }
    }, {
      sequelize: sequelize,
      name: {
          singular: 'User',
          plural: 'Users'
      }
    });
  }
}

export default User;