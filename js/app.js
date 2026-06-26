
// ===============================
// PORTAL BI FUNDAÇÃO INOVA - V2
// ===============================

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

    menu.innerHTML='<div class="menu-item" onclick="voltarPortal()"><i class="bi bi-house" style="color: #666;"></i><span>Home</span></div>';

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
        <i class="bi bi-kanban" style="color: #0079bf;"></i><span>Trello  
    </div>
        
        <i class="bi bi-kanban" style="color: #0079bf;"></i><span>Trello</span>    
    </div>`;
        }


    




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
            <i class="bi bi-kanban"></i>
        </div>
        <strong>Trello</strong>
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
