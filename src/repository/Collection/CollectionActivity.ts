import errors from "../../domain/Errors";
import axios from 'axios';

class CollectionActivityRepository {
    async getCollectionActivity(collectionSymbol: string): Promise<any> {
        try {
            const response = await axios.get(`https://api-mainnet.magiceden.dev/v2/collections/${collectionSymbol}/activities?offset=0&limit=350`);
            const data = response.data;

            const filteredData = data.filter((entry: any) => entry.source === 'magiceden_v2');

            const responseData = filteredData.map((listing: any) => ({
                signature: listing.signature,
                type: listing.type,
                tokenMint: listing.tokenMint,
                slot: listing.slot,
                blockTime: listing.blockTime,
                buyerReferral: listing.buyerReferral,
                seller: listing.seller,
                sellerReferral:listing.sellerReferral,
                image: listing.image,
            }));

            const activityType = Array.from(new Set(
                filteredData.map((listing: any) => listing.type)
            ));

            const result = {
                collectionInfo: {
                    activityType: activityType,
                    listingCount: responseData.length,
                },
                listings: responseData
            };

            return result;

        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                throw errors.ERR_INVALID_COLLECTION_SYMBOL;
            }
            console.log('Error fetching data:', error);
            throw error;
        }
    }
}

export default new CollectionActivityRepository();
