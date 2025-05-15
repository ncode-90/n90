let count = 0;
let istighfarCount = 0;
let salawatCount = 0;
const dailyGoal = 500;

function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.classList.remove('active');
    page.classList.add('hidden');
  });
  const selectedPage = document.getElementById(pageId);
  selectedPage.classList.remove('hidden');
  selectedPage.classList.add('active');

  if (pageId === 'statsPage') {
    loadStatistics();
  }
}

function changePhrase() {
  const select = document.getElementById('tasbeehType');
  document.getElementById('tasbeehButton').textContent = select.value;
}

function increment() {
  const selectedPhrase = document.getElementById('tasbeehType').value;
  count++;
  document.getElementById('count').textContent = count;

  if (selectedPhrase === "استغفر الله") {
    istighfarCount++;
    document.getElementById('clickIstighfar').play();
  } else {
    salawatCount++;
    document.getElementById('clickSalawat').play();
  }

  saveStatistics();
  updateProgress();
  checkCelebrate();
}

function resetDisplayedCounter() {
  count = 0;
  document.getElementById('count').textContent = count;
}

function updateProgress() {
  const percent = Math.min((count / dailyGoal) * 100, 100);
  document.getElementById('progress').style.width = percent + "%";
}

function checkCelebrate() {
  if (count === 500) {
    document.getElementById('celebrateSound').play();
    alert("مبروك! حققت هدفك اليومي!");
  }
}

function saveStatistics() {
  const today = new Date().toISOString().slice(0,10);
  const stats = JSON.parse(localStorage.getItem('tasbeehStats')) || {};

  stats[today] = {
    istighfar: istighfarCount,
    salawat: salawatCount
  };

  localStorage.setItem('tasbeehStats', JSON.stringify(stats));
}

function loadStatistics() {
  const stats = JSON.parse(localStorage.getItem('tasbeehStats')) || {};
  const tbody = document.getElementById('statsTable');
  tbody.innerHTML = '';

  for (const date in stats) {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${date}</td><td>${stats[date].istighfar}</td><td>${stats[date].salawat}</td>`;
    tbody.appendChild(row);
  }
}