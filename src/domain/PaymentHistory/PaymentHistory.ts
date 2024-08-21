import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../infrastructure/postgres';

interface PaymentHistoryAttributes {
    id?: number;
    signature: string;
    source: string;
    tokenMint: string;
    slot: Date; // Use Date if you need to store actual datetime
    blockTime: Date; // Use Date if you need to store actual datetime
    buyer: string;
    seller: string;
    price: number; // Use FLOAT if you need decimal
    image: string;
}

interface PaymentHistoryCreationAttributes extends Optional<PaymentHistoryAttributes, 'id'> {}

class PaymentHistory extends Model<PaymentHistoryAttributes, PaymentHistoryCreationAttributes> implements PaymentHistoryAttributes {
    public id!: number;
    public signature!: string;
    public source!: string;
    public tokenMint!: string;
    public slot!: Date;
    public blockTime!: Date;
    public buyer!: string;
    public seller!: string;
    public price!: number;
    public image!: string;
}

PaymentHistory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        signature: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        source: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        tokenMint: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        slot: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        blockTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        buyer: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        seller: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.FLOAT, // Use FLOAT for decimal prices
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },
    {
        sequelize,
        tableName: 'payment_history',
        timestamps: true,
    }
);

export { PaymentHistory, PaymentHistoryAttributes };
