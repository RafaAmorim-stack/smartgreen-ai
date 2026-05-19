const ID_ARQUIVO_LOGO = "";

function criarFormularioValidacaoSmartGreen() {
  const form = FormApp.create("Validacao com Usuarios Finais - SmartGreen AI");

  form
    .setDescription(
      [
        "O SmartGreen AI e um projeto academico voltado ao controle semaforico inteligente em cruzamentos urbanos.",
        "A solucao apresenta um MVP web que permite acompanhar o fluxo de veiculos por via e simular a priorizacao automatica do semaforo conforme a demanda observada.",
        "",
        "Esta pesquisa tem finalidade exclusivamente academica. As respostas serao utilizadas apenas para avaliar a experiencia, a relevancia do problema e o interesse do publico-alvo na solucao proposta.",
        "Regras de anonimato serao aplicadas na analise e apresentacao dos dados.",
      ].join("\n"),
    )
    .setCollectEmail(false)
    .setProgressBar(true)
    .setConfirmationMessage(
      "Obrigado por contribuir com a validacao academica do SmartGreen AI.",
    );

  if (ID_ARQUIVO_LOGO) {
    const logo = DriveApp.getFileById(ID_ARQUIVO_LOGO).getBlob();
    form.addImageItem().setImage(logo).setTitle("SmartGreen AI");
  }

  adicionarPerfilPublicoAlvo(form);
  adicionarImportanciaSolucao(form);
  adicionarEarlyAdopters(form);
  adicionarSugestoes(form);
  adicionarConsentimentoFinal(form);

  Logger.log(`URL de edicao: ${form.getEditUrl()}`);
  Logger.log(`URL publica: ${form.getPublishedUrl()}`);
}

function adicionarPerfilPublicoAlvo(form) {
  form.addPageBreakItem().setTitle("Perfil do publico-alvo");

  adicionarMultiplaEscolha(form, "Genero", [
    "Feminino",
    "Masculino",
    "Nao binario",
    "Prefiro nao informar",
    "Outro",
  ]);

  adicionarMultiplaEscolha(form, "Faixa etaria", [
    "Ate 17 anos",
    "18 a 24 anos",
    "25 a 34 anos",
    "35 a 44 anos",
    "45 a 59 anos",
    "60 anos ou mais",
  ]);

  adicionarMultiplaEscolha(form, "Faixa de rentabilidade mensal", [
    "Sem renda",
    "Ate 1 salario minimo",
    "1 a 3 salarios minimos",
    "3 a 5 salarios minimos",
    "Acima de 5 salarios minimos",
    "Prefiro nao informar",
  ]);

  adicionarMultiplaEscolha(form, "Regiao onde vive", [
    "Norte",
    "Nordeste",
    "Centro-Oeste",
    "Sudeste",
    "Sul",
    "Fora do Brasil",
  ]);

  form.addTextItem().setTitle("Cidade e estado onde vive").setRequired(true);

  adicionarMultiplaEscolha(form, "Escolaridade", [
    "Ensino fundamental",
    "Ensino medio",
    "Ensino tecnico",
    "Ensino superior incompleto",
    "Ensino superior completo",
    "Pos-graduacao",
  ]);

  adicionarCaixasSelecao(form, "Qual e sua relacao com o transito urbano?", [
    "Motorista",
    "Passageiro de carro/app",
    "Usuario de transporte publico",
    "Ciclista",
    "Pedestre",
    "Motociclista",
    "Trabalho com mobilidade/transito",
    "Outro",
  ]);

  adicionarMultiplaEscolha(
    form,
    "Com que frequencia voce passa por cruzamentos congestionados?",
    [
      "Diariamente",
      "Algumas vezes por semana",
      "Algumas vezes por mes",
      "Raramente",
      "Nunca",
    ],
  );
}

