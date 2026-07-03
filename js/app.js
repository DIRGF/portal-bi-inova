
// ===============================
// PORTAL BI FUNDAÇÃO INOVA - V2
// ===============================





// CRIAÇÃO DOS PAINÉIS - CARDS

const paineis = {

    contabilCorporativo:{
        grupo:"Contabilidade",
        titulo:"Contabilidade Corporativo",
        icone:"bi-bar-chart-fill",
        cor: "#3498db",
        url:"https://app.powerbi.com/view?r=eyJrIjoiNDA4NDlhMTgtNDYwYy00ZWI5LTk3ZTctNTI2NWM3YzUyZGVhIiwidCI6IjgxYTJmN2VhLTFkM2ItNGI5Ni1iZTYzLTM1MjAzM2FmMGFmZSJ9"
    },

    contabilUnidades:{
        grupo:"Contabilidade",
        titulo:"Contabilidade Unidades",
        icone:"bi-hospital",
        cor: "#3498db",
        url:"https://app.powerbi.com/view?r=eyJrIjoiNDljNDkyM2YtMTk0OC00NzM3LWJlNTYtODhlZjc2Y2IyOTYxIiwidCI6IjgxYTJmN2VhLTFkM2ItNGI5Ni1iZTYzLTM1MjAzM2FmMGFmZSJ9"
    },

    contratos:{
        grupo:"Compras e Contratos",
        titulo:"Contratos",
        icone:"bi-file-earmark-text",
        cor: "#e67e22",
        url:"https://app.powerbi.com/view?r=eyJrIjoiM2M3ODQzMjMtZWNmMi00YjYxLWE0ZDEtYjgzMzcwZjRhZTYzIiwidCI6IjgxYTJmN2VhLTFkM2ItNGI5Ni1iZTYzLTM1MjAzM2FmMGFmZSJ9"
    },

    processosEdocs:{
        grupo:"Compras e Contratos",
        titulo:"Processos E-Docs",
        icone:"bi-folder2-open",
        cor: "#e67e22",
        url:"https://app.powerbi.com/view?r=eyJrIjoiMGIwYjdhMzQtM2NmMy00M2QyLTkzMGYtZTY0NGI5MmEzNzBmIiwidCI6ImFlNjRlNjk2LTcyOWUtNDdjYi04OWZlLTcxYTYxYzE4ZGJhNyIsImMiOjF9"
    },

    valoresServicos:{
        grupo:"Assistencial",
        titulo:"Valores de Serviços e Exames",
        icone:"bi-cash-stack",
        cor: "#2ecc71",
        url:"https://app.powerbi.com/view?r=eyJrIjoiYjJkYTJhYjItODY1ZC00ODRkLWE4MWYtODBlMjBmOWRjNWNlIiwidCI6IjM1YWFmNDRiLWQ2Y2EtNGU1OC1hMmRhLTg5ODZkYzgxZTMzNCJ9"
    },

    indicadoresHospitalares:{
        grupo:"Assistencial",
        titulo:"Indicadores Hospitalares",
        icone:"bi-graph-up-arrow",
        cor: "#9b59b6",
        url:"https://app.powerbi.com/view?r=eyJrIjoiZTYxNzdlMmUtMjYzNC00NDI3LWIzMzAtZjEwYzFjOGViYTUxIiwidCI6IjM1YWFmNDRiLWQ2Y2EtNGU1OC1hMmRhLTg5ODZkYzgxZTMzNCJ9"
    }

};

let painelSelecionado=null;

document.addEventListener("DOMContentLoaded",()=>{
    gerarMenu();
    gerarCards();
});



