import dotenv from 'dotenv';

dotenv.config();

export function getEnv(key: string): string {
    const value = process.env[key];
    if (!value) {
        console.log(`Environment variable ${key} is not set`);
        process.exit(1);
    }
    return value;
}