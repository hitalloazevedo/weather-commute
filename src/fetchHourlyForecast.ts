import type { LocationType } from './types.js';

export async function fetchHourlyForecast(locations: Array<LocationType>) {
    const openWeatherURL = process.env.OPEN_WEATHER_ENDPOINT!;
    const openWeatherAPIKey = process.env.OPEN_WEATHER_API_KEY!;

    const results = await Promise.all(
        locations.map(async (location) => {
        const response = await fetch(openWeatherURL + `/data/2.5/forecast/hourly?units=metric&cnt=7&lat=${location.latitude}&lon=${location.longitude}&appid=${openWeatherAPIKey}`);
        return await response.json();
    }))
    
    return results;
}