import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../infrastructure/postgres';


interface UserAttributes {
    id?: number;
    walletAddress: string;
    profilePict?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public walletAddress!: string;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        walletAddress: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: 'users',
        timestamps: false,
    }
);

export { User, UserAttributes };
