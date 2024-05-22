const dbPool = require('../config/dbConfig');

//Get all families
const getFinansalYardimlar = async () => {
    const query = `
        SELECT * FROM yardimlar
        WHERE "IhtiyacId" IS NULL AND "Durum" = 1;
    `;
    try {
        const { rows } = await dbPool.query(query);
        return rows;
    } catch (error) {
        console.error('Error executing query', error.stack);
        throw error;
    }
};

//Get a financal aid by ID
const getFinansalYardimById = async (id) => {
    const query = `
        SELECT * FROM yardimlar
        WHERE "Id" = $1 AND "IhtiyacId" IS NULL AND "Durum" = 1;
    `;
    try {
        const { rows } = await dbPool.query(query, [id]);
        if (rows.length === 0) {
            return null; // Eğer sonuç yoksa null dön
        }
        return rows[0];  // 'Id' benzersiz olduğu varsayılarak sadece bir satır döndürülür.
    } catch (error) {
        console.error('Error executing query', error.stack);
        throw error;
    }
};

//Add a financal aid
const addFinansalYardim = async (aileId, yardimiYapanKullaniciId, yardim, yardimAciklama) => {
    const query = `
        INSERT INTO yardimlar ("AileId", "YardimiYapanKullaniciId", "Yardim", "YardimAciklama", "KayitTarihi", "GuncellemeTarihi", "Durum")
        VALUES ($1, $2, $3, $4, NOW(), NOW(), 1)
        RETURNING *;
    `;
    try {
        const { rows } = await dbPool.query(query, [aileId, yardimiYapanKullaniciId, yardim, yardimAciklama]);
        return rows[0];
    } catch (error) {
        console.error('Error executing query', error.stack);
        throw error;
    }
};

//Update the financal aid
const updateFinansalYardim = async (id, yardim, yardimAciklama) => {
    const query = `
        UPDATE yardimlar
        SET "Yardim" = $2, "YardimAciklama" = $3, "GuncellemeTarihi" = NOW()
        WHERE "Id" = $1 AND "IhtiyacId" IS NULL AND "Durum" = 1
        RETURNING *;
    `;
    try {
        const { rows } = await dbPool.query(query, [id, yardim, yardimAciklama]);
        return rows[0];
    } catch (error) {
        console.error('Error executing query', error.stack);
        throw error;
    }
};

module.exports = {
    getFinansalYardimlar,
    getFinansalYardimById,
    addFinansalYardim,
    updateFinansalYardim, 
};