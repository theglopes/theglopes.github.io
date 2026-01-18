const projectData = [
  {
    id: "strum",
    title: "Strum \u2014 Plataforma de jogos digitais",
    description:
      "Sistema inspirado na Steam, com front-end em HTML/CSS/JS e backend em Java + MySQL.",
    preview: "https://placehold.co/600x400/0ea5e9/0f172a?text=Strum",
    repo: "https://github.com/theglopes/projetostrum",
    demo: "projects/strum.html",
    tags: ["HTML", "CSS", "Java", "MySQL"],
  },
  {
    id: "automacao",
    title: "RPA \u2014 Automa\u00e7\u00e3o de Processos e Relat\u00f3rios",
    description: "Desenvolvimento de bots em Python com Selenium e openpyxl.",
    preview: "https://placehold.co/600x400/0f172a/f6f1e9?text=RPA",
    repo: "https://github.com/guilhermelopes/automacao-inteligente",
    demo: "projects/automacao.html",
    tags: ["Python", "Selenium", "openpyxl"],
  },
  {
    id: "outros",
    title: "Outros experimentos e lab aberto",
    description:
      "Laborat\u00f3rio com atividades da faculdade (muita coisa em Java) e prot\u00f3tipos em HTML, CSS, Node.js e Bootstrap.",
    preview: "https://placehold.co/600x400/1b2437/f6f1e9?text=Lab",
    repo: "https://github.com/theglopes",
    demo: "projects/outros.html",
    tags: ["Java", "HTML", "CSS", "Node.js", "Bootstrap"],
  },
];

const techSkills = [
  { label: "Python", level: 90 },
  { label: "HTML / CSS / JavaScript", level: 88 },
  { label: "SQL", level: 85 },
  { label: "Java", level: 85 },
  { label: "Git e GitHub", level: 90 },
];

const softSkills = [
  { label: "Aprendizado cont\u00ednuo", level: 100 },
  { label: "Trabalho em equipe", level: 95 },
  { label: "Solu\u00e7\u00e3o de problemas", level: 90 },
  { label: "Comunica\u00e7\u00e3o", level: 88 },
];

const timelineData = [
  {
    year: "2018",
    title: "ETEC \u2014 Primeiras linhas de c\u00f3digo",
    body:
      "Iniciei os estudos de programa\u00e7\u00e3o na ETEC, explorando l\u00f3gica, Java e projetos acad\u00eamicos que acenderam a curiosidade por produtos digitais.",
  },
  {
    year: "2020",
    title: "Suporte & Helpdesk \u2014 Primeiro emprego",
    body:
      "Atuei na linha de frente atendendo usu\u00e1rios, estruturando documenta\u00e7\u00e3o e entendendo a infraestrutura que sustenta sistemas corporativos.",
  },
  {
    year: "2021",
    title: "Desenvolvimento interno de sistemas",
    body:
      "Passei a participar de aplica\u00e7\u00f5es internas, APIs REST e integra\u00e7\u00f5es entre equipes, assumindo ownership de features cr\u00edticas em produ\u00e7\u00e3o.",
  },
  {
    year: "2024",
    title: "Automa\u00e7\u00e3o \u2014 Webscraping & processos",
    body:
      "Desenvolvi pipelines de webscraping e robots que automatizaram fluxos manuais, reduzindo horas operacionais e garantindo dados atualizados.",
  },
  {
    year: "2024",
    title: "Senior & Coordena\u00e7\u00e3o de TI (atual)",
    body:
      "Hoje lidero o time de TI, orquestro roadmap t\u00e9cnico, equilibrando opera\u00e7\u00e3o, inova\u00e7\u00e3o e governan\u00e7a.",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("current-year").textContent =
    new Date().getFullYear();

  setupThemeToggle();
  animateCounters();
  fetchGitHubStats();
  renderProjects();
  renderSkills();
  renderTimeline();
  setupTerminal();
  setupCVDownload();
  setupRepoGuard();
  setupPrivateModal();
  setupKonamiMode();
  setupPlayground();
});

function setupThemeToggle() {
  const button = document.getElementById("theme-toggle");
  if (!button) return;

  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const applyTheme = (isDark) => {
    document.body.classList.toggle("theme-dark", isDark);
    document.body.classList.toggle("theme-light", !isDark);
    button.textContent = isDark ? "\u2600" : "\u263e";
  };

  applyTheme(prefersDark);

  button.addEventListener("click", () => {
    const next = !document.body.classList.contains("theme-dark");
    applyTheme(next);
  });
}

function animateCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  counters.forEach((counter) => {
    const target = Number(counter.dataset.counter);
    animateCounterElement(counter, target);
  });
}

function animateCounterElement(counter, targetValue) {
  const duration = 1800;
  const startValue = Number(counter.textContent.replace(/\D/g, "")) || 0;
  const start = performance.now();

  function update(currentTime) {
    const progress = Math.min((currentTime - start) / duration, 1);
    const value = Math.floor(
      startValue + (targetValue - startValue) * progress
    );
    counter.textContent = value.toLocaleString("pt-BR");
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function renderProjects() {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = "";

  projectData.forEach((project) => {
    const article = document.createElement("article");
    article.className = "project-card";
    article.innerHTML = `
      <div class="card-inner">
        <div class="card-face front">
          <img src="${project.preview}" alt="${project.title}" />
          <div class="card-body">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
          </div>
        </div>
        <div class="card-face back">
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="tags">
            ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
          </div>
          <div class="cta-group">
            <a class="secondary-button" href="${project.repo}" target="_blank" rel="noopener" data-role="repo-link" data-project="${project.id}">GitHub</a>
            <a class="ghost-button" href="${project.demo}">Preview</a>
          </div>
        </div>
      </div>
    `;
    grid.appendChild(article);
  });
}

function setupRepoGuard() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest('[data-role="repo-link"]');
    if (!link) return;
    if (link.dataset.project === "automacao") {
      event.preventDefault();
      openPrivateModal();
    }
  });
}

function renderSkills() {
  const techList = document.getElementById("tech-skills");
  const softList = document.getElementById("soft-skills");

  const createItem = (skill) => {
    const li = document.createElement("li");
    li.className = "skill-item";
    li.innerHTML = `
      <strong>${skill.label}</strong>
      <div class="skill-bar"><span style="width: ${skill.level}%;"></span></div>
    `;
    return li;
  };

  techSkills.forEach((skill) => techList.appendChild(createItem(skill)));
  softSkills.forEach((skill) => softList.appendChild(createItem(skill)));

  requestAnimationFrame(() => {
    document.querySelectorAll(".skill-bar span").forEach((bar, index) => {
      setTimeout(() => {
        bar.style.width = bar.getAttribute("style").split(":")[1];
      }, index * 120);
    });
  });
}

function renderTimeline() {
  const wrapper = document.getElementById("timeline-wrapper");
  wrapper.innerHTML = "";
  timelineData.forEach((item) => {
    const div = document.createElement("div");
    div.className = "timeline-item";
    div.innerHTML = `
      <small>${item.year}</small>
      <h3>${item.title}</h3>
      <p>${item.body}</p>
    `;
    wrapper.appendChild(div);
  });
}

function setupTerminal() {
  const form = document.getElementById("terminal-form");
  const input = document.getElementById("terminal-command");
  const output = document.getElementById("terminal-output");

  const commands = {
    help: () => `
      Comandos dispon\u00edveis:
      - help -> mostra esta ajuda
      - show projects -> lista projetos principais
      - show skills -> tech + soft skills
      - show timeline -> principais marcos
      - links -> GitHub, LinkedIn e contato
      - clear -> limpa o terminal
      - gamer -> ativa o mini game (ou use o c\u00f3digo secreto)
      - cv -> gera o PDF do curr\u00edculo
    `,
    "show projects": () =>
      projectData
        .map((project) => `- ${project.title} -> ${project.repo}`)
        .join("<br/>"),
    "show skills": () =>
      [...techSkills, ...softSkills]
        .map((skill) => `- ${skill.label} (${skill.level}%)`)
        .join("<br/>"),
    "show timeline": () =>
      timelineData
        .map((item) => `${item.year} - ${item.title}`)
        .join("<br/>"),
    links: () =>
      [
        "GitHub -> github.com/guilhermelopes",
        "LinkedIn -> linkedin.com/in/guilherme-lopes00",
        "E-mail -> contato.guilopes@gmail.com",
      ].join("<br/>"),
    clear: () => {
      output.innerHTML = "";
      return "Terminal limpo.";
    },
    gamer: () => {
      openGamerMode();
      return "Modo gamer pronto. Ca\u00e7e os bugs!";
    },
    cv: () => "Envie um e-mail para solicitar o curr\u00edculo em PDF atualizado.",
  };

  const history = [];
  let pointer = -1;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const command = input.value.trim();
    if (!command) return;
    history.unshift(command);
    pointer = -1;

    appendLine(`glopes \u00b7 ${command}`);
    processCommand(command.toLowerCase());
    input.value = "";
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      pointer = Math.min(pointer + 1, history.length - 1);
      input.value = history[pointer] ?? "";
      setTimeout(
        () => input.setSelectionRange(input.value.length, input.value.length),
        0
      );
    } else if (event.key === "ArrowDown") {
      pointer = Math.max(pointer - 1, -1);
      input.value = pointer === -1 ? "" : history[pointer];
    }
  });

  function processCommand(command) {
    const fn = commands[command];
    if (fn) {
      const response = fn();
      if (typeof response === "string") {
        appendLine(response);
      }
    } else if (command.startsWith("show")) {
      appendLine(
        "Comando dispon\u00edvel: show projects | show skills | show timeline."
      );
    } else {
      appendLine(`Comando "${command}" n\u00e3o reconhecido. Use help.`);
    }
  }

  function appendLine(text) {
    const line = document.createElement("p");
    line.innerHTML = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }
}

