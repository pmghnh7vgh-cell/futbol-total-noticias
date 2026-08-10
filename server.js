const express = require('express');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json()); 

app.get('/api/partidos', async (req, res) => {
try {
const apiKey = process.env.FOOTBALL_API_KEY;
if (!apiKey) {
return res.status(500).json({ error: 'Falta la clave' });
}
const response = await fetch('https://v3.football.api-sports.io/fixtures?live=all', {
method: 'GET',
headers: {
'x-rapidapi-key': apiKey,
'x-rapidapi-host': 'v3.football.api-sports.io'
}
});
const data = await response.json();
res.json(data);
} catch (error) {
res.status(500).json({ error: 'Error de API' });
}
}); 

app.listen(PORT);