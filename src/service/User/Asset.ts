import UserAssetRepository from '../../repository/User/Asset';

import { UserAsset } from '../../domain/User/Asset';

class UserAssetService {
    async getUserAssets(walletAddress: string): Promise<UserAsset[]> {
        try {
            const asset = await UserAssetRepository.getUserAssets(walletAddress);
            return asset;
        } catch (error) {
            throw error
        }
    }
}

export default new UserAssetService();
