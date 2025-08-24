import React from 'react';
import { StyleSheet, View, TouchableOpacity, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Pdf from 'react-native-pdf';

const PDFExample = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const source = { uri: navigation.state.params?.uri, cache: true };

  const handleLoadComplete = (numberOfPages) => {
    console.log(`Number of pages: ${numberOfPages}`);
  };

  const handlePageChanged = (page) => {
    console.log(`Current page: ${page}`);
  };

  const handleError = (error) => {
    console.error("Error loading PDF:", error);
    // Puedes usar un Toast o Snackbar aquí si prefieres
    alert("Por el momento no podemos cargar este PDF.");
  };

  const handlePressLink = (uri) => {
    console.log(`Link pressed: ${uri}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon name="arrow-left" style={styles.icon} />
      </TouchableOpacity>

      <Pdf
        source={source}
        onLoadComplete={handleLoadComplete}
        onPageChanged={handlePageChanged}
        onError={handleError}
        onPressLink={handlePressLink}
        style={[styles.pdf, { width, height }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 15,
    zIndex: 1,
  },
  icon: {
    fontSize: 24,
    color: 'black',
  },
});

export default PDFExample;