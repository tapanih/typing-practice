import { Model, DataTypes, Sequelize } from "sequelize";

class User extends Model {

  public id!: number;
  public createdAt!: Date;
  public updatedAt!: Date;

  public email!: string;
  public username!: string;
  public passwordHash!: string;
  public confirmed!: boolean;

  public static initialize(sequelize: Sequelize): void {
    this.init({
      email: {
        type: DataTypes.STRING(254),
        allowNull: false
      },
      username: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      passwordHash: {
        type: DataTypes.STRING(64)
      },
      confirmed: {
        type: DataTypes.BOOLEAN
      }
    }, {
      sequelize: sequelize,
      name: {
          singular: 'user',
          plural: 'users'
      }
    });
  }
}

export default User;