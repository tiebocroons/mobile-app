import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import HomeScreen from './screens/HomeScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import WishlistScreen from './screens/WishlistScreen';
import CartScreen from './screens/CartScreen';
import BlogScreen from './screens/BlogScreen';
import SuccessScreen from './screens/SuccessScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStackHome" // Unique name
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: 'Product Details' }}
      />
    </Stack.Navigator>
  );
};

const WishlistStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="WishlistStackWishlist" // Unique name
        component={WishlistScreen}
        options={{ title: 'Wishlist' }}
      />
      <Stack.Screen
        name="Success"
        component={SuccessScreen}
        options={{ title: 'Success' }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <WishlistProvider>
      <CartProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = 'home';
                } else if (route.name === 'Wishlist') {
                  iconName = 'heart';
                } else if (route.name === 'Cart') {
                  iconName = 'cart';
                } else if (route.name === 'Blog') {
                  iconName = 'book';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
              headerShown: false, // Hide header for tabs
            })}
          >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Wishlist" component={WishlistStack} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Blog" component={BlogScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </CartProvider>
    </WishlistProvider>
  );
};

export default App;