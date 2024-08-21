import { UserAsset } from '../../domain/User/Asset';
import errors from "../../domain/Errors";
import axios from 'axios';

class UserAssetRepository {
    async getUserAssets(walletAddress: string): Promise<UserAsset[]> {
        try {
            const response = await axios.get(`https://api-mainnet.magiceden.dev/v2/wallets/${walletAddress}/tokens`);

            const simplifiedAssets: UserAsset[] = response.data.map((item: any) => ({
                mintAddress: item.mintAddress,
                image: item.image,
                collection: item.collection,
                collectionName: item.collectionName,
                price: item.priceInfo?.solPrice ? parseInt(item.priceInfo.solPrice.rawAmount, 10) / Math.pow(10, item.priceInfo.solPrice.decimals) : undefined,
                listStatus: item.listStatus
            }));

            return simplifiedAssets;
        } catch (error : any) {
            if (error.response.status === 400) {
                throw errors.ERR_INVALID_WALLET_ADDRESS;
            }
            console.log('Error fetching data:', error);
            throw error;
        }
    }
}

export default new UserAssetRepository();
