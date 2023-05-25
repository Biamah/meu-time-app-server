const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

app.get('/api/endpoint', async (req, res) => {
    try {
        const apiKey = req.query.api_key;
        const apiUrl = `https://v3.football.api-sports.io/status`;
        const headers = {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'v3.football.api-sports.io',
        }

        const response = await axios.get(apiUrl, {headers});
        const data = response.data;

        if(data.results === 0) {
            res.status(406).send('Key está incorreta');
        } else {
            res.json(data);
        }

    } catch(error) {
        console.error('Ocorreu um erro ao fazer a solicitação', error);
        res.status(500).json({error: 'Ocorreu um erro ao fazer sua solicitação'});
    }
})

const port = 8000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
