import { registerRootComponent } from 'expo';
// Importeer de functie `registerRootComponent` van Expo.

import App from './App';
// Importeer de hoofdcomponent van de app.


// `registerRootComponent` roept `AppRegistry.registerComponent('main', () => App)` aan.
// Het zorgt er ook voor dat, ongeacht of je de app laadt in Expo Go of in een native build,
// de omgeving correct wordt ingesteld.
registerRootComponent(App);
// Registreer de hoofdcomponent van de app zodat deze correct wordt geladen.