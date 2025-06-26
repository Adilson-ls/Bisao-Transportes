const axios = require('axios');

async function calcularFrete(origem, destino) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origem}&destination=${destino}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const distanciaMetros = response.data.routes[0].legs[0].distance.value;
    const distanciaKm = distanciaMetros / 1000;

    // Exemplo de cálculo: R$ 3 por km + taxa base
    const preco = 15 + distanciaKm * 3;

    return { distanciaKm, preco, rota: response.data.routes[0] };
  } catch (error) {
    console.error('Erro ao calcular frete:', error);
    throw new Error('Erro ao calcular frete.');
  }
}

module.exports = calcularFrete;