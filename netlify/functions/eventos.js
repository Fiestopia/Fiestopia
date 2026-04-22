// Función serverless - consulta eventos de Fourvenues
// La API key vive en Netlify como variable de entorno, nunca en el código

exports.handler = async function(event, context) {
  const API_KEY = process.env.FOURVENUES_API_KEY;
  
  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API key no configurada' })
    };
  }

  try {
    // Consultar eventos próximos de Fourvenues
    const response = await fetch('https://api.fourvenues.com/v1/events?status=active&limit=10', {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Fourvenues error: ${response.status}`);
    }

    const data = await response.json();
    const hoy = new Date();

    // Filtrar solo eventos futuros y ordenar por fecha
    const eventosFuturos = (data.data || data.events || data || [])
      .filter(ev => {
        const fecha = new Date(ev.date || ev.start_date || ev.starts_at);
        return fecha > hoy;
      })
      .sort((a, b) => {
        const fa = new Date(a.date || a.start_date || a.starts_at);
        const fb = new Date(b.date || b.start_date || b.starts_at);
        return fa - fb;
      })
      .slice(0, 6) // máximo 6 eventos en home
      .map(ev => ({
        id: ev.id,
        nombre: ev.name || ev.title,
        fecha: ev.date || ev.start_date || ev.starts_at,
        lugar: ev.venue?.name || ev.location || '',
        ciudad: ev.venue?.city || ev.city || '',
        precio: ev.min_price || ev.price || 0,
        url: ev.url || ev.ticket_url || `https://pro.fourvenues.com/fiestopia`,
        imagen: ev.image || ev.cover || '',
        pocas_entradas: ev.low_stock || false,
        marca: detectarMarca(ev.name || ev.title || '')
      }));

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=300' // cache 5 minutos
      },
      body: JSON.stringify({
        eventos: eventosFuturos,
        total: eventosFuturos.length
      })
    };

  } catch (error) {
    console.error('Error consultando Fourvenues:', error);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ eventos: [], total: 0, error: error.message })
    };
  }
};

// Detectar marca según nombre del evento
function detectarMarca(nombre) {
  const n = nombre.toLowerCase();
  if (n.includes('ochentera')) return 'ochentera';
  if (n.includes('bocachica')) return 'bocachica';
  if (n.includes('weddings') || n.includes('boda')) return 'weddings';
  if (n.includes('sansaru')) return 'sansaru';
  if (n.includes('rainbow')) return 'rainbow';
  return 'fiestopia';
}

