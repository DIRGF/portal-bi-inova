/* =====================================================================
   PORTAL DE APLICATIVOS - FUNDAÇÃO INOVA (V5)
   Os dados dos aplicativos ficam em js/config.js — este arquivo só lê
   e exibe. Para adicionar/remover apps, edite config.js.

   MODELO DE NAVEGAÇÃO:
   - Home: cards grandes + barra de favoritos + busca. Sem sidebar.
   - Ao abrir qualquer app: aparece uma sidebar REDUZIDA (só ícones) com
     o item selecionado destacado, e o conteúdo carrega no frame central,
     com botões "Nova aba" e "Fechar" (não existe mais escolha de modo).
   - Apps do tipo "link" (sistemas externos que bloqueiam ser exibidos
     dentro de um iframe por política de segurança do próprio site) abrem
     automaticamente em nova aba E mostram uma tela no frame central
     explicando isso, com destaque mantido na sidebar.
   ===================================================================== */

(function () {
    "use strict";

    const LS_FAVORITOS = "portalInova_favoritos";
    const LS_TEMA = "portalInova_tema";
    const TIMEOUT_IFRAME_MS = 12000;

    let appSelecionado = null;
    let termoBusca = "";

    // ------------------------------------------------------------
    // Armazenamento local
    // ------------------------------------------------------------
    function carregarLista(chave) {
        try {
            const dados = JSON.parse(localStorage.getItem(chave));
            return Array.isArray(dados) ? dados : [];
        } catch (e) {
            return [];
        }
    }

    function salvarLista(chave, lista) {
        try {
            localStorage.setItem(chave, JSON.stringify(lista));
        } catch (e) {
            console.warn("Não foi possível salvar preferências localmente:", e);
        }
    }

    function carregarTexto(chave) {
        try {
            const dados = JSON.parse(localStorage.getItem(chave));
            return Array.isArray(dados) ? dados[0] : null;
        } catch (e) {
            return null;
        }
    }

    function salvarTexto(chave, valor) {
        salvarLista(chave, [valor]);
    }

    function getApp(id) {
        return PORTAL_CONFIG.apps.find((a) => a.id === id) || null;
    }

    function iconeHtml(app, tamanho) {
        const tam = tamanho || 22;
        if (app.icone && app.icone.startsWith("bi-")) {
            return `<i class="bi ${app.icone}" style="font-size:${tam}px;color:${app.cor}"></i>`;
        }
        return `<img src="${app.icone}" alt="" class="icone-app-img" style="width:${tam}px;height:${tam}px;">`;
    }

    function escapeHtml(texto) {
        const div = document.createElement("div");
        div.textContent = texto;
        return div.innerHTML;
    }

    // ------------------------------------------------------------
    // Inicialização
    // ------------------------------------------------------------
    document.addEventListener("DOMContentLoaded", () => {
        aplicarTemaSalvo();
        document.getElementById("headerTitulo").textContent = PORTAL_CONFIG.tituloPortal;
        renderizarMenuReduzido();
        renderizarHome();
        configurarBusca();
        configurarAtalhosTeclado();
        document.getElementById("versaoRodape").textContent =
            "Portal INOVA · atualizado em " + new Date().toLocaleDateString("pt-BR");
    });

    // ------------------------------------------------------------
    // SIDEBAR REDUZIDA (só ícones) — aparece apenas no modo Visualização
    // ------------------------------------------------------------
    function renderizarMenuReduzido() {
        const menu = document.getElementById("menuReduzidoContainer");

        let html = `
        <div class="menu-reduzido-item" data-id="__home" onclick="Portal.voltarPortal()"
             tabindex="0" role="button" title="Início" aria-label="Início">
            <i class="bi bi-house"></i>
        </div>
        <div class="menu-reduzido-separador"></div>`;

        PORTAL_CONFIG.apps.forEach((app) => {
            html += `
            <div class="menu-reduzido-item" data-id="${app.id}" onclick="Portal.abrirApp('${app.id}')"
                 tabindex="0" role="button" title="${app.titulo}" aria-label="${app.titulo}">
                ${iconeHtml(app, 20)}
            </div>`;
        });

        menu.innerHTML = html;
    }

    function destacarItemMenu(id) {
        document.querySelectorAll(".menu-reduzido-item").forEach((el) => {
            el.classList.toggle("ativo", el.dataset.id === id);
        });
    }

    // ------------------------------------------------------------
    // HOME: favoritos + grade de cards (com busca)
    // ------------------------------------------------------------
    function renderizarHome() {
        renderizarFavoritos();
        renderizarCards();
    }

    function renderizarFavoritos() {
        const favoritos = carregarLista(LS_FAVORITOS);
        const wrapper = document.getElementById("favoritosWrapper");
        const bar = document.getElementById("favoritosBar");

        const appsFavoritos = favoritos.map(getApp).filter(Boolean);

        if (appsFavoritos.length === 0) {
            wrapper.style.display = "none";
            bar.innerHTML = "";
            return;
        }

        wrapper.style.display = "block";
        bar.innerHTML = appsFavoritos.map((app) => `
            <div class="favorito-chip" onclick="Portal.abrirApp('${app.id}')" tabindex="0" role="button" aria-label="Abrir ${app.titulo}">
                ${iconeHtml(app, 20)}
                <span>${app.titulo}</span>
            </div>
        `).join("");
    }

    function renderizarCards() {
        const container = document.getElementById("cardsContainer");
        const favoritos = carregarLista(LS_FAVORITOS);
        const filtro = termoBusca.trim().toLowerCase();

        const filtrados = PORTAL_CONFIG.apps.filter((app) =>
            !filtro ||
            app.titulo.toLowerCase().includes(filtro) ||
            app.grupo.toLowerCase().includes(filtro)
        );

        if (filtrados.length === 0) {
            container.innerHTML = `<p class="sem-resultados">Nenhum aplicativo encontrado para "<strong>${escapeHtml(termoBusca)}</strong>".</p>`;
            return;
        }

        container.innerHTML = filtrados.map((app) => cardHtml(app, favoritos)).join("");
    }

    function cardHtml(app, favoritos) {
        const ehFavorito = favoritos.includes(app.id);
        return `
        <div class="card" tabindex="0" role="button" aria-label="Abrir ${app.titulo}"
             onclick="Portal.abrirApp('${app.id}')"
             onkeydown="if(event.key==='Enter')Portal.abrirApp('${app.id}')">
            <button class="btn-favorito ${ehFavorito ? "ativo" : ""}"
                    title="${ehFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}"
                    aria-label="${ehFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}"
                    onclick="event.stopPropagation();Portal.alternarFavorito('${app.id}')">
                <i class="bi ${ehFavorito ? "bi-star-fill" : "bi-star"}"></i>
            </button>
            <div class="card-icone">${iconeHtml(app, 36)}</div>
            <strong>${app.titulo}</strong>
            <span class="card-grupo">${app.grupo}</span>
        </div>`;
    }

    function alternarFavorito(id) {
        let favoritos = carregarLista(LS_FAVORITOS);
        if (favoritos.includes(id)) {
            favoritos = favoritos.filter((f) => f !== id);
        } else {
            favoritos.push(id);
        }
        salvarLista(LS_FAVORITOS, favoritos);
        renderizarHome();
    }

    // ------------------------------------------------------------
    // BUSCA (filtra a grade de cards na Home)
    // ------------------------------------------------------------
    function configurarBusca() {
        const input = document.getElementById("campoBusca");
        input.addEventListener("input", (e) => {
            termoBusca = e.target.value;
            renderizarCards();
        });
    }

    // ------------------------------------------------------------
    // ABERTURA DE APLICATIVOS — sempre no frame central, sem modal
    // ------------------------------------------------------------
    function abrirApp(id) {
        const app = getApp(id);
        if (!app) return;

        appSelecionado = app;

        // Entra no modo Visualização: sidebar reduzida aparece, Home some.
        document.body.classList.add("modo-visualizacao");
        document.getElementById("home").style.display = "none";
        document.getElementById("viewer").style.display = "flex";
        document.getElementById("viewerTitulo").textContent = app.titulo;
        destacarItemMenu(app.id);

        esconderTelasDoFrame();

        if (app.tipo === "link") {
            // Sistemas externos que bloqueiam exibição em iframe (política do
            // próprio site) abrem direto em nova aba; o frame central mostra
            // um aviso explicando isso, mantendo o item destacado na sidebar.
            window.open(app.url, "_blank", "noopener,noreferrer");
            mostrarPlaceholderLink(app);
            return;
        }

        carregarIframe(app);
    }

    function esconderTelasDoFrame() {
        document.getElementById("iframeStatus").classList.remove("show");
        document.getElementById("iframeErro").classList.remove("show");
        document.getElementById("linkPlaceholder").classList.remove("show");
        document.getElementById("painelFrame").style.display = "none";
        document.getElementById("painelFrame").src = "";
    }

    function carregarIframe(app) {
        const frame = document.getElementById("painelFrame");
        frame.style.display = "block";
        mostrarCarregandoIframe(true);
        frame.src = app.url;

        let carregou = false;
        const timeout = setTimeout(() => {
            if (!carregou) mostrarErroIframe();
        }, TIMEOUT_IFRAME_MS);

        frame.onload = () => {
            carregou = true;
            clearTimeout(timeout);
            mostrarCarregandoIframe(false);
        };
    }

    function mostrarCarregandoIframe(mostrar) {
        const status = document.getElementById("iframeStatus");
        status.classList.toggle("show", mostrar);
        if (mostrar) {
            status.innerHTML = `<div class="spinner"></div><p>Carregando painel...</p>`;
        }
    }

    function mostrarErroIframe() {
        document.getElementById("iframeStatus").classList.remove("show");
        const erro = document.getElementById("iframeErro");
        erro.classList.add("show");
        erro.innerHTML = `
            <i class="bi bi-exclamation-triangle-fill"></i>
            <p>O painel está demorando para carregar.</p>
            <button class="btn-modal btn-novaaba" onclick="Portal.abrirEmNovaAba()">
                Abrir em nova aba
            </button>`;
    }

    function mostrarPlaceholderLink(app) {
        const box = document.getElementById("linkPlaceholder");
        box.classList.add("show");
        box.innerHTML = `
            <i class="bi bi-box-arrow-up-right"></i>
            <p><strong>${app.titulo}</strong> foi aberto em uma nova aba.<br>
            Este sistema não permite ser exibido dentro do portal (restrição de segurança do próprio site).</p>
            <button class="btn-modal btn-novaaba" onclick="Portal.abrirEmNovaAba()">
                Abrir novamente em nova aba
            </button>`;
    }

    function abrirEmNovaAba() {
        if (appSelecionado) window.open(appSelecionado.url, "_blank", "noopener,noreferrer");
    }

    function voltarPortal() {
        document.body.classList.remove("modo-visualizacao");
        document.getElementById("viewer").style.display = "none";
        document.getElementById("home").style.display = "block";
        esconderTelasDoFrame();
        destacarItemMenu(null);
        renderizarHome();
    }

    // ------------------------------------------------------------
    // TEMA CLARO / ESCURO
    // ------------------------------------------------------------
    function alternarTema() {
        const escuro = document.body.classList.toggle("tema-escuro");
        salvarTexto(LS_TEMA, escuro ? "escuro" : "claro");
        atualizarIconeTema();
    }

    function aplicarTemaSalvo() {
        if (carregarTexto(LS_TEMA) === "escuro") document.body.classList.add("tema-escuro");
        atualizarIconeTema();
    }

    function atualizarIconeTema() {
        const icone = document.getElementById("iconeTema");
        if (!icone) return;
        icone.className = document.body.classList.contains("tema-escuro")
            ? "bi bi-sun-fill"
            : "bi bi-moon-fill";
    }

    // ------------------------------------------------------------
    // LOGOUT
    // ------------------------------------------------------------
    function logout() {
        if (confirm("Deseja fechar o portal?")) {
            window.location.href = PORTAL_CONFIG.urlLogout;
        }
    }

    // ------------------------------------------------------------
    // ATALHOS DE TECLADO — ESC fecha o painel aberto e volta pra Home
    // ------------------------------------------------------------
    function configurarAtalhosTeclado() {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && document.body.classList.contains("modo-visualizacao")) {
                voltarPortal();
            }
        });
    }

    // ------------------------------------------------------------
    // API pública (usada pelos atributos onclick do HTML)
    // ------------------------------------------------------------
    window.Portal = {
        abrirApp,
        abrirEmNovaAba,
        voltarPortal,
        alternarFavorito,
        alternarTema,
        logout
    };
})();
