const Home = () => {
  const userName = localStorage.getItem('userName')
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Typing Test</h1>
      {userName && <p>Welcome, {userName}!</p>}
    </div>
  )
}

export default Home
