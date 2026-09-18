/* =====================================================================
   CONFIGURAÇÃO DO PORTAL — FUNDAÇÃO INOVA
   =====================================================================
   Este é o ÚNICO arquivo que precisa ser editado para adicionar, remover
   ou alterar um aplicativo do portal. Nenhuma outra parte do sistema
   precisa ser tocada.

   Para ADICIONAR um novo aplicativo, copie um bloco { ... } abaixo e
   ajuste os campos. Para REMOVER, apague o bloco correspondente.

   CAMPOS:
   - id       : identificador único, sem espaços (usado internamente)
   - grupo    : nome da categoria no menu lateral e nos cards
   - titulo   : nome exibido para o usuário
   - icone    : ícone do app. Aceita dois formatos:
                 "bi-nome-do-icone"   -> ícone da biblioteca Bootstrap Icons
                                          (ver lista em https://icons.getbootstrap.com)
                 "img/icons/arquivo.svg" -> ícone próprio em SVG
   - cor      : cor de destaque do ícone (código hexadecimal)
   - tipo     : "iframe" -> abre dentro do portal (pergunta portal/nova aba)
                "link"   -> abre direto em nova aba, sem perguntar
   - url      : endereço do aplicativo / relatório
   ===================================================================== */

const PORTAL_CONFIG = {

    // Nome exibido no cabeçalho
    tituloPortal: "Diretoria de Gente, Gestão, Finanças e Compras - Portal de Aplicativos",

    // Para onde o botão "Sair" deve levar o usuário
    urlLogout: "https://www.inovacapixaba.es.gov.br",

    // Lista de aplicativos do portal, na ordem em que devem aparecer
    apps: [

        // ---------------- Contabilidade (painéis Power BI) ----------------
        {
            id: "contabilCorporativo",
            grupo: "Contabilidade",
            titulo: "Contabilidade Corporativo",
            icone: "bi-bar-chart-fill",
            cor: "#3498db",
            tipo: "iframe",
            url: "https://app.powerbi.com/view?r=eyJrIjoiNDA4NDlhMTgtNDYwYy00ZWI5LTk3ZTctNTI2NWM3YzUyZGVhIiwidCI6IjgxYTJmN2VhLTFkM2ItNGI5Ni1iZTYzLTM1MjAzM2FmMGFmZSJ9"
        },
        {
            id: "contabilUnidades",
            grupo: "Contabilidade",
            titulo: "Contabilidade Unidades",
            icone: "bi-hospital",
            cor: "#3498db",
            tipo: "iframe",
            url: "https://app.powerbi.com/view?r=eyJrIjoiNDljNDkyM2YtMTk0OC00NzM3LWJlNTYtODhlZjc2Y2IyOTYxIiwidCI6IjgxYTJmN2VhLTFkM2ItNGI5Ni1iZTYzLTM1MjAzM2FmMGFmZSJ9"
        },
        {
            id: "powerbiHome",
            grupo: "Contabilidade",
            titulo: "Power BI (Início)",
            icone: "img/icons/powerbi.svg",
            cor: "#F2C811",
            tipo: "link",
            url: "https://app.powerbi.com/home?tenant=81a2f7ea-1d3b-4b96-be63-352033af0afe"
        },
        {
            id: "indicadoresHospitalares",
            grupo: "Contabilidade",
            titulo: "Indicadores Hospitalares",
            icone: "bi-graph-up-arrow",
            cor: "#9b59b6",
            tipo: "iframe",
            url: "https://app.powerbi.com/view?r=eyJrIjoiZTYxNzdlMmUtMjYzNC00NDI3LWIzMzAtZjEwYzFjOGViYTUxIiwidCI6IjM1YWFmNDRiLWQ2Y2EtNGU1OC1hMmRhLTg5ODZkYzgxZTMzNCJ9"
        },

        // ---------------- Compras e Contratos ----------------
        {
            id: "contratos",
            grupo: "Compras e Contratos",
            titulo: "Contratos",
            icone: "bi-file-earmark-text",
            cor: "#e67e22",
            tipo: "iframe",
            url: "https://app.powerbi.com/view?r=eyJrIjoiM2M3ODQzMjMtZWNmMi00YjYxLWE0ZDEtYjgzMzcwZjRhZTYzIiwidCI6IjgxYTJmN2VhLTFkM2ItNGI5Ni1iZTYzLTM1MjAzM2FmMGFmZSJ9"
        },
        {
            id: "processosEdocsPowerBi",
            grupo: "Compras e Contratos",
            titulo: "Processos E-Docs",
            icone: "bi-folder2-open",
            cor: "#e67e22",
            tipo: "iframe",
            url: "https://app.powerbi.com/view?r=eyJrIjoiMGIwYjdhMzQtM2NmMy00M2QyLTkzMGYtZTY0NGI5MmEzNzBmIiwidCI6ImFlNjRlNjk2LTcyOWUtNDdjYi04OWZlLTcxYTYxYzE4ZGJhNyIsImMiOjF9"
        },

        // ---------------- Assistencial ----------------
        {
            id: "valoresServicos",
            grupo: "Assistencial",
            titulo: "Valores de Serviços e Exames",
            icone: "bi-cash-stack",
            cor: "#2ecc71",
            tipo: "iframe",
            url: "https://app.powerbi.com/view?r=eyJrIjoiYjJkYTJhYjItODY1ZC00ODRkLWE4MWYtODBlMjBmOWRjNWNlIiwidCI6IjM1YWFmNDRiLWQ2Y2EtNGU1OC1hMmRhLTg5ODZkYzgxZTMzNCJ9"
        },
        {
            id: "faturamento",
            grupo: "Assistencial",
            titulo: "Faturamento",
            icone: "bi-receipt",
            cor: "#f39c12",
            tipo: "iframe",
            url: "https://app.powerbi.com/view?r=eyJrIjoiOGFlOGUwZWItZmRkZi00Nzg2LWJiYWMtMGUxZWJkMTAyNGZkIiwidCI6IjM1YWFmNDRiLWQ2Y2EtNGU1OC1hMmRhLTg5ODZkYzgxZTMzNCJ9"
        },

        // ---------------- Gestão (sistemas externos, abrem em nova aba) ----------------
        {
            id: "trello",
            grupo: "Gestão",
            titulo: "Trello",
            icone: "bi-trello",
            cor: "#0079bf",
            tipo: "link",
            url: "https://trello.com/u/jorgeteixeiraneto/boards"
        },
        {
            id: "edocsSistema",
            grupo: "Gestão",
            titulo: "E-docs",
            icone: "img/icons/edocs.svg",
            cor: "#007DC5",
            tipo: "link",
            url: "https://e-docs.es.gov.br/Internal"
        },
        {
            id: "zimbra",
            grupo: "Gestão",
            titulo: "E-mail",
            icone: "img/icons/email.svg",
            cor: "#132c73",
            tipo: "link",
            url: "https://saude.correio.es.gov.br/#1"
        },
        {
            id: "kpih",
            grupo: "Gestão",
            titulo: "KPIH",
            icone: "bi-cash-coin",
            cor: "#10bf00",
            tipo: "link",
            url: "https://www.kpih.com.br/acesso/paginaInicial"
        },
        {
            id: "gpi",
            grupo: "Gestão",
            titulo: "GPI",
            icone: "img/icons/gpi.svg",
            cor: "#bfac00",
            tipo: "link",
            url: "https://gpi31.cloud.el.com.br/ServerExec/acessoBase/"
        },
        {
            id: "efetivo",
            grupo: "Gestão",
            titulo: "Effetivo",
            icone: "img/icons/efetivo.svg",
            cor: "#0089bf",
            tipo: "link",
            url: "https://acesso.effettivo.com.br/frm_Default.aspx"
        },
        {
            id: "drg",
            grupo: "Gestão",
            titulo: "DRG",
            icone: "img/icons/drg.svg",
            cor: "#bf6c00",
            tipo: "link",
            url: "https://sigclinic.sigquali.com.br/qualidade/inicial.do?evento=cookie#"
        },
        {
            id: "bionexo",
            grupo: "Gestão",
            titulo: "Bionexo",
            icone: "img/icons/bionexo.svg",
            cor: "#394abc",
            tipo: "link",
            url: "https://bioid-shared.bionexo.com/"
        }

    ]
};
