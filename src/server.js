import app from './app'
import appConfig from './config/appConfig';
import { InitTenantAuth } from './database/Index';
import Auth from './models/Auth';
import { GetConnection } from './services/TenantLoader';

// import fs from 'fs';
// import https from 'https';

// const privateKey = fs.readFileSync('C:\\Users\\Jhinattan Rocha\\Documents\\Trabalho\\chave-privada.pem', 'utf8');
// const certificate = fs.readFileSync('C:\\Users\\Jhinattan Rocha\\Documents\\Trabalho\\certificado.pem', 'utf8');
// const credentials = { key: privateKey, cert: certificate };

// const server = https.createServer(credentials, app);

app.listen(appConfig.PORT, appConfig.IP, async ()=>{
    // para funcionar no emulador android, precisa ser essa url http://10.0.2.2:3000/
    console.log(`rodando na url http://${appConfig.IP}:${appConfig.PORT}/`);

    const con = GetConnection('auth');
    if(!con){
        await InitTenantAuth('auth', true);
    }else{
        Auth.init(con);
    }
})
