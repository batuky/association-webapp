const dbPool = require('../config/dbConfig');

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

module.exports = {
    getFamilies
};