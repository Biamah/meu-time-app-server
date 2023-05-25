const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

app.get('/api/endpoint', async (req, res) => {
    try {
        const apiKey = req.query.api_key;
        const apiUrl = `https://api-football.com/endpoint?api_key=${apiKey}`;

        const response = await axios.get(apiUrl);
        const data = response.data;

        res.json(data);
    } catch(error) {
        console.error('Ocorreu um erro ao fazer a solicitação', error);
        res.status(500).json({error: 'Ocorreu um erro ao fazer sua solicitação'});
    }
})

const port = 8000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
