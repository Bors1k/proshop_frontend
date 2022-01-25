import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'

import { Container } from 'react-bootstrap'
import { Routes, Route, BrowserRouter as Router} from 'react-router-dom' 
import RegisterScreen from './screens/RegisterScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className="py-5">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen/>} exact/>
            <Route path="/product/:id" element={<ProductScreen />}/>
            <Route path="/cart/:id" element={<CartScreen />}/>
            <Route path="/cart/" element={<CartScreen />}/>
            <Route path="/login/" element={<LoginScreen />}/>
            <Route path="/register/" element={<RegisterScreen />}/>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
