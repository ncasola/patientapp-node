const express = require('express');
const cors = require('cors');
const db = require("./models");
const cookieParser = require('cookie-parser');
require('dotenv').config();

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

db.sequelize.sync().then(r => console.log("Tablas sync") );

require("./routes/patient.routes")(app);
require("./routes/user.routes")(app);
require("./routes/appointment.routes")(app);

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})