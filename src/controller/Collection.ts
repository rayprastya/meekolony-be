import express, { Request, Response } from 'express';
import CollectionOverallService from '../service/Collection/Collection';
import CollectionHolderService from "../service/Collection/CollectionHolder";
import CollectionHolderVolumeService from "../service/Collection/CollectionHolderVolume";
import CollectionListingService from "../service/Collection/CollectionListing";
import CollectionAttributeService from "../service/Collection/CollectionAttribute";
import CollectionActivityService from "../service/Collection/CollectionActivity";
import errors from "../domain/Errors";
const router = express.Router();

router.get('/collection/:id', async (req: Request, res: Response) => {
    try {
        const collection = await CollectionOverallService.getCollectionOverall(req.params.id);
        res.json(collection);
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

router.get('/collection/:id/holder-stats', async (req: Request, res: Response) => {
    try {
        const collection = await CollectionHolderService.getCollectionHolder(req.params.id);
        res.json(collection);
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

router.get('/collection/:id/holder-by-volume', async (req: Request, res: Response) => {
    try {
        const collection = await CollectionHolderVolumeService.getCollectionHolderVolume(req.params.id);
        res.json(collection);
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


router.get('/collection/:id/listing', async (req: Request, res: Response) => {
    try {
        const collection = await CollectionListingService.getCollectionListingVolume(req.params.id);
        res.json(collection);
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

router.get('/collection/:id/attribute', async (req: Request, res: Response) => {
    try {
        const collection = await CollectionAttributeService.getCollectionAttributeVolume(req.params.id);
        res.json(collection);
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

router.get('/collection/:id/activity', async (req: Request, res: Response) => {
    try {
        const collection = await CollectionActivityService.getCollectionActivity(req.params.id);
        res.json(collection);
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
