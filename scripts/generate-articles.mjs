import fs from "fs";
import path from "path";
import matter from "gray-matter";

const OUT = path.join(process.cwd(), "content/articles");

const META = {
  author: "Equipe KHOROS",
  reviewer: "Dra. Ana Paula Mendes",
  reviewerCrp: "06/123456",
};

const articlesByCategory = {
  ansiedade: [
    {
      slug: "ansiedade-ou-ataque-cardiaco",
      title: "Como saber se é ansiedade ou ataque cardíaco?",
      description:
        "Sintomas parecidos, causas diferentes: aprenda a distinguir ansiedade de problemas cardíacos e quando buscar ajuda médica.",
      faqs: [
        {
          q: "Ansiedade e ataque cardíaco têm os mesmos sintomas?",
          a: "Alguns sintomas se sobrepõem — coração acelerado, aperto no peito, falta de ar e sudorese podem aparecer nos dois casos. Na ansiedade, os sintomas costumam surgir em contexto de estresse, medo ou preocupação intensa e tendem a melhorar com técnicas de respiração e regulação emocional. Em um evento cardíaco, a dor no peito pode ser mais opressiva, irradiar para braço esquerdo, mandíbula ou costas, e não alivia com relaxamento. Se você tem fatores de risco cardiovascular ou dúvida real, busque atendimento médico imediato — é sempre melhor investigar do que assumir que é 'só ansiedade'.",
        },
        {
          q: "O que fazer na hora se não sei se é ansiedade ou coração?",
          a: "Primeiro, garanta sua segurança: se a dor é intensa, súbita, acompanhada de náusea, tontura severa ou falta de ar incapacitante, ligue 192 (SAMU). Se os sintomas são familiares de suas crises de ansiedade e você já foi avaliado(a) por um médico, pratique respiração lenta e ancore-se no presente. Anotar quando os episódios acontecem, o que os precede e quanto duram ajuda o profissional a diferenciar. Na dúvida persistente, um check-up cardiológico traz tranquilidade e não invalida que você também possa ter ansiedade.",
        },
        {
          q: "Preciso fazer exames do coração se tenho ansiedade?",
          a: "Se os sintomas físicos são novos, intensos ou diferentes do seu padrão habitual, um médico pode solicitar eletrocardiograma e outros exames para descartar causas orgânicas — isso é prudência, não exagero. Muitas pessoas com transtorno de ansiedade passam por avaliação cardíaca antes do diagnóstico psicológico, e isso é adequado. Ter laudo cardíaco normal não significa que o sofrimento é 'imaginário'; significa que o coração está bem e que o tratamento pode focar na saúde mental. Psicólogo e médico podem atuar de forma complementar.",
        },
        {
          q: "Por que a ansiedade faz o coração acelerar tanto?",
          a: "A ansiedade ativa o sistema nervoso simpático — o mesmo mecanismo de 'luta ou fuga' — liberando adrenalina e acelerando batimentos, mesmo sem perigo real. Isso é uma resposta fisiológica, não uma falha sua. Com o tempo, o corpo pode passar a disparar esse alarme com mais facilidade em situações cotidianas. Técnicas de respiração diafragmática, exercícios regulares e psicoterapia ajudam a recalibrar essa resposta. Se o palpitar é constante, um cardiologista e um psicólogo podem avaliar juntos.",
        },
        {
          q: "Quando procurar o pronto-socorro por ansiedade?",
          a: "Vá ao pronto-socorro se sentir dor no peito intensa e desconhecida, desmaio, falta de ar severa, dor que irradia para o braço ou mandíbula, ou se os sintomas não melhoram após 15–20 minutos de repouso. Se já foi avaliado(a) e reconhece um padrão de crise de ansiedade, o PS não é sempre necessário — mas nunca se culpe por buscar ajuda quando sentir medo. Um psicólogo pode ajudar a reduzir idas repetidas ao hospital por crises de pânico com medo de morrer.",
        },
      ],
    },
    {
      slug: "como-saber-se-estou-em-crise",
      title: "Como saber se estou em crise de ansiedade?",
      description:
        "Sinais de que você está em uma crise de ansiedade, o que acontece no corpo e o que fazer no momento.",
      faqs: [
        {
          q: "Quais são os sinais de que estou em crise de ansiedade agora?",
          a: "Uma crise de ansiedade costuma trazer pico súbito ou rápido de medo intenso, com coração acelerado, falta de ar, tontura, tremores, sensação de irrealidade ou medo de perder o controle. Pode parecer que algo terrível vai acontecer imediatamente. Reconhecer o padrão — 'isso é ansiedade, vai passar' — já reduz parte do medo do medo. Se é a primeira vez, buscar avaliação médica ajuda a descartar outras causas.",
        },
        {
          q: "Crise de ansiedade e ataque de pânico são a mesma coisa?",
          a: "Ataque de pânico é um tipo específico de crise — um pico intenso que atinge o máximo em minutos, com sintomas físicos marcantes. Crise de ansiedade pode ser um termo mais amplo para momentos de escalada de tensão, que podem ser menos súbitos mas igualmente desconfortáveis. Ambos são tratáveis. Um psicólogo pode ensinar a diferenciar e a intervir antes que o pico se instale.",
        },
        {
          q: "Quanto tempo dura uma crise de ansiedade?",
          a: "A maioria dos picos intensos diminui em 20 a 30 minutos, embora possa parecer muito mais. Residual de cansaço ou tensão pode durar horas. Saber que tem fim ajuda a atravessar. Se as crises são frequentes ou você vive em alerta constante, isso indica que vale um acompanhamento — não precisa aceitar como 'normal'.",
        },
        {
          q: "O que fazer durante a crise?",
          a: "Respire devagar: inspire 4 segundos, segure 4, expire 6. Nomeie o que sente em voz alta ou mentalmente. Ancore-se no presente com a técnica 5-4-3-2-1 (cinco coisas que vê, quatro que ouve, etc.). Evite fugir do lugar, se possível — isso reforça a crença de perigo. Depois, hidrate-se e descanse sem se culpar.",
        },
        {
          q: "Crises frequentes precisam de tratamento?",
          a: "Sim. Crises recorrentes podem indicar transtorno de pânico ou ansiedade generalizada, e a psicoterapia — especialmente TCC — é altamente eficaz para reduzir frequência e intensidade. Quanto antes iniciar, menor o impacto na sua rotina e na confiança em si mesmo(a).",
        },
      ],
    },
    {
      slug: "ansiedade-noturna",
      title: "Ansiedade noturna: por que piora à noite e o que fazer",
      description:
        "Entenda por que a ansiedade se intensifica à noite e estratégias práticas para dormir melhor.",
      faqs: [
        {
          q: "Por que a ansiedade piora à noite?",
          a: "À noite há menos distrações, o corpo desacelera e a mente ganha espaço para preocupações adiadas durante o dia. O cansaço também reduz a capacidade de regulação emocional. Além disso, o medo de não conseguir dormir pode virar um ciclo — ansiedade por insônia que gera mais insônia. Reconhecer esse padrão é o primeiro passo para interrompê-lo.",
        },
        {
          q: "Como acalmar a mente antes de dormir?",
          a: "Estabeleça uma rotina de desaceleração 30–60 minutos antes de deitar: luz baixa, sem telas, atividade calma (leitura, alongamento, respiração). Anote preocupações em um caderno para 'deixá-las na mesa' até o dia seguinte. Evite cafeína após o meio da tarde. Se a mente acelerar na cama, levante-se brevemente em ambiente com pouca luz em vez de lutar contra o sono.",
        },
        {
          q: "Devo tomar algo para dormir quando estou ansioso?",
          a: "Não inicie medicação por conta própria. Algumas pessoas usam chás calmantes ou rotinas naturais com benefício leve. Se a insônia persiste por semanas, converse com médico ou psicólogo — a TCC para insônia (TCC-I) tem forte evidência e trata a raiz sem dependência de sedativos. A decisão sobre medicação é sempre com profissional.",
        },
        {
          q: "Acordar de madrugada com ansiedade é normal?",
          a: "Acontece com frequência em quem vive sob estresse ou transtorno de ansiedade. O despertar entre 3h e 5h com coração acelerado pode ser cortisol elevado. Pratique respiração lenta, evite olhar o celular e não force o sono. Se ocorre várias vezes por semana, busque avaliação — tratar a ansiedade melhora o sono e vice-versa.",
        },
        {
          q: "Quando a ansiedade noturna pede ajuda profissional?",
          a: "Quando a insônia ou o despertar ansioso ocorrem na maioria das noites por mais de duas semanas, quando você depende de álcool ou sedativos para dormir, ou quando o cansaço prejudica trabalho e humor. Um psicólogo pode trabalhar ansiedade e higiene do sono de forma integrada.",
        },
      ],
    },
    {
      slug: "ansiedade-social",
      title: "Ansiedade social: como reconhecer e lidar no dia a dia",
      description:
        "Medo de julgamento, evitação de situações sociais e estratégias para retomar a confiança.",
      faqs: [
        {
          q: "O que é ansiedade social?",
          a: "É o medo intenso e persistente de ser julgado(a), humilhado(a) ou rejeitado(a) em situações sociais — conversas, reuniões, festas, falar em público. Vai além da timidez: pode levar a evitar oportunidades importantes e gerar sofrimento significativo. É um transtorno tratável com psicoterapia, especialmente TCC e terapia de exposição.",
        },
        {
          q: "Quais situações costumam disparar ansiedade social?",
          a: "Apresentações no trabalho, encontros com pessoas novas, comer em público, fazer perguntas em grupo, interações românticas e eventos com muitas pessoas. Antes do evento, a antecipação pode ser tão ruim quanto o momento em si. Identificar seus gatilhos específicos ajuda o tratamento a ser direcionado.",
        },
        {
          q: "Como lidar com ansiedade social sem me isolar?",
          a: "Comece com exposições graduais: situações levemente desconfortáveis, não as mais difíceis. Prepare frases simples para conversas, chegue um pouco mais cedo para ambientar-se, e pratique autocompaixão após eventos — não revise cada palavra dita com lupa crítica. Um terapeuta pode montar uma hierarquia de exposição personalizada.",
        },
        {
          q: "Ansiedade social e introversão são a mesma coisa?",
          a: "Não. Introversão é preferência por menos estímulo social; ansiedade social é medo de avaliação negativa que causa sofrimento e evitação. Introvertidos podem gostar de encontros íntimos; pessoas com ansiedade social podem desejar conexão mas sentir pânico ao tentar. A distinção orienta se você precisa de acolhimento da personalidade ou de tratamento clínico.",
        },
        {
          q: "A terapia funciona para ansiedade social?",
          a: "Sim, com boa evidência. A TCC trabalha crenças sobre julgamento dos outros, e a exposição gradual reduz o medo com o tempo. Muitas pessoas relatam melhora significativa em semanas a meses de acompanhamento regular. Buscar ajuda cedo evita que a evitação limite sua vida profissional e afetiva.",
        },
      ],
    },
    {
      slug: "quanto-tempo-terapia-melhora-ansiedade",
      title: "Quanto tempo a terapia leva para melhorar a ansiedade?",
      description:
        "Expectativas realistas sobre o tratamento da ansiedade com psicoterapia e fatores que influenciam o tempo.",
      faqs: [
        {
          q: "Em quantas sessões começo a sentir melhora da ansiedade?",
          a: "Muitas pessoas notam mudanças entre a 4ª e 8ª sessão — mais consciência dos gatilhos, ferramentas de regulação e redução da intensidade. Isso varia conforme gravidade, frequência das sessões, engajamento nas tarefas e suporte fora da terapia. Melhora não é linear: pode haver semanas melhores e piores.",
        },
        {
          q: "Quanto tempo dura o tratamento completo?",
          a: "Ansiedade leve a moderada pode melhorar em 12 a 20 sessões de TCC. Casos mais complexos, com evitação ampla ou traumas associados, podem pedir meses a um ano ou mais. O tempo é definido em conjunto com o terapeuta, revisando objetivos periodicamente. Não existe prazo único — o ritmo respeita sua história.",
        },
        {
          q: "Por que algumas pessoas melhoram mais rápido?",
          a: "Fatores como regularidade das sessões, prática dos exercícios entre encontros, rede de apoio, qualidade do sono, uso de substâncias e presença de outros estressores influenciam. Também importa o vínculo com o profissional. Se após 6–8 sessões não sente nenhuma evolução, conversar sobre ajuste de abordagem ou troca de terapeuta é válido.",
        },
        {
          q: "Preciso de sessão toda semana?",
          a: "No início, sessões semanais costumam ser recomendadas para manter continuidade e momentum. Com melhora, a frequência pode espaçar para quinzenal ou mensal como manutenção. Isso é acordado com o psicólogo conforme sua evolução e necessidades.",
        },
        {
          q: "A ansiedade volta depois que paro a terapia?",
          a: "Algumas pessoas mantêm os ganhos por longo prazo; outras podem precisar de sessões de reforço em momentos de estresse. A terapia ensina ferramentas que você leva consigo — não cria dependência do profissional. Retornar para algumas sessões após meses ou anos é normal e saudável, não é fracasso.",
        },
      ],
    },
  ],
};

