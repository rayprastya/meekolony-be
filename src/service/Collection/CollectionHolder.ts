import CollectionHolderRepository from '../../repository/Collection/CollectionHolder';

class CollectionHolderService {
    async getCollectionHolder(collectionSymbol: string): Promise<any> {
        try {
            const collection = await CollectionHolderRepository.getCollectionHolder(collectionSymbol);
            return collection;
        } catch (error) {
            throw error
        }
    }
}

export default new CollectionHolderService();
