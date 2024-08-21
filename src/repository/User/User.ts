// src/repository/userRepository.ts
import { User, UserAttributes } from '../../domain/User/User';
import getMintDetails  from '../../helper/mintMetaData';
import errors from "../../domain/Errors";
import axios from 'axios';

class UserRepository {
    // async getUserById(userId: number): Promise<User> {
    //     try {
    //         const userRecord = await User.findByPk(userId);
    //         if (!userRecord) {
    //             throw errors.ERR_DATA_NOT_FOUND;
    //         }
    //         return userRecord;
    //     } catch (error) {
    //         console.error('Error fetching user:', error);
    //         throw error;
    //     }
    // }
    async getUserDetails(walletAddress: string): Promise<UserAttributes> {
        try {
            const response = await axios.get(`https://api-mainnet.magiceden.dev/v2/wallets/${walletAddress}`);
            const userData = response.data;

            let profilePict = "/";

            if (userData.avatar) {
                const details = await getMintDetails(userData.avatar, ['image']);
                profilePict = details.image;
            }
            const userAttributes: UserAttributes = {
                walletAddress: userData.walletAddress,
                profilePict: profilePict,
            };

            return userAttributes;
        } catch (error: any) {
            if (error.response.status === 400) {
                throw errors.ERR_INVALID_WALLET_ADDRESS;
            }
            console.log('Error fetching data:', error);
            throw error;
        }
    }
}

export default new UserRepository();
