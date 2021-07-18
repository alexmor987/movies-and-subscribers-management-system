let mongoose=require('mongoose');

let SubscriptionsSchema=new mongoose.Schema({
            MemberId: (ObjectId),
            Movies:[{ movieId :(ObjectId), date : Date}] 

    });
let MoviesSchema=new mongoose.Schema({
            Name: String,
            Email:String,
            City:String
        
    });
let MembersSchema=new mongoose.Schema({
            Name: String,
            Genres:[String],
            Image:String,
            Premiered:Date
        
    });
module.exports=mongoose.model('subscriptions',SubscriptionsSchema);
module.exports=mongoose.model('movies',MoviesSchema);
module.exports=mongoose.model('members',MembersSchema);