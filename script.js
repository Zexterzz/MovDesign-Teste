const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)];
const COL = {
  Corporativo: ["#f37021", "#1e1e1e"],
  Residencial: ["#e9d9c8", "#f37021"],
  Varejo: ["#2d2d2d", "#f37021"],
};
function art(k, i) {
  const [a, b] = COL[k] || COL.Corporativo,
    r = i % 3;
  const shapes = [
    `<rect x="60" y="150" width="280" height="14" fill="${b}"/><rect x="70" y="164" width="12" height="70" fill="${b}"/><rect x="318" y="164" width="12" height="70" fill="${b}"/><rect x="130" y="100" width="90" height="50" fill="${a}" opacity=".9"/>`,
    `<rect x="50" y="60" width="140" height="180" fill="${b}"/><rect x="58" y="68" width="124" height="80" fill="${a}"/><rect x="210" y="130" width="140" height="110" fill="${a}" opacity=".7"/><rect x="210" y="130" width="140" height="10" fill="${b}"/>`,
    `<g fill="${b}"><rect x="40" y="90" width="320" height="8"/><rect x="40" y="150" width="320" height="8"/><rect x="40" y="210" width="320" height="8"/><rect x="40" y="90" width="8" height="128"/><rect x="352" y="90" width="8" height="128"/></g><g fill="${a}"><rect x="70" y="60" width="40" height="30"/><rect x="190" y="120" width="60" height="30"/><rect x="120" y="180" width="50" height="30"/></g>`,
  ];
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice"><defs><pattern id="p${k[0]}${i}" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#8884" stroke-width=".6"/></pattern></defs><rect width="400" height="300" fill="${k === "Varejo" ? "#3a3a3a" : "#f1ece6"}"/><rect width="400" height="300" fill="url(#p${k[0]}${i})"/>${shapes[r]}<text x="16" y="286" font-family="monospace" font-size="10" fill="#888">MOV-${String(i + 1).padStart(3, "0")} · ${k.toUpperCase()}</text></svg>`;
}
const P = [
  [
    "Estação de trabalho 2 e 4 lugares",
    "Corporativo",
    "MDP 18 mm, borda ABS, passagem de cabos",
  ],
  ["Mesa de reunião", "Corporativo", "Tampo até 3,6 m, caixa de tomadas"],
  [
    "Armário alto e baixo",
    "Corporativo",
    "Portas com chave, prateleiras reguláveis",
  ],
  ["Balcão de recepção", "Corporativo", "Frente em painel, tampo duplo"],
  [
    "Cozinha planejada",
    "Residencial",
    "Ferragens com amortecimento, bancadas sob medida",
  ],
  ["Dormitório", "Residencial", "Guarda-roupa com portas de correr ou giro"],
  ["Home office", "Residencial", "Bancada, nichos e gestão de cabos"],
  ["Painel e rack", "Residencial", "Painel ripado e iluminação embutida"],
  ["Expositor de loja", "Varejo", "Modular, desmontável, acabamento a gosto"],
  ["Balcão caixa", "Varejo", "Gaveta, tampo resistente, passagem de cabos"],
  ["Gôndola", "Varejo", "Estrutura reforçada, prateleiras reguláveis"],
  [
    "Display de ponto de venda",
    "Varejo",
    "Peça leve para campanhas e lançamentos",
  ],
];
const C = [
  [
    "Escritório de contabilidade",
    "Corporativo",
    "Equipe de 40 pessoas em 280 m²",
    "Estações compactas com divisórias baixas e armários na altura da circulação, tudo fabricado em um lote só.",
  ],
  [
    "Rede de farmácias",
    "Varejo",
    "Padronizar lojas de tamanhos diferentes",
    "Gôndolas e balcões modulares que se encaixam em qualquer planta.",
  ],
  [
    "Apartamento na Zona Norte",
    "Residencial",
    "Cozinha e sala integradas em 62 m²",
    "Marcenaria contínua com painel, bancada e armários até o teto.",
  ],
  [
    "Sala de reunião de diretoria",
    "Corporativo",
    "Mesa para 14 lugares sem pés no meio",
    "Tampo único com estrutura reforçada e tomadas no tampo.",
  ],
  [
    "Loja de calçados",
    "Varejo",
    "Expor mais sem poluir o visual",
    "Expositores em degraus com iluminação embutida.",
  ],
  [
    "Home office de casal",
    "Residencial",
    "Dois postos em um quarto pequeno",
    "Bancada dupla em L com nichos e fiação escondida.",
  ],
];
const L = [
  [
    "Corporativo",
    "Estações de trabalho, mesas de reunião, armários e recepções para empresas.",
  ],
  [
    "Residencial",
    "Cozinhas, dormitórios, home office e painéis feitos para a medida da casa.",
  ],
  [
    "Varejo",
    "Expositores, balcões caixa, gôndolas e displays para a loja funcionar melhor.",
  ],
];
// páginas
let cur = "home";
function go(p, cat) {
  if (!$("#" + p)) return;
  $$(".pg").forEach((e) => e.classList.remove("on"));
  $("#" + p).classList.add("on");
  cur = p;
  $$(".links a").forEach((a) => a.classList.toggle("on", a.dataset.go === p));
  $("#lk").classList.remove("o");
  window.scrollTo(0, 0);
  if (cat) filt(cat);
  setTimeout(rv, 50);
}
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-go]");
  if (t) {
    e.preventDefault();
    go(t.dataset.go);
  }
});
$("#mb").onclick = () => $("#lk").classList.toggle("o");
// render
$("#mq").innerHTML = Array(8)
  .fill(
    '<span>Corporativo</span><span style="opacity:.5">✦</span><span>Residencial sob medida</span><span style="opacity:.5">✦</span><span>Varejo</span><span style="opacity:.5">✦</span>',
  )
  .join("");
