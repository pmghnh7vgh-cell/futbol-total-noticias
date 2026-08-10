const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos (como tu CSS)
app.use(express.static(path.join(__dirname)));

// Ruta para mostrar tu página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/api/partidos-hoy', async (req, res) => {
    try {
        const hoy = new Date().toISOString().split('T')[0];
        const response = await fetch(`https://api-sports.io{hoy}`, {
            method: 'GET',
            headers: {
                'x-apisports-key':'762fb45b5838e1bb9ca066aee860f871'
            }
        });
        const data = await response.json();
        res.json(data.response);
    } catch (error) {
        console.error("Error en la API:", error);
        res.status(500).json({ error: "No cargaron los partidos" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
