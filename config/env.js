const dotenv =  require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3001,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://job-importer:Rohit123@cluster0.2cnvnqu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  REDIS_URL: process.env.REDIS_URL || 'redis://default:PDhtXQfNSyilE9hugjLuB9kmrrKquoak@redis-15505.crce182.ap-south-1-1.ec2.redns.redis-cloud.com:15505',
  JOB_FETCH_INTERVAL: process.env.JOB_FETCH_INTERVAL || '0 * * * *', // Every hour
  CONCURRENCY: parseInt(process.env.CONCURRENCY) || 5,
  BATCH_SIZE: parseInt(process.env.BATCH_SIZE) || 10,
  NODE_ENV: process.env.NODE_ENV || 'development',
};