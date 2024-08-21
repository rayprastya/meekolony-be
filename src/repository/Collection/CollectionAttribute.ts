import errors from "../../domain/Errors";
import axios from 'axios';
import convertSolValue from "../../helper/convertSolValue";
class CollectionAttributeRepository {
    async getCollectionAttribute(collectionSymbol: string): Promise<any> {
        try {
            const response = await axios.get(`https://api-mainnet.magiceden.dev/v2/collections/${collectionSymbol}/attributes`);
            const data = response.data;

            const responseData = data.results.availableAttributes.map((listing: any) => ({
                attribute: listing.attribute,
                count: listing.count,
                floor: convertSolValue(listing.floor),
                countByListingType: listing.countByListingType
            }));

            const uniqueTraitTypes = Array.from(new Set(
                data.results.availableAttributes.map((listing: any) => listing.attribute.trait_type)
            ));


            const result = {
                collectionInfo: {
                    collectionType: uniqueTraitTypes,
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

export default new CollectionAttributeRepository();
