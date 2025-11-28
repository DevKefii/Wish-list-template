const jumpEl = document.getElementById('jump');
if (jumpEl) jumpEl.style.display = 'none';

const sound = new Audio("sound.mp3");
let timeout;
const midium = document.getElementById('mid_i');

function timeoutfun() {
  clearTimeout(timeout);
  timeout = setTimeout(Jumpscare, 5000);
}

function Jumpscare() {
  const answer = confirm("Goku is calling — do you want to answer?");
  if (answer) {
    sound.play();
    if (jumpEl) jumpEl.style.display = 'block';
    if (midium) midium.style.display = 'none';
  } else {
    alert(":(");
  }
}

const triggerButton = document.querySelector('button');
if (triggerButton) {
  triggerButton.addEventListener('click', () => {
    showPurchaseModal();
    timeoutfun();
  });
}

const modalOverlay = document.getElementById('modalOverlay');
const purchaseModal = document.getElementById('purchaseModal');
const cancelBtn = document.getElementById('cancelPurchase');
const closeBtn = document.getElementById('closeModal');
const modalMessage = document.getElementById('modalMessage');

function showPurchaseModal() {
  if (modalOverlay) modalOverlay.classList.remove('hidden');
  if (purchaseModal) purchaseModal.classList.remove('hidden');
  if (modalMessage) modalMessage.textContent = '';
}

function hidePurchaseModal() {
  if (modalOverlay) modalOverlay.classList.add('hidden');
  if (purchaseModal) purchaseModal.classList.add('hidden');
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startCancelChallenge() {
 
  const a = randInt(12, 24);
  const b = randInt(2, 4); 
  const c = randInt(30, 120);
  const d = randInt(3, 9);
  const e = randInt(50, 900);
  const expr = `${a}^${b} + ${c}*${d} - ${e}`;
  const correct = Math.pow(a, b) + c * d - e;

  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    const answerRaw = prompt(`Aby anulować zakupy, oblicz: ${expr}\n(Próba ${attempts + 1}/${maxAttempts})`);
    if (answerRaw === null) {
      if (modalMessage) modalMessage.textContent = 'Anulowano próbę rozwiązania.';
      return;
    }
    const userAnswer = Number(answerRaw.replace(/\s+/g, ''));
    attempts += 1;
    if (!Number.isFinite(userAnswer)) {
      alert('Podaj poprawną liczbę.');
      continue;
    }
    if (userAnswer === correct) {
      hidePurchaseModal();
      clearTimeout(timeout);
      alert('Poprawnie — zakupy anulowane.');
      return;
    } else {
      alert('Błędna odpowiedź.');
    }
  }
  if (modalMessage) modalMessage.textContent = 'Zbyt wiele nieudanych prób. Anulowanie zablokowane.';
}

if (cancelBtn) cancelBtn.addEventListener('click', startCancelChallenge);
if (closeBtn) closeBtn.addEventListener('click', () => {
  hidePurchaseModal();
});
