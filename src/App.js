import {Route, Switch} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'

const App = () => (
  <Switch>
    <Route path="/login" component={LoginForm} />
    <Route path="/" component={Home} />
  </Switch>
)

export default App
