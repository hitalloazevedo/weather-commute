import dotenv from 'dotenv'
import { EmailService } from './emailService.js';
import { fetchHourlyForecast } from './fetchHourlyForecast.js';
import { locations } from './locations.js';
import { formatResult } from './formatResult.js';
import { logInfo } from './logger.js';

dotenv.config();

logInfo('Starting weather forecast fetch process...');

const data = await fetchHourlyForecast(locations);

logInfo('Weather data fetched successfully.');

const result = formatResult(data);

const emailService = EmailService.getInstance();

await emailService.sendEmail({
    to: process.env.NOTIFICATION_EMAIL_TO!,
    subject: 'Hourly Weather Forecast',
    body: result,
});