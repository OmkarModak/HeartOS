export interface PollOption {
  id: string;
  label: string;
  emoji: string;
  isPositive: boolean;
  reactionEmoji: string;
}

export interface PollQuestion {
  id: string;
  question: string;
  options: PollOption[];
}

export const interPoll: PollQuestion = {
  id: "poll-inter",
  question: "Do you agree with everything so far and want to continue to the final chapter?",
  options: [
    { id: "opt-y", label: "Yes, continue! ❤️", emoji: "✅", isPositive: true, reactionEmoji: "🥰" },
    { id: "opt-n", label: "No, let's stop.", emoji: "❌", isPositive: false, reactionEmoji: "🥺" }
  ]
};

export const polls: PollQuestion[] = [
  {
    id: "poll-1",
    question: "Which version of Omkar would survive a Sunday with you?",
    options: [
      { id: "opt-1", label: "Ride", emoji: "🏍️", isPositive: true, reactionEmoji: "❤️" },
      { id: "opt-2", label: "Coffee", emoji: "☕", isPositive: true, reactionEmoji: "✨" },
      { id: "opt-3", label: "Gaming", emoji: "🎮", isPositive: true, reactionEmoji: "😂" },
      { id: "opt-4", label: "Movie", emoji: "🎬", isPositive: true, reactionEmoji: "🍿" },
      { id: "opt-5", label: "Sleep", emoji: "😴", isPositive: false, reactionEmoji: "🥺" }
    ]
  },
  {
    id: "poll-2",
    question: "How much developer nonsense can you tolerate?",
    options: [
      { id: "opt-1", label: "100% Bring it on", emoji: "🚀", isPositive: true, reactionEmoji: "❤️" },
      { id: "opt-2", label: "50% Maybe?", emoji: "🤔", isPositive: true, reactionEmoji: "😂" },
      { id: "opt-3", label: "0% Absolutely not", emoji: "🚫", isPositive: false, reactionEmoji: "😭" }
    ]
  }
];
