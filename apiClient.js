import axios from 'axios';
// Importeer de Axios-bibliotheek, die wordt gebruikt om HTTP-verzoeken te maken.

import { API_CONFIG } from './apiConfig';
// Importeer het API-configuratieobject, dat de basis-URL en headers bevat.

const apiClient = axios.create({
  // Maak een Axios-instantie met vooraf gedefinieerde configuratie.
  baseURL: API_CONFIG.BASE_URL,
  // Stel de basis-URL in voor alle API-verzoeken met de waarde uit `API_CONFIG`.

  headers: {
    ...API_CONFIG.HEADERS,
    // Voeg de headers uit `API_CONFIG` toe, inclusief de Authorization-header.

    'Cache-Control': 'no-cache',
    // Voeg een `Cache-Control`-header toe om caching van API-antwoorden te voorkomen.
  },
});

// Haal gegevens op van de API
export const fetchData = async (endpoint) => {
  // Definieer een asynchrone functie om gegevens van de API op te halen.
  try {
    const response = await apiClient.get(endpoint);
    // Maak een GET-verzoek naar het opgegeven endpoint met de Axios-instantie.
    return response.data;
    // Geef de gegevens terug uit het API-antwoord.
  } catch (error) {
    console.error('API GET Fout:', error.response?.data || error.message);
    // Log het foutbericht of de foutgegevens als het GET-verzoek mislukt.
    throw new Error('Er is een fout opgetreden bij het ophalen van gegevens.');
    // Gooi een nieuwe fout om deze door te geven aan de aanroepende functie.
  }
};

// Werk gegevens bij in de API
export const updateData = async (endpoint, payload) => {
  // Definieer een asynchrone functie om gegevens bij te werken in de API.
  try {
    const response = await apiClient.put(endpoint, payload);
    // Maak een PUT-verzoek naar het opgegeven endpoint met de meegegeven payload.
    return response.data;
    // Geef de gegevens terug uit het API-antwoord.
  } catch (error) {
    console.error('API PUT Fout:', error.response?.data || error.message);
    // Log het foutbericht of de foutgegevens als het PUT-verzoek mislukt.
    throw new Error('Er is een fout opgetreden bij het bijwerken van gegevens.');
    // Gooi een nieuwe fout om deze door te geven aan de aanroepende functie.
  }
};

// Maak nieuwe gegevens aan in de API
export const createData = async (endpoint, payload) => {
  // Definieer een asynchrone functie om nieuwe gegevens aan te maken in de API.
  try {
    const response = await apiClient.post(endpoint, payload);
    // Maak een POST-verzoek naar het opgegeven endpoint met de meegegeven payload.
    return response.data;
    // Geef de gegevens terug uit het API-antwoord.
  } catch (error) {
    console.error('API POST Fout:', error.response?.data || error.message);
    // Log het foutbericht of de foutgegevens als het POST-verzoek mislukt.
    throw new Error('Er is een fout opgetreden bij het aanmaken van gegevens.');
    // Gooi een nieuwe fout om deze door te geven aan de aanroepende functie.
  }
};

// Verwijder gegevens uit de API
export const deleteData = async (endpoint) => {
  // Definieer een asynchrone functie om gegevens te verwijderen uit de API.
  try {
    const response = await apiClient.delete(endpoint);
    // Maak een DELETE-verzoek naar het opgegeven endpoint.
    return response.data;
    // Geef de gegevens terug uit het API-antwoord.
  } catch (error) {
    console.error('API DELETE Fout:', error.response?.data || error.message);
    // Log het foutbericht of de foutgegevens als het DELETE-verzoek mislukt.
    throw new Error('Er is een fout opgetreden bij het verwijderen van gegevens.');
    // Gooi een nieuwe fout om deze door te geven aan de aanroepende functie.
  }
};

export default apiClient;
// Exporteer de Axios-instantie als de standaardexport zodat deze elders in de app kan worden gebruikt.