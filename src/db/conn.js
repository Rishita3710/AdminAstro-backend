const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log(`connection succesfull`);
    }).catch((error) => {
        console.log(`no connection with error`, error);
    })