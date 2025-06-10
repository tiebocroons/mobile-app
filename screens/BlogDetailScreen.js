import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, useWindowDimensions } from 'react-native';
import RenderHTML from 'react-native-render-html';

const BlogDetailScreen = ({ route = {} }) => {
  const { title = 'Untitled', intro = '', blogText = '', imageUrl = 'https://via.placeholder.com/200' } = route.params || {};
  const { width } = useWindowDimensions(); // Get screen width for responsive rendering

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.intro}>{intro}</Text>
      {/* Render the blogText with HTML styling */}
      <RenderHTML
        contentWidth={width}
        source={{ html: blogText }}
        tagsStyles={{
          h4: styles.heading,
          p: styles.paragraph,
          ul: styles.list,
          li: styles.listItem,
          strong: styles.bold,
        }}
      />
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
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  paragraph: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  list: {
    marginBottom: 10,
    paddingLeft: 20,
  },
  listItem: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default BlogDetailScreen;