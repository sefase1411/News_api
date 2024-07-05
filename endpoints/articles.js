import { Router } from 'express';
import api from '../controllers/api.js';



const router = Router()

router.get('/:id', async (req, res) => { 
    res.send( await api.getData(req.params.id) );
})

router.get('/', async (req, res) => { 
    const params_api = {
        page : req.query.page,
        category : req.query.category,
        language : req.query.language,
        query : req.query.query,
        pageSize : req.query.pageSize,
        fromDate : req.query.fromDate,
        toDate : req.query.toDate}

    res.send( await api.search({...params_api}))
})



export default router;