$("#tilt").innerHTML = art("Corporativo", 0);
$("#lines").innerHTML = L.map(
  (l, i) =>
    `<div class="card ln rv"><div class="ph">${art(l[0], i)}</div><div class="bd"><span class="tag">0${i + 1}</span><h3>${l[0]}</h3><p>${l[1]}</p><button class="btn" style="margin-top:18px;padding:11px 18px" onclick="go('produtos','${l[0]}')">Ver produtos →</button></div></div>`,
).join("");
$$("[data-art]").forEach(
  (e) => (e.innerHTML = art("Corporativo", +e.dataset.art)),
);
const pc = (p, i) =>
  `<div class="card rv"><div class="ph">${art(p[1], i)}</div><div class="bd"><span class="tag">${p[1]}</span><h3>${p[0]}</h3><p>${p[2]}</p><div class="sp">Fabricação própria · 6 anos de garantia</div><button class="btn" style="margin-top:14px;padding:11px 18px" onclick="orc('${p[0]}','${p[1]}')">Solicitar Orçamento</button></div></div>`;
const cc = (c, i) =>
  `<div class="card rv" style="cursor:pointer" onclick="mod(${i})"><div class="ph">${art(c[1], i + 4)}</div><div class="bd"><span class="tag">${c[1]}</span><h3>${c[0]}</h3><p>${c[2]}</p></div></div>`;
