export interface Chapter {
  id: string;
  title: string;
  emoji: string;
  content: string[];
}

export const storyChapters: Chapter[] = [
  {
    id: "chapter-1",
    title: "WHOAMI",
    emoji: "🧑‍💻",
    content: [
      "I live in Goa.",
      "My family consists of my mother, my father, and my elder sister.",
      "I consider myself a simple person.",
      "My interests include singing, coding, vlogging, technology, movies, and gaming."
    ]
  },
  {
    id: "chapter-2",
    title: "LIFE.EXE",
    emoji: "🏠",
    content: [
      "My parents aren't perfect and sometimes things at home can be difficult, but we've been together through everything and I'm grateful for them.",
      "My father is someone I look up to.",
      "I want to grow into someone who carries himself with the qualities I admire in my father."
    ]
  },
  {
    id: "chapter-3",
    title: "RECOVERY",
    emoji: "❤️‍🩹",
    content: [
      "I have gone through difficult relationship experiences in the past.",
      "Those experiences taught me important lessons about trust, relationships, boundaries, self-respect and what I actually want from a relationship.",
      "I went through a difficult breakup in June 2026. The experience was painful and affected me deeply, but I eventually chose to move forward and rebuild myself.",
      "What did the past teach me?",
      "It taught me that I have been hurt and I have made mistakes, but I learned from them.",
      "I still believe good people exist.",
      "I want something genuine. I value kindness and a good heart. I want to become a better person."
    ]
  },
  {
    id: "chapter-4",
    title: "WHY_SHAADI()",
    emoji: "💍",
    content: [
      "I joined Shaadi because after everything I had experienced, I wanted to believe that there are still people who are genuinely good at heart.",
      "I wanted to believe there are still people out there who want something genuine."
    ]
  },
  {
    id: "chapter-5",
    title: "YOU.EXE ❤️",
    emoji: "✨",
    content: [
      "Then I saw you, Shraddha.",
      "I noticed you and something about you felt different. You felt positive to me.",
      "I became curious about you.",
      "Maybe I got a little too curious. 😂",
      "Basically, I went into full developer debugging mode. 👀",
      "I started searching for you online and eventually found you on LinkedIn.",
      "And well... here we are. ❤️"
    ]
  }
];
