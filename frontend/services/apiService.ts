import axios from "axios";
import io from "socket.io-client";

const API_BASE_URL = "http://localhost:3000"; // Adjust the base URL as needed

// Create an Axios instance for API calls
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Function to fetch sensor data
export const fetchSensorData = async () => {
  const response = await api.get("/sensor");
  return response.data;
};

// Establish a WebSocket connection
export const socket = io(`${API_BASE_URL}/sensors`);
