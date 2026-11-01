export const colors = {
  black: '#090909',
  warmWhite: '#F3EFE8',
  cinemaGray: '#A6A29C',
  amber: '#C4A574',
  amberSoft: 'rgba(196, 165, 116, 0.18)',
} as const

export const meta = {
  title: 'Entre tudo que existe, ainda é você.',
  dedicatee: 'Giovanna',
  signature: 'Seu amorzinho.',
} as const

/**
 * Assets pessoais — substitua os arquivos em /public/assets/
 * mantendo os mesmos nomes (ou atualize os caminhos abaixo).
 *
 * Placeholders atuais são atmosferas cinematográficas (SVG),
 * não fotos da Giovanna. Troque por fotos reais .webp quando tiver.
 */
export const assets = {
  giovanna01: '/assets/giovanna-01.jpeg',
  giovanna02: '/assets/giovanna-02.jpeg',
  giovanna03: '/assets/giovanna-03.jpeg',
  lanternas01: '/assets/lanterna.jpeg',
  et: '/assets/ET.jpeg',
  dia_todo: '/assets/dia-todo.jpeg',
  old_man: '/assets/old-man.jpeg',
  odisseia: '/assets/odisseia.jpeg',
  quero_voce: '/assets/quero-vc.jpeg',
  nossaFoto01: '/assets/nossa-foto-01.jpeg',
  backgroundCinema: '/assets/background-cinema.jpeg',
  soundtrack: '/assets/soundtrack.mp3',
} as const

export interface MemoryStory {
  id: string
  date: string
  title: string
  lines: readonly string[]
  image: string
}

