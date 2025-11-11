const projectData = [
  {
    id: "strum",
    title: "Strum • Plataforma de jogos digitais",
    description:
      "Sistema inspirado na Steam, com front-end em HTML/CSS/JS e backend em Java + MySQL.",
    preview: "https://placehold.co/600x400/7c3aed/fff?text=Strum",
    repo: "https://github.com/theglopes/projetostrum",
    demo: "projects/strum.html",
    tags: ["HTML", "CSS", "Java", "MySQL"],
  },
  {
    id: "automacao",
    title: "RPA • Automação de Processos e Relatórios",
    description:
      "Desenvolvimento de bots em Python com Selenium e openpyx.",
    preview: "https://placehold.co/600x400/0f172a/fff?text=RPA",
    repo: "https://github.com/guilhermelopes/automacao-inteligente",
    demo: "projects/automacao.html",
    tags: ["Python", "Selenium", "openpyxl"],
  },
  {
    id: "outros",
    title: "Outros experimentos e lab aberto",
    description:
      "Laboratório com atividades da faculdade (muita coisa em Java) e protótipos em HTML, CSS, Node.js e Bootstrap.",
    preview: "https://placehold.co/600x400/232946/fff?text=Lab",
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
  { label: "Aprendizado contínuo", level: 100 },
  { label: "Trabalho em equipe", level: 95 },
  { label: "Solução de problemas", level: 90 },
  { label: "Comunicação", level: 88 },
];

const timelineData = [
  {
    year: "2018",
    title: "ETEC · Primeiras linhas de código",
    body:
      "Iniciei os estudos de programação na ETEC, explorando lógica, Java e projetos acadêmicos que acenderam a curiosidade por produtos digitais.",
  },
  {
    year: "2020",
    title: "Suporte & Helpdesk · Primeiro emprego",
    body:
      "Atuei na linha de frente atendendo usuários, estruturando documentação e entendendo a infraestrutura que sustenta sistemas corporativos.",
  },
  {
    year: "2021",
    title: "Desenvolvimento interno de sistemas",
    body:
      "Passei a participar de aplicações internas, APIs REST e integrações entre equipes, assumindo ownership de features críticas em produção.",
  },
  {
    year: "2024",
    title: "Automação · Webscraping & processos",
    body:
      "Desenvolvi pipelines de webscraping e robots que automatizaram fluxos manuais, reduzindo horas operacionais e garantindo dados atualizados.",
  },
  {
    year: "2024",
    title: "Senior & Coordenação de TI (atual)",
    body:
      "Hoje lidero o time de TI, orquestro roadmap técnico, equilibrando operação, inovação e governança.",
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
});

function setupThemeToggle() {
  const button = document.getElementById("theme-toggle");
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDark) {
    document.body.classList.replace("theme-light", "theme-dark");
    button.textContent = "☀️";
  }

  button.addEventListener("click", () => {
    const lightMode = document.body.classList.toggle("theme-dark");
    if (lightMode) {
      button.textContent = "☀️";
    } else {
      button.textContent = "🌙";
    }
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

  // Trigger animation
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
      Comandos disponíveis:
      - help → mostra esta ajuda
      - show projects → lista projetos principais
      - show skills → tech + soft skills
      - show timeline → principais marcos
      - links → GitHub, LinkedIn e contato
      - clear → limpa o terminal
      - gamer → ativa o mini game (ou use o código secreto)
      - cv → gera o PDF do currículo
    `,
    "show projects": () =>
      projectData
        .map((project) => `• ${project.title} → ${project.repo}`)
        .join("<br/>"),
    "show skills": () =>
      [...techSkills, ...softSkills]
        .map((skill) => `• ${skill.label} (${skill.level}%)`)
        .join("<br/>"),
    "show timeline": () =>
      timelineData
        .map((item) => `${item.year} · ${item.title}`)
        .join("<br/>"),
    links: () =>
      [
        "GitHub → github.com/guilhermelopes",
        "LinkedIn → linkedin.com/in/guilhermelopes",
        "E-mail → hello@guilhermelopes.dev",
      ].join("<br/>"),
    clear: () => {
      output.innerHTML = "";
      return "Terminal limpo.";
    },
    gamer: () => {
      openGamerMode();
      return "Modo gamer pronto. Caçe os bugs!";
    },
    cv: () => "Envie um e-mail para solicitar o currículo em PDF atualizado.",
  };

  const history = [];
  let pointer = -1;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const command = input.value.trim();
    if (!command) return;
    history.unshift(command);
    pointer = -1;

    appendLine(`glopes ➜ ${command}`);
    processCommand(command.toLowerCase());
    input.value = "";
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      pointer = Math.min(pointer + 1, history.length - 1);
      input.value = history[pointer] ?? "";
      setTimeout(() => input.setSelectionRange(input.value.length, input.value.length), 0);
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
      appendLine("Comando disponível: show projects | show skills | show timeline.");
    } else {
      appendLine(`Comando "${command}" não reconhecido. Use help.`);
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
  const username = "theglopes";
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

  try {
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`
    );
    if (!userResponse.ok) throw new Error("user request failed");
    const userData = await userResponse.json();

    if (projectCounter) {
      const projectValue =
        userData.public_repos != null
          ? Math.max(userData.public_repos, defaultStats.projects)
          : defaultStats.projects;
      projectCounter.dataset.counter = projectValue;
      animateCounterElement(projectCounter, projectValue);
    }

    if (sizeCounter && userData.repos_url) {
      try {
        const reposResponse = await fetch(`${userData.repos_url}?per_page=100`);
        if (!reposResponse.ok) throw new Error("repos request failed");
        const repos = await reposResponse.json();
        const totalSize = repos.reduce(
          (sum, repo) => sum + (repo.size || 0),
          0
        );
        const repoSizeKb = Math.max(
          totalSize,
          defaultStats.repoSizeKb,
          (userData.public_repos || 1) * 500
        );
        sizeCounter.dataset.counter = repoSizeKb;
        animateCounterElement(sizeCounter, repoSizeKb);
      } catch {
        sizeCounter.dataset.counter = defaultStats.repoSizeKb;
        animateCounterElement(sizeCounter, defaultStats.repoSizeKb);
      }
    }

    if (commitsCounter) {
      const contributions = await fetchContributionTotal(username);
      if (contributions != null) {
        const commitsValue = Math.max(contributions, defaultStats.commits);
        commitsCounter.dataset.counter = commitsValue;
        animateCounterElement(commitsCounter, commitsValue);
      } else {
        const eventsResponse = await fetch(
          `https://api.github.com/users/${username}/events/public?per_page=100`
        );
        if (eventsResponse.ok) {
          const events = await eventsResponse.json();
          const commitSum = events.reduce((total, event) => {
            if (event.type !== "PushEvent") return total;
            const commits = event.payload?.commits?.length || 0;
            return total + commits;
          }, 0);
          const commitsValue = Math.max(commitSum, defaultStats.commits);
          commitsCounter.dataset.counter = commitsValue;
          animateCounterElement(commitsCounter, commitsValue);
        } else {
          commitsCounter.dataset.counter = defaultStats.commits;
          animateCounterElement(commitsCounter, defaultStats.commits);
        }
      }
    }
  } catch (error) {
    console.warn("Não foi possível sincronizar com o GitHub:", error);
  }
}

async function fetchContributionTotal(username) {
  try {
    const today = new Date().toISOString().split("T")[0];
    const proxy = "https://cors.isomorphic-git.org/";
    const contributionsUrl = `${proxy}https://github.com/users/${username}/contributions?to=${today}`;
    const response = await fetch(contributionsUrl, {
      headers: { "X-Requested-With": "fetch" },
    });
    if (!response.ok) return null;
    const html = await response.text();
    const counts = [...html.matchAll(/data-count="(\d+)"/g)].map((match) =>
      Number(match[1])
    );
    if (!counts.length) return null;
    return counts.reduce((sum, value) => sum + value, 0);
  } catch {
    return null;
  }
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
    if (code.every((key, index) => entered[index]?.toLowerCase() === key.toLowerCase())) {
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
    statusEl.textContent = `Fim de jogo! Você capturou ${bugScore} bugs.`;
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
