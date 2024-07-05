import express from 'express';
import api from './controllers/api.js';
import articles from './endpoints/articles.js';

const app = express();
const port = 3000;

app.use('/api/articles', articles)

app.get('/api/breaking-events', async (req, res) => {
    
    const params_api = {
        page : req.query.page,
        region : req.query.region,
        language : req.query.language,
        category : req.query.category,
        pageSize : req.query.genres }

    res.send(await api.getBreaking({...params_api}));

})

app.listen(port, () => {
    console.log("Escuchando en el puerto", port)
})
