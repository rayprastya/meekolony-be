import CollectionHolderVolumeRepository from '../../repository/Collection/CollectionHolderVolume';

class CollectionHolderVolumeService {
    async getCollectionHolderVolume(collectionSymbol: string): Promise<any> {
        try {
            const collection = await CollectionHolderVolumeRepository.getCollectionHolderVolume(collectionSymbol);
            return collection;
        } catch (error) {
            throw error
        }
    }
}

export default new CollectionHolderVolumeService();
