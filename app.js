/* =========================================================
   Agentes de Paz · Lógica de la experiencia
   ---------------------------------------------------------
   Para editar el contenido, modifica solo estas constantes:
     - DIMENSIONS  → las 5 dimensiones evaluadas
     - QUESTIONS   → escenarios, alternativas y puntuaciones
     - LEVELS      → rangos y mensajes de resultado
     - QUOTES      → frases finales
   Puntuación de cada alternativa: objeto `scores` con valores
   de 0 a 3 por dimensión (emp, dia, nov, jus, res). Una
   dimensión solo cuenta en una pregunta si aparece en alguna
   de sus alternativas.
   ========================================================= */

"use strict";

/* ---------------- Dimensiones ---------------- */
const DIMENSIONS = {
  emp: {
    name: "Empatía y respeto",
    short: "Empatía",
    color: "#ff9f8a",
    desc: "Reconocer la dignidad y los sentimientos de las demás personas, incluso cuando piensan distinto.",
    strength: "Sueles ponerte en el lugar de los demás y cuidar su dignidad, incluso en momentos de tensión.",
    growth: "Antes de reaccionar o decidir que «no es asunto tuyo», detente a preguntarte cómo se siente la otra persona.",
    recs: [
      "Practica la escucha activa: en tu próxima conversación difícil, repite con tus palabras lo que entendiste antes de responder («Lo que me dices es que…»).",
      "Antes de juzgar una situación, pregúntate: ¿qué podría estar viviendo esta persona que yo no alcanzo a ver?",
      "Revisa tu lenguaje cotidiano: identifica una expresión que estigmatice a algún grupo y deja de usarla."
    ]
  },
  dia: {
    name: "Diálogo y comunicación",
    short: "Diálogo",
    color: "#7cc4ff",
    desc: "Expresar lo que piensas y sientes con claridad, escuchar y construir acuerdos.",
    strength: "Prefieres hablar las cosas, escuchar distintas versiones y buscar acuerdos en lugar de imponer.",
    growth: "Intenta expresar tu desacuerdo con palabras claras y respetuosas, en lugar de callar, cambiar de tema o responder con ironía.",
    recs: [
      "Usa mensajes en primera persona: «Yo me siento ___ cuando ___ y me gustaría ___», en lugar de acusar con «tú siempre…».",
      "Cuando una conversación se caliente, propón retomarla más tarde… y cumple ese acuerdo.",
      "Antes de opinar en redes sociales, pregúntate si lo dirías igual cara a cara."
    ]
  },
  nov: {
    name: "Resolución no violenta",
    short: "No violencia",
    color: "#3cc8b4",
    desc: "Transformar los conflictos sin agresión física, verbal ni simbólica, y sin evadirlos.",
    strength: "Mantienes la calma y eliges caminos que reducen la tensión en lugar de escalarla.",
    growth: "Identifica qué situaciones te hacen reaccionar de forma impulsiva —o evitar el conflicto— y prepara una pausa antes de responder.",
    recs: [
      "Aplica la regla de la pausa: respira diez segundos o aléjate un momento antes de responder a una ofensa.",
      "Cuando veas un conflicto entre otras personas, propón una mediación: que cada parte hable sin interrupciones y busquen juntas una salida.",
      "Recuerda que responder a la violencia con violencia —también verbal o en redes— suele multiplicarla."
    ]
  },
  jus: {
    name: "Justicia, inclusión y solidaridad",
    short: "Justicia",
    color: "#b9a7ff",
    desc: "Reconocer desigualdades y violencias estructurales o culturales, y actuar para incluir.",
    strength: "Detectas injusticias y exclusiones, incluso las que están normalizadas, y te posicionas a favor de la dignidad de todas las personas.",
    growth: "Observa las exclusiones «normales» de tu entorno —chistes, estereotipos, desigualdades— y pregúntate a quién afectan.",
    recs: [
      "Esta semana, invita a participar a alguien que suele quedar fuera de tu grupo, clase o actividad.",
      "Cuando escuches un chiste o comentario que refuerce un estereotipo, nómbralo con tacto: «Creo que eso puede lastimar a alguien».",
      "Infórmate sobre una desigualdad de tu comunidad (educación, seguridad, servicios) y comparte lo que aprendas con datos confiables."
    ]
  },
  res: {
    name: "Responsabilidad y participación social",
    short: "Responsabilidad",
    color: "#f5cf6b",
    desc: "Asumir que la paz también depende de ti y participar en lo colectivo.",
    strength: "Entiendes que la paz no se delega: participas, propones y te haces cargo de tu papel en la comunidad.",
    growth: "Recuerda que no intervenir también es una decisión. Busca formas seguras de participar y de pedir apoyo.",
    recs: [
      "Identifica los canales de apoyo de tu escuela o comunidad (orientación, líneas de ayuda, mecanismos de denuncia) y tenlos a la mano.",
      "Súmate a una iniciativa colectiva —comité, voluntariado, asamblea— que trabaje por un problema de tu entorno.",
      "Cuando presencies violencia, no te quedes como espectador: actúa de forma segura (reporta, acompaña, pide ayuda)."
    ]
  }
};

/* Recomendaciones para quienes obtienen resultados muy altos */
const ADVANCED_RECS = [
  { dim: "dia", text: "Fórmate como mediador o mediadora: busca talleres de mediación escolar o comunitaria y ofrece tu apoyo en tu entorno." },
  { dim: "res", text: "Multiplica: comparte esta reflexión con tu grupo y abran una conversación sobre cómo prevenir la violencia en su espacio." },
  { dim: "jus", text: "Lleva tu compromiso a lo estructural: participa en un proyecto que atienda una desigualdad concreta de tu comunidad." }
];

/* ---------------- Íconos ---------------- */
const ICONS = {
  escuela: '<svg viewBox="0 0 24 24"><path d="M3 9l9-5 9 5-9 5-9-5z"/><path d="M7 11v5c0 1.5 2.5 3 5 3s5-1.5 5-3v-5"/><path d="M21 9v6"/></svg>',
  familia: '<svg viewBox="0 0 24 24"><path d="M4 11l8-7 8 7"/><path d="M6 10v10h12V10"/><path d="M10 20v-5h4v5"/></svg>',
  amistad: '<svg viewBox="0 0 24 24"><circle cx="8" cy="8" r="3"/><circle cx="16.5" cy="9" r="2.5"/><path d="M2.5 20c.5-3.5 2.8-5.5 5.5-5.5s5 2 5.5 5.5"/><path d="M14 14.6c.8-.4 1.6-.6 2.5-.6 2.3 0 4.2 1.7 4.6 5"/></svg>',
  redes: '<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.8 7L4 20l1.1-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01"/></svg>',
  sociedad: '<svg viewBox="0 0 24 24"><path d="M3 21h18"/><path d="M5 21V10l4-3v14"/><path d="M9 21V5l6 3v13"/><path d="M15 21v-9l4 2v7"/></svg>',
  reflexion: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>'
};
const CATEGORY_LABEL = {
  escuela: "Escuela",
  familia: "Familia",
  amistad: "Amistades",
  redes: "Redes sociales",
  sociedad: "Sociedad",
  reflexion: "Reflexión personal"
};

