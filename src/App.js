import './main.scss'
import {SlideApp} from './pages/slide-app'
import {Header} from './cmps/header'
import {Footer} from './cmps/footer'

function App() {
  return (
        <div className="app">
          <Header/>
          <main>
          <SlideApp/>
          </main>
          <Footer/>
        </div>
  )
}

export default App;
