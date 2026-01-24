const SnakeGame = (() => {

  let canvas, ctx;
  const size = 20;
  const tileCount = 20;

  let snake, direction, food, loop;

  // ====== CONTROLES TÁCTILES ======
  let touchStartX = 0;
  let touchStartY = 0;

  function handleTouchStart(e) {
    const t = e.touches[0];
    touchStartX = t.clientX;
    touchStartY = t.clientY;
  }

  function handleTouchEnd(e) {
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX;
    const dy = t.clientY - touchStartY;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0 && direction.x === 0) direction = { x: 1, y: 0 };
      if (dx < 0 && direction.x === 0) direction = { x: -1, y: 0 };
    } else {
      if (dy > 0 && direction.y === 0) direction = { x: 0, y: 1 };
      if (dy < 0 && direction.y === 0) direction = { x: 0, y: -1 };
    }
  }

  // ====== INICIO ======
  function init() {
    canvas = document.getElementById("snakeCanvas");
    ctx = canvas.getContext("2d");

    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    food = randomFood();

    document.addEventListener("keydown", keyControl);

    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });
  }

  function randomFood() {
    return {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  }

  // ====== TECLADO (PC) ======
  function keyControl(e) {
    switch (e.key) {
      case "ArrowUp":
        if (direction.y === 0) direction = { x: 0, y: -1 };
        break;
      case "ArrowDown":
        if (direction.y === 0) direction = { x: 0, y: 1 };
        break;
      case "ArrowLeft":
        if (direction.x === 0) direction = { x: -1, y: 0 };
        break;
      case "ArrowRight":
        if (direction.x === 0) direction = { x: 1, y: 0 };
        break;
    }
  }

  // ====== GAME LOOP ======
  function update() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const head = {
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y
    };

    // paredes
    if (head.x < 0 || head.y < 0 || head.x >= tileCount || head.y >= tileCount) {
      stop();
      return;
    }

    // choque consigo mismo
    for (let part of snake) {
      if (part.x === head.x && part.y === head.y) {
        stop();
        return;
      }
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      food = randomFood();
    } else {
      snake.pop();
    }

    // comida
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * size, food.y * size, size, size);

    // snake
    ctx.fillStyle = "lime";
    snake.forEach(p =>
      ctx.fillRect(p.x * size, p.y * size, size - 1, size - 1)
    );
  }

  function start() {
    stop();
    init();
    loop = setInterval(update, 100);
  }

  function stop() {
    clearInterval(loop);
  }

  return { start, stop };

})();
