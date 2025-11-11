interface TopicContent {
  title: string;
  content: string[];
}

export const contentData: Record<string, TopicContent> = {
  symptoms: {
    title: 'Warning Signs and Symptoms',
    content: [
      'Diabetes symptoms vary depending on how much your blood sugar is elevated. Some people, especially those with prediabetes or type 2 diabetes, may not experience symptoms initially.',
      'Common symptoms include: Frequent urination, Increased thirst, Always feeling hungry, Feeling very tired, Blurry vision, Slow-healing cuts or sores, Tingling, pain, or numbness in the hands/feet.',
    ],
  },
  prediabetes: {
    title: 'Understanding Prediabetes',
    content: [
      'With prediabetes, action is the best medicine. If you’ve been diagnosed with prediabetes, we know that can feel a lot like—like your life has changed and you’ll never be “normal” again. But know that isn’t the case.',
      'Prediabetes is a serious health condition where blood sugar levels are higher than normal, but not high enough yet to be diagnosed as type 2 diabetes. A person with prediabetes is at high risk of type 2 diabetes, heart disease, and stroke.',
      'The good news is that if you have prediabetes, you can take steps to prevent or delay the onset of full-blown type 2 diabetes.',
    ],
  },
  'type-1': {
    title: 'About Type 1 Diabetes',
    content: [
      'Type 1 diabetes is thought to be caused by an autoimmune reaction (the body attacks itself by mistake) that stops your body from making insulin. Approximately 5-10% of the people who have diabetes have type 1.',
      'Symptoms of type 1 diabetes often develop quickly. It’s usually diagnosed in children, teens, and young adults. If you have type 1 diabetes, you’ll need to take insulin every day to survive.',
    ],
  },
  // We can add content for 'type-2', 'prevention', etc. here later.
};