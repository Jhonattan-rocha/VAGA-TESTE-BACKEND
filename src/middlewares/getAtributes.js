export default async (req, res, next) =>{
    // caso seja passado campos para filtrar, ações como delete e update funcionaram apenas para os campos passados
    if (req.query.fields) {
        req.fields = { attributes: req.query.fields.split(',') };
    } else {
        req.fields = {};
    }
    
    if(req.query.exFields){
        req.fields.exclude = req.query.exFields.split(",") 
    }

    return next()
}