function adicionarImportanciaSolucao(form) {
  form.addPageBreakItem().setTitle("Importancia do problema e da solucao");

  adicionarEscala(
    form,
    "O congestionamento em cruzamentos impacta sua rotina.",
    "Discordo totalmente",
    "Concordo totalmente",
  );
  adicionarEscala(
    form,
    "Voce percebe que semaforos com tempo fixo podem piorar filas em horarios de pico.",
    "Discordo totalmente",
    "Concordo totalmente",
  );
  adicionarEscala(
    form,
    "A proposta do SmartGreen AI ficou clara para voce na landing page.",
    "Nada clara",
    "Muito clara",
  );
  adicionarEscala(
    form,
    "A funcionalidade de monitorar a quantidade de veiculos por via parece util.",
    "Nada util",
    "Muito util",
  );
  adicionarEscala(
    form,
    "A priorizacao automatica do semaforo parece ajudar a reduzir esperas.",
    "Discordo totalmente",
    "Concordo totalmente",
  );

  adicionarCaixasSelecao(
    form,
    "Quais funcionalidades voce considera mais importantes?",
    [
      "Ver quantidade de veiculos por via",
      "Identificar maior congestionamento",
      "Simular fluxo em tempo real",
      "Receber alertas de lentidao",
      "Historico de leituras",
      "Integracao com orgaos de transito",
      "Outro",
    ],
  );

  adicionarEscala(
    form,
    "Depois de testar o MVP, qual sua avaliacao geral da solucao?",
    "Muito ruim",
    "Muito boa",
  );
}

function adicionarEarlyAdopters(form) {
  form.addPageBreakItem().setTitle("Teste do MVP e early adopters");

  adicionarMultiplaEscolha(form, "Voce conseguiu acessar e testar o MVP?", [
    "Sim, testei sem dificuldades",
    "Sim, mas tive dificuldades",
    "Nao consegui testar",
    "Ainda nao testei",
  ]);

  adicionarMultiplaEscolha(
    form,
    "Voce gostaria de testar novas versoes do SmartGreen AI?",
    ["Sim", "Talvez", "Nao"],
  );

  form
    .addScaleItem()
    .setTitle("Voce recomendaria o teste da solucao para outras pessoas?")
    .setBounds(0, 10)
    .setLabels("Nao recomendaria", "Recomendaria muito")
    .setRequired(true);

  adicionarMultiplaEscolha(
    form,
    "Em qual contexto voce imagina o SmartGreen AI sendo mais util?",
    [
      "Grandes avenidas",
      "Regioes escolares",
      "Areas comerciais",
      "Cruzamentos residenciais",
      "Corredores de transporte publico",
      "Centros urbanos",
      "Outro",
    ],
  );

  form
    .addTextItem()
    .setTitle("Caso aceite participar de testes futuros, informe um e-mail de contato.")
    .setRequired(false);
}

function adicionarSugestoes(form) {
  form.addPageBreakItem().setTitle("Sugestoes do publico-alvo");

  adicionarParagrafo(form, "O que voce mais gostou na solucao apresentada?");
  adicionarParagrafo(form, "O que ficou confuso ou poderia ser melhor explicado?");
  adicionarParagrafo(form, "Que funcionalidade voce adicionaria ao backlog do SmartGreen AI?");

  adicionarCaixasSelecao(
    form,
    "Quais preocupacoes voce teria ao usar uma solucao desse tipo?",
    [
      "Privacidade dos dados",
      "Confiabilidade das leituras",
      "Tempo de resposta",
      "Custo de implantacao",
      "Integracao com sistemas publicos",
      "Seguranca",
      "Nenhuma",
      "Outro",
    ],
  );

  adicionarParagrafo(form, "Deixe uma sugestao livre para a equipe.");
}

function adicionarConsentimentoFinal(form) {
  form.addPageBreakItem().setTitle("De acordo");

  adicionarMultiplaEscolha(
    form,
    "Voce esta de acordo que seus dados sejam utilizados exclusivamente para fins de pesquisa academica deste projeto?",
    ["Sim, estou de acordo", "Nao estou de acordo"],
  );
}

function adicionarMultiplaEscolha(form, titulo, opcoes) {
  form.addMultipleChoiceItem().setTitle(titulo).setChoiceValues(opcoes).setRequired(true);
}

function adicionarCaixasSelecao(form, titulo, opcoes) {
  form.addCheckboxItem().setTitle(titulo).setChoiceValues(opcoes).setRequired(true);
}

function adicionarEscala(form, titulo, menor, maior) {
  form
    .addScaleItem()
    .setTitle(titulo)
    .setBounds(1, 5)
    .setLabels(menor, maior)
    .setRequired(true);
}

function adicionarParagrafo(form, titulo) {
  form.addParagraphTextItem().setTitle(titulo).setRequired(false);
}
