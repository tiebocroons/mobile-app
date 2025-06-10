import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

// Functie om HTML-tags te verwijderen
const stripHtml = (html) => {
  return html.replace(/<\/?[^>]+(>|$)/g, '');
};

const BlogDetailScreen = ({ route }) => {
  const { title, intro, blogText, imageUrl } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.intro}>{intro}</Text>
      <Text style={styles.blogText}>{stripHtml(blogText)}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  intro: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  blogText: {
    fontSize: 14,
    color: '#333',
  },
});

export default BlogDetailScreen;