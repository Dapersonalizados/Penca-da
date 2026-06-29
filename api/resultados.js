// api/resultados.js
// Función puente: trae resultados del Mundial 2026 desde openfootball (GitHub)
// No requiere API key, es pública y gratuita.

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");

  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json",
      { headers: { "User-Agent": "penca-da/1.0" } }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: "Error al obtener datos" });
    }

    const data = await response.json();

    // Procesar todos los partidos finalizados (tienen score)
    const finalizados = [];
    for (const match of (data.matches || [])) {
      if (!match.score) continue;
      finalizados.push({
        local: match.team1,
        visitante: match.team2,
        golesLocal: match.score.ft[0],
        golesVisitante: match.score.ft[1],
        fecha: match.date,
        fase: match.round || "group",
      });
    }

    res.setHeader("Cache-Control", "s-maxage=180, stale-while-revalidate=60");
    return res.status(200).json({ resultados: finalizados, total: finalizados.length });
  } catch (e) {
    return res.status(500).json({ error: "Error interno", detail: String(e) });
  }
}
