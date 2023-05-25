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

app.get('/country', async (req, res) => {
    try {
        const apiCountry = req.query.api_country;
        const apiUrl = `https://v3.football.api-sports.io/countries`;
        const headers = {
            'x-rapidapi-key': '77612f4d1285bd0d44bb4ab3be3a45d6',
            'x-rapidapi-host': 'v3.football.api-sports.io',
        }

        const params = {
            'name': apiCountry,
        }

        const response = await axios.get(apiUrl, { headers, params });
        const data = response.data;

        if (data.response === 0) {
            res.status(404).send('O país digitado não foi encontrado');
        } else {
            res.json(data);
        }
    } catch(error) {
        console.error('Ocorreu um erro ao fazer sua solicitação', error);
        res.status(500).json({ error: 'Ocorreu um erro ao fazer sua solicitação' });
    }
})

app.get('/season', async (req, res) => {
    try {
        // const apiSeason = req.query.api_season;
        const apiUrl = `https://v3.football.api-sports.io/leagues/seasons`;
        const headers = {
            'x-rapidapi-key': '77612f4d1285bd0d44bb4ab3be3a45d6',
            'x-rapidapi-host': 'v3.football.api-sports.io',
        }

        const response = await axios.get(apiUrl, { headers });
        const data = response.data;

        if (data.response === 0) {
            res.status(404).send('As temporadas não foram encontradas');
        } else {
            res.json(data);
        }
    } catch(error) {
        console.error('Ocorreu um erro ao fazer sua solicitação', error);
        res.status(500).json({ error: 'Ocorreu um erro ao fazer sua solicitação' });
    }
})

const port = 8000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
