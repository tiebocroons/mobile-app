import React from 'react';
// Importeer React om de component te maken.

import { View, Text, StyleSheet, ScrollView, Image, useWindowDimensions } from 'react-native';
// Importeer React Native-componenten om de gebruikersinterface te bouwen.

import RenderHTML from 'react-native-render-html';
// Importeer de `RenderHTML`-component om HTML-inhoud in de blogtekst weer te geven.

const BlogDetailScreen = ({ route }) => {
  // Definieer de BlogDetailScreen-component en haal de `route`-prop eruit met een standaardwaarde.

  const { title, intro, blogText, imageUrl } = route.params || {};
  // Haal de blogdetails uit `route.params` met standaardwaarden als fallback.

  const { width } = useWindowDimensions();
  // Haal de breedte van het scherm op voor responsieve weergave van de HTML-inhoud.

  return (
    <ScrollView style={styles.container}>
      {/* Maak een scrollbare container voor de blogdetails. */}
      <Image source={{ uri: imageUrl }} style={styles.image} />
      {/* Toon de blogafbeelding. */}
      <Text style={styles.title}>{title}</Text>
      {/* Toon de titel van de blog. */}
      <Text style={styles.intro}>{intro}</Text>
      {/* Toon de introductietekst van de blog. */}
      <RenderHTML
        contentWidth={width}
        // Stel de breedte van de inhoud in voor responsieve weergave.
        source={{ html: blogText }}
        // Geef de blogtekst weer als HTML-inhoud.
        tagsStyles={{
          h4: styles.heading,
          // Pas aangepaste stijlen toe voor `<h4>`-tags.
          p: styles.paragraph,
          // Pas aangepaste stijlen toe voor `<p>`-tags.
          ul: styles.list,
          // Pas aangepaste stijlen toe voor `<ul>`-tags.
          li: styles.listItem,
          // Pas aangepaste stijlen toe voor `<li>`-tags.
          strong: styles.bold,
          // Pas aangepaste stijlen toe voor `<strong>`-tags.
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Definieer de stijlen voor de BlogDetailScreen-component.
  container: {
    flex: 1,
    // Laat de container de volledige schermruimte innemen.
    backgroundColor: '#fff',
    // Stel de achtergrondkleur in op wit.
    padding: 10,
    // Voeg padding toe rond de container.
  },
  image: {
    width: '100%',
    // Laat de afbeelding de volledige breedte van de container innemen.
    height: 200,
    // Stel de hoogte van de afbeelding in.
    borderRadius: 8,
    // Maak de hoeken van de afbeelding afgerond.
    marginBottom: 10,
    // Voeg een marge toe onder de afbeelding.
  },
  title: {
    fontSize: 24,
    // Stel de lettergrootte in voor de blogtitel.
    fontWeight: 'bold',
    // Maak de tekst van de titel vet.
    marginBottom: 10,
    // Voeg een marge toe onder de titel.
  },
  intro: {
    fontSize: 16,
    // Stel de lettergrootte in voor de introductietekst.
    color: '#666',
    // Stel de tekstkleur in op een grijstint.
    marginBottom: 10,
    // Voeg een marge toe onder de introductietekst.
  },
  heading: {
    fontSize: 20,
    // Stel de lettergrootte in voor koppen in de blogtekst.
    fontWeight: 'bold',
    // Maak de tekst van de kop vet.
    marginBottom: 10,
    // Voeg een marge toe onder de kop.
    color: '#333',
    // Stel de tekstkleur in op een donkere grijstint.
  },
  paragraph: {
    fontSize: 14,
    // Stel de lettergrootte in voor paragrafen in de blogtekst.
    color: '#333',
    // Stel de tekstkleur in op een donkere grijstint.
    marginBottom: 10,
    // Voeg een marge toe onder de paragraaf.
  },
  list: {
    marginBottom: 10,
    // Voeg een marge toe onder de lijst.
    paddingLeft: 20,
    // Voeg padding toe aan de linkerkant van de lijst.
  },
  listItem: {
    fontSize: 14,
    // Stel de lettergrootte in voor lijstitems.
    color: '#333',
    // Stel de tekstkleur in op een donkere grijstint.
    marginBottom: 5,
    // Voeg een marge toe onder elk lijstitem.
  },
  bold: {
    fontWeight: 'bold',
    // Maak de tekst vet voor `<strong>`-tags.
  },
});

export default BlogDetailScreen;
// Exporteer de BlogDetailScreen-component als de standaardexport.