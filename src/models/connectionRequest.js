const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({

    fromUserId :{
        type : mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId:{
        type : mongoose.Schema.Types.ObjectId,
        required: true
    },
    status:{
        type: String,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message: ',$[VALUE] is of incorrect type'
        },
        required: true
    }
},
{
    timestamps: true
})

connectionRequestSchema.pre("save", function(next){
    const connectionRequest = this;
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself")
    }
    next();
})

const connectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = connectionRequestModel;