import './App.css'
import { Provider } from 'react-redux'
import store from './store'
import PetListing from './petList/View'

function App() {
  return (
    <Provider store={store}>
      <PetListing />
    </Provider>
  )
}

export default App
