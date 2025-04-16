import mongoose from "mongoose"

// LogSchema serves as a template for the endpoints that handle blog posts

const LogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [String],
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Log', LogSchema)