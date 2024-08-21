import errors from "../../domain/Errors";
import axios from 'axios';
import convertSolValue from "../../helper/convertSolValue";

class CollectionHolderVolumeRepository {
    async getCollectionHolderVolume(collectionSymbol: string): Promise<any> {
        try {
            const response = await axios.get(`https://api-mainnet.magiceden.dev/v2/collections/${collectionSymbol}/leaderboard`);
            const data = response.data;

            const convertedData = data.map((holder: any) => ({
                owner: holder.wallet,
                totalVol: convertSolValue(holder.totalVol),
            }));

            return convertedData;

        } catch (error: any) {
            if (error.response.status === 400) {
                throw errors.ERR_INVALID_COLLECTION_SYMBOL;
            }
            console.log('Error fetching data:', error);
            throw error;
        }
    }
}

export default new CollectionHolderVolumeRepository();