/** Dias reais, em ordem. Cada um vira um story. */
export const memories: readonly MemoryStory[] = [
  {
    id: 'igreja',
    date: '1 de janeiro',
    title: 'A primeira vez na igreja.',
    lines: [
      'A gente foi pra igreja juntos pela primeira vez.',
      'E eu já estava completamente apaixonado por você.',
      'Não era um começo tímido. Era eu do seu lado, quieto, sabendo que aquilo já tinha acontecido dentro de mim.',
    ],
    image: assets.giovanna03,
  },
  {
    id: 'mae',
    date: '13 de abril',
    title: 'Sua mãe.',
    lines: [
      'Eu conheci a sua mãe. E quase caí na frente dela.',
      'Dá pra rir agora. Na hora era o nervoso de quem entende o tamanho da coisa.',
      'Não era só te ver. Era entrar na sua vida de verdade, diante de quem te criou.',
    ],
    image: assets.giovanna01,
  },
  {
    id: 'sushi',
    date: '2 de maio',
    title: 'O sushi.',
    lines: [
      'A gente foi pro sushi. E saiu de verdade pela primeira vez.',
      'Até ali ainda era quase. Naquele dia virou encontro.',
      'Eu lembro da sensação de estar com você todo timido, e vc toda linda de marrom”.',
    ],
    image: assets.nossaFoto01,
  },
  {
    id: 'quermesse',
    date: '6 de junho',
    title: 'A quermesse.',
    lines: [
      'Você me roubou o primeiro beijo.',
      'Eu podia ter passado a vida ensaiando esse momento. Você simplesmente chegou e tomou.',
      'Foi a coisa mais sua possível. E eu não queria de outro jeito.',
    ],
    image: assets.giovanna02,
  },
  {
    id: 'et',
    date: '9 de junho',
    title: 'ET.',
    lines: [
      'Eu te chamei de ET. E a gente se assumiu.',
      'Disse em voz alta que gostava. Parece pouco, escrito assim.',
      'Na hora era um peso saindo das costas. Eu parei de carregar sozinho uma coisa que já era nossa.',
    ],
    image: assets.et,
  },
  {
    id: 'fas',
    date: '19 de junho',
    title: 'Os nossos. E os meus pais.',
    lines: [
      'A gente se assumiu pros nossos fas. E você conheceu os meus pais.',
      'Dois mundos no mesmo dia: o meu e o seu.',
      'Você deixou de ser só minha. Passou a ser da minha vida.',
    ],
    image: assets.giovanna01,
  },
  {
    id: 'te-amo',
    date: '24 de junho',
    title: 'O primeiro eu te amo.',
    lines: [
      'Não foi ensaio.',
      'Era uma frase que já existia faz tempo e finalmente teve coragem de sair.',
      'Depois dela, o meu amor por você só cresceu a cada dia.',
    ],
    image: assets.giovanna03,
  },
  {
    id: 'sentir',
    date: '25 de junho',
    title: 'Quero muito que seja você.',
    lines: [
      'No dia seguinte você me disse isso. “Eu quero muito que seja você.”',
      'E eu entendi que nossa historia, ia ter momentos dificeis. E nada disso importa afinal eu e você estamos juntos.',
      'Voce me disse que vivia como se não sentisse quase nada. E que eu mudei isso em você. Entao estou pronto para fazer isso novamente.',
    ],
    image: assets.quero_voce,
  },
  {
    id: 'moana',
    date: '9 de julho',
    title: 'Moana.',
    lines: [
      'A gente foi ver Moana.',
      'Uma sala escura, você do lado. Coisa simples.',
      'E mesmo assim ficou guardado, porque com você até uma noite de feriado comum vira um dia que eu quero lembrar desde que esteja com voce.',
    ],
    image: assets.giovanna02,
  },
  {
    id: 'odisseia',
    date: '19 de julho',
    title: 'A Odisseia.',
    lines: [
      'De novo a gente junto, no escuro, vendo uma história enorme.',
      'Eu olhava pra tela e pensava que a minha já tinha mudado de rumo faz tempo.',
      'Eu podia falar que voce era a minha penelope, mais nao voce e a minha Giovanna.',
    ],
    image: assets.odisseia,
  },
  {
    id: 'shopping',
    date: '31 de julho',
    title: 'O dia inteiro.',
    lines: [
      'Shopping. O dia todo juntos.',
      'Sem pressa de ir embora.',
      'O dia inteiro do seu lado. Me fez ficar mais feliz que nunca. e ansioso pro nosso futuro.',
    ],
    image: assets.dia_todo,
  },
  {
    id: 'old-man',
    date: '8 de agosto',
    title: 'Duas horas. Old Man.',
    lines: [
      'Eu te fiz ficar duas horas em pé na fila.',
      'Duas horas. E você ficou.',
      'Isso diz mais sobre você do que qualquer discurso: você escolhe ficar, mesmo quando eu peço demais.',
    ],
    image: assets.old_man,
  },
  {
    id: 'bichano',
    date: '22 de agosto',
    title: 'Seus pais. E o bichano.',
    lines: [
      'Igreja de novo, agora com os seus pais. E eu peguei um bichano na maquina pra você.',
      'Foi estranho, pq eu estava meio mal e irritado, mais so de estar do seu lado me acalmou.',
      'Ali eu percebi que eu já não estava visitando a sua vida. Eu estava dentro dela.',
    ],
    image: assets.giovanna03,
  },
  {
    id: 'lanternas',
    date: '23 de agosto',
    title: 'As lanternas.',
    lines: [
      'Luz indo pra agua. Você ali.',
      'Tem dia que parece cena de filme. Esse foi um.',
      'E mesmo assim o que ficou não foi o espetáculo. Foi você do meu lado enquanto tudo acendia.(E OS 60 REAIS EM TRUFA)',
    ],
    image: assets.lanternas01,
  },
  {
    id: 'hp',
    date: '30 de agosto',
    title: 'Harry Potter.',
    lines: [
      'Mais uma sala escura. Mais uma história que a gente escolheu ver lado a lado.',
      'Mesmo ja vendo isso tantas vezes, nunca tinha sido com voce.',
      'Na hora eu estava pensando que se eu fosse um bruxo, meu expecto patronum seria você.',
    ],
    image: assets.nossaFoto01,
  },
]

export type MemoryId = (typeof memories)[number]['id']

export type ChapterId = 'opening' | MemoryId | 'music' | 'finale'

export interface ChapterMeta {
  id: ChapterId
  label: string
  shortLabel: string
}

export const chapters: ChapterMeta[] = [
  { id: 'opening', label: 'Abertura', shortLabel: '0' },
  ...memories.map((memory, index) => ({
    id: memory.id as ChapterId,
    label: memory.date,
    shortLabel: String(index + 1),
  })),
  { id: 'music', label: 'Música', shortLabel: '♪' },
  { id: 'finale', label: 'Final', shortLabel: '∞' },
]