/* ---------------- Escenarios ---------------- */
const QUESTIONS = [
  {
    id: "q1", category: "escuela", concept: "Mediación",
    title: "Conflicto entre compañeros",
    scenario: "Dos compañeros comienzan a discutir en el salón y ambos creen tener la razón. La tensión sube y el resto del grupo observa.",
    prompt: "¿Qué harías?",
    options: [
      { id: "a", text: "Escucharía a ambos e intentaría promover el diálogo.", scores: { emp: 3, dia: 3, nov: 3, res: 2 } },
      { id: "b", text: "Evitaría involucrarme porque no es mi problema.", scores: { emp: 1, dia: 0, nov: 1, res: 0 } },
      { id: "c", text: "Apoyaría a la persona con la que tengo más confianza.", scores: { emp: 1, dia: 1, nov: 1, res: 1 } },
      { id: "d", text: "Intentaría detener la discusión sin escuchar sus argumentos.", scores: { emp: 0, dia: 0, nov: 2, res: 2 } }
    ],
    insight: "Mediar no es decidir quién gana: es crear condiciones para que ambas partes se escuchen. La escucha activa convierte una discusión en un diálogo."
  },
  {
    id: "q2", category: "escuela", concept: "Inclusión",
    title: "Alguien queda fuera",
    scenario: "Observas que un compañero está siendo excluido de una actividad por ser diferente al resto del grupo.",
    prompt: "¿Cómo reaccionas?",
    options: [
      { id: "a", text: "Intervengo de manera respetuosa y promuevo su inclusión.", scores: { emp: 3, jus: 3, res: 3 } },
      { id: "b", text: "No participo en la exclusión, pero tampoco intervengo.", scores: { emp: 1, jus: 1, res: 0 } },
      { id: "c", text: "Hablo con él después, pero evito enfrentar la situación.", scores: { emp: 3, jus: 1, res: 1 } },
      { id: "d", text: "Considero que es un problema que deben resolver entre ellos.", scores: { emp: 0, jus: 0, res: 0 } }
    ],
    insight: "La exclusión es una forma de violencia. Quien observa en silencio también influye en la norma del grupo; una intervención respetuosa puede cambiarla."
  },
  {
    id: "q3", category: "redes", concept: "Ciberviolencia",
    title: "Comentarios que hieren",
    scenario: "Encuentras comentarios ofensivos dirigidos hacia una persona en redes sociales. Cada vez se suman más.",
    prompt: "¿Qué haces?",
    options: [
      { id: "a", text: "Reporto el contenido y apoyo a la persona afectada.", scores: { emp: 3, jus: 3, nov: 3, res: 3 } },
      { id: "b", text: "Ignoro los comentarios.", scores: { emp: 0, jus: 0, nov: 1, res: 0 } },
      { id: "c", text: "Respondo con insultos para defender a la víctima.", scores: { emp: 1, jus: 2, nov: 0, res: 1 } },
      { id: "d", text: "Comparto la publicación para que más personas sepan lo ocurrido.", scores: { emp: 0, jus: 1, nov: 1, res: 1 } }
    ],
    insight: "Responder con insultos o difundir la publicación amplifica el daño. Reportar y acompañar a la persona afectada corta el ciclo sin reproducir la violencia."
  },
  {
    id: "q4", category: "familia", concept: "Violencia cultural",
    title: "Un comentario en la mesa",
    scenario: "Durante una comida familiar, un familiar hace un comentario despectivo sobre las personas migrantes. Algunos se ríen; otros guardan silencio.",
    prompt: "¿Qué haces?",
    options: [
      { id: "a", text: "Expreso con calma que no estoy de acuerdo y comparto otra perspectiva.", scores: { emp: 2, dia: 3, nov: 3, jus: 3, res: 2 } },
      { id: "b", text: "Cambio de tema para que no haya tensión en la comida.", scores: { emp: 1, dia: 1, nov: 2, jus: 0, res: 0 } },
      { id: "c", text: "Le respondo con sarcasmo para que quede en evidencia frente a todos.", scores: { emp: 0, dia: 0, nov: 1, jus: 2, res: 1 } },
      { id: "d", text: "No digo nada en ese momento, pero después lo platico con él en privado.", scores: { emp: 3, dia: 3, nov: 3, jus: 2, res: 2 } }
    ],
    insight: "Los comentarios despectivos normalizados son violencia cultural: legitiman la discriminación. Tanto el desacuerdo sereno en el momento como la conversación privada son formas valiosas de cuestionarlos."
  },
  {
    id: "q5", category: "amistad", concept: "Violencia en la pareja",
    title: "Una confidencia difícil",
    scenario: "Tu mejor amiga te cuenta que su pareja revisa su celular, le dice con quién puede salir y se enoja si no responde de inmediato. Ella dice que «es porque la quiere».",
    prompt: "¿Cómo respondes?",
    options: [
      { id: "a", text: "La escucho sin juzgarla, le digo que no es su culpa y le ofrezco acompañarla a buscar orientación profesional.", scores: { emp: 3, dia: 3, nov: 3, res: 3 } },
      { id: "b", text: "Le digo que termine esa relación ya, o que no me vuelva a contar nada.", scores: { emp: 1, dia: 1, nov: 2, res: 1 } },
      { id: "c", text: "Busco a su pareja para enfrentarla y dejarle claro que no lo voy a permitir.", scores: { emp: 1, dia: 0, nov: 0, res: 2 } },
      { id: "d", text: "No opino: es su relación y no quiero meterme.", scores: { emp: 0, dia: 0, nov: 1, res: 0 } }
    ],
    insight: "El control y el aislamiento son señales de violencia en la pareja. Escuchar sin juzgar y acompañar a buscar apoyo especializado suele ser más eficaz —y más seguro— que presionar o confrontar."
  },
  {
    id: "q6", category: "redes", concept: "Responsabilidad del espectador",
    title: "El meme del grupo",
    scenario: "En el grupo de WhatsApp del salón circula una foto editada de un compañero para burlarse de su apariencia. Ya tiene muchas reacciones de risa.",
    prompt: "¿Qué haces?",
    options: [
      { id: "a", text: "No la reenvío y escribo en el grupo que burlarse así no está bien.", scores: { emp: 2, dia: 2, nov: 3, jus: 3, res: 3 } },
      { id: "b", text: "Salgo del grupo en silencio para no ser parte de eso.", scores: { emp: 1, dia: 0, nov: 2, jus: 1, res: 0 } },
      { id: "c", text: "Reacciono con un emoji para no quedar mal con los demás.", scores: { emp: 0, dia: 0, nov: 1, jus: 0, res: 0 } },
      { id: "d", text: "Le escribo en privado al compañero para saber cómo está y, si quiere, lo acompaño a reportarlo.", scores: { emp: 3, dia: 2, nov: 3, jus: 2, res: 3 } }
    ],
    insight: "En los grupos digitales la responsabilidad se diluye: «si todos se ríen, no pasa nada». Romper el silencio en el grupo y acompañar a la persona afectada son caminos complementarios."
  },
  {
    id: "q7", category: "sociedad", concept: "Violencia estructural",
    title: "La calle sin luz",
    scenario: "En tu ciudad, la zona donde viven familias de menos recursos no tiene alumbrado público y han ocurrido varios asaltos. En una reunión vecinal, alguien dice: «Es su culpa por vivir ahí».",
    prompt: "¿Qué postura tomas?",
    options: [
      { id: "a", text: "Propongo organizarnos con las familias de esa zona para exigir al municipio el alumbrado y la seguridad.", scores: { dia: 3, jus: 3, res: 3 } },
      { id: "b", text: "Pienso que es responsabilidad del gobierno y que los vecinos no podemos hacer nada.", scores: { dia: 0, jus: 1, res: 0 } },
      { id: "c", text: "Apoyo la idea de poner rejas para que la gente de esa zona no pase por nuestras calles.", scores: { dia: 0, jus: 0, res: 1 } },
      { id: "d", text: "Dono dinero si alguien organiza algo, pero prefiero no involucrarme directamente.", scores: { dia: 0, jus: 2, res: 2 } }
    ],
    insight: "La violencia estructural se expresa en desigualdades de servicios y oportunidades. Culpar a quien la padece la invisibiliza; la organización colectiva busca transformarla."
  },
  {
    id: "q8", category: "escuela", concept: "Comunicación asertiva",
    title: "Te culpan injustamente",
    scenario: "En una exposición en equipo, un compañero te culpa frente a todo el grupo de un error que en realidad cometió él.",
    prompt: "¿Cómo reaccionas?",
    options: [
      { id: "a", text: "Respiro, le pido hablar en privado después de la clase y expongo los hechos con calma.", scores: { emp: 2, dia: 3, nov: 3, jus: 2 } },
      { id: "b", text: "Lo desmiento en ese momento, elevando la voz para que todos sepan la verdad.", scores: { emp: 0, dia: 1, nov: 1, jus: 1 } },
      { id: "c", text: "Acepto la culpa para no generar más conflicto.", scores: { emp: 1, dia: 0, nov: 1, jus: 0 } },
      { id: "d", text: "No le digo nada, pero después hablo mal de él con otras personas.", scores: { emp: 0, dia: 0, nov: 0, jus: 0 } }
    ],
    insight: "Defender tu verdad no requiere atacar, y callar no es lo mismo que resolver. Separar a la persona del problema y exponer los hechos con calma protege tu dignidad y la relación."
  },
  {
    id: "q9", category: "amistad", concept: "Mediación",
    title: "Dos amigos distanciados",
    scenario: "Dos de tus amigos dejaron de hablarse después de un malentendido. Ambos te buscan por separado para contarte su versión y te piden ayuda.",
    prompt: "¿Qué haces?",
    options: [
      { id: "a", text: "Les propongo reunirnos; acordamos hablar con respeto, cada quien sin interrupciones, y buscamos juntos un acuerdo.", scores: { emp: 3, dia: 3, nov: 3 } },
      { id: "b", text: "Llevo y traigo los mensajes de uno al otro para no exponerlos.", scores: { emp: 1, dia: 1, nov: 2 } },
      { id: "c", text: "Les digo con sinceridad quién creo que tiene la razón.", scores: { emp: 0, dia: 1, nov: 1 } },
      { id: "d", text: "Les sugiero olvidar el tema y seguir como si nada.", scores: { emp: 1, dia: 0, nov: 1 } }
    ],
    insight: "La mediación funciona con reglas claras, imparcialidad y protagonismo de las partes: quien media facilita el encuentro, no dicta la solución."
  },
  {
    id: "q10", category: "sociedad", concept: "Justicia social",
    title: "Una cuota que excluye",
    scenario: "Tu escuela anuncia un aumento de cuotas que obligaría a varios estudiantes a abandonar sus estudios.",
    prompt: "¿Cómo participas?",
    options: [
      { id: "a", text: "Participo en una asamblea y ayudo a elaborar propuestas concretas (becas, cuotas escalonadas) para presentarlas a la dirección.", scores: { dia: 3, nov: 3, jus: 3, res: 3 } },
      { id: "b", text: "Comparto publicaciones de indignación en mis redes.", scores: { dia: 0, nov: 2, jus: 1, res: 1 } },
      { id: "c", text: "No participo: siempre ha sido así y nada va a cambiar.", scores: { dia: 0, nov: 1, jus: 0, res: 0 } },
      { id: "d", text: "Apoyo tomar las instalaciones y bloquear el acceso hasta que cancelen el aumento.", scores: { dia: 0, nov: 1, jus: 2, res: 2 } }
    ],
    insight: "Exigir justicia es legítimo; la forma importa. La participación organizada y propositiva amplía las posibilidades de lograr cambios sin excluir ni dañar a terceros."
  },
  {
    id: "q11", category: "sociedad", concept: "Violencia directa",
    title: "Gritos al otro lado de la pared",
    scenario: "Desde hace semanas escuchas gritos, golpes y llanto en la casa de tus vecinos. Hoy vuelve a ocurrir.",
    prompt: "¿Qué haces?",
    options: [
      { id: "a", text: "Llamo a la línea de emergencias (911) o a una línea de atención a la violencia y pido orientación.", scores: { emp: 2, nov: 3, jus: 2, res: 3 } },
      { id: "b", text: "Toco la puerta y enfrento a la persona agresora.", scores: { emp: 2, nov: 0, jus: 2, res: 2 } },
      { id: "c", text: "No hago nada: lo que pasa dentro de una casa es asunto privado.", scores: { emp: 0, nov: 1, jus: 0, res: 0 } },
      { id: "d", text: "Busco a la persona afectada cuando esté sola y le comparto, con discreción, información sobre dónde pedir ayuda.", scores: { emp: 3, nov: 3, jus: 2, res: 2 } }
    ],
    insight: "La violencia en el hogar no es un asunto privado. Si hay riesgo inmediato, llamar a emergencias es prioritario; enfrentar directamente al agresor puede ponerte en peligro a ti y a la víctima."
  },
  {
    id: "q12", category: "reflexion", concept: "Paz positiva",
    title: "¿Qué es la paz para ti?",
    scenario: "No hay trampa: elige la afirmación que se acerca más a lo que realmente piensas.",
    prompt: "La paz es, sobre todo…",
    options: [
      { id: "a", text: "Que no haya guerras, peleas ni violencia.", scores: { jus: 1, res: 1 } },
      { id: "b", text: "Que existan justicia, condiciones dignas para todas las personas y relaciones de respeto.", scores: { jus: 3, res: 3 } },
      { id: "c", text: "Algo que depende principalmente de los gobiernos.", scores: { jus: 1, res: 0 } },
      { id: "d", text: "Estar tranquilo y no meterme en problemas ajenos.", scores: { jus: 0, res: 0 } }
    ],
    insight: "Johan Galtung distingue la paz negativa (ausencia de violencia directa) de la paz positiva (justicia social, satisfacción de necesidades básicas y relaciones de respeto). Ambas importan, pero la segunda exige actuar."
  },
  {
    id: "q13", category: "reflexion", concept: "Gestión emocional",
    title: "Cuando alguien te ofende",
    scenario: "Piensa en la última vez que alguien te dijo algo hiriente. Sé honesto contigo.",
    prompt: "¿Qué sueles hacer?",
    options: [
      { id: "a", text: "Reacciono en el momento y a veces después me arrepiento.", scores: { emp: 1, dia: 1, nov: 1 } },
      { id: "b", text: "Me tomo un momento para calmarme y después decido cómo responder.", scores: { emp: 2, dia: 3, nov: 3 } },
      { id: "c", text: "Me lo guardo y no digo nada, aunque me siga afectando.", scores: { emp: 1, dia: 0, nov: 1 } },
      { id: "d", text: "Busco la forma de devolverle la ofensa.", scores: { emp: 0, dia: 0, nov: 0 } }
    ],
    insight: "Ni explotar ni reprimir: reconocer la emoción, tomar distancia y elegir la respuesta es una habilidad que se entrena, no un rasgo fijo de personalidad."
  },
  {
    id: "q14", category: "reflexion", concept: "Violencia cultural",
    title: "«Son solo bromas»",
    scenario: "En tu grupo de amigos son comunes los chistes sobre personas de otra región, con alguna discapacidad o de la diversidad sexual. Cuando alguien se incomoda, le dicen: «Son solo bromas».",
    prompt: "¿Qué piensas y qué haces?",
    options: [
      { id: "a", text: "Creo que esas bromas refuerzan estereotipos y pueden lastimar; lo digo con tacto aunque no sea popular.", scores: { emp: 3, dia: 3, jus: 3 } },
      { id: "b", text: "Si nadie del grupo se siente ofendido, no veo el problema.", scores: { emp: 0, dia: 0, jus: 0 } },
      { id: "c", text: "Me incomodan, pero no digo nada para no parecer exagerado.", scores: { emp: 2, dia: 0, jus: 1 } },
      { id: "d", text: "Depende: entre amigos de confianza todo se vale.", scores: { emp: 0, dia: 1, jus: 0 } }
    ],
    insight: "El humor que ridiculiza a grupos históricamente discriminados forma parte de la violencia cultural: hace que la exclusión parezca normal o inofensiva."
  },
  {
    id: "q15", category: "redes", concept: "Diálogo en la diferencia",
    title: "Una discusión que se calienta",
    scenario: "En una publicación sobre un tema social, alguien opina totalmente distinto a ti y su tono comienza a volverse agresivo.",
    prompt: "¿Cómo continúas?",
    options: [
      { id: "a", text: "Le pido mantener el respeto y le pregunto por qué piensa así; si sigue agrediendo, me retiro.", scores: { emp: 3, dia: 3, nov: 3 } },
      { id: "b", text: "Respondo con datos y argumentos para demostrar que está equivocado.", scores: { emp: 1, dia: 2, nov: 2 } },
      { id: "c", text: "Lo bloqueo de inmediato: no vale la pena.", scores: { emp: 1, dia: 0, nov: 2 } },
      { id: "d", text: "Le respondo con la misma intensidad para que vea que no me dejo.", scores: { emp: 0, dia: 0, nov: 0 } }
    ],
    insight: "Dialogar no es convencer. Preguntar con curiosidad y poner límites al maltrato —incluso retirarte— son formas de cuidar la conversación y de cuidarte."
  }
];

