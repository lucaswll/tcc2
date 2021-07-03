import React from 'react'
import { BrowserRouter,Route, Switch } from 'react-router-dom'

import Init from './pages/Init'
import Dweller from './pages/Dweller'
import Posts from './pages/Posts'
import Space from './pages/Space'
import Security from './pages/Sec'

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Init}></Route>
                <Route path="/dweller" exact component={Dweller}></Route>
                <Route path="/posts" exact component={Posts}></Route>
                <Route path="/space" exact component={Space}></Route>
                <Route path="/security" exact component={Security}></Route>
            </Switch>
        </BrowserRouter>
    )
}