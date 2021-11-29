import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Logout from "./views/Logout";
import SingleItem from "./views/SingleItem";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import {titleCase} from './helpers';
import CreateCats from "./views/CreateCats";
import EditCats from "./views/EditCats";
import CreateItems from "./views/CreateItems";
import EditItems from "./views/EditItems";
import { Container } from 'react-bootstrap'


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      token: "",
      userFullName:"",
      isAdmin: false,
      cart:{},
      cartTotal:0
    };
  }

 
  
  componentDidMount() {
    if (typeof window !== "undefined") {
      window.addEventListener("storage",(e)=>{
        this.setState({cart:JSON.parse(localStorage.getItem("cart"))})
      })
    }
    }


  setUser = (user) => {
    this.setState({ user }, () => console.log("User is", this.state.user));
    // localStorage.setItem("user", user)
  };

  setUserName = (username) =>{
    let fullname = "";
    fetch('https://fakestoreapi.com/users')
    .then(response=>response.json())
    .then(json=>{
      for(let user of json){
        if(user.username === username){
          fullname = user.name.firstname + " " + user.name.lastname;
          console.log(fullname)
          this.setState({userFullName:titleCase(fullname)});
          localStorage.setItem("name",titleCase(fullname));
          break;
        }
      }
    })
  }

  
  setToken = (token) => {
    localStorage.setItem("token", token);
    this.setState({ token });
  };


  static getDerivedStateFromProps = (props, state) => {
    return { 
      token: localStorage.getItem("token"),
      name:localStorage.getItem("name"),
      cart: localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")):{}
    };
  };

   
  doLogout=()=>{
    console.log("Logged out")
    localStorage.clear();
    this.setToken('');
    this.setUserName('');
    this.setState({isAdmin:false, cart:{}, userFullName:''});
    //alert("logout")

  }

  // cart section
  addToCart=(item)=>{
    let cart = this.state.cart
    if (cart[item.name]){
      cart[item.name].quantity++
    }else{
      cart[item.name]={...item,quantity:1}
    }
    this.setState({cart})
    localStorage.setItem("cart",JSON.stringify(cart))
    alert(`Thanks for adding ${item.name} to your cart`)
  }
  

  //The total number of items in the cart
  getCartItemTotal=()=>{
    let total=0
    for (const item in this.state.cart){
      total+=this.state.cart[item].quantity
    }
    return total
  }

  // the total price of all items in cart
  getCartTotalPrice=()=>{
    let total=0
    for (const item in this.state.cart){
      total+=this.state.cart[item].quantity*this.state.cart[item].price
    }
    return total
  }

  removeFromCart = (item)=>{
    let cart=this.state.cart;
    if (cart[item.name].quantity >1){
      cart[item.name].quantity--
    }else if (cart[item.name].quantity === 1){
      delete cart[item.name]
    }
    this.setState({cart})
    localStorage.setItem("cart",JSON.stringify(cart))
    alert(`You remove ${item.name} from your cart`)
  }

  removeAllFromCart=(item)=>{
    let cart=this.state.cart;
    if(cart[item.name]){
      delete cart[item.name];
    }
    this.setState({cart})
    localStorage.setItem("cart",JSON.stringify(cart))
    alert(`You remove all of ${item.name}s from your cart`)
  }

  clearCart=()=>{
    this.setState({cart:{}})
    localStorage.removeItem("cart")
  }

  render() {
    return (
      <div>
        <NavBar token={this.state.token} userFullName={this.state.userFullName} isAdmin={this.state.isAdmin} getCartTotalPrice={this.getCartTotalPrice} getCartItemTotal={this.getCartItemTotal} />
        <Container>
          <Switch> 
            <ProtectedRoute exact path ="/" token={this.state.token} 
                render={()=><Home addToCart={this.addToCart}/>} />
            <ProtectedRoute exact path ="/item/:id" token={this.state.token} 
                render={(props)=><SingleItem {...props}/>} />
           
            {/* <AdminRoute exact path ="/createcats" isAdmin={this.state.isAdmin} token={this.state.token} 
                render={()=><CreateCats/>} />
            <AdminRoute exact path ="/editcats" isAdmin={this.state.isAdmin} token={this.state.token} 
                render={()=><EditCats/>} />

            <AdminRoute exact path ="/createitems" isAdmin={this.state.isAdmin} token={this.state.token} 
                render={()=><CreateItems/>} />
            <AdminRoute exact path ="/edititems" isAdmin={this.state.isAdmin} token={this.state.token} 
                render={()=><EditItems/>} /> */}

 
            <Route exact path ="/login" 
                render={()=><Login setToken={this.setToken} setUserName={this.setUserName}/>} />
            
            <ProtectedRoute exact path ="/logout"
                token={this.state.token}
                render={()=><Logout doLogout={this.doLogout}/>}/>
          </Switch>
        </Container>
      </div>
    );
  }
}