/* ---------------- Niveles ---------------- */
const LEVELS = [
  {
    min: 80, badge: "Nivel 4 · En acción", color: "#3cc8b4",
    title: "¡Eres un agente de paz en acción!",
    text: "Tus decisiones demuestran una fuerte orientación hacia el diálogo, la empatía y la construcción de una convivencia pacífica.",
    closing: "Tu siguiente reto es contagiar esta forma de actuar: la paz crece cuando se comparte."
  },
  {
    min: 60, badge: "Nivel 3 · Muy cerca", color: "#7cc4ff",
    title: "¡Estás muy cerca de ser un agente de paz!",
    text: "Tienes habilidades importantes, pero todavía existen algunas situaciones donde puedes fortalecer tu respuesta ante los conflictos.",
    closing: "Pequeños ajustes en momentos clave pueden marcar una gran diferencia a tu alrededor."
  },
  {
    min: 40, badge: "Nivel 2 · En construcción", color: "#b9a7ff",
    title: "Estás construyendo tu camino hacia la paz.",
    text: "Reconoces algunos principios de convivencia pacífica, pero puedes desarrollar nuevas herramientas para afrontar conflictos.",
    closing: "Cada conflicto es una oportunidad para practicar: ninguna habilidad de paz es innata, todas se aprenden."
  },
  {
    min: 0, badge: "Nivel 1 · Punto de partida", color: "#ffb38a",
    title: "Tu camino como agente de paz comienza hoy.",
    text: "Tienes oportunidades para reflexionar, aprender y transformar la manera en que respondes ante situaciones de violencia.",
    closing: "Hacerte estas preguntas ya es un primer paso: la paz empieza por mirar con honestidad nuestras propias decisiones."
  }
];

