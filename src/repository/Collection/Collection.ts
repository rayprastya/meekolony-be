import errors from "../../domain/Errors";
import axios from 'axios';
import convertSolValue from "../../helper/convertSolValue";
class CollectionOverallRepository {
    async getCollectionOverall(collectionSymbol: string): Promise<any> {
        try {
            const response = await axios.get(`https://api-mainnet.magiceden.dev/v2/collections/${collectionSymbol}/stats?listingAggMode=false`);
            const data = response.data;

            const convertedData = {
                symbol: data.symbol,
                floorPrice: convertSolValue(data.floorPrice),
                listedCount: data.listedCount,
                avgPrice24hr: convertSolValue(data.avgPrice24hr),
                volumeAll: convertSolValue(data.volumeAll)
            };

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

export default new CollectionOverallRepository();
