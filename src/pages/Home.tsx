import { MetaTags, TypingArea } from '~/components';

export const Home = () => {
  return (
    <div>
      <MetaTags
        title="Monkeytype | Typing Test"
        description="Take a typing test and improve your skills. Monkeytype is a convenient and fast way to check your typing speed and accuracy."
        keywords="typing speed test, typing speed, typing accuracy, Monkeytype, typing, keyboard"
      />
      <TypingArea />
    </div>
  );
};