const QUOTES = [
  { text: "Puesto que las guerras nacen en la mente de los hombres, es en la mente de los hombres donde deben erigirse los baluartes de la paz.", author: "Constitución de la UNESCO, 1945" },
  { text: "La paz no es la ausencia de conflicto, sino la capacidad de transformarlo con justicia, diálogo y respeto.", author: "Inspirado en el pensamiento de Johan Galtung" },
  { text: "La cultura de paz se construye en lo cotidiano: en cómo escuchamos, cómo incluimos y cómo respondemos cuando alguien es lastimado.", author: "Agentes de Paz" }
];

const VIOLENCE_INFO = {
  directa: "<strong>Violencia directa:</strong> la más visible. Golpes, insultos, amenazas, acoso o ciberacoso: hay una persona que agrede y otra que recibe el daño.",
  estructural: "<strong>Violencia estructural:</strong> invisible pero profunda. Desigualdades en el acceso a educación, salud, seguridad o justicia que dañan a ciertos grupos sin un agresor concreto.",
  cultural: "<strong>Violencia cultural:</strong> creencias, discursos, chistes y estereotipos que justifican o normalizan las otras violencias y las hacen parecer «normales»."
};

const LOADING_MESSAGES = [
  "Analizando tus decisiones…",
  "Trazando tu mapa de paz…",
  "Reconociendo tus fortalezas…",
  "Preparando tu resultado…"
];

/* ---------------- Estado y almacenamiento ---------------- */
const STORAGE_KEY = "agentesDePaz.v1";
const LETTERS = ["A", "B", "C", "D", "E"];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let state = freshState();
let busy = false;
let cardBlobPromise = null;
let lastResult = null;

function freshState() {
  return { status: "idle", current: 0, answers: {}, order: {}, quote: null };
}

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* almacenamiento no disponible */ }
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (data && typeof data === "object" && data.answers) {
      state = Object.assign(freshState(), data);
      state.current = Math.min(Math.max(0, state.current | 0), QUESTIONS.length - 1);
    }
  } catch (e) { state = freshState(); }
}

