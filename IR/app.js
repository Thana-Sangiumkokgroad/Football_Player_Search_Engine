const express = require('express');
const path = require('path')
const port = 3000
const app = express();

const fs = require('fs');

app.set('views', path.join(`${__dirname}/views`));
app.set('view engine', 'ejs');
const { render } = require('ejs');

const router = express.Router();
app.use(router)

app.use(express.static(path.join(`${__dirname}/html`)));

router.get('/', (req, res) => {
    fs.readFile('all_players.json', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading JSON file');
        } else {
            try {
                const players = JSON.parse(data);
                res.render('FootballPlayer', { player: players });
            } catch (parseError) {
                res.status(500).send('Error parsing JSON data');
            }
        }
    });
});
app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})