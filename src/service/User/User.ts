import UserRepository from '../../repository/User/User';

import { User, UserAttributes } from '../../domain/User/User';

class UserService {
    async getUserDetails(walletAddress: string): Promise<UserAttributes> {
        try {
            const user = await UserRepository.getUserDetails(walletAddress);
            return user;
        } catch (error) {
            throw error
        }
    }
}

export default new UserService();
