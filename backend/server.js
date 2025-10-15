// El 'require' debe apuntar a la carpeta 'src'
const app = require('./src/app'); 
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Backend API corriendo en http://localhost:${PORT}/api`);
});