# Portfolio Interativo — Guilherme Lopes

Site pessoal em HTML, CSS e JavaScript puro com foco em microinterações, terminal falso, painel dinâmico e easter eggs (Konami code + mini game). Ideal para deploy no GitHub Pages ou Vercel.

## Estrutura

```
portfolio-interativo/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── fotos/
│   └── ícones/
├── projects/
│   ├── strum.html
│   ├── automacao.html
│   └── outros.html
└── README.md
```

## Highlights

- Hero responsivo com CTA e status card.
- Painel com contadores animados.
- Terminal interativo (comandos `help`, `show projects`, `links`, `cv` etc.).
- Cards flipáveis que puxam dados de um array JSON-like.
- Mapa de skills (tech + soft) com barras animadas.
- Timeline animada da trajetória.
- Botão que gera currículo em PDF simples via JavaScript.
- Modo gamer (Konami code ↑↑↓↓←→←→BA) que libera mini game de caça-bugs.

## Scripts e interações

- Tema claro/escuro com detecção de preferência do sistema.
- Dados de projetos, skills e timeline centralizados em `script.js`.
- Terminal falso com histórico e atalhos de teclado.
- Mini game cria spans “BUG” randômicos para o usuário clicar e contabilizar pontos.

## Deploy rápido

1. Faça fork/clonagem do repositório `portfolio-guilhermelopes`.
2. Habilite GitHub Pages (branch `main`, pasta raiz) ou deploy na Vercel.
3. Opcional: adicione automação de build com GitHub Actions para rodar linters/tests antes do deploy.

## Personalização

- Atualize `projectData`, `techSkills`, `softSkills` e `timelineData` em `script.js`.
- Troque previews adicionando imagens em `assets/fotos/` e atualizando os caminhos.
- Ajuste cores/tipografia em `style.css` (`:root` e `.theme-dark`).
- Substitua links de contato na seção `#contato` do `index.html`.

## Futuras melhorias

- Integrar API do GitHub para listar repositórios recentes.
- Adicionar backend (Formspree/Express) para formulário de contato.
- Usar Three.js ou Framer Motion para animações 3D e transições avançadas.
