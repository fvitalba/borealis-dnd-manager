import mongoose from 'mongoose'
import { MONGODB_URI } from './config'

if (mongoose.connection.readyState in [0, 3, 99]) {
    // Only connect if we are disconnected (0), disconnecting (3) or uninitialized (99)
    mongoose.connect(MONGODB_URI)
        .then()
        .catch((error) => {
            console.log('error connecting to MongoDB:', error.message)
        })
}

export default mongoose