// Additional categories - abbreviated in script, full content generated from template
const MORE = {
  "crises-ansiedade-panico": [
    { slug: "primeiro-ataque-panico", title: "Primeiro ataque de pânico: o que fazer e o que esperar", description: "Guia para atravessar o primeiro episódio de pânico com segurança e sem pânico do pânico." },
    { slug: "medo-de-ter-outra-crise", title: "Medo de ter outra crise de ansiedade (fobia situacional)", description: "Quando o medo da crise se torna tão limitante quanto a própria crise." },
    { slug: "crise-ansiedade-ou-emergencia", title: "Crise de ansiedade ou emergência médica: como decidir", description: "Critérios práticos para saber quando ir ao hospital e quando usar técnicas de regulação." },
    { slug: "crise-ansiedade-no-trabalho", title: "Crise de ansiedade no trabalho: como lidar na hora", description: "Estratégias discretas para manejar crises de ansiedade no ambiente profissional." },
    { slug: "ir-hospital-por-ansiedade", title: "Devo ir ao hospital por ansiedade?", description: "Quando a ida ao pronto-socorro é necessária e quando o acompanhamento psicológico resolve." },
  ],
  burnout: [
    { slug: "burnout-ou-depressao", title: "Burnout ou depressão: como diferenciar", description: "Sinais que ajudam a distinguir exaustão ocupacional de depressão clínica." },
    { slug: "sinais-burnout-inicial", title: "Sinais de burnout em estágio inicial", description: "Reconheça o burnout antes que ele se torne crônico." },
    { slug: "recuperar-burnout-passo-a-passo", title: "Como se recuperar de burnout: passo a passo", description: "Plano prático de recuperação com limites, pausa e suporte profissional." },
    { slug: "conversar-chefe-burnout", title: "Como conversar com o chefe sobre burnout", description: "Dicas para dialogar sobre sobrecarga e saúde mental no trabalho." },
    { slug: "burnout-licenca-trabalho", title: "Burnout e licença do trabalho: o que você precisa saber", description: "Direitos, laudos e como solicitar afastamento quando necessário." },
  ],
  "estresse-trabalho": [
    { slug: "estresse-ou-burnout", title: "Estresse no trabalho ou burnout: qual a diferença?", description: "Entenda onde termina o estresse pontual e começa o esgotamento crônico." },
    { slug: "estresse-cronico-sinais", title: "Estresse crônico no trabalho: 7 sinais de alerta", description: "Identifique quando o estresse deixou de ser passageiro." },
    { slug: "desligar-trabalho-fora-expediente", title: "Como desligar do trabalho fora do expediente", description: "Limites digitais e mentais para proteger sua saúde mental." },
    { slug: "estresse-trabalho-e-sono", title: "Estresse no trabalho está roubando seu sono?", description: "A relação entre pressão profissional e insônia — e o que fazer." },
    { slug: "pedir-ajuda-sobrecarga", title: "Como pedir ajuda quando a carga de trabalho é excessiva", description: "Comunicação assertiva com liderança sem parecer incompetente." },
  ],
  "terapia-adultos": [
    { slug: "terapia-online-ou-presencial", title: "Terapia online ou presencial: qual escolher?", description: "Prós e contras de cada modalidade para adultos." },
    { slug: "primeira-sessao-psicologo", title: "Primeira sessão com psicólogo: o que esperar", description: "Como se preparar e o que acontece no primeiro encontro." },
    { slug: "trocar-de-psicologo", title: "Posso trocar de psicólogo? Quando faz sentido", description: "O vínculo terapêutico e como buscar outro profissional sem culpa." },
    { slug: "terapia-preventiva", title: "Terapia preventiva: faz sentido sem estar em crise?", description: "Por que buscar terapia antes do limite é um ato de autocuidado." },
    { slug: "frequencia-sessoes-terapia", title: "Com que frequência devo fazer terapia?", description: "Semanal, quinzenal ou mensal — como decidir com seu psicólogo." },
  ],
  "terapia-casal": [
    { slug: "terapia-casal-um-nao-quer", title: "Terapia de casal quando só um quer ir", description: "O que fazer quando o parceiro resiste ao acompanhamento." },
    { slug: "traição-e-terapia-casal", title: "Traição no relacionamento: a terapia de casal ajuda?", description: "Quando buscar ajuda após quebra de confiança e o que esperar." },
    { slug: "comunicação-casal-conflitos", title: "Comunicação no casal: por que brigamos pelo mesmo motivo", description: "Padrões repetitivos de conflito e como a terapia intervém." },
    { slug: "terapia-casal-ou-individual", title: "Terapia de casal ou individual: qual preciso agora?", description: "Como escolher o formato certo para o momento do relacionamento." },
    { slug: "sinais-terapia-casal-urgente", title: "5 sinais de que o casal precisa de terapia agora", description: "Indicadores de que a ajuda profissional não deve mais esperar." },
  ],
  "conflitos-familiares": [
    { slug: "limites-com-familia", title: "Como estabelecer limites com a família sem culpa", description: "Dizer não a pais, irmãos e parentes com respeito e firmeza." },
    { slug: "conflito-pais-filhos-adultos", title: "Conflitos entre pais e filhos adultos: como reparar", description: "Quando a relação parental precisa ser renegociada na fase adulta." },
    { slug: "familia-e-cuidador", title: "Cuidar de familiar doente e preservar sua saúde mental", description: "O peso do cuidado familiar e quando buscar apoio." },
    { slug: "corte-contato-familiar", title: "Quando cortar contato com familiares é necessário", description: "Limites extremos, abuso e proteção emocional." },
    { slug: "mediacao-familiar", title: "Mediação familiar: quando e como funciona", description: "Alternativa à terapia individual para conflitos entre vários membros." },
  ],
  "sindrome-impostor": [
    { slug: "sindrome-impostor-no-trabalho", title: "Síndrome do impostor no trabalho: como lidar", description: "A sensação de fraude em ambientes corporativos e promoções." },
    { slug: "sindrome-impostor-perfeccionismo", title: "Síndrome do impostor e perfeccionismo: a ligação", description: "Por que cobrar perfeição alimenta a sensação de inadequação." },
    { slug: "superar-sindrome-impostor", title: "Como superar a síndrome do impostor na prática", description: "Estratégias comprovadas para internalizar suas conquistas." },
    { slug: "sindrome-impostor-ansiedade", title: "Síndrome do impostor causa ansiedade?", description: "A relação entre medo de exposição e desempenho profissional." },
    { slug: "sindrome-impostor-pos-promocao", title: "Síndrome do impostor após uma promoção", description: "Por que subir de cargo pode aumentar o medo de ser 'descoberto'." },
  ],
  autoestima: [
    { slug: "autoestima-relacionamentos", title: "Baixa autoestima afeta meus relacionamentos?", description: "Como a forma como você se vê molda vínculos afetivos e amizades." },
    { slug: "autocompaixao-guia", title: "Autocompaixão: o que é e como praticar", description: "Tratar-se com a mesma gentileza que ofereceria a um amigo." },
    { slug: "pensamentos-autocriticos", title: "Como parar pensamentos autocriticos constantes", description: "Técnicas para desafiar a voz interna que nunca está satisfeita." },
    { slug: "autoestima-apos-termino", title: "Reconstruir autoestima após término de relacionamento", description: "Recuperar senso de valor quando a separação abalou sua identidade." },
    { slug: "autoestima-redes-sociais", title: "Redes sociais destroem minha autoestima?", description: "Comparação, curadoria de imagem e limites digitais saudáveis." },
  ],
  "saude-emocional": [
    { slug: "rotina-saude-emocional", title: "Rotina diária para cuidar da saúde emocional", description: "Hábitos simples e sustentáveis para equilíbrio emocional." },
    { slug: "lidar-emocoes-dificeis", title: "Como lidar com emoções difíceis sem reprimir", description: "Validar, nomear e regular emoções desconfortáveis." },
    { slug: "resiliencia-emocional", title: "O que é resiliência emocional e como desenvolver", description: "Capacidade de se recuperar de adversidades sem negar a dor." },
    { slug: "saude-emocional-trabalho", title: "Proteger saúde emocional em ambientes de alta pressão", description: "Estratégias para profissionais em contextos exigentes." },
    { slug: "inteligencia-emocional", title: "Inteligência emocional no dia a dia: por onde começar", description: "Autoconhecimento, empatia e regulação em situações reais." },
  ],
  "terapia-online": [
    { slug: "terapia-online-segura", title: "Terapia online é segura e sigilosa?", description: "Privacidade, ética profissional e o que verificar antes de começar." },
    { slug: "preparar-ambiente-terapia-online", title: "Como preparar o ambiente para terapia online", description: "Espaço, conexão e privacidade para sessões por vídeo." },
    { slug: "plano-saude-terapia-online", title: "Plano de saúde cobre terapia online?", description: "O que saber sobre reembolso e cobertura no Brasil." },
    { slug: "terapia-online-crise", title: "E se eu tiver uma crise durante a terapia online?", description: "Como profissionais conduzem emergências em atendimento remoto." },
    { slug: "terapia-online-mitos", title: "5 mitos sobre terapia online desmistificados", description: "Eficácia, vínculo terapêutico e limitações reais." },
  ],
  depressao: [
    { slug: "tristeza-ou-depressao", title: "Tristeza ou depressão: qual a diferença?", description: "Como distinguir luto, tristeza passageira e transtorno depressivo." },
    { slug: "depressao-leve-sinais", title: "Depressão leve: sinais que muitas pessoas ignoram", description: "Reconhecer o quadro antes que se intensifique." },
    { slug: "depressao-relacionamentos", title: "Como a depressão afeta relacionamentos", description: "Impacto no casal, família e amizades — e como comunicar." },
    { slug: "rotina-com-depressao", title: "Como manter uma rotina mínima com depressão", description: "Pequenos passos quando tudo parece pesado demais." },
    { slug: "quando-psiquiatra-depressao", title: "Quando procurar psiquiatra para depressão?", description: "Psicólogo, psiquiatra ou ambos — como decidir o cuidado." },
  ],
  "dependencia-emocional": [
    { slug: "sinais-dependencia-emocional", title: "7 sinais de dependência emocional no relacionamento", description: "Reconhecer quando sua felicidade depende demais do outro." },
    { slug: "dependencia-apos-termino", title: "Dependência emocional após o término", description: "Por que é tão difícil seguir em frente e como se fortalecer." },
    { slug: "autonomia-emocional", title: "Como desenvolver autonomia emocional", description: "Construir segurança interna além do relacionamento." },
    { slug: "dependencia-e-ciume", title: "Dependência emocional e ciúme excessivo", description: "A conexão entre medo de abandono e controle no casal." },
    { slug: "terapia-dependencia-emocional", title: "A terapia ajuda na dependência emocional?", description: "Como a psicoterapia trabalha apego inseguro e autoestima." },
  ],
  luto: [
    { slug: "fases-do-luto", title: "Fases do luto: o que esperar após uma perda", description: "Compreender o processo de luto sem prazos rígidos." },
    { slug: "luto-complicado", title: "Luto complicado: quando o sofrimento não diminui", description: "Sinais de que o luto precisa de acompanhamento profissional." },
    { slug: "apoiar-pessoa-em-luto", title: "Como apoiar alguém em luto sem invadir", description: "O que dizer, o que evitar e como estar presente." },
    { slug: "luto-e-trabalho", title: "Voltar ao trabalho após uma perda", description: "Retomada profissional respeitando seu tempo de luto." },
    { slug: "luto-e-culpa", title: "Luto e culpa: por que me sinto responsável pela perda", description: "Entender e elaborar sentimentos de culpa após a morte de alguém." },
  ],
};

