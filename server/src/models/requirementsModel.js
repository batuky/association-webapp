const pool = require('../config/dbConfig');
const getIhtiyaclar = async () => {
    const query = `
        SELECT * FROM ihtiyaclar
        WHERE "Durum" = 1;
    `;
    try {
        const { rows } = await pool.query(query);
        return rows;
    } catch (error) {
        console.error('Error executing query', error.stack);
        throw error;
    }
};

const checkIfFinansalYardim = async (ihtiyacId) => {
    const query = `
        SELECT EXISTS (
            SELECT 1 FROM yardimlar
            WHERE "IhtiyacId" = $1 AND "Durum" = 1
        );
    `;
    try {
        const { rows } = await pool.query(query, [ihtiyacId]);
        return rows[0].exists;  // returns true if there's a financial aid associated
    } catch (error) {
        console.error('Error executing query', error.stack);
        throw error;
    }
};

const getIhtiyacById = async (ihtiyacId) => {
    const query = `
        SELECT * FROM ihtiyaclar
        WHERE "Id" = $1;
    `;
    try {
        const { rows } = await pool.query(query, [ihtiyacId]);
        if (rows.length > 0) {
            return rows[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error executing query', error.stack);
        throw error;
    }
};


module.exports = {
    getIhtiyaclar,
    getIhtiyacById,
    checkIfFinansalYardim,
};