export interface OpenMeteoResponse {
    hourly: {
        time: string[];
        temperature_2m: number[];
        weather_code: number[];
    };
}