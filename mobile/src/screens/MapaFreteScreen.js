import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const MapaFreteScreen = () => {
  const [freteData, setFreteData] = useState(null);
  const origem = { latitude: -23.5505, longitude: -46.6333 }; // Exemplo: São Paulo
  const destino = { latitude: -22.9068, longitude: -43.1729 }; // Exemplo: Rio de Janeiro

  useEffect(() => {
    const fetchFreteData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/fretes/simular', {
          origem: `${origem.latitude},${origem.longitude}`,
          destino: `${destino.latitude},${destino.longitude}`,
        });
        setFreteData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados de frete:', error);
      }
    };

    fetchFreteData();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: (origem.latitude + destino.latitude) / 2,
          longitude: (origem.longitude + destino.longitude) / 2,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker coordinate={origem} title="Origem" />
        <Marker coordinate={destino} title="Destino" />
      </MapView>
      {freteData && (
        <View style={styles.infoContainer}>
          <Text>Distância: {freteData.distanciaKm} km</Text>
          <Text>Preço: R$ {freteData.preco.toFixed(2)}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },
});

export default MapaFreteScreen;