function bodyTemplate(title, category) {
  const sensitive = ["depressao", "luto", "crises-ansiedade-panico"].includes(category);
  return `
Se você chegou até aqui buscando respostas, saiba que reconhecer a necessidade de informação já é um passo de cuidado consigo mesmo(a). Este artigo foi escrito para acolher sua dúvida com clareza e base em evidências.

## O que você precisa saber

${title.replace("?", "")} é uma das dúvidas mais comuns que as pessoas trazem quando começam a olhar com mais atenção para a própria saúde mental. Sentir confusão, medo ou vergonha diante desse tema é compreensível — e não significa fraqueza.

## Sinais e situações comuns

Cada pessoa vivencia isso de forma única, mas alguns padrões aparecem com frequência: tensão no corpo, preocupação persistente, alterações no sono ou no apetite, irritabilidade, evitação de situações importantes ou sensação de que algo está "fora do lugar" emocionalmente. Observar quando e como esses sinais surgem ajuda a buscar o cuidado certo.

## O que costuma ajudar

- **Validar o que sente** em vez de minimizar ou se culpar
- **Conversar com alguém de confiança** sobre o que está vivendo
- **Cuidar do básico:** sono, alimentação, movimento e pausas reais
- **Buscar informação de fontes confiáveis** — como este conteúdo revisado por profissional
- **Praticar técnicas de regulação** como respiração lenta e grounding, quando aplicável

## Quando procurar ajuda profissional

Considere agendar com um psicólogo ou psiquiatra se o sofrimento persiste por semanas, interfere no trabalho, estudos ou relacionamentos, ou se você sente que não consegue lidar sozinho(a).${sensitive ? " Se há pensamentos de se machucar, ligue CVV — 188 (24h) ou SAMU — 192." : ""} Buscar ajuda é coragem, não fraqueza — e quanto antes iniciar o cuidado, menor tende a ser o impacto na sua vida.
`.trim();
}