function gerarMenu(){

    const menu=document.getElementById("menuContainer");
    let grupoAtual="";

    menu.innerHTML='<div class="menu-item" onclick="voltarPortal()"><i class="bi bi-house" style="color: #ece2e2;"></i><span>Home</span></div>';

    Object.entries(paineis).forEach(([chave,p])=>{

        if(p.grupo!==grupoAtual){
            grupoAtual=p.grupo;
            menu.innerHTML+=`<div class="menu-title">${grupoAtual}</div>`;
        }

        menu.innerHTML+=`
        <div class="menu-item" onclick="abrirPainel('${chave}')">
            <i class="bi ${p.icone}" style="color: ${p.cor};"></i>
            <span>${p.titulo}</span>
        </div>`;
    });

    menu.innerHTML+=`
    <div class="menu-title">Gestão</div>
    <div class="menu-item" onclick="abrirTrello()">
        <i class="bi bi-trello" style="color: #0079bf;"></i><span>Trello</span>   
    </div>
         <div class="menu-item" onclick="abrirEdocs()">
        <i class="bi bi-window-dock" style="color: #bec0c2;"></i><span>E-docs</span>    
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
    </div>`;
        
}

// CRIACAO DOS CARDS QUE VAO ABRIR EM NOVA ABA DIRETAMENTE

        function gerarCards(){

    const cards=document.getElementById("cardsContainer");

    Object.entries(paineis).forEach(([chave,p])=>{

        cards.innerHTML+=`
        <div class="card" onclick="abrirPainel('${chave}')">
            <div style="font-size:34px;margin-bottom:10px; color: ${p.cor};">
                <i class="bi ${p.icone}"></i>
            </div>
            <strong>${p.titulo}</strong>
        </div>`;
    });

    cards.innerHTML+=`
    <div class="card" onclick="abrirTrello()">
        <div style="font-size:34px;margin-bottom:10px; color: #0079bf;">
            <i class="bi bi-trello"></i>
        </div>
        <strong>Trello</strong>
    </div>`;


 cards.innerHTML+=`
    <div class="card" onclick="abrirEdocs()">
        <div style="margin-bottom:10px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 100 100">
                <!-- Fundo azul com cantos levemente arredondados -->
                <rect width="100" height="100" fill="#007DC5" rx="4"/>
                
                <!-- Letra E robusta -->
                <path d="M 15 15 H 60 V 33 H 37 V 41 H 55 V 59 H 37 V 67 H 60 V 85 H 15 Z" fill="#ffffff"/>
                
                <!-- Letras DOCS maiúsculas, em negrito e empilhadas -->
                <text x="78" y="28" fill="#ffffff" font-family="Arial, sans-serif" font-weight="900" font-size="18" text-anchor="middle">D</text>
                <text x="78" y="47" fill="#ffffff" font-family="Arial, sans-serif" font-weight="900" font-size="18" text-anchor="middle">O</text>
                <text x="78" y="66" fill="#ffffff" font-family="Arial, sans-serif" font-weight="900" font-size="18" text-anchor="middle">C</text>
                <text x="78" y="85" fill="#ffffff" font-family="Arial, sans-serif" font-weight="900" font-size="18" text-anchor="middle">S</text>
            </svg>
        </div>
        <strong>E-docs</strong>
    </div>`;


 cards.innerHTML+=`
    <div class="card" onclick="abrirKPIH()">
        <div style="font-size:34px;margin-bottom:10px; color: #0079bf;">
           <i class="bi bi-cash-coin"></i>
        </div>
        <strong>KPIH</strong>
    </div>`;

cards.innerHTML+=`
    <div class="card" onclick="abrirGPI()">
        <div style="margin-bottom:10px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 100 100">
                <!-- Fundo cinza escuro/azulado imitando a imagem -->
                <!--<rect width="100" height="100" fill="#333e4f" rx="6"/> -->
                
                <defs>
                    <!-- Gradiente Vermelho/Laranja (Topo Direita) -->
                    <linearGradient id="gradRed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#ee6b5e"/>
                        <stop offset="100%" stop-color="#df6746"/>
                    </linearGradient>
                    
                    <!-- Gradiente Amarelo (Base Direita) -->
                    <linearGradient id="gradYel" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#f8c055"/>
                        <stop offset="100%" stop-color="#d99738"/>
                    </linearGradient>
                    
                    <!-- Gradiente Verde (Base Central) -->
                    <linearGradient id="gradGrn" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#b6da67"/>
                        <stop offset="100%" stop-color="#7cb551"/>
                    </linearGradient>
                    
                    <!-- Gradiente Azul (Base Esquerda) -->
                    <linearGradient id="gradBlu" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#7eabdf"/>
                        <stop offset="100%" stop-color="#517cb4"/>
                    </linearGradient>
                    
                    <!-- Gradiente Roxo (Topo Esquerda) -->
                    <linearGradient id="gradPurp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#ba86c2"/>
                        <stop offset="100%" stop-color="#835d94"/>
                    </linearGradient>

                    <!-- Molde único da "Pessoa" que será repetido e rotacionado -->
                    <g id="pessoa">
                        <circle cx="50" cy="13" r="6.5"/>
                        <path d="M 30 21
                                 Q 50 30 70 21
                                 A 6 6 0 0 0 64 29
                                 Q 50 42 36 29
                                 A 6 6 0 0 0 30 21 Z"/>
                    </g>
                </defs>

                <!-- Inserção das 5 pessoas com suas respectivas cores e rotações (72 graus de diferença) -->
                <use href="#pessoa" fill="url(#gradRed)" transform="rotate(36 50 50)"/>
                <use href="#pessoa" fill="url(#gradYel)" transform="rotate(108 50 50)"/>
                <use href="#pessoa" fill="url(#gradGrn)" transform="rotate(180 50 50)"/>
                <use href="#pessoa" fill="url(#gradBlu)" transform="rotate(252 50 50)"/>
                <use href="#pessoa" fill="url(#gradPurp)" transform="rotate(324 50 50)"/>
            </svg>
        </div>
        <strong>GPI</strong>
    </div>`;





            

     cards.innerHTML+=`
    <div class="card" onclick="abrirEfetivo()">
        <div style="font-size:34px;margin-bottom:10px; color: #0079bf;">
            <i class="bi bi-search"></i>
        </div>
        <strong>Efetivo</strong>
    </div>`;

 cards.innerHTML+=`
    <div class="card" onclick="abrirDRG()">
        <div style="font-size:34px;margin-bottom:10px; color: #0079bf;">
           <i class="bi bi-award-fill"></i>
        </div>
        <strong>DRG</strong>
    </div>`;

}

