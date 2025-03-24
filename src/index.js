const app = require("./app/app");

app.listen(app.get('port'), ()=>{
    console.log(`servidor corriendo en el puerto ${app.get('port')}`);
});