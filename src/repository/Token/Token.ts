import errors from "../../domain/Errors";
import getMintDetails from "../../helper/mintMetaData";
class TokenDetailRepository {
    async getTokenDetail(tokenMint: string): Promise<any> {
        try {
            const result = await getMintDetails(tokenMint);
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

export default new TokenDetailRepository();
