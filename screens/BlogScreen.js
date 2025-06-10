import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const API_URL = 'https://api.webflow.com/v2/collections/67d81fa4a55228348b937c11/items';
const API_KEY = '24041412307977360bc577b126c9f1b8a4b60ee9145baa4df60dbb991731aa73';

const BlogScreen = ({ navigation }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            'accept-version': '1.0.0',
          },
        });

        const formattedBlogs = response.data.items.map((item) => ({
          id: item.id,
          title: item.fieldData.title,
          intro: item.fieldData.intro,
          blogText: item.fieldData['blog-text'],
          imageUrl: item.fieldData['blog-img']?.url || 'https://via.placeholder.com/150',
        }));

        setBlogs(formattedBlogs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error.response?.data || error.message);
        setError('An error occurred while fetching the blogs.');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={blogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.blogItem}
            onPress={() =>
              navigation.navigate('BlogDetailScreen', {
                title: item.title,
                intro: item.intro,
                blogText: item.blogText,
                imageUrl: item.imageUrl,
              })
            }
          >
            <Image source={{ uri: item.imageUrl }} style={styles.blogImage} />
            <Text style={styles.blogTitle}>{item.title}</Text>
            <Text style={styles.blogIntro}>{item.intro}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blogItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  blogImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  blogIntro: {
    fontSize: 14,
    color: '#666',
  },
});

export default BlogScreen;