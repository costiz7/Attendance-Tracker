import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

//Avem nevoie de CORS pentru a comunica cu portul 5176 de pe frontend, care e diferit de port-ul 3000 de pe backend
app.use(cors());
//Pentru a trimite mai usor json()
app.use(express.json());


//Cand se face un get pe root (efectiv cand se porneste serverul), afiseaza "Serverul merge :D"
app.get('/', (req, res) => {
    res.send('Serverul merge :D');
})

//Shhhhhh the server listens
app.listen(PORT, () => console.log(`Serverul merge pe: http://localhost:${PORT}`));