import { API_KEY } from '@env';
// Importeer de `API_KEY` uit het `.env`-bestand met behulp van het `react-native-dotenv`-pakket.
// Hiermee kun je gevoelige informatie zoals API-sleutels veilig opslaan en gebruiken.

export const API_CONFIG = {
  // Exporteer een object genaamd `API_CONFIG` dat de configuratie voor API-verzoeken bevat.
  BASE_URL: 'https://api.webflow.com/v2',
  // Definieer de basis-URL voor de API. Alle API-verzoeken gebruiken dit als de root-URL.

  API_KEY,
  // Voeg de `API_KEY` toe aan de configuratie. Deze wordt geïmporteerd uit het `.env`-bestand.

  HEADERS: {
    // Definieer de headers die met elk API-verzoek worden meegestuurd.
    Authorization: `Bearer ${API_KEY}`,
    // Voeg de `Authorization`-header toe in het `Bearer`-tokenformaat, met gebruik van de `API_KEY`.
    // Dit is nodig om API-verzoeken te authenticeren.
  },
};