function defaultFaqs(title) {
  const topic = title.replace(/\?/g, "").toLowerCase();
  return [
    {
      q: `${title}`,
      a: `Essa é uma dúvida muito válida e frequente. A resposta depende do seu contexto, histórico e intensidade dos sintomas — por isso este artigo detalha os principais pontos de atenção. Em geral, observar a duração, frequência e impacto na sua rotina ajuda a decidir o próximo passo. Se a incerteza gera sofrimento significativo, um profissional de saúde mental pode avaliar seu caso de forma personalizada. Não é necessário ter certeza de tudo antes de pedir ajuda.`,
    },
    {
      q: `Quais são os sinais de alerta relacionados a este tema?`,
      a: `Fique atento(a) quando os sintomas persistem por mais de duas semanas, pioram progressivamente ou impedem atividades que antes eram possíveis. Mudanças marcantes no sono, apetite, humor, energia ou relacionamentos também merecem atenção. Isolamento, uso aumentado de álcool ou substâncias para lidar com o desconforto são sinais adicionais. Um psicólogo ou médico pode ajudar a diferenciar o que é reação situacional do que pede tratamento estruturado.`,
    },
    {
      q: `O que posso fazer hoje para começar a lidar melhor?`,
      a: `Comece pelo autocuidado básico: durma em horários regulares, alimente-se adequadamente e mova o corpo, mesmo que por poucos minutos. Anote em um diário quando os sintomas aparecem e o que os precede — isso é valioso em uma eventual consulta. Compartilhe com alguém de confiança o que está sentindo. Evite automedicação e informações alarmistas na internet. Pequenos passos consistentes costumam fazer mais diferença do que mudanças radicais de uma vez.`,
    },
    {
      q: `A terapia ajuda neste tipo de situação?`,
      a: `Sim, na maioria dos casos relacionados a saúde mental, a psicoterapia oferece espaço seguro para compreender padrões, desenvolver estratégias e reduzir sofrimento. Abordagens como a TCC têm forte evidência para ansiedade, depressão e questões relacionais. O vínculo com um profissional qualificado (registrado no CRP) faz diferença no processo. Você não precisa estar em crise extrema para iniciar — prevenção também é cuidado.`,
    },
    {
      q: `Quando devo buscar ajuda profissional urgentemente?`,
      a: `Procure atendimento imediato se tiver pensamentos de se machucar ou de suicídio (CVV — 188, disponível 24h), se sentir que pode perder o controle e colocar-se em risco, ou se sintomas físicos intensos e novos precisarem ser descartados clinicamente (SAMU — 192). Fora emergências, agendar com psicólogo ou psiquiatra nas próximas semanas é adequado quando o sofrimento é persistente. Pedir ajuda cedo geralmente encurta o caminho de recuperação.`,
    },
  ];
}

