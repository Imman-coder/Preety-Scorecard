const logSchema = new mongoose.Schema({
    userId: String,
    registrationNo: String,
    viewedAt: { type: Date, default: Date.now },
    ipAddress: String
});

const Log = mongoose.model('Log', logSchema);

export default Log;