/* Mezcla las alternativas una vez por persona (se guarda el orden) para
   evitar que la "mejor" respuesta esté siempre en la misma posición. */
function getOrder(q) {
  const ids = q.options.map(o => o.id);
  const saved = state.order[q.id];
  if (Array.isArray(saved) && saved.length === ids.length && saved.every(id => ids.includes(id))) return saved;
  const shuffled = ids.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  state.order[q.id] = shuffled;
  return shuffled;
}

/* ---------------- Utilidades DOM ---------------- */
const $ = sel => document.querySelector(sel);
const el = {
  screens: {
    welcome: $("#screen-welcome"),
    quiz: $("#screen-quiz"),
    loading: $("#screen-loading"),
    results: $("#screen-results")
  },
  btnStart: $("#btnStart"),
  btnResume: $("#btnResume"),
  btnBack: $("#btnBack"),
  btnExit: $("#btnExit"),
  btnNext: $("#btnNext"),
  btnNextLabel: $("#btnNextLabel"),
  progressLabel: $("#progressLabel"),
  progressPct: $("#progressPct"),
  progressBar: $("#progressBar"),
  progressFill: $("#progressFill"),
  qCard: $("#qCard"),
  qIcon: $("#qIcon"),
  qCat: $("#qCat"),
  qConcept: $("#qConcept"),
  qTitle: $("#qTitle"),
  qScenario: $("#qScenario"),
  qPrompt: $("#qPrompt"),
  qOptions: $("#qOptions"),
  loadingText: $("#loadingText"),
  toast: $("#toast")
};

function showScreen(name) {
  Object.entries(el.screens).forEach(([key, node]) => {
    const active = key === name;
    node.hidden = !active;
    node.classList.toggle("is-active", active);
  });
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
}

let toastTimer;
function toast(msg) {
  el.toast.textContent = msg;
  el.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.toast.classList.remove("show"), 3200);
}

/* ---------------- Bienvenida ---------------- */
function renderWelcome() {
  const answered = Object.keys(state.answers).length;
  if (state.status === "quiz" && answered > 0) {
    el.btnResume.hidden = false;
    el.btnResume.textContent = `Continuar donde te quedaste (${answered}/${QUESTIONS.length})`;
    el.btnResume.onclick = () => { showScreen("quiz"); renderQuestion(); focusTitle(); };
  } else if (state.status === "done") {
    el.btnResume.hidden = false;
    el.btnResume.textContent = "Ver mi último resultado";
    el.btnResume.onclick = () => showResults(false);
  } else {
    el.btnResume.hidden = true;
  }
}

function buildDimList() {
  const list = $("#dimList");
  list.innerHTML = Object.values(DIMENSIONS).map(d =>
    `<li style="--c:${d.color}"><span class="dim-dot" aria-hidden="true"></span><b>${d.name}</b><span class="desc">${d.desc}</span></li>`
  ).join("");
}

function setupTriangle() {
  const info = $("#triInfo");
  const nodes = document.querySelectorAll(".tri-node");
  const select = node => {
    nodes.forEach(n => {
      const on = n === node;
      n.classList.toggle("is-active", on);
      n.setAttribute("aria-pressed", String(on));
    });
    info.innerHTML = VIOLENCE_INFO[node.dataset.violence];
    info.classList.remove("swap");
    void info.offsetWidth;
    info.classList.add("swap");
  };
  nodes.forEach(n => n.addEventListener("click", () => select(n)));
  info.innerHTML = VIOLENCE_INFO.directa;
}

function startQuiz() {
  state = freshState();
  state.status = "quiz";
  save();
  showScreen("quiz");
  renderQuestion();
  focusTitle();
}

/* ---------------- Evaluación ---------------- */
function renderQuestion(dir) {
  const q = QUESTIONS[state.current];
  const total = QUESTIONS.length;
  const answeredCount = Object.keys(state.answers).length;
  const pct = Math.round((answeredCount / total) * 100);

  el.progressLabel.textContent = `Escenario ${state.current + 1} de ${total}`;
  el.progressPct.textContent = `${pct}%`;
  el.progressFill.style.width = `${Math.max(pct, 2)}%`;
  el.progressBar.setAttribute("aria-valuenow", String(pct));
  el.progressBar.setAttribute("aria-valuetext", `${answeredCount} de ${total} escenarios respondidos`);

  el.qIcon.innerHTML = ICONS[q.category] || ICONS.reflexion;
  el.qCat.textContent = CATEGORY_LABEL[q.category] || "";
  el.qConcept.textContent = q.concept;
  el.qTitle.textContent = q.title;
  el.qScenario.textContent = q.scenario;
  el.qPrompt.textContent = q.prompt;

  const selected = state.answers[q.id];
  const order = getOrder(q);
  el.qOptions.innerHTML = "";
  order.forEach((optId, i) => {
    const opt = q.options.find(o => o.id === optId);
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    btn.setAttribute("role", "radio");
    btn.dataset.id = opt.id;
    btn.style.setProperty("--i", i);
    const checked = selected === opt.id;
    btn.setAttribute("aria-checked", String(checked));
    btn.tabIndex = checked || (!selected && i === 0) ? 0 : -1;
    btn.innerHTML =
      `<span class="opt-key" aria-hidden="true">${LETTERS[i]}</span>` +
      `<span class="opt-text"></span>` +
      `<span class="opt-check" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>`;
    btn.querySelector(".opt-text").textContent = opt.text;
    btn.addEventListener("click", e => selectOption(opt.id, e));
    el.qOptions.appendChild(btn);
  });

  el.btnBack.disabled = state.current === 0;
  el.btnNext.disabled = !selected;
  el.btnNextLabel.textContent = state.current === total - 1 ? "Ver mi resultado" : "Continuar";
  save();
}

function selectOption(id, evt) {
  const q = QUESTIONS[state.current];
  const first = !state.answers[q.id];
  state.answers[q.id] = id;
  save();

  el.qOptions.querySelectorAll(".option").forEach(b => {
    const on = b.dataset.id === id;
    b.setAttribute("aria-checked", String(on));
    b.tabIndex = on ? 0 : -1;
    if (on && evt && evt.clientX && !reduceMotion) addRipple(b, evt);
  });

  // Actualiza el progreso sin revelar ninguna puntuación
  const answeredCount = Object.keys(state.answers).length;
  const pct = Math.round((answeredCount / QUESTIONS.length) * 100);
  el.progressPct.textContent = `${pct}%`;
  el.progressFill.style.width = `${Math.max(pct, 2)}%`;
  el.progressBar.setAttribute("aria-valuenow", String(pct));

  el.btnNext.disabled = false;
  if (first) {
    el.btnNext.classList.remove("ready");
    void el.btnNext.offsetWidth;
    el.btnNext.classList.add("ready");
  }
}

function addRipple(btn, evt) {
  const rect = btn.getBoundingClientRect();
  const r = document.createElement("span");
  r.className = "ripple";
  r.style.left = `${evt.clientX - rect.left}px`;
  r.style.top = `${evt.clientY - rect.top}px`;
  btn.appendChild(r);
  r.addEventListener("animationend", () => r.remove());
}

