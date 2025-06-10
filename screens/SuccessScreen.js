import React, { useEffect } from 'react';
// Importeer React en de `useEffect`-hook om bijwerkingen te beheren.

import { View, Text, StyleSheet } from 'react-native';
// Importeer React Native-componenten om de gebruikersinterface te bouwen.

const SuccessScreen = ({ navigation }) => {
  // Definieer de SuccessScreen-component en haal de `navigation`-prop eruit.

  if (!navigation) {
    // Controleer of de `navigation`-prop niet is meegegeven.
    return null; // Geef `null` terug om te voorkomen dat de component wordt gerenderd als `navigation` ontbreekt.
  }

  useEffect(() => {
    // Gebruik de `useEffect`-hook om een bijwerking uit te voeren nadat de component is geladen.
    const timer = setTimeout(() => {
      // Stel een timer in om de navigatie-reset na 5 seconden uit te voeren.
      navigation.reset({
        // Reset de navigatiestack om door te verwijzen naar het Home-scherm.
        index: 0, // Stel de index van de stack in op 0 (eerste scherm).
        routes: [{ name: 'Home' }], // Definieer de route waarnaar genavigeerd moet worden (Home-scherm).
      });
    }, 5000); // Stel de vertraging in op 5 seconden.

    return () => clearTimeout(timer);
    // Ruim de timer op wanneer de component wordt verwijderd om geheugenlekken te voorkomen.
  }, [navigation]);
  // Voeg `navigation` toe als afhankelijkheid om ervoor te zorgen dat de bijwerking wordt uitgevoerd wanneer deze verandert.

  return (
    <View style={styles.container}>
      {/* Render de hoofdcontainer voor het scherm. */}
      <Text style={styles.message}>Aankoop geslaagd!</Text>
      {/* Toon een succesbericht. */}
      <Text style={styles.redirect}>Je wordt binnenkort doorgestuurd naar het Home-scherm.</Text>
      {/* Toon een bericht dat aangeeft dat er een doorverwijzing plaatsvindt. */}
    </View>
  );
};

const styles = StyleSheet.create({
  // Definieer de stijlen voor het scherm.
  container: {
    flex: 1, // Laat de container de volledige schermruimte innemen.
    justifyContent: 'center', // Centreer de inhoud verticaal.
    alignItems: 'center', // Centreer de inhoud horizontaal.
    backgroundColor: '#fff', // Stel de achtergrondkleur in op wit.
  },
  message: {
    fontSize: 24, // Stel de lettergrootte in voor het succesbericht.
    fontWeight: 'bold', // Maak de tekst vet.
    color: 'green', // Stel de tekstkleur in op groen.
    marginBottom: 20, // Voeg een marge toe onder het bericht.
  },
  redirect: {
    fontSize: 16, // Stel de lettergrootte in voor het doorverwijzingsbericht.
    color: '#666', // Stel de tekstkleur in op een grijstint.
  },
});

export default SuccessScreen;
// Exporteer de SuccessScreen-component als de standaardexport.