const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // 변수 선언 수정
const path = require('path');
const app = express();
require('dotenv').config();
const sequelize = require('./db');
const User = require('./models/User');



// 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true } // 보안 강화
}));

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'public')));

// 기본 경로
app.get('/', (req, res) => {
  res.send('Hello, server is running!');
});

// 로그인 페이지 제공
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Lginpage.html'));
});

// 회원가입 페이지 제공
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signuppage.html'));
});

// 대시보드 페이지 제공 (로그인 확인 필요)
app.get('/dashboard', (req, res) => {
  if (req.session.username) {
    res.send(`Hello ${req.session.username}, welcome to your dashboard!`);
  } else {
    res.redirect('/login');
  }
});

sequelize.sync().then(() => {
  console.log('Database synced');
}).catch((error) => {
  console.error('Error syncing database:', error);
});


// 로그인 처리
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // 사용자 조회
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: '아이디가 존재하지 않습니다.' });
    }

    // 비밀번호 비교
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // 세션 또는 토큰에 사용자 정보 저장 (예시에서는 세션 사용)
      req.session.username = username;
      return res.json({ message: '로그인 성공!' });
    } else {
      return res.status(401).json({ message: '비밀번호가 틀렸습니다.' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: '서버 오류' });
  }
});


// 회원가입 처리
app.post('/users', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create({ username, password });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
});

// 서버 실행
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
