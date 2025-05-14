
const dot = document.getElementById('dot');
const menu = document.getElementById('menu');
const message = document.getElementById('message');
const reward = document.getElementById('reward');
const sound = document.getElementById('reward-sound');

let timer = 0;
let interval;
let angle = 0;

function startChallenge(type) {
  menu.style.display = 'none';
  dot.style.display = 'block';
  message.textContent = 'Keep your eyes on the dot!';
  reward.style.display = 'none';
  timer = 0;
  angle = 0;

  clearInterval(interval);
  interval = setInterval(() => {
    timer++;
    if (timer >= 30) {
      clearInterval(interval);
      dot.style.display = 'none';
      message.textContent = '';
      reward.textContent = getRewardText(type);
      reward.style.display = 'block';
      sound.play();
      setTimeout(() => {
        reward.style.display = 'none';
        menu.style.display = 'block';
      }, 4000);
    } else {
      moveDot(type);
    }
  }, 1000);
}

function moveDot(type) {
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (type === 'vertical') {
    dot.style.left = `${w / 2}px`;
    dot.style.top = `${Math.random() * (h - 40)}px`;
  } else if (type === 'horizontal') {
    dot.style.left = `${Math.random() * (w - 40)}px`;
    dot.style.top = `${h / 2}px`;
  } else if (type === 'circle') {
    const radius = Math.min(w, h) / 4;
    const x = w / 2 + radius * Math.cos(angle);
    const y = h / 2 + radius * Math.sin(angle);
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    angle += Math.PI / 15;
  } else if (type === 'blink') {
    dot.style.left = `${Math.random() * (w - 40)}px`;
    dot.style.top = `${Math.random() * (h - 40)}px`;
    message.textContent = 'Blink now! 👁️👁️';
  } else if (type === 'focus') {
    const x = Math.random() < 0.5 ? w / 2 : Math.random() * (w - 40);
    const y = Math.random() < 0.5 ? h / 2 : Math.random() * (h - 40);
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
  }
}

function getRewardText(type) {
  const rewards = {
    vertical: "Great vertical focus! 👏 You're leveling up your eye power!",
    horizontal: "Awesome side tracking! 🔥 Your eyes are super sharp!",
    circle: "You nailed the circle! 🌀 Your eyes are strong and steady!",
    blink: "Nice blinking break! ✨ Keep your eyes fresh!",
    focus: "Fantastic focus shift! 🎯 You're mastering eye control!"
  };
  return rewards[type] || "Well done! 🎉 Keep going!";
}
