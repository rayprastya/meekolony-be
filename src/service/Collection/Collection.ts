import CollectionOverallRepository from '../../repository/Collection/Collection';

class CollectionOverallService {
    async getCollectionOverall(collectionSymbol: string): Promise<any> {
        try {
            const collection = await CollectionOverallRepository.getCollectionOverall(collectionSymbol);
            return collection;
        } catch (error) {
            throw error
        }
    }
}

export default new CollectionOverallService();
