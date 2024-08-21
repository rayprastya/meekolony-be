import TokenDetailRepository from '../../repository/Token/Token';

class TokenDetailService {
    async getTokenDetail(tokenMint: string): Promise<any> {
        try {
            const tokenDetail = await TokenDetailRepository.getTokenDetail(tokenMint);
            return tokenDetail;
        } catch (error) {
            throw error
        }
    }
}

export default new TokenDetailService();