const fb = (id, fn, cats) => {
  $(id).innerHTML = ["Todos", ...cats]
    .map(
      (c) =>
        `<button class="${c === "Todos" ? "on" : ""}" data-c="${c}">${c}</button>`,
    )
    .join("");
  $(id).onclick = (e) => {
    if (e.target.dataset.c) fn(e.target.dataset.c);
  };
};
const cats = ["Corporativo", "Residencial", "Varejo"];
function filt(c) {
  $$("#pf button").forEach((b) => b.classList.toggle("on", b.dataset.c === c));
  $("#pg").innerHTML = P.map((p, i) => [p, i])
    .filter((x) => c === "Todos" || x[0][1] === c)
    .map((x) => pc(...x))
    .join("");
  rv();
}
function cfilt(c) {
  $$("#cf button").forEach((b) => b.classList.toggle("on", b.dataset.c === c));
  $("#cg").innerHTML = C.map((p, i) => [p, i])
    .filter((x) => c === "Todos" || x[0][1] === c)
    .map((x) => cc(...x))
    .join("");
  rv();
}
fb("#pf", filt, cats);
fb("#cf", cfilt, cats);
filt("Todos");
cfilt("Todos");
function orc(n, c) {
  go("contato");
  $("#seg").value = c;
  $("#msg").value = "Olá! Gostaria de um orçamento para: " + n + ".";
}
function mod(i) {
  const c = C[i];
  $("#mx").innerHTML =
    `<div class="ph">${art(c[1], i + 4)}</div><div class="bd"><span class="tag">${c[1]}</span><h3 class="lg" style="font-size:34px;margin:8px 0 18px">${c[0]}</h3><b>Desafio</b><p class="mut" style="margin-bottom:14px">${c[2]}</p><b>Solução Mov Design</b><p class="mut">${c[3]}</p><button class="btn" style="margin-top:22px" onclick="$('#md').classList.remove('on');go('contato')">Quero algo assim</button></div>`;
  $("#md").classList.add("on");
}
$("#md").onclick = (e) => {
  if (e.target.id === "md") e.target.classList.remove("on");
};
$("#sf").onsubmit = (e) => {
  e.preventDefault();
  const q = $("#q").value.trim().toLowerCase();
  if (!q) return;
  const rp = P.filter((p) => (p[0] + p[1] + p[2]).toLowerCase().includes(q)),
    rc = C.filter((c) => c.join(" ").toLowerCase().includes(q));
  go("busca");
  $("#bt").innerHTML =
    `${rp.length + rc.length} resultado(s) para <em>“${q.replace(/</g, "")}”</em>`;
  $("#bg").innerHTML =
    rp.map((p) => pc(p, P.indexOf(p))).join("") +
      rc.map((c) => cc(c, C.indexOf(c))).join("") ||
    '<p class="mut">Nada encontrado. Tente “cozinha”, “balcão” ou “mesa”.</p>';
  rv();
};
$("#ct").onsubmit = (e) => {
  e.preventDefault();
  const o = $("#ok");
  o.style.display = "block";
  o.innerHTML =
    "<b>Recebido.</b> Nossa equipe retorna em horário comercial (seg a sex, até às 17h).";
  e.target.reset();
};
// efeitos
function rv() {
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((x) => {
        if (x.isIntersecting) {
          x.target.classList.add("v");
          io.unobserve(x.target);
          if (x.target.querySelector && x.target.querySelector("[data-c]"))
            cnt(x.target);
        }
      }),
    { threshold: 0.15 },
  );
  $$(".pg.on .rv").forEach((e) => io.observe(e));
}
function cnt(box) {
  box.querySelectorAll("[data-c]").forEach((el) => {
    const t = +el.dataset.c,
      s = el.dataset.s || "",
      t0 = performance.now();
    (function f(n) {
      const k = Math.min(1, (n - t0) / 1600),
        v = Math.round(t * (1 - Math.pow(1 - k, 3)));
      el.textContent = v + s;
      if (k < 1) requestAnimationFrame(f);
    })(t0);
  });
}
addEventListener(
  "scroll",
  () => {
    $("#nav").classList.toggle("s", scrollY > 20);
    const h = document.documentElement;
    $("#bar").style.width =
      (scrollY / (h.scrollHeight - innerHeight)) * 100 + "%";
  },
  { passive: true },
);
addEventListener("mousemove", (e) => {
  const g = $("#glow");
  g.style.left = e.clientX + "px";
  g.style.top = e.clientY + "px";
});
const th = $("#tilt");
th.parentElement.addEventListener("mousemove", (e) => {
  const r = th.getBoundingClientRect(),
    x = (e.clientX - r.left) / r.width - 0.5,
    y = (e.clientY - r.top) / r.height - 0.5;
  th.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
});
th.parentElement.addEventListener(
  "mouseleave",
  () => (th.style.transform = ""),
);
go("home");
