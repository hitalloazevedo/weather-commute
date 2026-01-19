import dotenv from 'dotenv'
import { EmailService } from './email/email.service.js';
import { fetchHourlyForecast } from './fetchHourlyForecast.js';
import { locations } from './locations.js';

dotenv.config();

const data = await fetchHourlyForecast(locations);

let result = '';

for (let location of data){
    result += `${location.city.name}\n`;

    for (let forecast of location.list){
        const date = new Date(forecast.dt * 1000);
        let time = date.toLocaleTimeString().padStart(11, '0');;
        const period = time.split(' ')[1];
        time = time.slice(0, 2);
        result += `${time} ${period} | ${forecast.main.temp.toFixed(2)}°C | ${forecast.weather[0].description}.\n`;
    }
    result += '\n\n';
}

console.log(result);

const emailService = EmailService.getInstance();

await emailService.sendEmail({
    to: process.env.NOTIFICATION_EMAIL_TO!,
    subject: 'Hourly Weather Forecast',
    body: result,
});