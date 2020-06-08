//=========================
//       Entorno
//=========================

process.env.PORT = process.env.PORT || 8000;


//========================
//vencimiento del token
//========================

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 360;


//========================
//SEED de Autenticacion
//========================

process.env.SEED = process.env.SEED || 'este-es-el-SEED-Desarrollo';