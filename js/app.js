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
    }

};

function abrirPainel(chave){

    const painel = paineis[chave];

    document.body.classList.add("dashboard-mode");

    document.getElementById("home").style.display = "none";

    document.getElementById("viewer").style.display = "block";

    document.getElementById("painelFrame").src =
        painel.url;
}

function voltarPortal(){

    document.body.classList.remove("dashboard-mode");

    document.getElementById("viewer").style.display =
        "none";

    document.getElementById("home").style.display =
        "block";

    document.getElementById("painelFrame").src = "";
}

function toggleMenu(){

    document
        .querySelector(".sidebar")
        .classList
        .toggle("collapsed");
}