export const content = {
  opening: {
    whisper: 'Uma coisa que eu queria te dizer.',
    name: 'Giovanna.',
    start: 'Começar',
  },

  special: {
    lines: [
      'Tem pessoas que chegam e simplesmente fazem a vida acontecer de um jeito diferente.',
      'Você é uma dessas pessoas.',
      'E talvez o mais bonito seja que você nem perceba o quanto.',
    ],
    image: assets.giovanna01,
    imageAlt: 'Retrato cinematográfico — substitua por uma foto da Giovanna',
  },

  presence: {
    lines: [
      'Eu queria que você pudesse se enxergar por alguns minutos do jeito que eu te enxergo.',
      'Talvez entendesse por que eu acho você tão especial.',
      'Não é só pela sua beleza, embora eu pudesse passar horas falando sobre ela.',
      'É pelo seu jeito.',
      'Pela maneira como você faz as pessoas se sentirem bem.',
      'Pelo que você representa na vida de quem tem a sorte de estar perto.',
      'Você tem algo que não se explica direito.',
      'Algo que torna os dias mais leves.',
      'E eu acho que o mundo fica um pouquinho melhor porque você existe.',
    ],
    moments: [
      {
        image: assets.giovanna01,
        caption: 'O jeito',
        line: 'É pelo seu jeito.',
      },
      {
        image: assets.giovanna03,
        caption: 'A leveza',
        line: 'Algo que torna os dias mais leves.',
      },
      {
        image: assets.nossaFoto01,
        caption: 'Perto de você',
        line: 'O mundo fica um pouquinho melhor porque você existe.',
      },
    ],
  },

  longing: {
    lines: [
      'Tem uma coisa que eu queria muito agora.',
      'Estar com você.',
      'Não necessariamente fazendo alguma coisa especial.',
      'Só estar.',
      'Te olhar, ouvir sua voz de perto, sentir você ali comigo.',
      'Eu tô com tanta saudade que às vezes parece que os dias ficam esperando a próxima vez que eu vou te ver.',
      'E eu não vejo a hora.',
      'De verdade.',
      'Não vejo a hora de encontrar você novamente.',
    ],
    image: assets.backgroundCinema,
    imageAlt: 'Cena de distância — luz distante na noite',
  },

  music: {
    headline: 'Se eu pudesse transformar tudo o que sinto em uma música, acho que ainda faltariam palavras.',
    notes: [
      'Tem canções que lembram estrada e a vontade de chegar mais perto.',
      'Tem outras que falam de encontrar alguém que completa algo quieto dentro da gente.',
      'E tem as que lembram de amar por inteiro — inclusive o que não é perfeito.',
    ],
    allusions: [
      { label: 'Realidade ou Fantasia', hint: 'Henrique & Juliano' },
      { label: 'Te Vivo', hint: 'Luan Santana' },
      { label: 'All of Me', hint: 'John Legend' },
    ],
  },

  feeling: {
    lead: 'Eu sou completamente apaixonado por você.',
    lines: [
      'Pelo que você é.',
      'Pelo que você desperta em mim.',
      'Pelo que você representa.',
      'Pelo jeito que você transforma coisas simples em momentos que eu quero guardar.',
      'Pela pessoa que você é quando ninguém está olhando.',
      'E por tudo aquilo que talvez você ainda não saiba sobre o quanto é especial.',
    ],
  },

  future: {
    lines: [
      'Eu não sei exatamente o que vamos fazer quando eu te encontrar novamente.',
      'Talvez a gente saia.',
      'Talvez fique conversando por horas.',
      'Talvez não faça absolutamente nada.',
      'Mas eu sei que vai ser especial.',
      'Porque vai ser com você.',
      'E, sinceramente, eu só queria que esse momento chegasse logo.',
    ],
    image: assets.giovanna02,
    imageAlt: 'Expectativa de reencontro — substitua por uma foto juntos ou dela',
  },

  finale: {
    title: 'Entre tudo que existe, ainda é você.',
    lines: [
      'Eu te amo.',
      'E sou absurdamente feliz por ter você na minha vida.',
    ],
    closing: 'Com amor,',
    signature: meta.signature,
    replay: 'Rever desde o início',
  },
} as const

export const narrativeOrder: ChapterId[] = chapters.map((c) => c.id)
