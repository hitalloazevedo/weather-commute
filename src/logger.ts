export function logInfo(message: string): void {
    console.log(`[+] ${new Date().toLocaleTimeString()} | ${message}`);
}