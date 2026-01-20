import type { ForecastType } from "./types.js";

export function formatResult(data: Array<ForecastType>): string {
    let result = '';

    for (let location of data) {
        result += `${location.city.name}\n`;

        for (let forecast of location.list) {
            const date = new Date(forecast.dt * 1000);
            let time = date.toLocaleTimeString().padStart(11, '0');;
            const period = time.split(' ')[1];
            time = time.slice(0, 2);

            if (forecast.weather.length > 0){
                result += `${time} ${period} | ${forecast.main.temp.toFixed(2)}°C | ${forecast.weather[0]!.description}.\n`;
            }
        }
        result += '\n\n';
    }

    return result;
}