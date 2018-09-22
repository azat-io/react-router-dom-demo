import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { render } from 'react-dom'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { normalize, selection } from 'polished'

import Home from 'containers/Home'
import Categories from 'containers/Categories'
import NotFound from 'containers/NotFound'

import theme from 'etc/theme'

const rootReducer = combineReducers({})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__())

const GlobalStyle = createGlobalStyle`
  ${normalize()}
  ${({ theme }) => selection({
    background: theme.primaryColor,
    color: theme.primaryContrastColor,
  })}

  a {
    display: block;
  }
`

const Container = styled.div`
  display: block;
  min-height: 100%;
`

const App = () => (
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <Container>
          <GlobalStyle />
          <menu>
            <Link to={'/'}>
              { 'to home' }
            </Link>
            <Link to={'/categories'}>
              { 'to categories' }
            </Link>
          </menu>
          <Switch>
            <Route exact path={'/'} component={Home} />
            <Route path={'/categories'} component={Categories} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </ThemeProvider>
    </Router>
  </Provider>
)

render(<App />, document.getElementById('app'))
