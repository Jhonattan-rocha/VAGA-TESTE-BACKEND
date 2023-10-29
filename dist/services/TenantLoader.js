"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const tenantConnections = new Map(); exports.tenantConnections = tenantConnections;

/**
 * Insere uma conexão no Map para um inquilino (tenant) específico.
 * @param {string} company_id - O identificador do inquilino.
 * @param {Sequelize} con - A conexão associada ao inquilino.
 * @returns {boolean} - Retorna true se a inserção for bem-sucedida, caso contrário, false.
 */
 function InsertConnection(company_id, con) {
    try {
        const tenantKey = `tenant_${String(company_id).replace(/\D/, "")}`;
        if (!exports.tenantConnections.has(tenantKey)) {
            exports.tenantConnections.set(tenantKey, con);
            return true;
        } else {
            return false; // Já existe uma conexão para este inquilino.
        }
    } catch (error) {
        console.error(`Erro ao inserir conexão: ${error.message}`);
        return false;
    }
} exports.InsertConnection = InsertConnection;

/**
 * Obtém a conexão associada a um inquilino (tenant) específico.
 * @param {string} company_id - O identificador do inquilino.
 * @returns {Sequelize|boolean} - Retorna a conexão se encontrada, caso contrário, false.
 */
 function GetConnection(company_id) {
    try {
        const tenantKey = `tenant_${String(company_id).replace(/\D/, "")}`;
        if (exports.tenantConnections.has(tenantKey)) {
            return exports.tenantConnections.get(tenantKey);
        } else {
            return false; // Nenhuma conexão encontrada para este inquilino.
        }
    } catch (error) {
        console.error(`Erro ao obter conexão: ${error.message}`);
        return false;
    }
} exports.GetConnection = GetConnection;

/**
 * Exclui a conexão associada a um inquilino (tenant) específico.
 * @param {string} company_id - O identificador do inquilino.
 * @returns {boolean} - Retorna true se a exclusão for bem-sucedida, caso contrário, false.
 */
 function DeleteConnection(company_id) {
    try {
        const tenantKey = `tenant_${String(company_id).replace(/\D/, "")}`;
        if (exports.tenantConnections.has(tenantKey)) {
            return exports.tenantConnections.delete(tenantKey);
        } else {
            return false; // Nenhuma conexão encontrada para este inquilino.
        }
    } catch (error) {
        console.error(`Erro ao excluir conexão: ${error.message}`);
        return false;
    }
} exports.DeleteConnection = DeleteConnection;

/**
 * Criar um string de caracteres aleatórios
 * @param {string} length - Tamnho da string.
 * @returns {string} - Retorna um sctring de caracteres aleatórios
 */
 function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
  
    return randomString;
  } exports.generateRandomString = generateRandomString;
