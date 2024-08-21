import CollectionActivityRepository from "../../repository/Collection/CollectionActivity";

class CollectionActivityService {
    async getCollectionActivity(collectionSymbol: string): Promise<any> {
        try {
            const collection = await CollectionActivityRepository.getCollectionActivity(collectionSymbol);
            return collection;
        } catch (error) {
            throw error
        }
    }
}

export default new CollectionActivityService();
