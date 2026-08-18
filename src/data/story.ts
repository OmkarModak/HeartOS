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
      "Family can be difficult sometimes, and we've been through some tough times together.",
      "But we have a pretty decent home—a 1 floor, 2 BHK house with an underground 1 BHK and a really nice garden.",
      "My father is retired now. He used to be a teacher, and he is someone I deeply look up to.",
      "My mom takes home tuitions, and I also have a pretty cool elder sister.",
      "Despite the ups and downs, I'm grateful for them, and I want to grow into someone who carries the qualities I admire in my father."
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
