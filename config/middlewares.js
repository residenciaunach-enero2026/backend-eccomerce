module.exports = [
{
  name: "strapi::cors",
  config: {
    origin: [
      "https://e-commerce-residencia.vercel.app",
      "https://e-commerce-residencia.vercel.app/", // opcional
      "http://localhost:3000"
    ],
    credentials: true,
    methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    headers: ["Content-Type","Authorization","Origin","Accept"],
  },
},

  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
