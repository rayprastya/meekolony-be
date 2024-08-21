import errors from "../../domain/Errors";
import axios from "axios";

class TokenActivityRepository {
    async getTokenActivity(tokenMint: string): Promise<any> {
        try {
            const response = await axios.get(`https://api-mainnet.magiceden.dev/v2/tokens/${tokenMint}/activities?offset=0&limit=200`);
            const data = response.data;

            const filteredData = data.filter((entry: any) => entry.source === 'magiceden_v2');

            return filteredData;
        } catch (error: any) {

            console.log('Error fetching data:', error);
            if (error.response.status === 400) {
                throw errors.ERR_INVALID_COLLECTION_SYMBOL;
            }
            console.log('Error fetching data:', error);
            throw error;
        }
    }
}

export default new TokenActivityRepository();
