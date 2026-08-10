ORT = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json()); 

app.get('/api/partidos', async (req, res) => {
try {
const apiKey = process.env.FOOTBALL_API_KEY; 

if (!apiKey) {
return res.status(500).json({ error: 'Falta la clave de la API en el servidor' });
}

const response = await axios.get('[https://v3.football.api-sports.io/fixtures?live=all](https://v3.football.api-sports.io/fixtures?live=all)', {
headers: {
'x-rapidapi-key': apiKey,
'x-rapidapi-host': 'v3.football.api-sports.io'
}
});

res.json(response.data);

} catch (error) {
res.status(500).json({ error: 'Error al conectar con la API de fútbol' });
}
}); 

app.listen(PORT, () => {
console.log(Servidor seguro corriendo en el puerto ${PORT});
});