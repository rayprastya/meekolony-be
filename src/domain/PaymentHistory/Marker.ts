import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../../infrastructure/postgres';

interface PaymentHistoryMarkerAttributes {
    id?: number;
    signature: string;
    tokenMint: string;
}

interface PaymentHistoryMarkerCreationAttributes extends Optional<PaymentHistoryMarkerAttributes, 'id'> {}

class PaymentHistoryMarker extends Model<PaymentHistoryMarkerAttributes, PaymentHistoryMarkerCreationAttributes> implements PaymentHistoryMarkerAttributes {
    public id!: number;
    public signature!: string;
    public tokenMint!: string;
}

PaymentHistoryMarker.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        signature: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        tokenMint: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'payment_history_marker',
        timestamps: true,
    }
);

export { PaymentHistoryMarker, PaymentHistoryMarkerAttributes };
