const SnakeGame = (() => {

  let canvas, ctx;
  const size = 20;
  const tileCount = 20;

  let snake, direction, food, loop;

  // ===== INICIALIZA EL JUEGO =====
  function init() {
    canvas = document.getElementById("snakeCanvas");
    ctx = canvas.getContext("2d");

    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    food = randomFood();

    document.addEventListener("keydown", keyControl);
  }

  // ===== COMIDA ALEATORIA =====
  function randomFood() {
    return {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  }

  // ===== TECLADO =====
  function keyControl(e) {
    switch (e.key) {
      case "ArrowUp":    if (direction.y === 0) direction = { x: 0, y: -1 }; break;
      case "ArrowDown":  if (direction.y === 0) direction = { x: 0, y: 1 }; break;
      case "ArrowLeft":  if (direction.x === 0) direction = { x: -1, y: 0 }; break;
      case "ArrowRight": if (direction.x === 0) direction = { x: 1, y: 0 }; break;
    }
  }

  // ===== BOTONES TÁCTILES =====
  function action(dir) {
    switch (dir) {
      case "up":    if (direction.y === 0) direction = { x: 0, y: -1 }; break;
      case "down":  if (direction.y === 0) direction = { x: 0, y: 1 }; break;
      case "left":  if (direction.x === 0) direction = { x: -1, y: 0 }; break;
      case "right": if (direction.x === 0) direction = { x: 1, y: 0 }; break;
    }
  }

  // ===== LOOP DEL JUEGO =====
  function update() {
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const head = {
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y
    };

    // choque con paredes
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

  // ===== CONTROL =====
  function start(fps = 10) {
    init();
    clearInterval(loop);
    loop = setInterval(update, 1000 / fps);
  }

  function stop() {
    clearInterval(loop);
  }

  // ===== EXPONER AL HTML =====
  return { start, stop, action };

})();
