// =========================================================
// CÓDIGO FONTE ATUALIZADO (INCLUINDO CARD E MENU DO TICKTICK)
// =========================================================

// CRIACAO DOS CARDS QUE VAO ABRIR EM NOVA ABA DIRETAMENTE
function gerarCards(){
    const cards = document.getElementById("cardsContainer");

    Object.entries(paineis).forEach(([chave, p]) => {
        cards.innerHTML += `
        <div class="card" onclick="abrirPainel('${chave}')">
            <div style="font-size:34px;margin-bottom:10px; color:${p.cor};">
                <i class="bi ${p.icone}"></i>
            </div>
            <strong>${p.titulo}</strong>
        </div>`;

        // Insere o Power BI logo após Contabilidade Unidades
        if (chave === "contabilUnidades") {
            cards.innerHTML += `
            <div class="card" onclick="abrirPowerBi()">
                <div style="margin-bottom:10px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none"/>
                        <rect x="4" y="11" width="3.8" height="9" rx="0.9" fill="#F2C811"/>
                        <rect x="8.6" y="7" width="3.8" height="13" rx="0.9" fill="#F2C811"/>
                        <rect x="13.2" y="3" width="4.6" height="17" rx="0.9" fill="#F2C811"/>
                    </svg>
                </div>
                <strong>Power BI</strong>
            </div>`;
        }
    });

    // Card do Trello
    cards.innerHTML += `
    <div class="card" onclick="abrirTrello()">
        <div style="font-size:34px;margin-bottom:10px; color: #0079bf;">
            <i class="bi bi-trello"></i>
        </div>
        <strong>Trello</strong>
    </div>`;

    // Card do TickTick (NOVO)
    cards.innerHTML += `
    <div class="card" onclick="abrirTickTick()">
        <div style="font-size:34px;margin-bottom:10px; color: #ff6050;">
            <i class="bi bi-check2-square"></i>
        </div>
        <strong>TickTick</strong>
    </div>`;

    // Card do E-docs
    cards.innerHTML += `
    <div class="card" onclick="abrirEdocs()">
        <div style="margin-bottom:10px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 100 100">
                <rect width="100" height="100" fill="#007DC5" rx="4"/>
                <path d="M 15 15 H 60 V 33 H 37 V 41 H 55 V 59 H 37 V 67 H 60 V 85 H 15 Z" fill="#ffffff"/>
                <text x="78" y="28" fill="#ffffff" font-family="Arial, sans-serif" font-weight="900" font-size="18" text-anchor="middle">D</text>
                <text x="78" y="47" fill="#ffffff" font-family="Arial, sans-serif" font-weight="900" font-size="18" text-anchor="middle">O</text>
                <text x="78" y="66" fill="#ffffff" font-family="Arial, sans-serif" font-weight="900" font-size="18" text-anchor="middle">C</text>
                <text x="78" y="85" fill="#ffffff" font-family="Arial, sans-serif" font-weight="900" font-size="18" text-anchor="middle">S</text>
            </svg>
        </div>
        <strong>E-docs</strong>
    </div>`;

    // Card do E-mail Zimbra
    cards.innerHTML += `
    <div class="card" onclick="abrirZimbra()">
        <div style="margin-bottom:10px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="50" fill="#132c73" />
                <text x="50" y="72" text-anchor="middle" font-family="Arial, sans-serif" font-weight="900" font-size="65" fill="#ffffff">Z</text>
            </svg>
        </div>
        <strong>E-mail</strong>
    </div>`;

    // Card do KPIH
    cards.innerHTML += `
    <div class="card" onclick="abrirKPIH()">
        <div style="font-size:34px;margin-bottom:10px; color: #10bf00ce;">
            <i class="bi bi-cash-coin"></i>
        </div>
        <strong>KPIH</strong>
    </div>`;

    // Card do GPI
    cards.innerHTML += `
    <div class="card" onclick="abrirGPI()">
        <div style="font-size:34px;margin-bottom:10px; color: #bfac00ce;">
            <i class="bi bi-calculator-fill"></i>
        </div>
        <strong>GPI</strong>
    </div>`;

    // Card do Efetivo
    cards.innerHTML += `
    <div class="card" onclick="abrirEfetivo()">
        <div style="font-size:34px;margin-bottom:10px; color: #0089bfce;">
            <i class="bi bi-search"></i>
        </div>
        <strong>Efetivo</strong>
    </div>`;

    // Card do DRG
    cards.innerHTML += `
    <div class="card" onclick="abrirDRG()">
        <div style="font-size:34px;margin-bottom:10px; color: #bf6c00ce;">
            <i class="bi bi-award-fill"></i>
        </div>
        <strong>DRG</strong>
    </div>`;

    // Card do Bionexo
    cards.innerHTML += `
    <div class="card" onclick="abrirBionexo()">
        <div style="font-size:34px;margin-bottom:10px; color: #ffffff;">
            <i class="bi bi-cart2"></i>
        </div>
        <strong>Bionexo</strong>
    </div>`;
}

