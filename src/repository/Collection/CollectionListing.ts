import errors from "../../domain/Errors";
import axios from 'axios';

class CollectionListingRepository {
    async getCollectionListing(collectionSymbol: string): Promise<any> {
        try {
            const response = await axios.get(`https://api-mainnet.magiceden.dev/v2/collections/${collectionSymbol}/listings?limit=100&sort=updatedAt&listingAggMode=false`);
            const data = response.data;

            const responseData = data.map((listing: any) => ({
                tokenMint: listing.tokenMint,
                seller: listing.seller,
                price: listing.price,
                name: listing.token.name,
                image: listing.extra.img,
                listStatus: listing.listStatus,
                tokenAddress: listing.tokenAddress,
            }));

            const result = {
                collectionInfo: {
                    collectionName: response.data[0].token.collectionName,
                    listingCount: responseData.length,
                },
                listings: responseData
            };

            return result;

        } catch (error: any) {
            if (error.response.status === 400) {
                throw errors.ERR_INVALID_COLLECTION_SYMBOL;
            }
            console.log('Error fetching data:', error);
            throw error;
        }
    }
}

export default new CollectionListingRepository();
