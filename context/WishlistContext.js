import React, { createContext, useState, useContext } from 'react';
// Importeer React en hooks om een context te maken, state te beheren en toegang te krijgen tot de context.

const WishlistContext = createContext();
// Maak een context om de verlanglijst (wishlist) te beheren.

export const WishlistProvider = ({ children }) => {
  // Definieer de WishlistProvider-component om de app te omringen en de verlanglijstcontext beschikbaar te maken.

  const [wishlist, setWishlist] = useState([]);
  // State om de lijst met items in de verlanglijst op te slaan.

  const addToWishlist = (product) => {
    // Definieer een functie om een product toe te voegen aan de verlanglijst.
    setWishlist((prevWishlist) => {
      // Werk de verlanglijststate bij.
      if (prevWishlist.some((item) => item.id === product.id)) {
        // Controleer of het product al in de verlanglijst staat.
        return prevWishlist; // Voorkom dat er dubbele items worden toegevoegd.
      }
      return [...prevWishlist, product];
      // Voeg het nieuwe product toe aan de verlanglijst.
    });
  };

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist, addToWishlist }}>
      {/* Maak de verlanglijststate en functies beschikbaar voor de onderliggende componenten. */}
      {children}
      {/* Render de onderliggende componenten die door de provider worden omringd. */}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  // Definieer een aangepaste hook om toegang te krijgen tot de verlanglijstcontext.
  const context = useContext(WishlistContext);
  // Haal de verlanglijstcontext op.

  if (!context) {
    // Controleer of de hook buiten de WishlistProvider wordt gebruikt.
    throw new Error('useWishlist moet binnen een WishlistProvider worden gebruikt');
    // Geef een foutmelding als de hook verkeerd wordt gebruikt.
  }

  return context;
  // Geef de verlanglijstcontext terug.
};