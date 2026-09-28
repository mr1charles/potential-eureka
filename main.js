const $ = (id) => document.getElementById(id);
const screens = ['intro', 'lesson', 'practice', 'review'];
function show(name) { screens.forEach(s => $(s).classList.toggle('hidden', s !== name)); }
function start(topic) {
  const clean = topic.trim() || 'Linear functions';
  $('lessonTitle').textContent = clean;
  document.querySelector('.review-card strong').textContent = clean.toLowerCase();
  show('lesson');
}
$('beginBtn').onclick = () => start($('topicInput').value);
$('topicInput').addEventListener('keydown', e => { if (e.key === 'Enter') start(e.target.value); });
document.querySelectorAll('.suggestions button').forEach(b => b.onclick = () => { $('topicInput').value = b.textContent; start(b.textContent); });
document.querySelectorAll('#answers button').forEach(button => button.onclick = () => {
  document.querySelectorAll('#answers button').forEach(b => b.disabled = true);
  const right = button.dataset.answer === 'right';
  button.classList.add(right ? 'correct' : 'incorrect');
  if (!right) document.querySelector('[data-answer="right"]').classList.add('correct');
  $('feedback').classList.remove('hidden'); $('nextBtn').disabled = false;
});
$('nextBtn').onclick = () => show('practice');
$('backBtn').onclick = () => show('lesson');
$('whyBtn').onclick = () => { $('feedback').textContent = 'Hint: the value where x = 0 is the y-intercept. The number multiplying x is the slope.'; $('feedback').classList.remove('hidden'); };
$('hintPractice').onclick = (e) => { e.target.textContent = 'Hint: fixed fee + (monthly cost × number of months)'; };
$('reviewBtn').onclick = () => { if (!$('workArea').value.trim()) { $('workArea').focus(); $('workArea').placeholder = 'Add a quick attempt first — we learn most from your thinking.'; return; } show('review'); };
$('restartBtn').onclick = () => { $('topicInput').value = ''; $('workArea').value = ''; show('intro'); };