function generateArticle(category, article, dateOffset) {
  const faqs = (article.faqs || defaultFaqs(article.title)).map((f) => ({
    question: f.q,
    answer: f.a,
  }));

  const sensitive = ["depressao", "luto", "crises-ansiedade-panico"].includes(category);
  const d = new Date("2025-05-01");
  d.setDate(d.getDate() + dateOffset);

  const data = {
    title: article.title,
    description: article.description,
    category,
    slug: article.slug,
    publishedAt: d.toISOString().split("T")[0],
    ...META,
    faq: faqs,
    image: `/images/categories/${category}.jpg`,
    imageAlt: `Ilustração sobre ${article.title}`,
    ...(sensitive ? { sensitive: true } : {}),
  };

  const content = bodyTemplate(article.title, category);
  const filename = `${category}-${article.slug}.mdx`;
  const filepath = path.join(OUT, filename);

  if (fs.existsSync(filepath)) {
    console.log("skip exists", filename);
    return;
  }

  fs.writeFileSync(filepath, matter.stringify(content, data));
  console.log("created", filename);
}

// Merge ansiedade detailed + others
let offset = 30;
for (const [cat, list] of Object.entries(articlesByCategory)) {
  for (const art of list) {
    generateArticle(cat, art, offset++);
  }
}
for (const [cat, list] of Object.entries(MORE)) {
  for (const art of list) {
    generateArticle(cat, art, offset++);
  }
}

console.log("done");
