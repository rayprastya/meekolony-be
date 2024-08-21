import errors from "../../domain/Errors";
import axios from "axios";

class TokenOfferRepository {
    async getTokenOffer(tokenMint: string): Promise<any> {
        try {
            const response = await axios.get(`https://api-mainnet.magiceden.dev/v2/tokens/${tokenMint}/offers_received?offset=0&limit=200`);
            const data = response.data;
            return data;

        } catch (error: any) {
            if (error.response.status === 400) {
                throw errors.ERR_INVALID_COLLECTION_SYMBOL;
            }
            console.log('Error fetching data:', error);
            throw error;
        }
    }
}

export default new TokenOfferRepository();
