require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const userRoutes = require('./server/routes/user.routes');
const siteRoutes = require('./server/routes/site.routes')
const passport = require('passport');
const passportConfig = require('./server/configs/passport.config');
passportConfig(passport);

app.use(bodyParser.json());
app.use(express.static(__dirname+"/dist"));
app.use(passport.initialize());

app.use('/api/user', userRoutes);
app.use('/api/site', siteRoutes);




app.get('*', (req, res) => {
    res.sendFile('/dist/index.html', { root: __dirname + "/" });
});

app.listen(port);