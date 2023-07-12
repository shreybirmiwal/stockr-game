const express = require("express");
const path = require('path');
const apiRoutes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use('/api', apiRoutes);


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


app.listen(PORT, async() => {

  console.log(`Server listening on ${PORT}`);

});