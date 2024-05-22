const dbPool = require('../config/dbConfig');

//Get all families
const getFamilies = async () => {
    const query = `
        SELECT * FROM aileler;
    `;
    try {
        const { rows } = await dbPool.query(query);
        return rows;
    } catch (error) {
        throw error;
    }
};

//Get a family by ID
async function getAileById(id) {
    try {
        const query = 'SELECT * FROM aileler WHERE "Id" = $1';
        const { rows } = await dbPool.query(query, [id]);
        return rows[0]; // 'id' benzersiz olduğu varsayılarak sadece bir satır döndürülür.
    } catch (err) {
        console.error('Error executing query', err.stack);
        throw err;
    }
}

// Get members of a family by family ID
async function getUyelerByAileId(aileId) {
    const query = `
        SELECT * FROM aileuyeleri WHERE "AileId" = $1;
    `;
    try {
        const { rows } = await dbPool.query(query, [aileId]);
        return rows;
    } catch (error) {
        console.error('Error executing query', error.stack);
        throw error;
    }
}

module.exports = {
    getFamilies,
    getAileById,
    getUyelerByAileId,
};