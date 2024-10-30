const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    if (response.ok) {
      alert('로그인 성공!');
      window.location.href = '/dashboard';
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
});

const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const username = document.getElementById('newUsername').value;
  const password = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }

  try {
    const response = await fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    if (response.ok) {
      alert('회원가입 성공!');
      
      window.location.href = '/login';
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
});