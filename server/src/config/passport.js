const { Strategy, ExtractJwt } = require('passport-jwt');
const dbPool = require('./dbConfig');
require('dotenv').config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretKey: process.env.JWT_SECRET_KEY,
};

module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async (jwt_payload, done) => {
      try {
        const { id } = jwt_payload;

        const queryText = 'SELECT * FROM users WHERE id = $1';
        const { rows } = await dbPool.query(queryText, [id]);

        if (rows.length > 0) {
          return done(null, rows[0]);
        } else {
          return done(null, false);
        }
      } catch (error) {
        console.error('Error during JWT authentication', error);
        return done(error, false);
      }
    })
  );
};