import TokenActivityRepository from '../../repository/Token/TokenActivity';

class TokenActivityService {
    async getTokenActivity(tokenMint: string): Promise<any> {
        try {
            const tokenActivity = await TokenActivityRepository.getTokenActivity(tokenMint);
            return tokenActivity;
        } catch (error) {
            throw error
        }
    }
}

export default new TokenActivityService();
