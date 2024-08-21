import errors from "../../domain/Errors";
import axios from 'axios';

class CollectionHolderRepository {
    async getCollectionHolder(collectionSymbol: string): Promise<any> {
        try {
            const response = await axios.get(`https://api-mainnet.magiceden.dev/v2/collections/${collectionSymbol}/holder_stats`);
;
            return response.data;
        } catch (error: any) {
            if (error.response.status === 400) {
                throw errors.ERR_INVALID_COLLECTION_SYMBOL;
            }
            console.log('Error fetching data:', error);
            throw error;
        }
    }
}

export default new CollectionHolderRepository();
