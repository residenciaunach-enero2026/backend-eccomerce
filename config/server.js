
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),

  // 👇 MUY IMPORTANTE (para que NO salga localhost en producción)
  url: env('PUBLIC_URL', 'https://backend-eccomerce-615t.onrender.com'),
  proxy: true,

  app: {
    keys: env.array('APP_KEYS'),
  },

  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
