import type { CyclePhase } from '../types';

export interface PhaseGuideEntry {
  phase: CyclePhase;
  name: string;
  short: string;
  tagline: string;
  hormones: string;
  feel: string[];
  food: string[];
  movement: string[];
  selfCare: string[];
  goodToKnow: string;
}

export const PHASE_ORDER: CyclePhase[] = [
  'menstrual',
  'follicular',
  'ovulation',
  'luteal',
  'premenstrual',
];

export const PHASE_GUIDE: Record<CyclePhase, PhaseGuideEntry> = {
  menstrual: {
    phase: 'menstrual',
    name: 'Menstrual phase',
    short: 'Period',
    tagline: 'Rest, warmth and a slower pace.',
    hormones:
      'Estrogen and progesterone are at their lowest. The lining of the uterus sheds, which is your period. Energy is often lower, especially in the first days.',
    feel: [
      'Cramps',
      'Tiredness',
      'Lower back pain',
      'Bloating',
      'Headaches',
      'Low mood',
      'Wanting to be alone',
    ],
    food: [
      'Iron-rich foods: leafy greens, lentils, beans, eggs, fish or red meat',
      'Add vitamin C (citrus, peppers, berries) to help absorb iron',
      'Warm, simple meals like soups, stews and porridge',
      'Magnesium for cramps: nuts, seeds, dark chocolate, bananas',
      'Ginger or chamomile tea, and plenty of water',
      'Go easy on salt, caffeine and alcohol if you feel bloated or crampy',
    ],
    movement: [
      'Gentle walks, especially outdoors',
      'Slow yoga, stretching or mobility work',
      'Rest days are completely fine',
      'Light movement can actually ease cramps',
    ],
    selfCare: [
      'A heat pad or hot water bottle on your belly or lower back',
      'Extra sleep and early nights',
      'Keep your plans light where you can',
      'Note your flow and symptoms, so you can spot patterns',
    ],
    goodToKnow:
      'See a doctor if you soak through a pad or tampon every hour for several hours, if your period lasts longer than 7 days, or if the pain stops you from doing everyday things.',
  },

  follicular: {
    phase: 'follicular',
    name: 'Follicular phase',
    short: 'Follicular',
    tagline: 'Fresh energy and new beginnings.',
    hormones:
      'Estrogen rises steadily as your body prepares an egg. Many people feel lighter, brighter and more motivated as this phase goes on.',
    feel: [
      'Rising energy',
      'Better mood',
      'Motivation',
      'Clearer skin',
      'Curiosity',
      'Feeling social',
    ],
    food: [
      'Fresh, colourful vegetables and salads',
      'Lean protein: eggs, fish, chicken, tofu, legumes',
      'Fermented foods: yogurt, kefir, sauerkraut, kimchi',
      'Whole grains and fibre: oats, quinoa, whole-grain bread',
      'Fruit and seeds as light snacks',
    ],
    movement: [
      'A good time to try something new',
      'Cardio: running, cycling, dancing',
      'Strength training as energy builds',
      'Short, intense workouts (HIIT) if you enjoy them',
    ],
    selfCare: [
      'Start new projects and make plans',
      'Brainstorm and learn new things',
      'Say yes to social plans',
      'Set goals for the month ahead',
    ],
    goodToKnow:
      'This phase usually lasts from the end of your period until ovulation. Its length varies the most from cycle to cycle, which is why cycle lengths differ.',
  },

  ovulation: {
    phase: 'ovulation',
    name: 'Ovulation',
    short: 'Ovulation',
    tagline: 'Your peak: confident, social, energised.',
    hormones:
      'Estrogen peaks and a surge of luteinising hormone (LH) releases an egg. Testosterone also rises a little. Many people feel their most energetic and confident.',
    feel: [
      'Peak energy',
      'Confidence',
      'Higher libido',
      'Clear, stretchy discharge',
      'Mild one-sided pelvic twinge',
      'Slight rise in body temperature',
    ],
    food: [
      'Fibre-rich foods: vegetables, whole grains, legumes',
      'Antioxidants: berries, tomatoes, leafy greens',
      'Cruciferous veg: broccoli, cauliflower, cabbage',
      'Light, fresh meals and plenty of water',
    ],
    movement: [
      'Your strongest days: go for higher intensity',
      'Group classes, team sports, dancing',
      'Personal bests, long runs or hikes',
      'Warm up well, as joints can be a bit looser around this time',
    ],
    selfCare: [
      'Plan important conversations, presentations or dates',
      'Connect with friends',
      'Enjoy the energy, but leave time to rest',
    ],
    goodToKnow:
      'This is your most fertile time. The app estimates it from your past cycles, so it is not a reliable method of contraception.',
  },

  luteal: {
    phase: 'luteal',
    name: 'Luteal phase',
    short: 'Luteal',
    tagline: 'Steady, grounded and focused.',
    hormones:
      'After ovulation, progesterone rises and becomes the main hormone. It has a calming effect, but it can also make you feel warmer, hungrier and a little slower.',
    feel: [
      'Steady energy that slowly drops',
      'Bigger appetite',
      'Breast tenderness',
      'Feeling warmer',
      'Wanting to nest and stay in',
      'Focus on detail',
    ],
    food: [
      'Complex carbs: oats, sweet potato, brown rice, whole grains',
      'Protein at every meal to keep you full',
      'Magnesium and B6: bananas, chickpeas, spinach, pumpkin seeds',
      'Regular meals and snacks to keep blood sugar steady',
      'Healthy fats: avocado, olive oil, nuts',
    ],
    movement: [
      'Moderate workouts: strength training, pilates, swimming',
      'Steady cardio instead of very intense sessions',
      'Long walks',
      'Listen to your body as energy dips towards the end',
    ],
    selfCare: [
      'Finish tasks and tie up loose ends',
      'Keep a regular sleep routine',
      'Cosy evenings at home',
      'Prepare for your period: stock up on what you need',
    ],
    goodToKnow:
      'The luteal phase is usually the most stable part of the cycle, around 12–14 days. If you are trying to understand your cycle, it is a good phase to notice energy and mood.',
  },

  premenstrual: {
    phase: 'premenstrual',
    name: 'Premenstrual phase',
    short: 'Premenstrual',
    tagline: 'Be extra gentle with yourself.',
    hormones:
      'If no pregnancy happens, estrogen and progesterone drop in the days before your period. This drop is what can bring on PMS.',
    feel: [
      'Mood swings',
      'Irritability',
      'Anxiety or tearfulness',
      'Bloating',
      'Cravings',
      'Headaches',
      'Spots or acne',
      'Trouble sleeping',
    ],
    food: [
      'Complex carbs to help with mood and cravings',
      'Calcium: yogurt, cheese, fortified plant milks, tofu',
      'Magnesium: dark chocolate, nuts, seeds, leafy greens',
      'Less salt, sugar, caffeine and alcohol can ease bloating and mood swings',
      'Water and herbal teas',
    ],
    movement: [
      'Gentle to moderate movement: walking, yoga, swimming',
      'Light exercise can reduce PMS symptoms',
      'Stretching before bed for better sleep',
    ],
    selfCare: [
      'Prioritise sleep',
      'Plan a lighter schedule where you can',
      'Journaling or talking things through',
      'Tell the people close to you how you feel',
    ],
    goodToKnow:
      'Talk to a doctor if PMS seriously affects your relationships, work or daily life. A more severe form, called PMDD, can be treated.',
  },
};
