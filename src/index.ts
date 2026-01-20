import dotenv from 'dotenv'
import { EmailService } from './email/emailService.js';
import { fetchHourlyForecast } from './fetchHourlyForecast.js';
import { locations } from './locations.js';
import { formatResult } from './formatResult.js';

dotenv.config();

const data = await fetchHourlyForecast(locations);

const result = formatResult(data);

const emailService = EmailService.getInstance();

await emailService.sendEmail({
    to: process.env.NOTIFICATION_EMAIL_TO!,
    subject: 'Hourly Weather Forecast',
    body: result,
});