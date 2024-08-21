import cron from 'node-cron';
import axios from 'axios';
import { PaymentHistory } from "../domain/PaymentHistory/PaymentHistory";
import { PaymentHistoryMarker } from "../domain/PaymentHistory/Marker";
import { broadcast } from './websocketServer';

async function processPaymentHistoryData(data: any[]) {
    const firstData = data[0].signature

    const existingMarker = await PaymentHistoryMarker.findOne();

    if(firstData !== existingMarker?.signature){
        for (const entry of data) {
            if (entry.type === 'buyNow' && entry.signature !== existingMarker?.signature) {
                await PaymentHistory.create({
                    signature: entry.signature,
                    source: entry.source,
                    tokenMint: entry.tokenMint,
                    slot: new Date(entry.slot * 1000),
                    blockTime: new Date(entry.blockTime * 1000),
                    buyer: entry.buyer,
                    seller: entry.seller,
                    price: entry.price,
                    image: entry.image
                });
            }
        }

        await PaymentHistoryMarker.destroy({ where: {} });

        await PaymentHistoryMarker.create({
            signature: data[0].signature,
            tokenMint: data[0].tokenMint
        });
        return true;
    }

    return false;
}

export function startScheduler() {
    cron.schedule('*/2 * * * *', async () => {
        console.log('Fetching data from MagicEden...');

        try {
            const response = await axios.get(`https://api-mainnet.magiceden.dev/v2/collections/meekolony/activities?offset=0&limit=350`);
            const data = response.data;

            const filteredData = data.filter((entry: any) => entry.source === 'magiceden_v2');

            const res = await processPaymentHistoryData(filteredData);

            // const message = JSON.stringify(filteredData);

            if (res == true) {
                broadcast("New sales is made");
            }

            console.log('Data fetched and broadcasted successfully.');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });
}
