export default function convertSolValue(sol: number): number {
    return sol / 1_000_000_000; // 1 SOL = 1,000,000,000 lamports
}