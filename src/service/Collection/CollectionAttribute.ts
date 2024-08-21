import CollectionAttributeRepository from "../../repository/Collection/CollectionAttribute";

class CollectionAttributeService {
    async getCollectionAttributeVolume(collectionSymbol: string): Promise<any> {
        try {
            const collection = await CollectionAttributeRepository.getCollectionAttribute(collectionSymbol);
            return collection;
        } catch (error) {
            throw error
        }
    }
}

export default new CollectionAttributeService();
