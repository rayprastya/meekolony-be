import errors from "../domain/Errors";
import axios from 'axios';

export default async function getMintDetails(tokenMint: string, includeOnly: string[] = []): Promise<any> {
    try {
        const response = await axios.get(`https://api-mainnet.magiceden.dev/v2/tokens/${tokenMint}`);
        const metaData = response.data;

        if (!metaData) {
            throw errors.ERR_DATA_NOT_FOUND;
        }

        if (includeOnly.length > 0) {
            const filteredMetaData: any = {};

            includeOnly.forEach((key) => {
                if (metaData.hasOwnProperty(key)) {
                    filteredMetaData[key] = metaData[key];
                }
            });

            return filteredMetaData;
        }

        return metaData;

    } catch (error) {
        console.error('Error fetching mint details:', error);
        throw error;
    }
}
