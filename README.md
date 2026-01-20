# 🌦️ Weather Commute

**Weather Commute** is a small utility project that sends me a daily weather forecast by email, so I don’t have to remember to check the weather before leaving home.

It runs automatically every weekday at **5:00 PM**, showing the weather for the cities I travel through on my way to college — right when I’m getting ready to leave.

---

## 🤔 Why I built this

Every day before going to college, I need to check the weather.

Sometimes I forget.  
Sometimes I’m in a hurry.  
And because I commute by **motorcycle**, checking the weather is not optional:

- 🌧️ **Rain** → I need to take my rain gear  
- 🧥 **Temperature** → heavy jacket or light jacket  

Instead of relying on memory, I automated it.

Since the forecast is sent by **email**, I get a notification on my phone — no app to open, no site to check. The information comes to me.

---

## ✉️ What the email looks like

The email is **plain text**, focused on clarity and speed.  
It contains the hourly forecast for the next 7 hours — the exact window of time I stay away from home — for the three cities I travel through.

### Example

```
City #1
06 PM | 21.19°C | overcast clouds.
07 PM | 21.05°C | overcast clouds.

08 AM | 20.93°C | overcast clouds.
09 AM | 20.25°C | overcast clouds.
10 AM | 19.61°C | overcast clouds.
11 AM | 19.55°C | broken clouds.
12 AM | 19.24°C | overcast clouds.


City #2
06 PM | 20.89°C | overcast clouds.
07 PM | 20.87°C | overcast clouds.
08 AM | 20.86°C | overcast clouds.
09 AM | 20.31°C | overcast clouds.
10 AM | 19.80°C | broken clouds.
11 AM | 19.71°C | broken clouds.
12 AM | 19.51°C | overcast clouds.


City #3
06 PM | 19.77°C | overcast clouds.
07 PM | 19.73°C | overcast clouds.
08 AM | 19.71°C | overcast clouds.
09 AM | 19.14°C | overcast clouds.
10 AM | 18.56°C | broken clouds.
11 AM | 18.16°C | broken clouds.
12 AM | 18.12°C | overcast clouds.
```

---

## **How To Run**

- **Prerequisites:** Node.js 20, npm.
- **Install & build:**

```bash
npm ci
npm run build
```

- **Environment variables:** set the following (example `.env` line):

```env
OPEN_WEATHER_API_KEY=your_api_key_here
OPEN_WEATHER_ENDPOINT=https://api.openweathermap.org
EMAIL_SMTP_HOST="smtp.server.com"
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USER="user@domain.com"
EMAIL_SMTP_PASSWORD="aaaaaaaaaaaaaaaaa"
NOTIFICATION_EMAIL_TO="receiver@domain.com"
LOCATIONS='[{"name":"City1","latitude":"-0.2234234","longitude":"-4.880223"},{"name":"City2","latitude":"-2.2221111","longitude":"-7.999888"},{"name":"City3","latitude":"-11.3232323","longitude":"-0.222333"}]'
```

- **Run locally (production build):**

```bash
node dist/index.js
```

- **Run in development:**

```bash
npm run dev
```

- **Running in GitHub Actions:** add the same variables as repository secrets: `OPEN_WEATHER_API_KEY`, `OPEN_WEATHER_ENDPOINT`, `EMAIL_SMTP_HOST`, `EMAIL_SMTP_PORT`, `EMAIL_SMTP_USER`, `EMAIL_SMTP_PASSWORD`, `NOTIFICATION_EMAIL_TO` and `LOCATIONS`. The workflow will read them and fail early if any are missing.

---