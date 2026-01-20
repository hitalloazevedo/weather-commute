import { getEnv } from './getEnv.js';

export const transporterOptions = {
    host: getEnv('EMAIL_SMTP_HOST'),
    port: Number(getEnv('EMAIL_SMTP_PORT')),
    secure: false,
    requireTLS: true,
    connectionTimeout: 20_000,
    greetingTimeout: 20_000,
    socketTimeout: 20_000,
    auth: {
        user: getEnv('EMAIL_SMTP_USER'),
        pass: getEnv('EMAIL_SMTP_PASSWORD') ,
    },
};