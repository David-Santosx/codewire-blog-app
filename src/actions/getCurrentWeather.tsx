export default async function getCurrentWeahter(lat: number, lon: number) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error("API key not found");
  }
  if (!lat || !lon) {
    throw new Error("Latitude and longitude are required");
  }
  const request = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=pt_BR&units=metric`
  );
  const response = await request.json();
  return {
      currentWeather: Math.floor(response.main.temp),
      currentLocation: response.name,
  };
}
