import { configDotenv } from 'dotenv';

type locationType = {
    name: string,
    latitude: string,
    longitude: string
};

configDotenv();

const openWeatherURL = process.env.OPEN_WEATHER_ENDPOINT!;
const openWeatherAPIKey = process.env.OPEN_WEATHER_API_KEY!;

export async function fetchHourlyForecast(locations: Array<locationType>) {
    const results = await Promise.all(
        locations.map(async (location) => {
        const response = await fetch(openWeatherURL + `/data/2.5/forecast/hourly?units=metric&cnt=7&lat=${location.latitude}&lon=${location.longitude}&appid=${openWeatherAPIKey}`);
        return await response.json();
    }))
    
    return results;
}