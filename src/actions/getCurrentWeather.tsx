export default async function getCurrentWeahter(lat: number, lon: number) {
  const apiKey = process.env.OPENWEATHER_API_KEY || process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    console.error("OpenWeather API key is missing in environment variables");
    return {
      currentWeather: 0,
      currentLocation: "Localização indisponível",
    };
  }
  
  if (!lat || !lon) {
    console.warn("Latitude and longitude are required");
    return {
      currentWeather: 0,
      currentLocation: "Localização indisponível",
    };
  }
  
  try {
    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=pt_BR&units=metric`
    );
    
    if (!request.ok) {
      throw new Error(`Weather API returned ${request.status}`);
    }
    
    const response = await request.json();
    return {
      currentWeather: Math.floor(response.main.temp),
      currentLocation: response.name,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {
      currentWeather: 0,
      currentLocation: "Erro ao obter clima",
    };
  }
}
