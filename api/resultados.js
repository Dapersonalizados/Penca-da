// api/resultados.js
// Función puente: trae resultados del Mundial 2026 desde football-data.org
// y los devuelve en un formato que la penca puede usar directamente.
// La API key NUNCA se expone al navegador - vive solo acá, en el servidor.

export default async function handler(req, res) {
  // Permitir que la penca (cualquier origen) llame a esta función
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  const API_KEY = process.env.FOOTBALL_DATA_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "Falta configurar la API key en Vercel" });
  }

  try {
    const response = await fetch(
      "https://api.football-data.org/v4/competitions/WC/matches",
      {
        headers: { "X-Auth-Token": API_KEY },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: "Error de la API externa", detail: text });
    }

    const data = await response.json();

    // Filtramos solo partidos FINALIZADOS y devolvemos un formato simple:
    // [{ local: "Argentina", visitante: "México", golesLocal: 2, golesVisitante: 1 }, ...]
    const finalizados = (data.matches || [])
      .filter(m => m.status === "FINISHED")
      .map(m => ({
        local: m.homeTeam?.name || "",
        visitante: m.awayTeam?.name || "",
        golesLocal: m.score?.fullTime?.home,
        golesVisitante: m.score?.fullTime?.away,
        fecha: m.utcDate,
        fase: m.stage,
      }));

    // Cache de 5 minutos para no gastar cuota de la API innecesariamente
    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=60");
    return res.status(200).json({ resultados: finalizados, total: finalizados.length });
  } catch (e) {
    return res.status(500).json({ error: "Error interno", detail: String(e) });
  }
}