function abrirPainel(chave){
    painelSelecionado=paineis[chave];
    document.getElementById("tituloPainel").textContent=painelSelecionado.titulo;
    document.getElementById("modalAbrir").classList.add("show");
}

function fecharModal(){
    document.getElementById("modalAbrir").classList.remove("show");
}

function abrirNoPortal(){
    fecharModal();
    document.body.classList.add("dashboard-mode");
    document.getElementById("home").style.display="none";
    document.getElementById("viewer").style.display="block";
    document.getElementById("painelFrame").src=painelSelecionado.url;
}

function abrirNovaAba(){
    fecharModal();
    window.open(painelSelecionado.url,"_blank");
}

function voltarPortal(){
    document.body.classList.remove("dashboard-mode");
    document.getElementById("viewer").style.display="none";
    document.getElementById("home").style.display="block";
    document.getElementById("painelFrame").src="";
}

function toggleMenu(){
    document.querySelector(".sidebar").classList.toggle("collapsed");
}

function logout(){
    if(confirm("Deseja fechar o portal?")){
        window.location.href="https://www.inovacapixaba.es.gov.br";
    }
}

function abrirTrello(){
    window.open("https://trello.com/u/jorgeteixeiraneto/boards","_blank");
}

function abrirEdocs(){
    window.open("https://e-docs.es.gov.br/Internal","_blank");
}

function abrirKPIH(){
    window.open("https://www.kpih.com.br/acesso/paginaInicial","_blank");
}

function abrirGPI(){
    window.open("https://gpi31.cloud.el.com.br/ServerExec/acessoBase/","_blank");
}

function abrirEfetivo(){
    window.open("https://acesso.effettivo.com.br/frm_Default.aspx","_blank");
}

function abrirDRG(){
    window.open("https://sigclinic.sigquali.com.br/qualidade/inicial.do?evento=cookie#","_blank");
}




