const dotenv =  require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3001,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/job-importer',
  // REDIS_HOST= redis-15505.crce182.ap-south-1-1.ec2.redns.redis-cloud.com, 
  // REDIS_PORT=15505,
  // REDIS_PASSWORD=your_secure_password,
  REDIS_URL: process.env.REDIS_URL || 'redis://default:PDhtXQfNSyilE9hugjLuB9kmrrKquoak@redis-15505.crce182.ap-south-1-1.ec2.redns.redis-cloud.com:15505',
  JOB_FETCH_INTERVAL: process.env.JOB_FETCH_INTERVAL || '0 * * * *', // Every hour
  CONCURRENCY: parseInt(process.env.CONCURRENCY) || 5,
  BATCH_SIZE: parseInt(process.env.BATCH_SIZE) || 10,
  NODE_ENV: process.env.NODE_ENV || 'development',
};