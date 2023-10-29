"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

exports. default = async (req, res, next) => {
    if(req.query.filter){
        const query = String(req.query.filter).split('+')
        if(query.length < 3){
            return res.status(405).json({
                result: null,
                error: "Query passada está errada"
            });
        };

        if(query.length === 3){
            // igual

            if(query[1] == 'eq'){
                req.filter = {
                    where: {
                        [query[0]]: {
                            [_sequelize.Op.eq]: query[2]
                        }
                    }
                }
            // diferente
            }else if(query[1] == 'ne'){
                req.filter = {
                    where: {
                        [query[0]]: {
                            [_sequelize.Op.ne]: query[2]
                        }
                    }
                }
            //menor que
            }else if(query[1] == 'lt'){
                req.filter = {
                    where: {
                        [query[0]]: {
                            [_sequelize.Op.lt]: query[2]
                        }
                    }
                }
            // inverter
            }else if(query[1] == 'not'){
                req.filter = {
                    where: {
                        [query[0]]: {
                            [_sequelize.Op.not]: query[2]
                        }
                    }
                }
            // maior que
            }else if(query[1] == 'gt'){
                req.filter = {
                    where: {
                        [query[0]]: {
                            [_sequelize.Op.gt]: query[2]
                        }
                    }
                }
            // like
            }else if(query[1] == 'like'){
                req.filter = {
                    where: {
                        [query[0]]: {
                            [_sequelize.Op.like]: query[2]
                        }
                    }
                }
            } else{
                req.filter.limit = 100;
                req.filter = {};
                return next();
            }
            req.filter.limit = 100;
            return next();
        }

        if(query.length === 5){
            if(query[3] === 'or'){
                req.filter = {
                    where: {
                        [query[0]]: {
                            [_sequelize.Op.or]: [query[2], query[4]]
                        }
                    }
                }
            }
            if(query[3] === 'and'){
                req.filter = {
                    where: {
                        [query[0]]: {
                            [_sequelize.Op.and]: [query[2], query[4]]
                        }
                    }
                }
            }
            req.filter.limit = 100;
            return next();
        }

        if (query.length === 7) { // Certifica-se de que o número de elementos na consulta é múltiplo de 3
            const filters = []; // Array para armazenar os filtros individuais
            
            for (let i = 0; i < query.length; i += 2) {
                const attribute = query[i];
                const operator = query[i + 1];
                const value = query[i + 2];
                const filter = {};
                
                if (operator === 'eq') {
                    filter[attribute] = {
                        [_sequelize.Op.eq]: value
                    };
                } else if (operator === 'ne') {
                    filter[attribute] = {
                        [_sequelize.Op.ne]: value
                    };
                } else if (operator === 'lt') {
                    filter[attribute] = {
                        [_sequelize.Op.lt]: value
                    };
                } else if (operator === 'not') {
                    filter[attribute] = {
                        [_sequelize.Op.not]: value
                    };
                } else if (operator === 'gt') {
                    filter[attribute] = {
                        [_sequelize.Op.gt]: value
                    };
                } else if (operator === 'like') {
                    filter[attribute] = {
                        [_sequelize.Op.like]: value
                    };
                }
                if(Object.keys(filter).length !== 0){
                    filters.push(filter); // Adiciona o filtro atual ao array de filtros
                }
            }
            
            req.filter = {
                where: {
                    [_sequelize.Op.and]: filters // Combina os filtros usando o operador AND
                }
            };
            req.filter.limit = 100;
            return next();
        }
        

        if(query.length > 7){
            return res.status(405).json({
                result: null,
                error: "Query passada está errada"
            });
        }

        req.filter = {};
        req.filter.limit = 100;
        return next();
    
    }else{
        req.filter.limit = 100;
        req.filter = {};
        return next();
    }
}