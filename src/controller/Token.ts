import express, { Request, Response } from 'express';
import TokenDetailService from '../service/Token/Token';
import TokenOfferService from '../service/Token/TokenOffer';
import TokenActivityService from '../service/Token/TokenActivity';
import errors from "../domain/Errors";
const router = express.Router();

router.get('/token/:id', async (req: Request, res: Response) => {
    try {
        const token = await TokenDetailService.getTokenDetail(req.params.id);
        res.json(token);
    } catch (error: any) {
        switch (error) {
            case errors.ERR_DATA_NOT_FOUND:
                res.status(404).json({ message: 'Collection not found' });
                break;
            default:
                res.status(500).json({ message: error.message });
        }
    }
});

router.get('/token/:id/offers', async (req: Request, res: Response) => {
    try {
        const token = await TokenOfferService.getTokenOffer(req.params.id);
        res.json(token);
    } catch (error: any) {
        switch (error) {
            case errors.ERR_DATA_NOT_FOUND:
                res.status(404).json({ message: 'Collection not found' });
                break;
            default:
                res.status(500).json({ message: error.message });
        }
    }
});

router.get('/token/:id/activities', async (req: Request, res: Response) => {
    try {
        const token = await TokenActivityService.getTokenActivity(req.params.id);
        res.json(token);
    } catch (error: any) {
        switch (error) {
            case errors.ERR_DATA_NOT_FOUND:
                res.status(404).json({ message: 'Collection not found' });
                break;
            default:
                res.status(500).json({ message: error.message });
        }
    }
});

export default router;
