import React, { useEffect, useState, useCallback } from 'react';
// Importeer React en hooks om state te beheren, bijwerkingen uit te voeren en functies te optimaliseren.

import { View, StyleSheet, ActivityIndicator, Text, FlatList, RefreshControl } from 'react-native';
// Importeer React Native-componenten om de gebruikersinterface te bouwen.

import ProductCard from '../components/ProductCard';
// Importeer de ProductCard-component om individuele productdetails weer te geven.

import { fetchData } from '../apiClient';
// Importeer de fetchData-functie om productgegevens van de API op te halen.

const HomeScreen = ({ navigation }) => {
  // Definieer de HomeScreen-component en haal de `navigation`-prop eruit.

  const [products, setProducts] = useState([]);
  // State om de lijst met producten op te slaan.

  const [loading, setLoading] = useState(true);
  // State om bij te houden of de gegevens nog worden geladen.

  const [error, setError] = useState(null);
  // State om eventuele foutmeldingen op te slaan.

  const [refreshing, setRefreshing] = useState(false);
  // State om de pull-to-refresh functionaliteit te beheren.

  const fetchProducts = useCallback(async () => {
    // Definieer een geoptimaliseerde functie om producten van de API op te halen.
    try {
      setLoading(true);
      // Zet de `loading`-state op true voordat de API-aanroep start.

      const data = await fetchData(`/sites/67b3895e80c9f1633cc77720/products?timestamp=${Date.now()}`);
      // Haal productgegevens op van de API met een timestamp om caching te voorkomen.

      const formattedProducts = data.items.map((item) => ({
        // Formatteer de productgegevens zodat alleen de benodigde velden worden opgenomen.
        id: item.product.id,
        name: item.product.fieldData.name,
        imageUrl: item.skus[0]?.fieldData['main-image']?.url || 'https://via.placeholder.com/200',
        // Gebruik een standaardafbeelding als de productafbeelding niet beschikbaar is.
        price: item.skus[0]?.fieldData.price?.value || 0,
        // Gebruik 0 als standaardprijs als de prijs niet beschikbaar is.
      }));

      setProducts(formattedProducts);
      // Werk de `products`-state bij met de geformatteerde productgegevens.
    } catch (err) {
      console.error('Fout bij het ophalen van producten:', err.message);
      // Log de foutmelding in de console voor debugging.

      setError('Er is een fout opgetreden bij het ophalen van producten. Probeer het later opnieuw.');
      // Stel een foutmelding in om aan de gebruiker weer te geven.
    } finally {
      setLoading(false);
      // Zet de `loading`-state op false nadat de API-aanroep is voltooid.
    }
  }, []);
  // Gebruik een lege afhankelijkheidsarray zodat de functie slechts één keer wordt aangemaakt.

  useEffect(() => {
    // Gebruik de `useEffect`-hook om producten op te halen wanneer de component wordt geladen.
    fetchProducts();
    // Roep de `fetchProducts`-functie aan om de productgegevens op te halen.
  }, [fetchProducts]);
  // Voeg `fetchProducts` toe als afhankelijkheid om ervoor te zorgen dat het opnieuw wordt uitgevoerd als het verandert.

  const handleRefresh = async () => {
    // Definieer een functie om de pull-to-refresh functionaliteit te beheren.
    setRefreshing(true);
    // Zet de `refreshing`-state op true om de refresh-indicator weer te geven.

    await fetchProducts();
    // Haal de nieuwste productgegevens op.

    setRefreshing(false);
    // Zet de `refreshing`-state op false nadat de refresh is voltooid.
  };

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
      <View style={styles.errorContainer}>
        {/* Toon de foutmelding als er een fout is opgetreden. */}
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Render de hoofdcontainer voor het scherm. */}
      <FlatList
        data={products}
        // Stel de gegevensbron voor de FlatList in op de `products`-state.
        keyExtractor={(item) => item.id}
        // Gebruik de product-ID als sleutel voor elk lijstitem.
        numColumns={2}
        // Toon de producten in een raster met 2 kolommen.
        contentContainerStyle={styles.flatListContent}
        // Pas aangepaste stijlen toe op de inhoud van de FlatList.
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          // Voeg pull-to-refresh functionaliteit toe aan de FlatList.
        }
        renderItem={({ item }) => (
          // Definieer hoe elk productitem moet worden weergegeven.
          <ProductCard
            product={item}
            // Geef de productgegevens door aan de ProductCard-component.
            onPress={() =>
              navigation.navigate('ProductDetails', {
                productId: item.id,
                // Navigeer naar het ProductDetails-scherm met de product-ID als een parameter.
              })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // Definieer de stijlen voor het scherm.
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    // Stel de achtergrondkleur van het scherm in.
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingTop: 20,
    // Voeg padding toe aan de inhoud van de FlatList.
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // Centreer de laadindicator op het scherm.
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    // Centreer de foutmelding op het scherm en voeg horizontale padding toe.
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    // Style de foutmeldingstekst.
  },
});

export default HomeScreen;
// Exporteer de HomeScreen-component als de standaardexport.