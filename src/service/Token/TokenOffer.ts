import TokenOfferRepository from '../../repository/Token/TokenOffer';

class TokenOfferService {
    async getTokenOffer(tokenMint: string): Promise<any> {
        try {
            const tokenOffer = await TokenOfferRepository.getTokenOffer(tokenMint);
            return tokenOffer;
        } catch (error) {
            throw error
        }
    }
}

export default new TokenOfferService();
