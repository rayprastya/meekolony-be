import express, { Request, Response } from 'express';
import UserService from '../service/User/User';
import UserAssetService from '../service/User/Asset';
import errors from "../domain/Errors";
// import IsOnlyNumbers from "../helper/validator";
const router = express.Router();

// router.get('/user/:id', async (req: Request, res: Response) => {
//     try {
//         // if (!IsOnlyNumbers(req.params.id)) {
//         //     res.status(400).json({ message: "id must be numeric" });
//         // }
//         const user = await UserService.fetchUserById(Number(req.params.id));
//         res.json(user);
//     } catch (error: any) {
//         switch (error) {
//             case errors.ERR_DATA_NOT_FOUND:
//                 res.status(404).json({ message: 'User not found' });
//                 break;
//             default:
//                 res.status(500).json({ message: error.message });
//         }
//     }
// });

router.get('/user/:id', async (req: Request, res: Response) => {
    try {
        const user = await UserService.getUserDetails(req.params.id);
        res.json(user);
    } catch (error: any) {
        switch (error) {
            case errors.ERR_DATA_NOT_FOUND:
                res.status(404).json({ message: 'User not found' });
                break;
            default:
                res.status(500).json({ message: error.message });
        }
    }
});

router.get('/user/:id/assets', async (req: Request, res: Response) => {
    try {
        const user = await UserAssetService.getUserAssets(req.params.id);
        res.json(user);
    } catch (error: any) {
        switch (error) {
            case errors.ERR_DATA_NOT_FOUND:
                res.status(404).json({ message: 'User not found' });
                break;
            case errors.ERR_INVALID_WALLET_ADDRESS:
                res.status(400).json({ message: 'Invalid wallet ID' });
                break;
            default:
                res.status(500).json({ message: error.message });
        }
    }
});

export default router;
