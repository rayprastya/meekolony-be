export default function IsOnlyNumbers(input: string): boolean {
    const regex = /^\d+$/;
    return regex.test(input);
}