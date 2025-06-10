import React from 'react';
// Importeer React om de component te maken.

import { View, Text, StyleSheet } from 'react-native';
// Importeer React Native-componenten om de gebruikersinterface te bouwen.

class ErrorBoundary extends React.Component {
  // Definieer de ErrorBoundary-klasse om fouten op te vangen en te verwerken.

  constructor(props) {
    super(props);
    // Roep de constructor van de ouderklasse aan en geef de props door.

    this.state = { hasError: false };
    // Stel de beginstatus in met `hasError` op `false`.
  }

  static getDerivedStateFromError() {
    // Methode die wordt aangeroepen als er een fout wordt opgevangen.
    return { hasError: true };
    // Zet `hasError` op `true` als er een fout optreedt.
  }

  componentDidCatch(error, info) {
    // Methode om de fout te verwerken en extra informatie te loggen.
    // Je kunt hier de fout naar een externe service sturen als dat nodig is.
    console.error('ErrorBoundary heeft een fout opgevangen:', error, info);
    // Log de fout en extra informatie in de console.
  }

  render() {
    // Methode om de gebruikersinterface weer te geven.
    if (this.state.hasError) {
      // Controleer of er een fout is opgevangen.
      return (
        <View style={styles.container}>
          {/* Toon een alternatieve gebruikersinterface als er een fout is. */}
          <Text style={styles.errorText}>Er is iets misgegaan.</Text>
          {/* Toon een foutmelding aan de gebruiker. */}
        </View>
      );
    }

    return this.props.children;
    // Toon de onderliggende componenten als er geen fout is opgetreden.
  }
}

const styles = StyleSheet.create({
  // Definieer de stijlen voor de ErrorBoundary-component.
  container: {
    flex: 1,
    // Laat de container de volledige schermruimte innemen.
    justifyContent: 'center',
    // Centreer de inhoud verticaal.
    alignItems: 'center',
    // Centreer de inhoud horizontaal.
  },
  errorText: {
    fontSize: 18,
    // Stel de lettergrootte in voor de foutmelding.
    color: 'red',
    // Stel de tekstkleur in op rood om een fout aan te geven.
  },
});

export default ErrorBoundary;
// Exporteer de ErrorBoundary-component als de standaardexport.