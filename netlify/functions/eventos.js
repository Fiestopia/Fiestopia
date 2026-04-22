exports.handler = async function(event, context) {
  const API_KEY = process.env.FOURVENUES_API_KEY;

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key no configurada' })
    };
  }

  // Probar endpoints posibles de Fourvenues
  const ENDPOINTS = [
    'https://api.fourvenues.com/integrations/events/',
    'https://api-alpha.fourvenues.com/integrations/events/',
    'https://app.fourvenues.com/api/integrations/events/',
    'https://pro.fourvenues.com/api/integrations/events/'
  ];

  const resultados = {};

  for (const url of ENDPOINTS) {
    try {
      const response = await fetch(url, {
        headers: {
          'X-Api-Key': API_KEY,
          'x-api-key': API_KEY,
          'Content-Type': 'application/json'
        }
      });
      resultados[url] = {
        status: response.status,
        ok: response.ok,
        body: response.ok ? await response.json() : await response.text()
      };
    } catch (e) {
      resultados[url] = { error: e.message };
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(resultados, null, 2)
  };
};
