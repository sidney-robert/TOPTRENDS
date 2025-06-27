import googleTrends from 'google-trends-api';

export default async function handler(req, res) {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(400).json({ error: 'Palavra-chave não fornecida.' });
  }

  try {
    const results = await googleTrends.interestOverTime({
      keyword,
      startTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    });

    const parsed = JSON.parse(results);
    const timelineData = parsed.default.timelineData.map(entry => ({
      date: entry.formattedTime,
      value: entry.value[0],
    }));

    res.status(200).json(timelineData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar dados de tendências.' });
  }
}
