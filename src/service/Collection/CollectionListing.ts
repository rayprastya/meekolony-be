import CollectionListingRepository from '../../repository/Collection/CollectionListing';

class CollectionListingService {
    async getCollectionListingVolume(collectionSymbol: string): Promise<any> {
        try {
            const collection = await CollectionListingRepository.getCollectionListing(collectionSymbol);
            return collection;
        } catch (error) {
            throw error
        }
    }
}

export default new CollectionListingService();
