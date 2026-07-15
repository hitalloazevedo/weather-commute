import type { ForecastType } from "./types.js";

function weatherEmoji(code: number): string {
  switch (code) {
    case 0: return "☀️";
    case 1: case 2: return "🌤️";
    case 3: return "☁️";
    case 45: case 48: return "🌫️";
    case 51: case 53: case 55: case 56: case 57: return "🌦️";
    case 61: case 63: case 65: case 66: case 67: case 80: case 81: case 82: return "🌧️";
    case 71: case 73: case 75: case 77: case 85: case 86: return "❄️";
    case 95: case 96: case 99: return "⛈️";
    default: return "🌡️";
  }
}

function capitalize(v: string) { return v.charAt(0).toUpperCase() + v.slice(1); }

function header(code: number) {
  const fmt = new Intl.DateTimeFormat("pt-BR", { weekday: "long", day: "numeric", month: "long", timeZone: "America/Sao_Paulo" });
  const parts = fmt.formatToParts(new Date());
  const weekday = capitalize(parts.find(p => p.type === "weekday")!.value);
  const day = parts.find(p => p.type === "day")!.value;
  const month = capitalize(parts.find(p => p.type === "month")!.value);
  return `${weatherEmoji(code)} ${weekday}, ${day} de ${month}`;
}

export function formatResult(data: Array<ForecastType>): string {
  let result = "";
  for (const location of data) {
    const first = location.list[0];
    if (first) { result += header(first.weather[0]?.id ?? 0) + "\n\n"; }
    result += `${location.city.name}\n`;
    for (const forecast of location.list) {
      const date = new Date(forecast.dt * 1000);
      const time = date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "America/Sao_Paulo" }).slice(0, 2);
      if (forecast.weather.length > 0) {
        result += `${time} | ${forecast.main.temp.toFixed(2)}°C | ${forecast.weather[0]!.description}.\n`;
      }
    }
    result += "\n\n";
  }
  return result;
}
