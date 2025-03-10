import { Helmet } from 'react-helmet-async'
import { TypingArea } from '~/components'

export const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Monkeytype | Typing Test</title>
        <meta
          name='description'
          content='Take a typing test and improve your skills. Monkeytype is a convenient and fast way to check your typing speed and accuracy.'
        />
        <meta
          name='keywords'
          content='typing speed test, typing speed, typing accuracy, Monkeytype, typing, keyboard'
        />
      </Helmet>
      <TypingArea />
    </div>
  )
}
