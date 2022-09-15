import 'dotenv/config'

export const PORT = process.env.PORT || 8000
const ENV_MONGODB_URI = process.env.NODE_ENV === 'test' ? process.env.MONGODB_TEST_URI : process.env.MONGODB_URI
export const MONGODB_URI: string = ENV_MONGODB_URI !== undefined ? ENV_MONGODB_URI : ''
