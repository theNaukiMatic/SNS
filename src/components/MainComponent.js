import React, {Component} from 'react';

//imorting my components
import Header from './HeaderComponent';
import Home from './HomeComponent';

import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component{
    render(){
        return(
            <div>
                <Header />
                <div>
                    <Switch>
                        <Route path='/home' component={() => <Home />} />
                        <Redirect to="/home" />
                    </Switch>
                </div>
            </div>
        );
    }
}
export default Main;