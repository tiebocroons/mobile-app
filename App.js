import 'react-native-gesture-handler';
// Importeer de gesture handler-bibliotheek, die nodig is om React Navigation correct te laten werken.

import { NavigationContainer } from '@react-navigation/native';
// Importeer de NavigationContainer, die de navigatiestructuur en -status beheert.

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Importeer de functie om een bottom tab navigator te maken.

import { createStackNavigator } from '@react-navigation/stack';
// Importeer de functie om een stack navigator te maken.

import { Ionicons } from '@expo/vector-icons';
// Importeer Ionicons om iconen weer te geven in de bottom tab navigator.

import { WishlistProvider } from './context/WishlistContext';
// Importeer de WishlistProvider om de verlanglijstcontext te beheren.

import { CartProvider } from './context/CartContext';
// Importeer de CartProvider om de winkelwagencontext te beheren.

import HomeScreen from './screens/HomeScreen';
// Importeer de HomeScreen-component.

import ProductDetailsScreen from './screens/ProductDetailsScreen';
// Importeer de ProductDetailsScreen-component.

import WishlistScreen from './screens/WishlistScreen';
// Importeer de WishlistScreen-component.

import CartScreen from './screens/CartScreen';
// Importeer de CartScreen-component.

import SuccessScreen from './screens/SuccessScreen';
// Importeer de SuccessScreen-component.

import BlogScreen from './screens/BlogScreen';
// Importeer de BlogScreen-component.

import BlogDetailScreen from './screens/BlogDetailScreen';
// Importeer de BlogDetailScreen-component.

import ErrorBoundary from './components/ErrorBoundary';
// Importeer de ErrorBoundary-component om fouten in de app op te vangen en af te handelen.

const Tab = createBottomTabNavigator();
// Maak een instance van een bottom tab navigator.

const Stack = createStackNavigator();
// Maak een instance van een stack navigator.

const HomeStack = () => {
  return (
    <Stack.Navigator>
      {/* Definieer de stack navigator voor de Home-tab */}
      <Stack.Screen
        name="HomeStackHome" // Unieke naam voor het Home-scherm in de stack.
        component={HomeScreen} // Stel HomeScreen in als de component voor deze route.
        options={{ title: 'Home' }} // Stel de titel in voor het scherm.
      />
      <Stack.Screen
        name="ProductDetails" // Unieke naam voor het Product Details-scherm.
        component={ProductDetailsScreen} // Stel ProductDetailsScreen in als de component voor deze route.
        options={{ title: 'Product Details' }} // Stel de titel in voor het scherm.
      />
    </Stack.Navigator>
  );
};

const WishlistStack = () => {
  return (
    <Stack.Navigator>
      {/* Definieer de stack navigator voor de Wishlist-tab */}
      <Stack.Screen
        name="WishlistStackWishlist" // Unieke naam voor het Wishlist-scherm in de stack.
        component={WishlistScreen} // Stel WishlistScreen in als de component voor deze route.
        options={{ title: 'Wishlist' }} // Stel de titel in voor het scherm.
      />
      <Stack.Screen
        name="Success" // Unieke naam voor het Success-scherm.
        component={SuccessScreen} // Stel SuccessScreen in als de component voor deze route.
        options={{ title: 'Success' }} // Stel de titel in voor het scherm.
      />
    </Stack.Navigator>
  );
};

const CartStack = () => {
  return (
    <Stack.Navigator>
      {/* Definieer de stack navigator voor de Cart-tab */}
      <Stack.Screen
        name="CartScreen" // Unieke naam voor het Cart-scherm in de stack.
        component={CartScreen} // Stel CartScreen in als de component voor deze route.
        options={{ title: 'Cart' }} // Stel de titel in voor het scherm.
      />
      <Stack.Screen
        name="Success" // Unieke naam voor het Success-scherm.
        component={SuccessScreen} // Stel SuccessScreen in als de component voor deze route.
        options={{ title: 'Success' }} // Stel de titel in voor het scherm.
      />
    </Stack.Navigator>
  );
};

const BlogStack = () => {
  return (
    <Stack.Navigator>
      {/* Definieer de stack navigator voor de Blog-tab */}
      <Stack.Screen
        name="BlogList" // Unieke naam voor het Blog-lijstscherm in de stack.
        component={BlogScreen} // Stel BlogScreen in als de component voor deze route.
        options={{ title: 'Blogs' }} // Stel de titel in voor het scherm.
      />
      <Stack.Screen
        name="BlogDetailScreen" // Unieke naam voor het Blog Detail-scherm.
        component={BlogDetailScreen} // Stel BlogDetailScreen in als de component voor deze route.
        options={{ title: 'Blog Details' }} // Stel de titel in voor het scherm.
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      {/* Omring de hele app met een ErrorBoundary om fouten op te vangen en af te handelen. */}
      <WishlistProvider>
        {/* Bied de verlanglijstcontext aan de app. */}
        <CartProvider>
          {/* Bied de winkelwagencontext aan de app. */}
          <NavigationContainer>
            {/* Omring de navigatiestructuur met een NavigationContainer. */}
            <Tab.Navigator
              screenOptions={({ route }) => ({
                // Definieer schermopties voor de bottom tab navigator.
                tabBarIcon: ({ color, size }) => {
                  // Render het juiste icoon voor elke tab.
                  let iconName;

                  if (route.name === 'Home') {
                    iconName = 'home'; // Icoon voor de Home-tab.
                  } else if (route.name === 'Wishlist') {
                    iconName = 'heart'; // Icoon voor de Wishlist-tab.
                  } else if (route.name === 'Cart') {
                    iconName = 'cart'; // Icoon voor de Cart-tab.
                  } else if (route.name === 'Blog') {
                    iconName = 'book'; // Icoon voor de Blog-tab.
                  }

                  return <Ionicons name={iconName} size={size} color={color} />;
                  // Render de Ionicons-component met het juiste icoon.
                },
                tabBarActiveTintColor: 'tomato', // Stel de kleur in voor de actieve tab.
                tabBarInactiveTintColor: 'gray', // Stel de kleur in voor de inactieve tab.
                headerShown: false, // Verberg de header voor de bottom tabs.
              })}
            >
              <Tab.Screen name="Home" component={HomeStack} />
              {/* Voeg de HomeStack toe aan de bottom tab navigator. */}
              <Tab.Screen name="Wishlist" component={WishlistStack} />
              {/* Voeg de WishlistStack toe aan de bottom tab navigator. */}
              <Tab.Screen name="Cart" component={CartStack} />
              {/* Voeg de CartStack toe aan de bottom tab navigator. */}
              <Tab.Screen name="Blog" component={BlogStack} />
              {/* Voeg de BlogStack toe aan de bottom tab navigator. */}
            </Tab.Navigator>
          </NavigationContainer>
        </CartProvider>
      </WishlistProvider>
    </ErrorBoundary>
  );
};

export default App;
// Exporteer de App-component als de standaardexport.