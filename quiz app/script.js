// ── Questions ──
const questions = [
  {
    q: "Which planet in our solar system has the most moons?",
    opts: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    ans: 1,
    explain: "Saturn currently holds the record with 146 confirmed moons as of 2023, surpassing Jupiter."
  },
  {
    q: "What does CPU stand for?",
    opts: ["Central Processing Unit", "Core Power Unit", "Computer Personal Unit", "Central Program Utility"],
    ans: 0,
    explain: "CPU stands for Central Processing Unit — the primary component executing instructions in a computer."
  },
  {
    q: "Who painted the Sistine Chapel ceiling?",
    opts: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"],
    ans: 2,
    explain: "Michelangelo painted the Sistine Chapel ceiling between 1508 and 1512 at the commission of Pope Julius II."
  },
  {
    q: "Which element has the chemical symbol 'Au'?",
    opts: ["Silver", "Aluminum", "Argon", "Gold"],
    ans: 3,
    explain: "'Au' comes from the Latin word 'Aurum', meaning gold."
  },
  {
    q: "In what year did the World Wide Web become publicly available?",
    opts: ["1983", "1989", "1991", "1995"],
    ans: 2,
    explain: "Tim Berners-Lee launched the World Wide Web to the public in 1991 while working at CERN."
  },
  {
    q: "What is the largest ocean on Earth?",
    opts: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    ans: 3,
    explain: "The Pacific Ocean is the largest and deepest ocean, covering more than 30% of Earth's surface."
  },
  {
    q: "Which Shakespeare play features Rosencrantz and Guildenstern?",
    opts: ["Macbeth", "Othello", "Hamlet", "King Lear"],
    ans: 2,
    explain: "Rosencrantz and Guildenstern are childhood friends of Prince Hamlet in Shakespeare's 'Hamlet'."
  },
  {
    q: "What is the speed of light in a vacuum (approx.)?",
    opts: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "100,000 km/s"],
    ans: 0,
    explain: "Light travels at approximately 299,792 km/s (often rounded to 300,000 km/s) in a vacuum."
  },
  {
    q: "Which country invented the sport of basketball?",
    opts: ["United States", "Canada", "United Kingdom", "Brazil"],
    ans: 0,
    explain: "Basketball was invented in 1891 by Dr. James Naismith in Springfield, Massachusetts, USA."
  },
  {
    q: "What is the hardest natural substance on Earth?",
    opts: ["Quartz", "Titanium", "Diamond", "Corundum"],
    ans: 2,
    explain: "Diamond is the hardest natural substance, rating 10 on the Mohs hardness scale."
  }
];

const KEYS = ['A', 'B', 'C', 'D'];
let current = 0, score = 0, answered = false;

const card        = document.getElementById('mainCard');
const progressFill  = document.getElementById('progressFill');
const progressLabel = document.getElementById('progressLabel');
const progressWrap  = document.getElementById('progressWrap');

// ── Quiz Logic ──

function updateProgress() {
  progressFill.style.width = (current / questions.length * 100) + '%';
  progressLabel.textContent = (current + 1) + ' / ' + questions.length;
}

function renderQuestion() {
  const q = questions[current];
  answered = false;
  updateProgress();

  card.innerHTML =
    '<div class="q-number">Question ' + (current + 1) + ' of ' + questions.length + '</div>' +
    '<div class="q-text">' + q.q + '</div>' +
    '<div class="options">' +
      q.opts.map(function(opt, i) {
        return '<button class="option" data-idx="' + i + '" onclick="selectOption(' + i + ')">' +
          '<span class="opt-key">' + KEYS[i] + '</span>' +
          '<span class="opt-text">' + opt + '</span>' +
          '<span class="opt-icon"></span>' +
        '</button>';
      }).join('') +
    '</div>' +
    '<div class="feedback" id="feedback"></div>' +
    '<div class="card-footer">' +
      '<div class="score-badge">Score: <span id="scoreDisplay">' + score + '</span></div>' +
      '<button class="btn-next" id="btnNext" onclick="nextQuestion()" disabled>' +
        (current === questions.length - 1 ? 'Finish' : 'Next') +
        '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
      '</button>' +
    '</div>';
}