// GERAÇÃO DO MENU LATERAL
function gerarMenu(){
    const menu = document.getElementById("menuContainer");
    let grupoAtual = "";

    menu.innerHTML = '<div class="menu-item" onclick="voltarPortal()"><i class="bi bi-house" style="color: #ece2e2;"></i><span>Home</span></div>';

    Object.entries(paineis).forEach(([chave, p]) => {
        if (p.grupo !== grupoAtual) {
            grupoAtual = p.grupo;
            menu.innerHTML += `<div class="menu-title">${grupoAtual}</div>`;
        }

        menu.innerHTML += `
        <div class="menu-item" onclick="abrirPainel('${chave}')">
            <i class="bi ${p.icone}" style="color: ${p.cor};"></i>
            <span>${p.titulo}</span>
        </div>`;
    });

    menu.innerHTML += `
    <div class="menu-title">Gestão</div>
    <div class="menu-item" onclick="abrirTrello()">
        <i class="bi bi-trello" style="color: #0079bf;"></i><span>Trello</span>   
    </div>

    <div class="menu-item" onclick="abrirTickTick()">
        <i class="bi bi-check2-square" style="color: #ff6050;"></i><span>TickTick</span>    
    </div>

    <div class="menu-item" onclick="abrirEdocs()">
        <i class="bi bi-window-dock" style="color: #bec0c2;"></i><span>E-docs</span>    
    </div>

    <div class="menu-item" onclick="abrirZimbra()">
        <i class="bi bi-envelope-fill" style="color: #132c73;"></i><span>E-mail</span>    
    </div>

    <div class="menu-item" onclick="abrirKPIH()">
        <i class="bi bi-cash-coin" style="color: #10bf00ce;"></i><span>KPIH</span>    
    </div>
   
    <div class="menu-item" onclick="abrirGPI()">
        <i class="bi bi-calculator-fill" style="color: #bfac00ce;"></i><span>GPI</span>    
    </div>

    <div class="menu-item" onclick="abrirEfetivo()">
        <i class="bi bi-search" style="color: #0089bfce;"></i><span>Efetivo</span>    
    </div>

    <div class="menu-item" onclick="abrirDRG()">
        <i class="bi bi-award-fill" style="color: #bf6c00ce;"></i><span>DRG</span>    
    </div>

    <div class="menu-item" onclick="abrirBionexo()">
        <i class="bi bi-cart2" style="color: #ffffff;"></i><span>Bionexo</span>    
    </div>`;
}

// FUNÇÕES DE NAVEGAÇÃO E MODAL
function abrirPainel(chave){ 
    painelSelecionado = paineis[chave]; 
    document.getElementById("tituloPainel").textContent = painelSelecionado.titulo; 
    document.getElementById("modalAbrir").classList.add("show"); 
}

function fecharModal(){ 
    document.getElementById("modalAbrir").classList.remove("show"); 
}

function abrirNoPortal(){ 
    fecharModal(); 
    document.body.classList.add("dashboard-mode"); 
    document.getElementById("home").style.display = "none"; 
    document.getElementById("viewer").style.display = "block"; 
    document.getElementById("painelFrame").src = painelSelecionado.url; 
}

// FUNÇÕES DE ABERTURA DOS LINKS EXTERNOS
function abrirTrello(){ window.open("https://trello.com/u/jorgeteixeiraneto/boards","_blank"); }
function abrirTickTick(){ window.open("https://ticktick.com/","_blank"); }
function abrirEdocs(){ window.open("https://e-docs.es.gov.br/Internal","_blank"); }
function abrirKPIH(){ window.open("https://www.kpih.com.br/acesso/paginaInicial","_blank"); }
function abrirGPI(){ window.open("https://gpi31.cloud.el.com.br/ServerExec/acessoBase/","_blank"); }
function abrirEfetivo(){ window.open("https://acesso.effettivo.com.br/frm_Default.aspx","_blank"); }
function abrirDRG(){ window.open("https://sigclinic.sigquali.com.br/qualidade/inicial.do?evento=cookie#","_blank"); }
function abrirBionexo(){ window.open("https://bioid-shared.bionexo.com/","_blank"); }
function abrirPowerBi(){ window.open("https://app.powerbi.com/home?tenant=81a2f7ea-1d3b-4b96-be63-352033af0afe","_blank"); }
function abrirZimbra(){ window.open("https://saude.correio.es.gov.br/#1","_blank"); }
