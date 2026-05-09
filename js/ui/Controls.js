export class Controls {
  constructor(player) {
    this.player = player;
    this.joystickActive = false;
    this.joystickBase = { x: 60, y: 540 };
    this.joystickThumb = { x: 60, y: 540 };
    this.touchId = null;
    this.skill1Btn = { x: 280, y: 520, r: 25 };
    this.skill2Btn = { x: 280, y: 580, r: 25 };

    canvas.addEventListener('touchstart', this.onTouchStart.bind(this), {passive: false});
    canvas.addEventListener('touchmove', this.onTouchMove.bind(this), {passive: false});
    canvas.addEventListener('touchend', this.onTouchEnd.bind(this));
  }
  onTouchStart(e) {
    e.preventDefault();
    for (let touch of e.changedTouches) {
      const rect = canvas.getBoundingClientRect();
      const mx = (touch.clientX - rect.left) * (360/rect.width);
      const my = (touch.clientY - rect.top) * (640/rect.height);
      if (mx < 150 && my > 450) { // vùng joystick
        this.joystickActive = true; this.touchId = touch.identifier;
        this.joystickBase = {x: mx, y: my};
        this.joystickThumb = {x: mx, y: my};
      } else if (Math.hypot(mx-this.skill1Btn.x, my-this.skill1Btn.y) < 30) {
        this.player.useSkill();
      } else if (Math.hypot(mx-this.skill2Btn.x, my-this.skill2Btn.y) < 30) {
        this.player.dash();
      }
    }
  }
  onTouchMove(e) {
    e.preventDefault();
    for (let touch of e.changedTouches) {
      if (touch.identifier === this.touchId && this.joystickActive) {
        const rect = canvas.getBoundingClientRect();
        const mx = (touch.clientX - rect.left) * (360/rect.width);
        const my = (touch.clientY - rect.top) * (640/rect.height);
        const dx = mx - this.joystickBase.x, dy = my - this.joystickBase.y;
        const dist = Math.min(20, Math.hypot(dx, dy));
        const angle = Math.atan2(dy, dx);
        this.joystickThumb = {
          x: this.joystickBase.x + Math.cos(angle)*dist,
          y: this.joystickBase.y + Math.sin(angle)*dist
        };
        this.player.vx = Math.cos(angle);
        this.player.vy = Math.sin(angle);
      }
    }
  }
  onTouchEnd(e) {
    for (let touch of e.changedTouches) {
      if (touch.identifier === this.touchId) {
        this.joystickActive = false;
        this.player.vx = 0; this.player.vy = 0;
      }
    }
  }
  update() {} // không cần
  render(ctx) {
    // Vẽ joystick
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(this.joystickBase.x, this.joystickBase.y, 30, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(this.joystickThumb.x, this.joystickThumb.y, 15, 0, Math.PI*2); ctx.fill();
    // Skill buttons
    ctx.fillStyle = '#6a0dad'; ctx.beginPath(); ctx.arc(this.skill1Btn.x, this.skill1Btn.y, this.skill1Btn.r, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#e67e22'; ctx.beginPath(); ctx.arc(this.skill2Btn.x, this.skill2Btn.y, this.skill2Btn.r, 0, Math.PI*2); ctx.fill();
    ctx.globalAlpha = 1;
  }
  destroy() {
    canvas.removeEventListener('touchstart', this.onTouchStart);
    canvas.removeEventListener('touchmove', this.onTouchMove);
    canvas.removeEventListener('touchend', this.onTouchEnd);
  }
}