let mongoose=require('mongoose');

let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
let SubscriptionsSchema=new mongoose.Schema({
            MemberId: ObjectId,
            Movies:[{ movieId:ObjectId,date:Date}] 
})
module.exports=mongoose.model('subscriptions',SubscriptionsSchema);
