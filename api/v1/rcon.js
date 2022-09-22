const router = require("express").Router();
const Rcon = require('srcds-rcon');


const rconConfig = {
    address: '192.168.1.14:27015',
    password: 'ggcr2305'
};

router.get("/get/players", (req, res) => {
    let rcon = Rcon(rconConfig);
    rcon.connect().then(() => {
        rcon.command(`players`).then(r => {
            //r = `Players connected (0):\n-player01\n-player02\n-player03`
            let aux = r.split("\n");
            let players = [];
            for (var i = 1; i < aux.length; i++) {
                if (aux[i].substr(1))
                    players.push(aux[i].toString().trim().substr(1));
            }
            res.status(200).json({ players });
        });
    }).then(() => {
        rcon.disconnect();
    }).catch(err => {
        res.status(500).json({ error: true, stack: err });
    });
});

router.post("/send/setaccesslevel", (req, res) => {
    let { username, accesslevel } = req.body;
    let rcon = Rcon(rconConfig);
    rcon.connect().then(() => {
        rcon.command(`setaccesslevel "${username}" "${accesslevel}"`).then(message => {
            res.status(200).json({ message });
        });
    }).then(() => {
        rcon.disconnect();
    }).catch(err => {
        res.status(500).json({ error: true, stack: err });
    });
});

router.post("/send/servermsg", (req, res) => {
    let { message } = req.body;
    let rcon = Rcon(rconConfig);
    rcon.connect().then(() => {
        rcon.command(`servermsg "[Mensagem do Servidor]: ${message}"`).then(message => {
            res.status(200).json({ message });
        });
    }).then(() => {
        rcon.disconnect();
    }).catch(err => {
        res.status(500).json({ error: true, stack: err });
    });
});

router.post("/send/thunder", (req, res) => {
    let { player } = req.body;
    let rcon = Rcon(rconConfig);
    rcon.connect().then(() => {
        rcon.command(`thunder "${player}"`).then(message => {
            res.status(200).json({ message });
        });
    }).then(() => {
        rcon.disconnect();
    }).catch(err => {
        res.status(500).json({ error: true, stack: err });
    });
});


module.exports = router;
