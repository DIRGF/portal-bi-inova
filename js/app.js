// =========================
// PAINÉIS
// =========================

const paineis = {

    contratos: {
        titulo: "Contratos",
        url: "https://app.powerbi.com/view?r=eyJrIjoiM2M3ODQzMjMtZWNmMi00YjYxLWE0ZDEtYjgzMzcwZjRhZTYzIiwidCI6IjgxYTJmN2VhLTFkM2ItNGI5Ni1iZTYzLTM1MjAzM2FmMGFmZSJ9"
    },

    contabilCorporativo: {
        titulo: "Contabilidade Corporativo",
        url: "https://app.powerbi.com/view?r=eyJrIjoiNDA4NDlhMTgtNDYwYy00ZWI5LTk3ZTctNTI2NWM3YzUyZGVhIiwidCI6IjgxYTJmN2VhLTFkM2ItNGI5Ni1iZTYzLTM1MjAzM2FmMGFmZSJ9"
    },

    contabilUnidades: {
        titulo: "Contabilidade Unidades",
        url: "https://app.powerbi.com/view?r=eyJrIjoiNDljNDkyM2YtMTk0OC00NzM3LWJlNTYtODhlZjc2Y2IyOTYxIiwidCI6IjgxYTJmN2VhLTFkM2ItNGI5Ni1iZTYzLTM1MjAzM2FmMGFmZSJ9"
    },

    processosEdocs: {
        titulo: "Processos E-Docs",
        url: "https://app.powerbi.com/view?r=eyJrIjoiMGIwYjdhMzQtM2NmMy00M2QyLTkzMGYtZTY0NGI5MmEzNzBmIiwidCI6ImFlNjRlNjk2LTcyOWUtNDdjYi04OWZlLTcxYTYxYzE4ZGJhNyIsImMiOjF9"
    },

    valoresServicos: {
        titulo: "Valores de Serviços e Exames",
        url: "https://app.powerbi.com/view?r=eyJrIjoiYjJkYTJhYjItODY1ZC00ODRkLWE4MWYtODBlMjBmOWRjNWNlIiwidCI6IjM1YWFmNDRiLWQ2Y2EtNGU1OC1hMmRhLTg5ODZkYzgxZTMzNCJ9"
    },

    indicadoresHospitalares: {
        titulo: "Indicadores Hospitalares",
        url: "https://app.powerbi.com/view?r=eyJrIjoiZTYxNzdlMmUtMjYzNC00NDI3LWIzMzAtZjEwYzFjOGViYTUxIiwidCI6IjM1YWFmNDRiLWQ2Y2EtNGU1OC1hMmRhLTg5ODZkYzgxZTMzNCJ9"
    }

};

// =========================
// ABRIR PAINEL
// =========================

function abrirPainel(chave){

    const painel = paineis[chave];

    if(!painel){
        alert("Painel não encontrado.");
        return;
    }

    document.body.classList.add("dashboard-mode");

    document.getElementById("home").style.display = "none";

    document.getElementById("viewer").style.display = "block";

    document.getElementById("painelFrame").src = painel.url;
}

// =========================
// VOLTAR
// =========================

function voltarPortal(){

    document.body.classList.remove("dashboard-mode");

    document.getElementById("viewer").style.display = "none";

    document.getElementById("home").style.display = "block";

    document.getElementById("painelFrame").src = "";
}

// =========================
// MENU
// =========================

function toggleMenu(){

    document
        .querySelector(".sidebar")
        .classList
        .toggle("collapsed");
}


function logout(){
    if(confirm("Deseja fechar o portal?")){
        window.location.href = "https://www.inovacapixaba.es.gov.br";
    }
}
