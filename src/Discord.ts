import { config } from "./config.js";

export class DiscordService {
    private static instance: DiscordService | null = null;

    private constructor() { }

    public static getInstance(): DiscordService {
        if (DiscordService.instance === null) {
            DiscordService.instance = new DiscordService();
        }
        return DiscordService.instance;
    }

    public async sendMessage(message: string): Promise<void> {
        const response = await fetch(
            `https://discord.com/api/v10/channels/${config.channelId}/messages`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bot ${config.botToken}`,
                    "Content-Type": "application/json",
                    "User-Agent": "DiscordBot (https://github.com/hitalloazevedo/weather-commute, 1.0.0)"
                },
                body: JSON.stringify({
                    content: message
                })
            }
        );

        if (!response.ok) {
            throw new Error(await response.text());
        }
    }
}