function focusTitle() {
  requestAnimationFrame(() => el.qTitle.focus({ preventScroll: true }));
}

function transition(dir, update) {
  if (reduceMotion) { update(); focusTitle(); return; }
  busy = true;
  const card = el.qCard;
  card.classList.remove("enter-next", "enter-prev");
  card.classList.add(`leave-${dir}`);
  setTimeout(() => {
    card.classList.remove(`leave-${dir}`);
    update();
    card.classList.add(`enter-${dir}`);
    focusTitle();
    setTimeout(() => { card.classList.remove(`enter-${dir}`); busy = false; }, 560);
  }, 240);
}

function goNext() {
  if (busy) return;
  const q = QUESTIONS[state.current];
  if (!state.answers[q.id]) return;
  if (state.current < QUESTIONS.length - 1) {
    transition("next", () => { state.current++; renderQuestion(); });
  } else {
    finish();
  }
}

function goPrev() {
  if (busy || state.current === 0) return;
  transition("prev", () => { state.current--; renderQuestion(); });
}

function handleOptionKeys(e) {
  const buttons = Array.from(el.qOptions.querySelectorAll(".option"));
  const idx = buttons.indexOf(document.activeElement);
  if (idx === -1) return;
  let next = null;
  if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (idx + 1) % buttons.length;
  if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (idx - 1 + buttons.length) % buttons.length;
  if (next !== null) {
    e.preventDefault();
    buttons[next].focus();
    selectOption(buttons[next].dataset.id);
  }
}

function handleGlobalKeys(e) {
  if (el.screens.quiz.hidden || e.altKey || e.ctrlKey || e.metaKey) return;
  const buttons = Array.from(el.qOptions.querySelectorAll(".option"));
  const key = e.key.toLowerCase();
  const numIdx = ["1", "2", "3", "4", "5"].indexOf(key);
  const letIdx = ["a", "b", "c", "d", "e"].indexOf(key);
  const i = numIdx !== -1 ? numIdx : letIdx;
  if (i !== -1 && buttons[i]) {
    e.preventDefault();
    buttons[i].focus();
    selectOption(buttons[i].dataset.id);
    return;
  }
  if (e.key === "Enter") {
    const t = e.target;
    const onControl = t && (t.tagName === "BUTTON" || t.tagName === "A") && !t.classList.contains("option");
    if (!onControl && !el.btnNext.disabled) {
      e.preventDefault();
      goNext();
    }
  }
}

/* ---------------- Cálculo de resultados ---------------- */
function computeResults() {
  const dims = {};
  Object.keys(DIMENSIONS).forEach(k => { dims[k] = { got: 0, max: 0 }; });

  QUESTIONS.forEach(q => {
    const chosen = q.options.find(o => o.id === state.answers[q.id]);
    const keys = new Set(q.options.flatMap(o => Object.keys(o.scores)));
    keys.forEach(k => {
      if (!dims[k]) return;
      const max = Math.max(...q.options.map(o => o.scores[k] || 0));
      dims[k].max += max;
      dims[k].got += chosen ? (chosen.scores[k] || 0) : 0;
    });
  });

  const percents = {};
  let sum = 0;
  Object.keys(dims).forEach(k => {
    const p = dims[k].max ? (dims[k].got / dims[k].max) * 100 : 0;
    percents[k] = Math.round(p);
    sum += p;
  });
  const total = Math.round(sum / Object.keys(dims).length);
  const level = LEVELS.find(l => total >= l.min) || LEVELS[LEVELS.length - 1];
  const ranked = Object.keys(percents).sort((a, b) => percents[b] - percents[a]);

  return { total, percents, level, ranked };
}

/* ---------------- Final y resultados ---------------- */
function finish() {
  state.status = "done";
  state.quote = Math.floor(Math.random() * QUOTES.length);
  save();
  showScreen("loading");
  let i = 0;
  el.loadingText.textContent = LOADING_MESSAGES[0];
  const delay = reduceMotion ? 400 : 750;
  const timer = setInterval(() => {
    i++;
    if (i >= LOADING_MESSAGES.length) {
      clearInterval(timer);
      showResults(true);
      return;
    }
    el.loadingText.textContent = LOADING_MESSAGES[i];
    el.loadingText.classList.remove("swap");
    void el.loadingText.offsetWidth;
    el.loadingText.classList.add("swap");
  }, delay);
}

function showResults(celebrate) {
  const result = computeResults();
  lastResult = result;
  showScreen("results");
  renderResults(result);
  if (celebrate) launchPetals(result.total);
  cardBlobPromise = makeCardBlob(result).catch(() => null);
  setTimeout(() => $("#resultTitle").focus({ preventScroll: true }), 100);
}

function renderResults({ total, percents, level, ranked }) {
  const keys = Object.keys(DIMENSIONS);

  // Encabezado
  const badge = $("#levelBadge");
  badge.style.setProperty("--badge", level.color);
  badge.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z"/></svg>${level.badge}`;
  $("#resultTitle").textContent = level.title;

  const top = DIMENSIONS[ranked[0]];
  const low = DIMENSIONS[ranked[ranked.length - 1]];
  const evenProfile = percents[ranked[0]] - percents[ranked[ranked.length - 1]] < 8;
  const personal = evenProfile
    ? `Tu perfil es muy equilibrado: respondes de forma similar en las cinco dimensiones.`
    : `Tu dimensión más sólida es <strong>${top.name.toLowerCase()}</strong>, y tu mayor oportunidad de crecimiento está en <strong>${low.name.toLowerCase()}</strong>.`;
  $("#resultMsg").innerHTML = `${level.text} ${personal} ${level.closing}`;
  $("#scoreSr").textContent = `Tu puntuación es ${total} de 100.`;

  animateScore(total);

  // Radar
  buildRadar(percents);

  // Barras
  const bars = $("#dimBars");
  bars.innerHTML = keys.map(k => {
    const d = DIMENSIONS[k];
    return `<li style="--c:${d.color}">
      <div class="dim-bar-head"><span>${d.name}</span><span>${percents[k]}%</span></div>
      <div class="dim-track" role="img" aria-label="${d.name}: ${percents[k]} por ciento"><div class="dim-fill" data-w="${percents[k]}"></div></div>
    </li>`;
  }).join("");
  setTimeout(() => bars.querySelectorAll(".dim-fill").forEach(f => { f.style.width = `${f.dataset.w}%`; }), reduceMotion ? 0 : 700);

  // Fortalezas y áreas de mejora
  const iconUp = '<svg viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6"/></svg>';
  const iconGrow = '<svg viewBox="0 0 24 24"><path d="M12 21v-8"/><path d="M12 13c0-4 3-7 7-7 0 4-3 7-7 7z"/><path d="M12 15c0-3-2.5-5.5-6-5.5 0 3 2.5 5.5 6 5.5z"/></svg>';
  $("#strengths").innerHTML = ranked.slice(0, 2).map(k => insightItem(k, percents[k], DIMENSIONS[k].strength, iconUp)).join("");
  $("#growth").innerHTML = ranked.slice(-2).reverse().map(k => insightItem(k, percents[k], DIMENSIONS[k].growth, iconGrow)).join("");

  // Recomendaciones: una por cada una de las tres dimensiones más bajas
  let recs;
  if (total >= 90) {
    $("#recsKicker").textContent = "Para multiplicar tu impacto";
    recs = ADVANCED_RECS;
  } else {
    $("#recsKicker").textContent = "Para tu vida cotidiana";
    const lowest = ranked.slice().reverse().slice(0, 3);
    recs = lowest.map((k, i) => ({ dim: k, text: DIMENSIONS[k].recs[i % DIMENSIONS[k].recs.length] }));
  }
  $("#recs").innerHTML = recs.map(r =>
    `<li style="--c:${DIMENSIONS[r.dim].color}"><span class="rec-dim">${DIMENSIONS[r.dim].name}</span><p>${r.text}</p></li>`
  ).join("");

  // Revisión de escenarios (sin mostrar puntos)
  $("#review").innerHTML = QUESTIONS.map(q => {
    const chosen = q.options.find(o => o.id === state.answers[q.id]);
    return `<li>
      <h3>${q.title}</h3>
      <p class="your">Tu respuesta: <em>${chosen ? chosen.text : "Sin respuesta"}</em></p>
      <p class="key"><b>Clave para reflexionar · ${q.concept}:</b> ${q.insight}</p>
    </li>`;
  }).join("");

  // Frase final
  const quote = QUOTES[state.quote != null ? state.quote % QUOTES.length : 0];
  $("#quoteText").textContent = `«${quote.text}»`;
  $("#quoteAuthor").textContent = `— ${quote.author}`;
}

