import { TitleProject } from './types'

export const DEMO_TITLES: TitleProject[] = [
  // ── GATE lane ─────────────────────────────────────────────────────────────
  {
    id: 'demo-drift',
    title: 'Drift',
    lane: 'gate',
    format: 'film/documentary',
    genre: ['Documentary', 'Adventure', 'Sport'],
    logline: 'A blind surfer attempts to ride the world\'s most dangerous wave.',
    description:
      'Drift follows Derek Rabelo, a blind Brazilian surfer who travels to Pipeline, Hawaii — widely regarded as the world\'s most dangerous wave — to fulfill a promise made to his father before he lost his sight. Shot over three years across Brazil, Indonesia, and Hawaii, the film is a visceral meditation on perception, faith, and the ocean\'s indifferent beauty.',
    posterUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400&q=80',
    heroUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&q=85',
    status: 'Gate Review',
    talent: [
      { name: 'Derek Rabelo', role: 'Subject' },
      { name: 'Fernanda Lima', role: 'Director' },
    ],
    runtime: '94 min',
  },
  {
    id: 'demo-children-coast',
    title: 'Children of the Coast',
    lane: 'gate',
    format: 'tv/limited',
    genre: ['Drama', 'Mystery', 'Family'],
    logline: 'Six estranged siblings reunite after their father vanishes from the family fishing village.',
    description:
      'When patriarch Eamon Callahan disappears without a trace from the coastal Irish village his family has worked for four generations, his six children — scattered across three continents — must return. What begins as a missing persons case unravels into a reckoning with buried secrets, old debts, and a village that has kept its silence too long. A six-part limited series.',
    posterUrl: 'https://images.unsplash.com/photo-1533577116850-9cc66cad8a9b?w=400&q=80',
    heroUrl: 'https://images.unsplash.com/photo-1533577116850-9cc66cad8a9b?w=1200&q=85',
    status: 'Gate Review',
    talent: [
      { name: 'Ciarán Hinds', role: 'Lead — Eamon Callahan' },
      { name: 'Saoirse Ronan', role: 'Lead — Maeve Callahan' },
    ],
    episodes: 6,
  },
  {
    id: 'demo-romantic-comedy',
    title: 'Untitled Romantic Comedy',
    lane: 'gate',
    format: 'film/feature',
    genre: ['Romance', 'Comedy'],
    logline: 'Two rival food critics are forced to co-host a culinary road trip across Spain.',
    description:
      'When their respective magazines merge and editors demand a joint column, sworn rivals Marcus Webb and Elena Vidal must share a camper van from San Sebastián to Seville, reviewing restaurants neither would choose alone. As their competing philosophies clash over pintxos and paella, something unexpected simmers between them. A love story told in seven courses.',
    posterUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
    heroUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=85',
    status: 'Gate Review',
    talent: [
      { name: 'Pedro Almodóvar', role: 'Director (Attached)' },
    ],
    runtime: '108 min',
  },

  // ── FILM DEVELOPMENT lane ─────────────────────────────────────────────────
  {
    id: 'demo-quiet-hours',
    title: 'The Quiet Hours',
    lane: 'film',
    format: 'film/feature',
    genre: ['Drama', 'Supernatural', 'Mystery'],
    logline: 'A hospice nurse begins receiving letters from a patient who died three years ago.',
    description:
      'Grace Ellison has worked the night shift at Meridian Hospice for eleven years. When she discovers a shoebox of letters addressed to her — written in the unmistakable hand of Thomas Mara, a patient who died in her care — she begins a quiet, obsessive investigation that leads her across the country and into the life Thomas kept hidden. A ghost story with no ghosts.',
    posterUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&q=80',
    heroUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=85',
    status: 'Script Development',
    talent: [
      { name: 'Kelly Reichardt', role: 'Director (In Talks)' },
      { name: 'Cate Blanchett', role: 'Lead (In Talks)' },
    ],
    runtime: '112 min',
  },
  {
    id: 'demo-neon-requiem',
    title: 'Neon Requiem',
    lane: 'film',
    format: 'film/feature',
    genre: ['Neo-Noir', 'Crime', 'Thriller'],
    logline: 'A disgraced detective unravels a decades-old conspiracy in neon-soaked 1990s Miami.',
    description:
      'Set in 1994 Miami, Neon Requiem follows Ray Morales — stripped of his badge after a botched undercover op — who takes a job repossessing cars and stumbles onto a body in a waterfront warehouse. The dead man\'s face matches a cold case Ray worked fifteen years ago, when he was still someone worth being. A neo-noir about what we bury and what refuses to stay buried.',
    posterUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    heroUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
    status: 'Packaging',
    talent: [
      { name: 'Barry Jenkins', role: 'Director (Attached)' },
      { name: 'Oscar Isaac', role: 'Lead — Ray Morales' },
    ],
    runtime: '128 min',
  },
  {
    id: 'demo-somewhere-between',
    title: 'Somewhere Between',
    lane: 'film',
    format: 'film/feature',
    genre: ['Drama', 'Road Movie', 'Family'],
    logline: 'A mother and estranged son drive cross-country to scatter her husband\'s ashes.',
    description:
      'Nora and her son Daniel haven\'t spoken in three years. When her husband — Daniel\'s stepfather — dies suddenly and leaves instructions that his ashes be scattered at a lighthouse in Maine, Nora calls Daniel in Portland and asks him to drive. Neither is ready for the other, the silence, or the 2,800 miles ahead of them. A film about what it takes to come back.',
    posterUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80',
    heroUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=85',
    status: 'Financing',
    talent: [
      { name: 'Laura Dern', role: 'Lead — Nora' },
      { name: 'Timothée Chalamet', role: 'Lead — Daniel' },
    ],
    runtime: '118 min',
  },

  // ── TV DEVELOPMENT lane ───────────────────────────────────────────────────
  {
    id: 'demo-fourth-district',
    title: 'The Fourth District',
    lane: 'tv',
    format: 'tv/series',
    genre: ['Crime Drama', 'Procedural'],
    logline: 'A female police captain navigates corruption in a crumbling precinct.',
    description:
      'When Captain Adriana Vasquez takes command of the Fourth District — the most underfunded, least trusted precinct in the city — she inherits a squad demoralized by scandal, a community that stopped calling years ago, and a deputy commissioner who sees the Fourth as somewhere careers go to die. She intends to prove him right only on her terms.',
    posterUrl: 'https://images.unsplash.com/photo-1509822929464-92b27d20a6d0?w=400&q=80',
    heroUrl: 'https://images.unsplash.com/photo-1509822929464-92b27d20a6d0?w=1200&q=85',
    status: 'Writers Room',
    talent: [
      { name: 'Viola Davis', role: 'Lead — Capt. Adriana Vasquez' },
      { name: 'Shonda Rhimes', role: 'Showrunner' },
    ],
    episodes: 10,
  },
  {
    id: 'demo-midnight-protocol',
    title: 'Midnight Protocol',
    lane: 'tv',
    format: 'tv/series',
    genre: ['Thriller', 'Spy', 'Sci-Fi'],
    logline: 'An NSA analyst discovers a classified program that may have authored her own life.',
    description:
      'Claire Voss has spent eight years cataloguing other people\'s secrets. When a routine audit of a decommissioned black-site program reveals data signatures matching her own behavioral file — her choices, her relationships, the exact shape of her grief — she begins pulling threads that lead into a conspiracy that predates her career, possibly her birth. A paranoid thriller about identity and the infrastructure of control.',
    posterUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80',
    heroUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=85',
    status: 'Pilot Script',
    talent: [
      { name: 'Jodie Foster', role: 'Lead — Claire Voss' },
      { name: 'Alex Garland', role: 'Creator / Showrunner' },
    ],
    episodes: 8,
  },
  {
    id: 'demo-casa-blanca-noir',
    title: 'Casa Blanca Noir',
    lane: 'tv',
    format: 'tv/miniseries',
    genre: ['Mystery', 'Historical', 'Noir'],
    logline: 'A Moroccan detective in 1950s Casablanca solves crimes at the edge of espionage and jazz.',
    description:
      'Casablanca, 1952. Inspector Youssef Benali works homicide for a city that is equal parts French colonial bureaucracy, Cold War chess board, and jazz. When a Cuban musician is found dead in a medina alley — his pockets full of coded sheet music — Benali is pulled into a case that connects the city\'s smoky underground clubs to something far larger and far more dangerous. A four-part miniseries shot on location in Morocco.',
    posterUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&q=80',
    heroUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&q=85',
    status: 'Greenlit',
    talent: [
      { name: 'Tahar Rahim', role: 'Lead — Insp. Youssef Benali' },
      { name: 'Alice Winocour', role: 'Director' },
    ],
    episodes: 4,
  },
]
