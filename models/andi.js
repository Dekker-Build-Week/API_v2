const mongoose = require("mongoose");
// Define schema
var Schema = mongoose.Schema;

var andiSchema = new Schema({
   name: String,
   photo: String,
});

var andi = mongoose.model('Andi', andiSchema);

async function create_andi(name, photo){
    
    var newAndi = new andi({name: name, photo: photo});
    await newAndi.save(function (err, andi) {
    if (err) return console.error('err');
    });
    return newAndi;
}

async function get_andi(name, photo){
    var myandi = {name: name, photo: photo}
    const foundAndi = await andi.findOne(myandi, (err, result) => {
        if (err)
            console.error(err);
        return result;
    });
    return foundAndi;
}

async function remove_andi(my_andi) {
    var foo = await andi.deleteOne(my_andi, function(err){
        if (err) console.log(err);
    });
}

module.exports = mongoose.model('Andi', andiSchema);
module.exports.create_andi = create_andi;
module.exports.get_andi = get_andi;
module.exports.remove_andi = remove_andi;
