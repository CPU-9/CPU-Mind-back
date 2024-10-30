require('dotenv').config();
const { Sequelize } = require('sequelize');

// Sequelize 인스턴스 생성
const sequelize = new Sequelize('cpu_mind', 'root', process.env.SQL_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // 로깅을 원하지 않을 경우 false로 설정
});

// MySQL에 연결
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL database using Sequelize');
  } catch (error) {
    console.error('Error connecting to MySQL database:', error);
    setTimeout(connectDB, 2000); // 일정 시간 후 재연결 시도
  }
};

module.exports = sequelize;