function setupCVDownload() {
  // Placeholder retained to avoid errors if called elsewhere.
}

async function fetchGitHubStats() {
  const defaultStats = {
    projects: 8,
    repoSizeKb: 12000,
    commits: 84,
  };
  const projectCounter = document.querySelector('[data-type="projects"]');
  const sizeCounter = document.querySelector('[data-type="code-size"]');
  const commitsCounter = document.querySelector('[data-type="commits"]');
  if (!projectCounter && !sizeCounter && !commitsCounter) return;
  if (typeof fetch !== "function") return;

  let stats = { ...defaultStats };

  try {
    const response = await fetch("data/github-stats.json", {
      cache: "no-cache",
      headers: { "Cache-Control": "no-cache" },
    });
    if (!response.ok) throw new Error("stats request failed");
    const payload = await response.json();
    stats = {
      projects: resolveStatValue(payload.projects, defaultStats.projects),
      repoSizeKb: resolveStatValue(payload.repoSizeKb, defaultStats.repoSizeKb),
      commits: resolveStatValue(payload.commits, defaultStats.commits),
    };
  } catch (error) {
    console.warn(
      "N\u00e3o foi poss\u00edvel carregar os dados pre-gerados do GitHub:",
      error
    );
  }

  if (projectCounter) {
    applyCounterValue(projectCounter, stats.projects);
  }
  if (sizeCounter) {
    applyCounterValue(sizeCounter, stats.repoSizeKb);
  }
  if (commitsCounter) {
    applyCounterValue(commitsCounter, stats.commits);
  }
}

