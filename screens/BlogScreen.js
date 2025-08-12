import React, { useState, useEffect } from 'react';
// Importeer React en de `useState`- en `useEffect`-hooks om state te beheren en acties uit te voeren bij het laden.

import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
// Importeer React Native-componenten om de gebruikersinterface te bouwen.

const fetchProducts = async () => {
  try {
    const response = await fetch('https://api.webflow.com/v2', {
      headers: {
        Authorization: `Bearer API_KEY=886892667cf6f17b2ab536cd43fb4c9c7322f9fc99e2334a946aada783bf01ec`,
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

const BlogScreen = ({ navigation }) => {
  // Definieer de BlogScreen-component en haal de `navigation`-prop eruit.

  const [blogs, setBlogs] = useState([]);
  // State om de lijst met blogs op te slaan.

  const [loading, setLoading] = useState(true);
  // State om bij te houden of de gegevens nog worden geladen.

  const [error, setError] = useState(null);
  // State om eventuele foutmeldingen op te slaan.

  useEffect(() => {
    // Gebruik de `useEffect`-hook om blogs op te halen wanneer de component wordt geladen.
    const fetchBlogs = async () => {
      // Definieer een asynchrone functie om bloggegevens op te halen.
      try {
        setError(null); // Reset de foutmelding aan het begin van de functie.
        const response = await fetch('https://api.webflow.com/v2/collections/67d81fa4a55228348b937c11/items', {
          headers: {
            Authorization: `Bearer 886892667cf6f17b2ab536cd43fb4c9c7322f9fc99e2334a946aada783bf01ec`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data); // Controleer de API-respons in de console.

        const formattedBlogs = data.items.map((item) => ({
          // Formatteer de bloggegevens zodat alleen de benodigde velden worden opgenomen.
          id: item.id,
          title: item.fieldData.title || 'Geen titel',
          // Gebruik een standaardtitel als er geen titel is opgegeven.
          intro: item.fieldData.intro || 'Geen introductie beschikbaar',
          // Gebruik een standaardintroductie als er geen introductie is opgegeven.
          blogText: item.fieldData['blog-text'] || '',
          // Gebruik een lege string als de blogtekst niet beschikbaar is.
          imageUrl: item.fieldData['blog-img']?.url || 'https://via.placeholder.com/150',
          // Gebruik een standaardafbeelding als er geen afbeelding beschikbaar is.
        }));

        setBlogs(formattedBlogs);
        // Werk de `blogs`-state bij met de geformatteerde bloggegevens.
      } catch (err) {
        console.error('Error fetching blogs:', err.message);
        setError('Er is een fout opgetreden bij het ophalen van de blogs.');
        // Stel een foutmelding in als het ophalen van de gegevens mislukt.
      } finally {
        setLoading(false);
        // Zet de `loading`-state op `false` nadat de API-aanroep is voltooid.
      }
    };

    fetchBlogs();
    // Roep de `fetchBlogs`-functie aan om de bloggegevens op te halen.
  }, []);
  // Gebruik een lege afhankelijkheidsarray zodat de `useEffect` alleen wordt uitgevoerd bij het laden van de component.

  if (loading) {
    // Controleer of de gegevens nog worden geladen.
    return (
      <View style={styles.loadingContainer}>
        {/* Toon een laadindicator terwijl de gegevens worden opgehaald. */}
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    // Controleer of er een fout is opgetreden.
    return (
      <View style={styles.container}>
        {/* Toon de foutmelding als er een fout is opgetreden. */}
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Render de hoofdcontainer voor het scherm. */}
      <FlatList
        data={blogs}
        // Stel de gegevensbron voor de FlatList in op de `blogs`-state.
        keyExtractor={(item) => item.id}
        // Gebruik de blog-ID als sleutel voor elk item in de lijst.
        renderItem={({ item }) => (
          // Definieer hoe elk blogitem moet worden weergegeven.
          <TouchableOpacity
            style={styles.blogItem}
            onPress={() =>
              navigation.navigate('BlogDetailScreen', {
                // Navigeer naar het BlogDetailScreen en geef de blogdetails mee als parameters.
                title: item.title,
                intro: item.intro,
                blogText: item.blogText,
                imageUrl: item.imageUrl,
              })
            }
          >
            <Image source={{ uri: item.imageUrl }} style={styles.blogImage} />
            {/* Toon de blogafbeelding. */}
            <Text style={styles.blogTitle}>{item.title}</Text>
            {/* Toon de blogtitel. */}
            <Text style={styles.blogIntro}>{item.intro}</Text>
            {/* Toon de introductietekst van de blog. */}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Definieer de stijlen voor het scherm.
  container: {
    flex: 1,
    // Laat de container de volledige schermruimte innemen.
    backgroundColor: '#fff',
    // Stel de achtergrondkleur in op wit.
    padding: 10,
    // Voeg padding toe rond de container.
  },
  loadingContainer: {
    flex: 1,
    // Laat de laadcontainer de volledige schermruimte innemen.
    justifyContent: 'center',
    // Centreer de inhoud verticaal.
    alignItems: 'center',
    // Centreer de inhoud horizontaal.
  },
  blogItem: {
    marginBottom: 20,
    // Voeg een marge toe onder elk blogitem.
    padding: 15,
    // Voeg padding toe binnen elk blogitem.
    backgroundColor: '#f9f9f9',
    // Stel de achtergrondkleur in op lichtgrijs.
    borderRadius: 8,
    // Maak de hoeken van het blogitem afgerond.
    shadowColor: '#000',
    // Stel de schaduwkleur in op zwart.
    shadowOpacity: 0.1,
    // Stel de schaduwdekking in.
    shadowOffset: { width: 0, height: 2 },
    // Stel de schaduwpositie in.
    shadowRadius: 4,
    // Stel de schaduwradius in.
    elevation: 3,
    // Voeg verheffing toe voor schaduwondersteuning op Android.
  },
  blogImage: {
    width: '100%',
    // Laat de afbeelding de volledige breedte van het blogitem innemen.
    height: 200,
    // Stel de hoogte van de afbeelding in.
    borderRadius: 8,
    // Maak de hoeken van de afbeelding afgerond.
    marginBottom: 10,
    // Voeg een marge toe onder de afbeelding.
  },
  blogTitle: {
    fontSize: 18,
    // Stel de lettergrootte in voor de blogtitel.
    fontWeight: 'bold',
    // Maak de tekst van de titel vet.
    marginBottom: 5,
    // Voeg een marge toe onder de titel.
  },
  blogIntro: {
    fontSize: 14,
    // Stel de lettergrootte in voor de introductietekst.
    color: '#666',
    // Stel de tekstkleur in op een grijstint.
  },
});

export default BlogScreen;
// Exporteer de BlogScreen-component als de standaardexport.