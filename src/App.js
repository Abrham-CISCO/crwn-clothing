import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import {createStructuredSelector} from 'reselect'

import './App.css';

import ShopPage from './pages/shop/shop.component';
import HomePage from './pages/homepage/homepage.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import Header from './components/header/header.component'
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
import {connect} from 'react-redux'
import { selectCollectionsForPreview } from './redux/shop/shop.selectors'
import { setCurrentUser } from './redux/user/user.action'
import {selectCurrentUser} from './redux/user/user.selector'

class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount()
  {
    
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth=> {
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth)
        userRef.onSnapshot(snapshot=>{
          setCurrentUser({currentUser:{
            id:snapshot.id,
            ...snapshot.data()
          }})
        })
      }
      else
      {
        setCurrentUser(null)
        addCollectionAndDocuments('collections',
          collectionsArray.map(({title,items}) => ({title,items})))
      }
    })
  }

  componentWillUnmount()
  {
    this.unsubscribeFromAuth()
  }

  render(){
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path = "/" component={HomePage}/>
          <Route path="/shop" component={ShopPage}/>
          <Route exact path='/signin' 
            render={()=>this.props.currentUser?
            (<Redirect to='/' />):
            <SignInAndSignUpPage/>
          }
          />
          <Route exact path='/checkout' 
            component={CheckoutPage}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser:selectCurrentUser
})

const mapDispatchToProps = dispatch => (
  {
    setCurrentUser: user => dispatch(setCurrentUser(user))
  }
)
export default connect(mapStateToProps,mapDispatchToProps)(App);