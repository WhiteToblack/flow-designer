import mongoose from "mongoose";

// Schema for users of app
const RuleSchema = new mongoose.Schema({
    id: {
        unique: true,    
        type: String
    },
    name: {
        type: String,
        required: true
    },       
    scope: {
        type: String
    },
});

export default RuleSchema