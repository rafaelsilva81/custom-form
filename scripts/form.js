(function ($) {


  /* TPLAWESOME */
  function tplawesome(e, t) {
    res = e;
    for (var n = 0; n < t.length; n++) {
      res = res.replace(/\{\{(.*?)\}\}/g, function (e, r) {
        return t[n][r];
      });
    }
    return res;
  }

  const firebaseConfig = {
    apiKey: "AIzaSyCH70tOuQ8gYfcwf-j1bcXSZgQUGWkilAU",
    authDomain: "formularios-deo.firebaseapp.com",
    projectId: "formularios-deo",
    storageBucket: "formularios-deo.appspot.com",
    messagingSenderId: "709037751207",
    appId: "1:709037751207:web:596b394f0b651d23495482",
    measurementId: "G-66FRWE6974",
  };

  firebase.initializeApp(firebaseConfig);
  //const appCheck = firebase.appCheck();
  //appCheck.activate('6LdZH-UfAAAAAK03dgjEpbSCBH9gj5wD6BRKN6EX', true)
  db = firebase.firestore();

  $("#customForm").submit(function (e) {
    e.preventDefault();
    var form_name = $("#formName").val();
    var form = $(this);
    var data = form.serializeArray();
    var question_data = data;
    var contact_data = [];

    //Removendo valores do array que não são perguntas
    while (question_data[0][Object.keys(question_data[0])[0]] != "q1") {
      contact_data.push(question_data.shift());
    }

    var points = [];
    question_data.forEach(function (elem) {
      points.push(parseInt(elem.value));
    });

    console.log(points);
    console.log(contact_data);


    msg = formCalc(form_name, points, contact_data);
  });

  function formCalc(formName, pontuation, contactData) {
    //console.log("CAI AQUI formCalc")
    if (formName == "1") {
      //console.log("CAI AQUI formCalc onde formName == 1")
      message = [];
      negocios = pontuation.slice(0, 4);
      gestao = pontuation.slice(5, 9);
      lideranca = pontuation.slice(10, 14);

      m1 = media(negocios); //Media negocio
      m2 = media(gestao); //Media gestao
      m3 = media(lideranca); //Media Lideranca

      let medias = [m1, m2, m3];

      perguntasString = pontuation.join();

      if (m1 < 5) {
        message[0] =
          "Seus produtos e serviços tem uma baixa diferenciação de mercado, e isso que deve estar comprometendo a sua competitividade. É provável que você tenha dificuldades para bater suas metas de vendas ou deve estar dando muitos descontos para vender bem, portanto, é fundamental que você planeje melhor o seu modelo de negócios.";
      } else if (m1 <= 6) {
        message[0] =
          "Sua empresa tem um posicionamento, mas seu modelo de negócios ainda tem muito a melhorar. Procure diferenciar mais os seus produtos/serviços pois isso lhe dará mais consistência no atingimento das suas metas comerciais. O segredo aqui é planejar melhor o seu modelo de negócios.";
      } else if (m1 <= 8) {
        message[0] =
          "Sua empresa tem sim um modelo de negócio definido e já deve estar apresentando um bom nível de competitividade no seu mercado. Mas você pode vender bem mais caso diferencie ainda mais os seus produtos e serviços e para isso se faz necessário um melhor planejamento do modelo de negócio da sua empresa.";
      } else {
        message[0] =
          "Sua empresa está muito bem posicionada quanto seu modelo de negócio e seus produtos e serviços certamente tem uma boa diferenciação de mercado. Com esse nível acima da média de competitividade seu negócio tem potencial de crescimento, mas isso está condicionado também a qualidade do seu modelo de gestão e de liderança.";
      }

      if (m2 < 5) {
        message[1] =
          "Sua empresa tem sérios problemas com relação aos seus controles e a segurança do seu negócio pode estar em jogo. Você realmente precisa de um novo modelo de gestão portanto implemente urgentemente uma gestão baseada em objetivos, metas, indicadores e planos de ação.";
      } else if (m2 <= 6) {
        message[1] =
          "A gestão da sua empresa precisa passar a ser uma prioridade para você. Observe que só vender não basta e você precisa ter melhores controles. Destrave o crescimento da sua empresa implementando uma gestão baseada em objetivos, metas, indicadores e planos de ação.";
      } else if (m2 <= 8) {
        message[1] =
          "Ok. Você já tem boas práticas de gestão, sua empresa já está se organizando. Mas observe, ainda existem muito espaço para melhorar. Siga em frente implementando uma gestão baseada em objetivos, metas, indicadores e planos de ação para que a sua empresa possa avançar.";
      } else {
        message[1] =
          "Parabéns, você não é somente o dono da sua empresa, você é o gestor dela. Sua empresa está sob o seu controle e tem uma boa base para crescer. Mas continue sempre evoluindo e logo que possível implante o seu sistema de objetivos, metas, indicadores e planos de ação para que a sua empresa possa continuar crescendo.";
      }

      if (m3 < 5) {
        message[2] =
          "Sua liderança deve estar colocando sua empresa em apuros. Provavelmente você esteja com uma alta rotatividade e com grandes dificuldades para ter bons profissionais na sua empresa. Invista urgente na identidade cultural do seu negócio (Visão, Missão e Valores) e procure melhorar as suas habilidades e recursos de liderança.";
      } else if (m3 <= 6) {
        message[2] =
          "Você precisa evoluir a sua liderança, sair da condição de chefe para líder da sua empresa para que seus funcionários tenham maior  desempenho. Invista o mais rápido possível na identidade cultural da sua empresa (Visão, Missão e Valores) e procure melhorar as suas habilidades e recursos de liderança.";
      } else if (m3 <= 8) {
        message[2] =
          "Sua liderança está em pleno desenvolvimento, você já está alcançando sua maturidade como líder mas ainda falta se organizar mais e ficar ainda mais próximo da sua equipe. Invista na identidade cultural da sua empresa (Visão, Missão e Valores) e procure continuar melhorando as suas habilidades e recursos de liderança.";
      } else {
        message[2] =
          "Parabéns, você é realmente o líder da sua empresa e ela certamente já está colhendo os benefícios disso. Sua equipe deve admirar você pela sua liderança e pela sua forma de decidir. Agora é hora de investir na identidade cultural da sua empresa (Visão, Missão e Valores) e estar sempre buscando evoluir nas suas habilidades e recursos de liderança.";
      }

      //console.log("Cheguei aqui")
      db.collection("form" + formName)
        .add({
          nome: contactData[0].value,
          email: contactData[1].value,
          empresa: contactData[2].value,
          tipo_de_profissional: contactData[3].value,
          qtd_funcionarios: contactData[4].value,
          media_negocios: m1,
          media_gestao: m2,
          media_lideranca: m3,
          perguntas: perguntasString,
        })
        .then(() => {
          $("#submitButton").prop("disabled", true);
          $("#submitButton").hide();
          showResults(message, medias);
        })
        .catch((err) => {
          console.log(err)
          alert(
            "Houve um erro, por favor, tente novamente em alguns instantes!"
          );
          $("#submitButton").show();
          $("#submitButton").prop("disabled", false);
        });
    } else {

      message = []
      medias = [0]
      media = media(pontuation)
      medias[0] = media
      perguntasString = pontuation.join();

      message[0] = getMessage(formName, media)
      console.log(message)

      //console.log("Cheguei aqui")
      db.collection("form" + formName)
        .add({
          nome: contactData[0].value,
          email: "",
          empresa: "",
          media: media,
          perguntas: perguntasString,
        })
        .then(() => {
          $("#submitButton").prop("disabled", true);
          $("#submitButton").hide();
          showResults(message, medias);
        })
        .catch((err) => {
          console.log(err)
          alert(
            "Houve um erro, por favor, tente novamente em alguns instantes!"
          );
          $("#submitButton").show();
          $("#submitButton").prop("disabled", false);
        });

    }
  }

  function showResults(messageArr, mediasArr) {
    var loadingModal = new bootstrap.Modal(
      document.getElementById("loadingModal")
    );
    loadingModal.show();
    if (messageArr.length > 1 && mediasArr.length > 1) {
      console.log("Cai aqui");
      /* caso especial para o form 1, que tem multiplas mensagens e multiplas medias */
      setTimeout(function () {
        const { jsPDF } = window.jspdf;

        var doc = new jsPDF()

        loadingModal.hide();
        $
          .ajax({
            url: jsVars.templateUrl + "/templates/modals/modal_form1.html",
            success: function (tpl) {

              var splitTitle

              doc.setFontSize(26);
              doc.text('Seus resultados - DEO - Fred Pinho', 20, 20)
              doc.setFontSize(16);

              splitTitle = doc.splitTextToSize(messageArr[0], 180);
              doc.text('Maturidade do seu modelo de negócio : ', 20, 50)
              doc.text(splitTitle, 20, 60)
              doc.text('Nota : ' + mediasArr[0], 20, 105)

              splitTitle = doc.splitTextToSize(messageArr[1], 180);
              doc.text('Maturidade do seu modelo de gestão : ', 20, 120)
              doc.text(splitTitle, 20, 130)
              doc.text('Nota : ' + mediasArr[1], 20, 175)

              splitTitle = doc.splitTextToSize(messageArr[2], 180);
              doc.text('Maturidade do seu modelo de liderança : ', 20, 190)
              doc.text(splitTitle, 20, 200)
              doc.text('Nota : ' + mediasArr[2], 20, 245)

              $("#modals").append(
                tplawesome(tpl, [
                  {
                    "media-negocio": mediasArr[0],
                    "mensagem-negocio": messageArr[0],
                    "media-gestao": mediasArr[1],
                    "mensagem-gestao": messageArr[1],
                    "media-lideranca": mediasArr[2],
                    "mensagem-lideranca": messageArr[2],
                  },
                ])
              );
            },
          })
          .then(function () {
            var resultsModal = new bootstrap.Modal(
              document.getElementById("resultsModal")
            );
            resultsModal.show();
            $("#resultsModal").on('shown.bs.modal', function () {
              $(".saveResults").click(function () {
                doc.save('resultados.pdf')
              })
            })

          });
      }, 3000);
    } else {
      message = messageArr[0]
      media = mediasArr[0]

      setTimeout(function () {
        const { jsPDF } = window.jspdf;

        var doc = new jsPDF()

        loadingModal.hide();
        $
          .ajax({
            url: jsVars.templateUrl + "/templates/modals/modal_form2.html",
            success: function (tpl) {

              var splitTitle

              doc.setFontSize(26);
              doc.text('Seus resultados - DEO - Fred Pinho', 20, 20)
              doc.setFontSize(16);

              splitTitle = doc.splitTextToSize(messageArr[0], 180);
              doc.text('Seu Resultado: ', 20, 50)
              doc.text(splitTitle, 20, 60)
              doc.text('Nota : ' + mediasArr[0], 20, 105)

              $("#modals").append(
                tplawesome(tpl, [
                  {
                    "media": mediasArr[0],
                    "mensagem": messageArr[0],
                  },
                ])
              );
            },
          })
          .then(function () {
            var resultsModal = new bootstrap.Modal(
              document.getElementById("resultsModal")
            );
            resultsModal.show();
            $("#resultsModal").on('shown.bs.modal', function () {
              $(".saveResults").click(function () {
                doc.save('resultados.pdf')
              })
            })

          });
      }, 3000);

    }
  }

  function media(myArray) {
    total = 0;
    myArray.forEach(function (val) {
      total += val;
    });
    m = parseFloat((total / myArray.length).toFixed(1));

    return m;
  }

  function getMessage(id, media) { //Apenas pro form 2 em diante
    console.log(id)
    message = []
    if (id == "2") {
      if (media < 4) {
        message[0] = "Seja por falta de um melhor conhecimento seu ou de uma maior organização na sua empresa, ainda existem muitas carências ou falhas com relação ao seu Modelo de Negócio e isso certamente está impactando negativamente nas suas metas de vendas, obrigando você a dar descontos e comprometendo os seus resultados. Ou seja, sua competividade está comprometida então dê total atenção ao Módulo de Modelagem Estratégica da Mentoria."
      } else if (media > 4 && media < 6) {
        message[0] = "Sua empresa precisa de uma melhor organização com relação ao seu Modelo de Negócio. Certamente ainda falta a você um maior conhecimento nessa área e uma maior inciativa em gerar todos o planejamento e recursos necessários para que a sua empresa se torne mais competitiva pois certamente ela ainda está muito vulnerável quanto a isso."
      } else if (media > 6 && media < 7) {
        message[0] = "Sua empresa tem um nível regular de maturidade com relação ao Modelo de Negócios, ou seja, existe ainda muito espaço e muito o que fazer para avançar. Certamente sua empresa está vulnerabilidade com relação a sua concorrência e você precisa ser preparar e se planejar para ganhar mais."
      } else if (media >= 9) {
        message[0] = "Parabéns! Você tem um excelente nível de maturidade com relação ao Modelo de Negócios da sua empresa. Sua empresa está balanceada em todas as áreas chaves e isso e isso já deve estar se refletindo na efetividade de atingimento das metas e no nível de satisfação dos seus clientes. Ou seja, em termos de “Modelo de Negócios” você está pronto para crescer!"
      } else {
        message[0] = "Você tem um bom nível de maturidade com relação ao Modelo de Negócios da sua empresa, mas ainda existe espaço para avançar. Dedique-se agora aos detalhes, aumente ainda mais o seu foco no “valor” que o seu cliente deseja e quer receber e também nos recursos e atividades que a sua necessita para fazer essa “entrega” e, claro, conseguir lucrar com isso."
      }
    }
    if (id == "3") {
      if (media < 4) {
        message[0] = "O seu nível de maturidade com relação ao Planejamento da sua empresa ainda é muito baixo. Direcionamento: Tome providências urgentes quanto a isso pois essa situação pode estar refletindo negativamente nos seus resultados. Você ainda não tem metas e objetivos claros para a sua empresa e isso é perigoso. Comece dando total atenção ao Módulo de Planejamento da Mentoria."
      } else if (media >= 9) {
        message[0] = "Parabéns! Você tem um ótimo nível de maturidade com relação ao planejamento da sua empresa e com certeza isso já deve estar impactando positivamente nos resultados dela.  Ainda assim é importante você procurar e  identificar onde estão os pontos falhos do seu Planejamento (eles sempre existem) e use o seu aprendizado no Módulo Planejamento da Mentoria para corrigí-los. "
      } else if (media < 7) {
        message[0] = "Sua empresa tem um nível regular de maturidade com relação ao Modelo de Negócios, ou seja, existe ainda muito espaço e muito o que fazer para avançar. Certamente sua empresa está vulnerabilidade com relação a sua concorrência e você precisa ser preparar e se planejar para ganhar mais."
      } else if (media >= 9) {
        message[0] = "Você tem um nível de maturidade regular e certamente já consegue perceber o quanto planejar é importante e que essa é uma “ferramenta” que funciona. Passe a encarar o Planejamento como uma das principais atividades da sua empresa, e não uma atividade secundária e seja mais efetivo na criação dos seus objetivos e metas."
      } else {
        message[0] = "Você tem um bom nível de maturidade com relação ao Planejamento da sua empresa, mas ainda existe espaço para avançar e melhorar. Formalize mais o seu Planejamento e crie a sua rotina de reuniões de avaliação de resultados para alcançar mais efetividade nas suas metas."
      }
    }
    if (id == "4") {
      if (media < 4) {
        message[0] = "O seu nível de maturidade na Gestão Comercial da sua empresa está muito baixo e os seus resultados insuficientes certamente são uma consequência disso. Conecte-se com os conteúdos desse módulo e aplique na sua empresa rapidamente. E comece urgentemente a investir mais em treinamento."
      } else if (media < 6) {
        message[0] = "Você precisa evoluir com os seus conhecimentos em vendas e passar a cuidar das estratégias e da estrutura da área comercial da sua empresa pois hoje ela é um gargalo e certamente está travando os seus resultados e crescimento. E não esqueça de investir mais em treinamento."
      } else if (media < 7) {
        message[0] = "Você tem um nível de maturidade regular na Gestão Comercial da sua empresa e deve evoluir para aumentar as suas vendas através, tanto de um melhor planejamento como também de um melhor acompanhamento e controle do seu processo de vendas. E não esqueça de investir mais em treinamento."
      } else if (media >= 9) {
        message[0] = "Parabéns! Você tem um ótimo nível de maturidade na Gestão Comercial da sua empresa como um todo e os seus resultados comerciais devem comprovar isso, assim, é hora de ajustar as demais áreas da sua empresa e crescer. Ah! E não esqueça de estar sempre aumenta os seus investimentos em treinamento."
      } else {
        message[0] = "Você tem um bom nível de maturidade na Gestão Comercial e certamente já consegue perceber que ter estratégias comerciais, treinar sua força de vendas e aferir a satisfação dos clientes são determinantes para o sucesso da sua empresa, mas ainda existe espaço para avançar e melhorar. E não esqueça de investir mais em treinamento."
      }
    }
    if (id == "5") {
      if (media < 4) {
        message[0] = "O seu nível de maturidade na Gestão Operacional e dos Processos Administrativos da sua empresa está muito baixo. Certamente isso deve estar comprometendo diretamente os seus resultados e você deve ser hoje um apagador de incêndios na sua empresa. Conecte-se com os conteúdos desse módulo e aplique urgentemente na sua empresa."
      } else if (media < 6) {
        message[0] = "Você precisa evoluir rapidamente na gestão operacional e dos processos administrativos da sua empresa e pois a falta de um maior amadurecimento na gestão nessas áreas certamente está travando o crescimento da sua empresa. Lembre-se que só vender não basta e toda empresa precisa de eficiência operacional e administrativa para crescer."
      } else if (media < 7) {
        message[0] = "Você tem um nível de maturidade regular na Gestão Operacional e nos processos administrativos da sua empresa, mas ainda precisa avançar para ter um melhor nível de serviço e assim liberar o seu comercial para avançar nas vendas. Lembre-se que só vender não basta e toda empresa precisa de eficiência operacional e administrativa para crescer."
      } else if (media >= 9) {
        message[0] = "Parabéns! Você tem um excelente nível de maturidade na Gestão Operacional e nos processos administrativos da sua empresa o que, certamente, já deve estar impactando no seu “nível de serviço”. A melhor notícia é que a sua empresa está pronta pra vender mais e crescer."
      } else {
        message[0] = "Você tem um bom nível de maturidade na Gestão Operacional e nos processos administrativos da sua empresa. Mas ainda existe um espaço importante para evoluir e conquista a base operacional necessária para sustentar o seu crescimento. Lembre-se que só vender não basta e toda empresa precisa de eficiência operacional e administrativa para crescer."
      }
    }
    if (id == "6") {
      if (media < 4) {
        message[0] = "O seu nível de maturidade na Gestão de Pessoas da sua empresa está muito baixo. Certamente isso deve estar gerando muita rotatividade, comprometendo os seus resultados e até a sua satisfação para trabalhar na sua própria empresa."
      } else if (media < 6) {
        message[0] = "Você precisa evoluir rapidamente na Gestão de Pessoas da sua empresa pois a falta de um maior amadurecimento seu nessa área certamente está travando o crescimento e até comprometendo o clima organizacional da sua empresa."
      } else if (media < 7) {
        message[0] = "Você tem um nível de maturidade regular na Gestão de Pessoas da sua empresa, mas ainda precisa avançar para ter uma empresa mais produtiva e com um ambiente de mais comprometimento e colaboração por parte das pessoas."
      } else if (media >= 9) {
        message[0] = "Parabéns! Você tem um excelente nível de maturidade na Gestão de Pessoas o que, certamente, já deve estar gerando um ótimo ambiente na sua empresa, bem como um alto nível de produtividade. A melhor notícia é que, nesse quesito, a sua empresa está pronta pra crescer!"
      } else {
        message[0] = "Você tem um bom nível de maturidade na Gestão de Pessoas da sua empresa e isso certamente deve estar se refletindo na qualidade do clima organizacional e na produtividade da sua empresa. Mas ainda existe um espaço importante para evoluir."
      }
    }
    return message
  }
})(jQuery);

/* //Jquery is enabled
(function (jQuery) {})(jQuery); */
