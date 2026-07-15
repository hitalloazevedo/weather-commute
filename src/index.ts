import { fetchHourlyForecast } from './fetchHourlyForecast.js';
import { locations } from './locations.js';
import { formatResult } from './formatResult.js';
import { logInfo } from './logger.js';
import { DiscordService } from './Discord.js';

logInfo('Starting weather forecast fetch process...');

const data = await fetchHourlyForecast(locations);

logInfo('Weather data fetched successfully.');

const result = formatResult(data);

const discord = DiscordService.getInstance();

await discord.sendMessage(result);
