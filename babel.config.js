module.exports = {
  // Exporteer de Babel-configuratie als een module
  presets: ['module:metro-react-native-babel-preset'], 
  // Gebruik de Metro-preset voor React Native, die de benodigde plugins bevat voor React Native-ontwikkeling

  plugins: [
    // Definieer extra Babel-plugins om functionaliteit uit te breiden

    ['module:react-native-dotenv', {
      // Configureer de react-native-dotenv-plugin om omgevingsvariabelen uit een .env-bestand te laden
      moduleName: '@env', 
      // Specificeer de modulenaam die wordt gebruikt bij het importeren van omgevingsvariabelen (bijv. `import { API_KEY } from '@env';`)
      path: '.env', 
      // Specificeer het pad naar het .env-bestand
      safe: false, 
      // Als dit op true staat, controleert het of alle vereiste omgevingsvariabelen zijn gedefinieerd in een .env.example-bestand
      allowUndefined: true, 
      // Als dit op true staat, worden ongedefinieerde omgevingsvariabelen toegestaan zonder een foutmelding te geven
    }],

    ['@babel/plugin-transform-private-methods', { loose: true }],
    // Voeg ondersteuning toe voor het transformeren van private class-methoden (bijv. `#methodName`) met de "loose"-modus voor betere prestaties

    'react-native-reanimated/plugin',
    // Voeg de react-native-reanimated-plugin toe, die nodig is voor animaties in React Native
    // LET OP: Deze plugin moet altijd de laatste in de lijst zijn, zoals vermeld in de documentatie van react-native-reanimated
  ],
};