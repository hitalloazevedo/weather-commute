import { EmailService } from './emailService.js';
import { fetchHourlyForecast } from './fetchHourlyForecast.js';
import { locations } from './locations.js';
import { formatResult } from './formatResult.js';
import { logInfo } from './logger.js';
import { getEnv } from './getEnv.js';

logInfo('Starting weather forecast fetch process...');

const data = await fetchHourlyForecast(locations);

logInfo('Weather data fetched successfully.');

const result = formatResult(data);

const emailService = EmailService.getInstance();

await emailService.sendEmail({
    to: getEnv('NOTIFICATION_EMAIL_TO'),
    subject: 'Hourly Weather Forecast',
    body: result,
});