function selectOption(idx) {
  if (answered) return;
  answered = true;

  var q    = questions[current];
  var opts = document.querySelectorAll('.option');
  var fb   = document.getElementById('feedback');
  var btn  = document.getElementById('btnNext');
  var sd   = document.getElementById('scoreDisplay');

  opts.forEach(function(o) { o.setAttribute('disabled', true); });

  if (idx === q.ans) {
    score++;
    opts[idx].classList.add('correct');
    opts[idx].querySelector('.opt-icon').textContent = '✓';
    fb.textContent = '✓ Correct! ' + q.explain;
    fb.className = 'feedback correct-fb show';
    sd.textContent = score;
  } else {
    opts[idx].classList.add('wrong');
    opts[idx].querySelector('.opt-icon').textContent = '✗';
    opts[q.ans].classList.add('correct');
    opts[q.ans].querySelector('.opt-icon').textContent = '✓';
    fb.textContent = '✗ Not quite. ' + q.explain;
    fb.className = 'feedback wrong-fb show';
  }

  btn.disabled = false;
}

function nextQuestion() {
  card.classList.add('fade-out');
  setTimeout(function() {
    current++;
    card.classList.remove('fade-out');
    if (current >= questions.length) {
      showResults();
    } else {
      card.classList.add('fade-in');
      renderQuestion();
      setTimeout(function() { card.classList.remove('fade-in'); }, 400);
    }
  }, 280);
}

function showResults() {
  progressWrap.style.opacity = '0';
  progressWrap.style.pointerEvents = 'none';

  var pct = Math.round(score / questions.length * 100);
  var headline = pct === 100 ? 'Perfect Score!' : pct >= 70 ? 'Well Done!' : pct >= 40 ? 'Good Effort!' : 'Keep Practicing!';
  var trophy   = pct === 100 ? '🏆' : pct >= 70 ? '🌟' : pct >= 40 ? '👍' : '📚';
  var circ     = 2 * Math.PI * 54;
  var offset   = circ - (pct / 100) * circ;

  card.innerHTML =
    '<div class="results">' +
      '<span class="results-trophy">' + trophy + '</span>' +
      '<div class="results-headline">' + headline + '</div>' +
      '<div class="results-sub">You answered ' + score + ' out of ' + questions.length + ' questions correctly.</div>' +
      '<div class="score-ring-wrap"><div class="score-ring">' +
        '<svg width="140" height="140" viewBox="0 0 140 140">' +
          '<circle class="score-ring-bg" cx="70" cy="70" r="54"/>' +
          '<circle class="score-ring-fill" cx="70" cy="70" r="54" stroke-dasharray="' + circ + '" stroke-dashoffset="' + circ + '" id="ringFill"/>' +
        '</svg>' +
        '<div class="score-ring-text">' +
          '<div class="score-ring-num">' + pct + '%</div>' +
          '<div class="score-ring-denom">Score</div>' +
        '</div>' +
      '</div></div>' +
      '<div class="stats-row">' +
        '<div class="stat"><div class="stat-num c">' + score + '</div><div class="stat-label">Correct</div></div>' +
        '<div class="stat"><div class="stat-num w">' + (questions.length - score) + '</div><div class="stat-label">Incorrect</div></div>' +
      '</div>' +
      '<button class="btn-restart" onclick="restartQuiz()">' +
        '<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M13 7.5A5.5 5.5 0 1 1 7.5 2H10m0 0L8 4.5M10 2l-2-2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        ' Play Again' +
      '</button>' +
    '</div>';

  card.classList.add('fade-in');
  setTimeout(function() { card.classList.remove('fade-in'); }, 500);

  requestAnimationFrame(function() {
    setTimeout(function() {
      var ring = document.getElementById('ringFill');
      if (ring) ring.style.strokeDashoffset = offset;
    }, 100);
  });
}

