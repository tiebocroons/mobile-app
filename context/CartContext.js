import React, { createContext, useState, useContext } from 'react';
// Importeer React en hooks om een context te maken, state te beheren en toegang te krijgen tot de context.

const CartContext = createContext();
// Maak een context om de winkelwagen (cart) te beheren.

export const CartProvider = ({ children }) => {
  // Definieer de CartProvider-component om de app te omringen en de winkelwagencontext beschikbaar te maken.

  const [cart, setCart] = useState([]);
  // State om de lijst met items in de winkelwagen op te slaan.

  const addToCart = (items) => {
    // Definieer een functie om items toe te voegen aan de winkelwagen.
    setCart((prevCart) => [...prevCart, ...items]);
    // Werk de winkelwagen bij door de nieuwe items toe te voegen aan de bestaande winkelwagen.
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart }}>
      {/* Maak de winkelwagenstate en functies beschikbaar voor de onderliggende componenten. */}
      {children}
      {/* Render de onderliggende componenten die door de provider worden omringd. */}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  // Definieer een aangepaste hook om toegang te krijgen tot de winkelwagencontext.
  const context = useContext(CartContext);
  // Haal de winkelwagencontext op.

  if (!context) {
    // Controleer of de hook buiten de CartProvider wordt gebruikt.
    throw new Error('useCart moet binnen een CartProvider worden gebruikt');
    // Geef een foutmelding als de hook verkeerd wordt gebruikt.
  }

  return context;
  // Geef de winkelwagencontext terug.
};