let mongoose=require('mongoose');

let MoviesSchema=new mongoose.Schema({
            Name: String,
            Genres:[String],
            Image:String,
            Premiered:Date
        
    });

module.exports=mongoose.model('movies',MoviesSchema);
