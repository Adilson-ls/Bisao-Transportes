import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import api from '../services/api';

const FretesDisponiveisScreen = () => {
  const [fretes, setFretes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFretes = async () => {
      try {
        const response = await api.get('/fretes');
        setFretes(response.data);
      } catch (error) {
        console.error('Erro ao buscar fretes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFretes();
  }, []);

  const renderFrete = ({ item }) => (
    <View>
      <Text>Origem: {item.origem}</Text>
      <Text>Destino: {item.destino}</Text>
      <Text>Preço: R$ {item.preco}</Text>
      <Text>Status: {item.status}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <FlatList
      data={fretes}
      renderItem={renderFrete}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default FretesDisponiveisScreen;