function restartQuiz() {
  current = 0; score = 0; answered = false;
  progressWrap.style.opacity = '1';
  progressWrap.style.pointerEvents = 'auto';
  card.classList.add('fade-out');
  setTimeout(function() {
    card.classList.remove('fade-out');
    card.classList.add('fade-in');
    renderQuestion();
    setTimeout(function() { card.classList.remove('fade-in'); }, 400);
  }, 280);
}

// Keyboard shortcuts (only active during quiz, not while typing)
document.addEventListener('keydown', function(e) {
  var active = document.activeElement;
  var isTyping = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA');
  var quizVisible = document.getElementById('quizArea').style.display !== 'none';
  if (!quizVisible || isTyping) return;
  if (['1','2','3','4'].includes(e.key)) selectOption(parseInt(e.key) - 1);
  if (['a','b','c','d'].includes(e.key.toLowerCase())) selectOption(KEYS.indexOf(e.key.toUpperCase()));
  if (e.key === 'Enter' || e.key === ' ') {
    var btn = document.getElementById('btnNext');
    if (btn && !btn.disabled) nextQuestion();
  }
});

// ── Auth ──
var USERS = { admin: { password: 'quiz123', display: 'Admin' } };
var loggedInUser = null;
var authMode = 'login';

function switchTab(mode) {
  authMode = mode;
  var isSignup = mode === 'signup';
  document.getElementById('tabLogin').classList.toggle('active', !isSignup);
  document.getElementById('tabSignup').classList.toggle('active', isSignup);
  document.getElementById('fieldDisplayName').style.display = isSignup ? 'flex' : 'none';
  document.getElementById('fieldConfirmPass').style.display = isSignup ? 'flex' : 'none';
  document.getElementById('authTitle').textContent = isSignup ? 'Create Account' : 'Welcome Back';
  document.getElementById('authSub').textContent   = isSignup ? 'Register to play and track your score.' : 'Sign in to start the quiz.';
  document.getElementById('btnLoginText').textContent = isSignup ? 'Create Account' : 'Sign In';
  var hint = document.getElementById('loginHint');
  if (isSignup) {
    hint.innerHTML = 'Already have an account? <strong style="cursor:pointer;text-decoration:underline" onclick="switchTab(\'login\')">Sign in</strong>';
  } else {
    hint.innerHTML = 'No account? <strong style="cursor:pointer;text-decoration:underline" onclick="switchTab(\'signup\')">Create one free</strong> &mdash; or use <strong>admin</strong> / <strong>quiz123</strong>';
  }
  clearErrors();
  clearMessages();
}

function clearErrors() {
  ['inputUser','inputPass','inputConfirmPass','inputDisplayName'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove('error');
  });
}

function clearMessages() {
  document.getElementById('loginError').classList.remove('show');
  document.getElementById('loginSuccess').classList.remove('show');
}

function showError(msg) {
  var fields = Array.prototype.slice.call(arguments, 1);
  document.getElementById('loginErrorMsg').textContent = msg;
  document.getElementById('loginError').classList.add('show');
  document.getElementById('loginSuccess').classList.remove('show');
  fields.forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.classList.add('error');
  });
}

function showSuccess(msg) {
  document.getElementById('loginSuccessMsg').textContent = msg;
  document.getElementById('loginSuccess').classList.add('show');
  document.getElementById('loginError').classList.remove('show');
}

function setLoading(loading) {
  var btn  = document.getElementById('btnLogin');
  var text = authMode === 'signup' ? 'Create Account' : 'Sign In';
  btn.classList.toggle('loading', loading);
  if (loading) {
    btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="animation:spin 0.7s linear infinite"><path d="M8 2a6 6 0 1 0 6 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg> ' + (authMode === 'signup' ? 'Creating...' : 'Signing in...');
  } else {
    btn.innerHTML = '<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M6 2H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3M10 10.5l3-3-3-3M13 7.5H5.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg> <span id="btnLoginText">' + text + '</span>';
  }
}

