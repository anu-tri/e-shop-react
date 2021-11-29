import React, { Component } from 'react'
import { Card, Col, Button } from "react-bootstrap";
import ItemCard from '../components/ItemCard'
import {getItem} from '../api/apiItems'
import { titleCase } from "../helpers";

export default class SingleItem extends Component {
    constructor() {
        super();
        this.state={
            item:[]
        }
    }

    componentDidMount() {
        this.getSingleItem()
    }

    getSingleItem = async () =>{
        //const item = await getItem(localStorage.getItem('token'), this.props.match.params.id)
        const item = await fetch(`https://fakestoreapi.com/products/${this.props.match.params.id}`)
        .then((response) => response.json())
        .then(json =>{
            this.setState({item:json},()=>console.log("fetched single item." + json.title))
        }
        );
        
        if(item === 400){this.setState({tokenError:true})}
        if(item === 500){this.setState({serverError:true})}
        
    }


    render() {
        return (
            <div>
                {
                    <>
                    <Card style={{ width: "250px", marginBottom: "25px" }} >
                    <Card.Body>
                    <Card.Title style={{fontSize:"16px", color:"#FB4807"}}>{(this.state.item.category) ?? "No Category"}</Card.Title><br/>
                    <Card.Title style={{fontSize:"13px", color:"#4380C3"}}>
                        {(this.state.item.title) ?? "Generic Item"}
                      </Card.Title>
                      <br/><br/>
          
                      <Card.Img
                      variant="top"
                      style={{ height: "130px", objectFit: "contain" }}
                      alt={this.state.item.title + " image"}
                      src={
                        this.state.item.image ??
                        "https://res.cloudinary.com/cae67/image/upload/v1629310111/fakebook_shop/no-image_nkau78.png"
                      }
                      />
                    <br/><br/>
          
                    <Card.Text style={{fontSize:"13px", color:"grey"}}>
                        {(this.state.item.description )?? "Sorry No Description"}
                        
                      </Card.Text>
          
                      <Card.Subtitle className="float-left " style={{color:"#71D4EE"}}>
                        ${this.state.item.price ?? "?.??"}{" "}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                       <Button style={{backgroundColor:"white", fontSize:"12px", color:"#71D4EE", borderRadius:"18px", border: '2px solid #71D4EE'}} variant="info"> Add To Cart</Button>
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                  
                  <a href="/" style={{color:"#B443C3", fontSize:"15px"}}>Back to store</a>
                  </>
    
                }
            </div>
        )
    }
}
