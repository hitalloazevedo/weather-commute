export const config = {
  botToken: process.env.BOT_TOKEN,
  appId: process.env.APP_ID,
  publicKey: process.env.PUBLIC_KEY,
  channelId: process.env.CHANNEL_ID,
  openMeteoEndpoint: process.env.OPEN_METEO_ENDPOINT ?? "https://api.open-meteo.com/v1",
};