function resolveStatValue(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function applyCounterValue(counter, value) {
  counter.dataset.counter = value;
  animateCounterElement(counter, value);
}

function setupPlayground() {
  const runBtn = document.getElementById("playground-run");
  const output = document.getElementById("playground-output");
  if (!runBtn || !output) return;

  const samples = [
    { status: 200, message: "ok", latency: 128 },
    { status: 201, message: "created", latency: 146 },
    { status: 503, message: "service unavailable", latency: 320 },
  ];

  runBtn.addEventListener("click", () => {
    runBtn.disabled = true;
    const previousLabel = runBtn.textContent;
    runBtn.textContent = "Rodando...";
    output.innerHTML = "<p>&gt; executando health check...</p>";

    setTimeout(() => {
      const sample = samples[Math.floor(Math.random() * samples.length)];
      const timestamp = new Date().toISOString();
      const lines = [
        `> status: ${sample.status} (${sample.message})`,
        `> latency: ${sample.latency} ms`,
        `> timestamp: ${timestamp}`,
      ];
      output.innerHTML = lines.map((line) => `<p>${line}</p>`).join("");
      runBtn.disabled = false;
      runBtn.textContent = previousLabel;
    }, 700);
  });
}

function setupKonamiMode() {
  const code = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  const entered = [];

  window.addEventListener("keydown", (event) => {
    entered.push(event.key);
    if (entered.length > code.length) entered.shift();
    if (
      code.every(
        (key, index) => entered[index]?.toLowerCase() === key.toLowerCase()
      )
    ) {
      openGamerMode();
    }
  });

  const closeButton = document.getElementById("close-gamer");
  closeButton.addEventListener("click", closeGamerMode);
  document.getElementById("start-game").addEventListener("click", startBugGame);
  document
    .getElementById("pause-game")
    ?.addEventListener("click", togglePauseGame);
}

let bugIntervalId = null;
let bugTimeoutIds = [];
let bugScore = 0;
let bugLosses = 0;
let gamePaused = false;
const MAX_BUG_LOSSES = 10;

function openGamerMode() {
  const panel = document.getElementById("gamer-mode");
  panel.classList.add("active");
  resetBugGameUI();
}

function closeGamerMode() {
  const panel = document.getElementById("gamer-mode");
  panel.classList.remove("active");
  stopBugGame();
  resetBugGameUI();
}

function startBugGame() {
  const field = document.getElementById("bug-field");
  const pauseBtn = document.getElementById("pause-game");
  const statusEl = document.getElementById("game-status");
  if (!field || !pauseBtn || !statusEl) return;

  stopBugGame();
  field.innerHTML = "";
  bugScore = 0;
  bugLosses = 0;
  bugTimeoutIds = [];
  gamePaused = false;
  updateBugStats();
  statusEl.textContent = "";
  pauseBtn.disabled = false;
  pauseBtn.textContent = "Pausar";

  bugIntervalId = setInterval(spawnBug, 700);
  spawnBug();
}

function spawnBug() {
  if (gamePaused) return;
  const field = document.getElementById("bug-field");
  const scoreEl = document.getElementById("bug-score");
  if (!field || !scoreEl) return;

  const bug = document.createElement("span");
  bug.className = "bug";
  bug.textContent = "BUG";
  bug.style.left = `${Math.random() * 80 + 5}%`;
  bug.style.top = `${Math.random() * 80 + 5}%`;
  bug.addEventListener("click", () => {
    if (gamePaused) return;
    bugScore += 1;
    updateBugStats();
    bug.remove();
  });
  field.appendChild(bug);
  const timeoutId = setTimeout(() => {
    if (!bug.parentElement || gamePaused) return;
    bug.remove();
    registerBugLoss();
  }, 2800);
  bugTimeoutIds.push(timeoutId);
}

function registerBugLoss() {
  bugLosses += 1;
  updateBugStats();
  if (bugLosses >= MAX_BUG_LOSSES) {
    handleBugGameOver();
  }
}

function handleBugGameOver() {
  const statusEl = document.getElementById("game-status");
  if (statusEl) {
    statusEl.textContent = `Fim de jogo! Voc\u00ea capturou ${bugScore} bugs.`;
  }
  const pauseBtn = document.getElementById("pause-game");
  if (pauseBtn) pauseBtn.disabled = true;
  gamePaused = true;
  stopBugGame();
}

function stopBugGame(clearField = true) {
  if (bugIntervalId) {
    clearInterval(bugIntervalId);
    bugIntervalId = null;
  }
  bugTimeoutIds.forEach((id) => clearTimeout(id));
  bugTimeoutIds = [];
  if (clearField) {
    const field = document.getElementById("bug-field");
    if (field) field.innerHTML = "";
  }
}

function togglePauseGame() {
  const pauseBtn = document.getElementById("pause-game");
  const statusEl = document.getElementById("game-status");
  if (!pauseBtn || pauseBtn.disabled) return;
  gamePaused = !gamePaused;
  if (gamePaused) {
    pauseBtn.textContent = "Retomar";
    statusEl.textContent = "Jogo pausado.";
    stopBugGame(false);
    document
      .getElementById("bug-field")
      ?.querySelectorAll(".bug")
      .forEach((bug) => bug.remove());
  } else {
    statusEl.textContent = "";
    pauseBtn.textContent = "Pausar";
    bugIntervalId = setInterval(spawnBug, 700);
    spawnBug();
  }
}

function updateBugStats() {
  const scoreEl = document.getElementById("bug-score");
  const lossEl = document.getElementById("bug-losses");
  if (scoreEl) scoreEl.textContent = bugScore.toString();
  if (lossEl) lossEl.textContent = bugLosses.toString();
}

function resetBugGameUI() {
  bugScore = 0;
  bugLosses = 0;
  gamePaused = false;
  updateBugStats();
  const statusEl = document.getElementById("game-status");
  const pauseBtn = document.getElementById("pause-game");
  if (statusEl) statusEl.textContent = "";
  if (pauseBtn) {
    pauseBtn.disabled = true;
    pauseBtn.textContent = "Pausar";
  }
  const field = document.getElementById("bug-field");
  if (field) field.innerHTML = "";
}

function setupPrivateModal() {
  const modal = document.getElementById("private-modal");
  if (!modal) return;
  const closeButtons = [
    document.getElementById("close-private"),
    document.getElementById("private-ok"),
  ];

  closeButtons.forEach((btn) => {
    btn?.addEventListener("click", closePrivateModal);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closePrivateModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("active")) {
      closePrivateModal();
    }
  });
}

function openPrivateModal() {
  const modal = document.getElementById("private-modal");
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
}

function closePrivateModal() {
  const modal = document.getElementById("private-modal");
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
}