function handleAuth() {
  var user    = document.getElementById('inputUser').value.trim().toLowerCase();
  var pass    = document.getElementById('inputPass').value;
  clearErrors();
  clearMessages();

  if (!user || !pass) {
    showError('Please fill in all required fields.',
      !user ? 'inputUser' : null,
      !pass ? 'inputPass' : null
    );
    return;
  }

  if (authMode === 'signup') {
    var confirm = document.getElementById('inputConfirmPass').value;
    var display = document.getElementById('inputDisplayName').value.trim();
    if (user.length < 3)               { showError('Username must be at least 3 characters.', 'inputUser'); return; }
    if (!/^[a-z0-9_]+$/.test(user))    { showError('Username: letters, numbers, underscores only.', 'inputUser'); return; }
    if (USERS[user])                   { showError('That username is already taken.', 'inputUser'); return; }
    if (pass.length < 4)               { showError('Password must be at least 4 characters.', 'inputPass'); return; }
    if (pass !== confirm)              { showError('Passwords do not match.', 'inputPass', 'inputConfirmPass'); return; }

    setLoading(true);
    setTimeout(function() {
      USERS[user] = { password: pass, display: display || user };
      setLoading(false);
      showSuccess('Account created! Signing you in...');
      setTimeout(function() { doLogin(user); }, 900);
    }, 600);

  } else {
    if (!USERS[user] || USERS[user].password !== pass) {
      setLoading(true);
      setTimeout(function() {
        setLoading(false);
        showError('Incorrect username or password.', 'inputUser', 'inputPass');
        document.getElementById('inputPass').value = '';
      }, 700);
      return;
    }
    setLoading(true);
    setTimeout(function() { doLogin(user); }, 700);
  }
}

function doLogin(user) {
  loggedInUser = user;
  var displayName = USERS[user].display || user;
  document.getElementById('userBadge').style.display = 'flex';
  document.getElementById('userAvatar').textContent = displayName[0].toUpperCase();
  document.getElementById('userNameDisplay').textContent = displayName;
  var ls = document.getElementById('loginScreen');
  ls.classList.add('hide');
  setTimeout(function() {
    ls.style.display = 'none';
    var qa = document.getElementById('quizArea');
    qa.style.display = 'block';
    renderQuestion();
  }, 350);
}

function togglePassword() {
  var inp  = document.getElementById('inputPass');
  var icon = document.getElementById('eyeIcon');
  if (inp.type === 'password') {
    inp.type = 'text';
    icon.innerHTML = '<path d="M2 2l12 12M6.5 6.6A3 3 0 0 0 8 11a3 3 0 0 0 2.9-2.2M1 8s2.5-5 7-5c1 0 1.9.2 2.8.5M15 8s-.8 1.6-2.3 2.9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>';
  } else {
    inp.type = 'password';
    icon.innerHTML = '<path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" stroke-width="1.5"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.5"/>';
  }
}

function logout() {
  loggedInUser = null;
  current = 0; score = 0; answered = false;
  document.getElementById('userBadge').style.display = 'none';
  document.getElementById('quizArea').style.display = 'none';
  progressWrap.style.opacity = '1';
  progressWrap.style.pointerEvents = 'auto';
  var ls = document.getElementById('loginScreen');
  ls.style.display = 'block';
  ls.classList.remove('hide');
  ['inputUser','inputPass','inputConfirmPass','inputDisplayName'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) { el.value = ''; el.classList.remove('error'); }
  });
  clearMessages();
  switchTab('login');
}

// Enter key support on auth fields
['inputUser','inputPass','inputConfirmPass','inputDisplayName'].forEach(function(id) {
  var el = document.getElementById(id);
  if (el) {
    el.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') handleAuth();
    });
  }
});
