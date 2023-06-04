import { Box, Text } from "@chakra-ui/react";
import { WiDaySunny, WiCloud, WiRain } from "react-icons/wi";

const Weather = ({ weatherData }) => {
  const { name, main, weather } = weatherData;
  const getWeatherIcon = () => {
    switch (weather[0].main) {
      case "Clear":
        return <WiDaySunny size={100} color="orange" />;
      case "Clouds":
        return <WiCloud size={100} color="gray" />;
      case "Rain":
        return <WiRain size={100} color="blue" />;
      default:
        return null;
    }
  };
  return (
    <Box
      textAlign="center"
      background="linear-gradient(135deg, #153A5B 0%, #764ba2 100%)"
      borderRadius="md"
      p={6}
      color="white"
    >
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        {name}
      </Text>
      {getWeatherIcon()}
      <Text fontSize="lg" fontWeight="bold" textAlign="center">
        {weather[0].description}
      </Text>
      <Text fontSize="2xl" fontWeight="bold" mt={4}>
        {Math.round(main.temp - 273.15)}°C
      </Text>
    </Box>
  );
};

export default Weather;