function insightItem(k, pct, text, icon) {
  const d = DIMENSIONS[k];
  return `<li style="--c:${d.color}">
    <span class="insight-icon" aria-hidden="true">${icon}</span>
    <b>${d.name} <small>${pct}%</small></b>
    <p>${text}</p>
  </li>`;
}

function animateScore(total) {
  const ring = $("#ringFg");
  const num = $("#scoreNum");
  const C = 2 * Math.PI * 96;
  ring.style.strokeDasharray = `${C}`;
  ring.style.strokeDashoffset = `${C}`;
  if (reduceMotion) {
    num.textContent = total;
    ring.style.strokeDashoffset = `${C * (1 - total / 100)}`;
    return;
  }
  const duration = 2000;
  const startDelay = 450;
  let start = null;
  const ease = t => 1 - Math.pow(1 - t, 3);
  num.textContent = "0";
  const step = ts => {
    if (start === null) start = ts;
    const t = Math.min(1, (ts - start) / duration);
    const v = total * ease(t);
    num.textContent = Math.round(v);
    ring.style.strokeDashoffset = `${C * (1 - v / 100)}`;
    if (t < 1) requestAnimationFrame(step);
  };
  setTimeout(() => requestAnimationFrame(step), startDelay);
}

function buildRadar(percents) {
  const keys = Object.keys(DIMENSIONS);
  const N = keys.length;
  const cx = 160, cy = 165, R = 112;
  const pt = (i, r) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / N;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };
  const poly = r => keys.map((_, i) => pt(i, r).map(n => n.toFixed(1)).join(",")).join(" ");

  let svg = `<svg viewBox="-88 8 496 315" role="img" aria-label="Gráfico de radar de tus cinco dimensiones: ${keys.map(k => `${DIMENSIONS[k].name} ${percents[k]}%`).join(", ")}">
    <defs>
      <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#3cc8b4" stop-opacity=".55"/>
        <stop offset="100%" stop-color="#ffb38a" stop-opacity=".35"/>
      </linearGradient>
    </defs>`;
  [0.25, 0.5, 0.75, 1].forEach(f => {
    svg += `<polygon class="grid-ring${f === 1 ? " outer" : ""}" points="${poly(R * f)}"/>`;
  });
  keys.forEach((_, i) => {
    const [x, y] = pt(i, R);
    svg += `<line class="axis" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`;
  });
  const dataPts = keys.map((k, i) => pt(i, Math.max(R * percents[k] / 100, 4)));
  svg += `<g class="shape"><polygon points="${dataPts.map(p => p.map(n => n.toFixed(1)).join(",")).join(" ")}"/>`;
  dataPts.forEach((p, i) => {
    svg += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="5.5" fill="${DIMENSIONS[keys[i]].color}" stroke="#0b1726" stroke-width="2"/>`;
  });
  svg += `</g>`;
  keys.forEach((k, i) => {
    const [x, y] = pt(i, R + 22);
    const anchor = Math.abs(x - cx) < 5 ? "middle" : x > cx ? "start" : "end";
    const dy = y < cy - 60 ? -6 : y > cy + 40 ? 10 : 4;
    svg += `<text class="label" x="${x.toFixed(1)}" y="${(y + dy).toFixed(1)}" text-anchor="${anchor}">${DIMENSIONS[k].short}</text>`;
    svg += `<text class="label label-pct" x="${x.toFixed(1)}" y="${(y + dy + 15).toFixed(1)}" text-anchor="${anchor}" fill="${DIMENSIONS[k].color}">${percents[k]}%</text>`;
  });
  svg += `</svg>`;

  const radar = $("#radar");
  radar.classList.remove("is-drawn");
  radar.innerHTML = svg;
  requestAnimationFrame(() => requestAnimationFrame(() => radar.classList.add("is-drawn")));
}

function launchPetals(total) {
  if (reduceMotion) return;
  const box = $("#petals");
  box.innerHTML = "";
  const colors = ["#3cc8b4", "#8fe3d2", "#ffb38a", "#7cc4ff", "#b9a7ff", "#f5cf6b"];
  const count = total >= 60 ? 42 : 26;
  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");
    p.className = "petal";
    p.style.left = `${Math.random() * 100}%`;
    p.style.setProperty("--c", colors[i % colors.length]);
    p.style.setProperty("--s", `${10 + Math.random() * 14}px`);
    p.style.setProperty("--t", `${5 + Math.random() * 4}s`);
    p.style.setProperty("--delay", `${0.6 + Math.random() * 2.2}s`);
    p.style.setProperty("--x", `${(Math.random() - 0.5) * 240}px`);
    p.style.setProperty("--r", `${(Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 540)}deg`);
    box.appendChild(p);
  }
  setTimeout(() => { box.innerHTML = ""; }, 12000);
}

/* ---------------- Tarjeta digital (canvas) ---------------- */
async function makeCardBlob(result) {
  if (document.fonts && document.fonts.ready) {
    try {
      await Promise.all([
        document.fonts.load('700 120px "Fraunces"'),
        document.fonts.load('italic 400 40px "Fraunces"'),
        document.fonts.load('700 30px "Manrope"')
      ]);
    } catch (e) { /* se usan fuentes de respaldo */ }
  }
  const W = 1080, H = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext("2d");
  const { total, percents, level } = result;

  // Fondo
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#0b1726");
  bg.addColorStop(0.6, "#0f2a3d");
  bg.addColorStop(1, "#13394a");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  const glow = (x, y, r, color, a) => {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, hexA(color, a));
    g.addColorStop(1, hexA(color, 0));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  };
  glow(120, 80, 520, "#3cc8b4", 0.45);
  glow(1000, 1250, 560, "#ffb38a", 0.32);
  glow(880, 420, 380, "#b9a7ff", 0.18);

  // Marca
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#3cc8b4";
  ctx.beginPath(); ctx.arc(110, 110, 28, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = "#ffb38a";
  ctx.beginPath(); ctx.arc(136, 110, 28, 0, Math.PI * 2); ctx.stroke();
  ctx.fillStyle = "#f6f1e9";
  ctx.textBaseline = "middle";
  ctx.font = '600 40px "Fraunces", Georgia, serif';
  ctx.fillText("Agentes de Paz", 190, 112);
  ctx.textAlign = "right";
  ctx.font = '700 22px "Manrope", Arial, sans-serif';
  ctx.fillStyle = "#a9b8c4";
  ctx.fillText("VIOLENCIA Y CONSTRUCCIÓN DE PAZ", W - 80, 112);

  // Anillo
  const cx = W / 2, cy = 410, r = 180;
  ctx.lineCap = "round";
  ctx.lineWidth = 30;
  ctx.strokeStyle = "rgba(255,255,255,0.09)";
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
  const rg = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  rg.addColorStop(0, "#3cc8b4"); rg.addColorStop(0.5, "#7cc4ff"); rg.addColorStop(1, "#ffb38a");
  ctx.strokeStyle = rg;
  ctx.shadowColor = "rgba(60,200,180,0.6)";
  ctx.shadowBlur = 30;
  ctx.beginPath();
  ctx.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * Math.max(total, 0.5) / 100);
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = '700 150px "Fraunces", Georgia, serif';
  ctx.fillText(String(total), cx, cy - 6);
  ctx.font = '700 26px "Manrope", Arial, sans-serif';
  ctx.fillStyle = "#a9b8c4";
  ctx.fillText("DE 100", cx, cy + 84);

  // Insignia de nivel
  ctx.font = '800 26px "Manrope", Arial, sans-serif';
  const badgeText = level.badge.toUpperCase();
  const bw = ctx.measureText(badgeText).width + 64;
  ctx.fillStyle = level.color;
  roundRect(ctx, cx - bw / 2, 650, bw, 56, 28);
  ctx.fill();
  ctx.fillStyle = "#0b1726";
  ctx.fillText(badgeText, cx, 679);

  // Título del nivel
  ctx.fillStyle = "#f6f1e9";
  ctx.font = '600 58px "Fraunces", Georgia, serif';
  const lines = wrapText(ctx, level.title, 900);
  lines.forEach((line, i) => ctx.fillText(line, cx, 775 + i * 66));
  let y = 775 + lines.length * 66 + 20;

  // Dimensiones
  const keys = Object.keys(DIMENSIONS);
  const rowH = 52;
  ctx.textBaseline = "middle";
  keys.forEach((k, i) => {
    const d = DIMENSIONS[k];
    const ry = y + i * rowH;
    ctx.textAlign = "left";
    ctx.font = '700 26px "Manrope", Arial, sans-serif';
    ctx.fillStyle = "#e9eef0";
    ctx.fillText(d.short, 120, ry);
    ctx.fillStyle = "rgba(255,255,255,0.09)";
    roundRect(ctx, 380, ry - 8, 480, 16, 8); ctx.fill();
    ctx.fillStyle = d.color;
    roundRect(ctx, 380, ry - 8, Math.max(16, 480 * percents[k] / 100), 16, 8); ctx.fill();
    ctx.textAlign = "right";
    ctx.fillStyle = "#a9b8c4";
    ctx.fillText(`${percents[k]}%`, W - 120, ry);
  });

  // Pie
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffb38a";
  ctx.font = 'italic 400 30px "Fraunces", Georgia, serif';
  ctx.fillText("¿Mis decisiones contribuyen realmente a construir la paz?", cx, H - 110);
  ctx.fillStyle = "#7d90a1";
  ctx.font = '600 20px "Manrope", Arial, sans-serif';
  ctx.fillText("Resultado orientativo con fines educativos", cx, H - 60);

  return new Promise((resolve, reject) => canvas.toBlob(b => (b ? resolve(b) : reject(new Error("blob"))), "image/png"));
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  words.forEach(w => {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = w; }
    else line = test;
  });
  if (line) lines.push(line);
  return lines;
}

function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
}

async function downloadCard() {
  try {
    const blob = (await cardBlobPromise) || (await makeCardBlob(lastResult || computeResults()));
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mi-tarjeta-agente-de-paz.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
    toast("Tarjeta descargada. ¡Compártela!");
  } catch (e) {
    toast("No fue posible generar la tarjeta en este navegador.");
  }
}

async function shareResult() {
  const result = lastResult || computeResults();
  const url = location.href.split("#")[0];
  const text = `Obtuve ${result.total}/100 en «Agentes de Paz»: ${result.level.title} ¿Tus decisiones construyen paz? Descúbrelo aquí:`;
  try {
    if (navigator.share) {
      const blob = await cardBlobPromise;
      if (blob && typeof File === "function") {
        const file = new File([blob], "agente-de-paz.png", { type: "image/png" });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({ files: [file], title: "Agentes de Paz", text: `${text} ${url}` });
          return;
        }
      }
      await navigator.share({ title: "Agentes de Paz", text, url });
      return;
    }
    await copyText(`${text} ${url}`);
    toast("Enlace y resultado copiados al portapapeles.");
  } catch (e) {
    if (e && e.name === "AbortError") return;
    try {
      await copyText(`${text} ${url}`);
      toast("Enlace y resultado copiados al portapapeles.");
    } catch (err) {
      toast("No se pudo compartir. Descarga tu tarjeta e inténtalo manualmente.");
    }
  }
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand("copy");
  ta.remove();
  if (!ok) throw new Error("copy");
}

/* ---------------- Inicio ---------------- */
function goHome() {
  if (busy) return;
  showScreen("welcome");
  renderWelcome();
}

function init() {
  buildDimList();
  setupTriangle();
  load();

  el.btnStart.addEventListener("click", startQuiz);
  el.btnNext.addEventListener("click", goNext);
  el.btnBack.addEventListener("click", goPrev);
  el.btnExit.addEventListener("click", () => { save(); goHome(); toast("Tu progreso quedó guardado."); });
  $("#brandLink").addEventListener("click", goHome);
  $("#btnRestart").addEventListener("click", startQuiz);
  $("#btnShare").addEventListener("click", shareResult);
  $("#btnDownload").addEventListener("click", downloadCard);
  el.qOptions.addEventListener("keydown", handleOptionKeys);
  document.addEventListener("keydown", handleGlobalKeys);

  // Si se recargó la página a mitad de la evaluación, se retoma automáticamente
  if (state.status === "quiz" && Object.keys(state.answers).length > 0) {
    showScreen("quiz");
    renderQuestion();
    toast("Recuperamos tu progreso. ¡Sigue adelante!");
  } else {
    renderWelcome();
  }
}

init();
