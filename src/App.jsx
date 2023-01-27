
import Main from './components/Main'
import Navbar from './components/Navbar'

function App() {
  

  return (
    <div className='h-full px-9 bg-[url("assets/bg.svg")] bg-cover text-white'>
      <Navbar/>
      <div className='grid h-screen place-items-center'>
      <Main/>
      </div>
    </div>
  )
}

export default App
