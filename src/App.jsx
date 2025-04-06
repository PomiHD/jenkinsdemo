import './App.css'

function App() {
  const name = 'John'
  return (
    <>
      <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100'>
        <p>this is a demo to test jenkins</p>
        <p>do something in develop branch </p>
        <p>I&#39;m a feature branch</p>
        <p>{name}</p>
        <p>you should see change!</p>
        <p>a test!</p>
      </div>
    </>
  )
}

export default App
