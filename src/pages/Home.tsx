import TypingArea from '../components/TypingArea '
import { Helmet } from 'react-helmet-async'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Monkeytype | Typing Test</title>
      </Helmet>
      <TypingArea />
    </div>
  )
}

export default Home
