
import { config } from './config.js';
import type { OpenMeteoResponse } from './OpenMeteoResponse.js';
import type { ForecastType, LocationType } from './types.js';

const WEATHER_CODES: Record<number, string> = {
  0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
  45: "Fog", 48: "Depositing rime fog", 51: "Light drizzle", 53: "Drizzle", 55: "Dense drizzle",
  61: "Light rain", 63: "Rain", 65: "Heavy rain", 71: "Light snow", 73: "Snow", 75: "Heavy snow",
  80: "Rain showers", 81: "Rain showers", 82: "Violent rain showers", 95: "Thunderstorm"
};

export async function fetchHourlyForecast(locations: Array<LocationType>): Promise<Array<ForecastType>> {
  return Promise.all(locations.map(async location => {
    const url = `${config.openMeteoEndpoint}/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,weather_code&forecast_days=1`;
    const response = await fetch(url);
    const data = await response.json() as OpenMeteoResponse;
    const now = new Date();

    const list = data.hourly.time
      .map((time, i) => ({ time, i }))
      .filter(({ time }) => new Date(time) >= now)
      .slice(0, 7)
      .map(({ time, i }) => {
        const temperature = data.hourly.temperature_2m[i];
        const weatherCode = data.hourly.weather_code[i];

        if (temperature === undefined || weatherCode === undefined) {
          throw new Error(`Invalid Open-Meteo response at index ${i}`);
        }

        return {
          dt: Math.floor(new Date(time).getTime() / 1000),
          main: {
            temp: temperature,
            feels_like: 0,
            temp_min: 0,
            temp_max: 0,
            pressure: 0,
            sea_level: 0,
            grnd_level: 0,
            humidity: 0,
            temp_kf: 0,
          },
          weather: [{
            id: weatherCode,
            main: "",
            description: WEATHER_CODES[weatherCode] ?? "Unknown",
            icon: "",
          }],
          clouds: { all: 0 },
          wind: { speed: 0, deg: 0, gust: 0 },
          visibility: 0,
          pop: 0,
          sys: { pod: "" },
          dt_txt: time,
        };
      });
    return { cod: "200", message: 0, cnt: list.length, list, city: { id: 0, name: location.name, coord: { lat: Number(location.latitude), lon: Number(location.longitude) } } };
  }));
}
