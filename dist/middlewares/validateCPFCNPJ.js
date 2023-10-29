"use strict";Object.defineProperty(exports, "__esModule", {value: true});exports. default = async (req, res, next) => {
  let doc = req.body.cnpj ? req.body.cnpj : req.body.cpf
   
  // Remove caracteres não numéricos
  doc = String(doc).replace(/\D/g, '');

  // Verificando se todos os números são iguais
  let docArray = String(doc).split("").map(x => Number(x))
  if (Math.min(docArray) === Math.max(docArray)) return res.status(400).json({error: "CPF/CNPJ é inválido"});

  // Verifica CPF
  if (doc.length === 11) {

    if (doc == '') return res.status(400).json({result: null, error: "CPF/CNPJ é inválido"});

    // Validação do primeiro dígito verificador
    var soma = 0;
    for (var i = 0; i < 9; i++) {
        soma += parseInt(doc.charAt(i)) * (10 - i);
    }
    var resto = 11 - (soma % 11);
    var dv1 = resto > 9 ? 0 : resto;
    if (parseInt(doc.charAt(9)) != dv1) return res.status(400).json({result: null, error: "CPF/CNPJ é inválido"});

    // Validação do segundo dígito verificador
    soma = 0;
    for (var i = 0; i < 10; i++) {
        soma += parseInt(doc.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    var dv2 = resto > 9 ? 0 : resto;
    if (parseInt(doc.charAt(10)) != dv2) return res.status(400).json({result: null, error: "CPF/CNPJ é inválido"})

    return next();
  }

  // Verifica CNPJ
  else if (doc.length === 14) {

    if (doc == '') return res.status(400).json({result: null, error: "CPF/CNPJ é inválido"});

    if (doc.length != 14) return res.status(400).json({result: null, error: "CPF/CNPJ é inválido"});

    // Validação do primeiro dígito verificador
    var soma = 0;
    var pesos = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    for (var i = 0; i < 12; i++) {
        soma += parseInt(doc.charAt(i)) * pesos[i];
    }
    var resto = soma % 11;
    var dv1 = resto < 2 ? 0 : 11 - resto;
    if (parseInt(doc.charAt(12)) != dv1) return res.status(400).json({result: null, error: "CPF/CNPJ é inválido"});

    // Validação do segundo dígito verificador
    soma = 0;
    pesos = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    for (var i = 0; i < 13; i++) {
        soma += parseInt(doc.charAt(i)) * pesos[i];
    }
    resto = soma % 11;
    var dv2 = resto < 2 ? 0 : 11 - resto;
    if (parseInt(doc.charAt(13)) != dv2) return res.status(400).json({result: null, error: "CPF/CNPJ é inválido"});

    return next();
  }

  // Documento inválido
  return res.status(400).json({result: null, error: "CPF/CNPJ é inválido"});  
}