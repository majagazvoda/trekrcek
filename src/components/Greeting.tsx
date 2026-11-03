import { useState } from 'react';

interface Message {
  hello: string;
  question: string;
}

const MORNING = ['Good morning', 'Morning', 'Hello there', 'A fresh start'];
const AFTERNOON = ['Good afternoon', 'Hi there', 'Hello again', 'Halfway through the day'];
const EVENING = ['Good evening', 'Hi there', 'Evening', 'Time to wind down'];

const ANYTIME: Message[] = [
  { hello: 'Hi there', question: 'How are you feeling today?' },
  { hello: 'Hello', question: 'What does your body need today?' },
  { hello: 'Nice to see you', question: 'How is your energy right now?' },
  { hello: 'Welcome back', question: 'How did you sleep?' },
  { hello: 'Hey', question: 'Have you had some water today?' },
  { hello: 'Take a breath', question: 'How is your mood at the moment?' },
  { hello: 'You are doing great', question: 'What is one kind thing you can do for yourself today?' },
  { hello: 'Hi there', question: 'Is anything feeling different today?' },
  { hello: 'Little check-in', question: 'How are you, really?' },
  { hello: 'Be gentle with yourself', question: 'What would make today a bit easier?' },
  { hello: 'Hello', question: 'What made you smile today?' },
  { hello: 'One day at a time', question: 'How is your body feeling?' },
  { hello: 'Good to have you here', question: 'Have you taken a moment for yourself today?' },
  { hello: 'Hey', question: 'Rest or move, what feels right today?' },
  { hello: 'Welcome back', question: 'What are you grateful for today?' },
];

const TIME_QUESTIONS = {
  morning: ['How did you wake up today?', 'What are you looking forward to today?', 'How are you feeling this morning?'],
  afternoon: ['How is your day going so far?', 'Have you eaten something nourishing?', 'Time for a little break?'],
  evening: ['How was your day?', 'What went well today?', 'Ready to slow down and rest?'],
};

function pick<T>(list: T[]): T {
  return list[Math.floor(Math.random() * list.length)];
}

function pickMessage(): Message {
  // Half the time use a time-of-day greeting, otherwise an any-time one
  if (Math.random() < 0.5) return pick(ANYTIME);

  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return { hello: pick(MORNING), question: pick(TIME_QUESTIONS.morning) };
  if (hour >= 12 && hour < 18) return { hello: pick(AFTERNOON), question: pick(TIME_QUESTIONS.afternoon) };
  return { hello: pick(EVENING), question: pick(TIME_QUESTIONS.evening) };
}

export default function Greeting() {
  // Picked once each time the app opens
  const [message] = useState(pickMessage);

  return (
    <div className="greeting">
      <h1 className="greeting-hello">{message.hello}</h1>
      <p className="greeting-question">{message.question}</p>
    </div>
  );
}
