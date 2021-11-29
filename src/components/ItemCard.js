import React, { Component } from "react";
import { Card, Col, Button } from "react-bootstrap";
import { titleCase } from "../helpers";
import { Redirect } from "react-router-dom";


export default class ItemCard extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
  }


  handleRenderItem = () => {
    this.setState({ clicked: true });
  };


  render() {
  return (
     
      <Col>
      {/* come back for single item */}
        {this.state.clicked ? (
          <Redirect to={`/item/${this.props.item.id}`} />
          ) : (
            ""
          )}
       

        <Card style={{ width: "250px", height:"430px", marginBottom: "25px" }} >
          <Card.Body>
          <Card.Title style={{fontSize:"13px", color:"#606A72"}}>
              {(this.props.item.title.toUpperCase()) ?? "Generic Item"}
            </Card.Title>
            <br/><br/>

            <Card.Img
            variant="top"
            style={{ height: "130px", objectFit: "contain" }}
            alt={this.props.item.title + " image"}
            src={
              this.props.item.image ??
              "https://res.cloudinary.com/cae67/image/upload/v1629310111/fakebook_shop/no-image_nkau78.png"
            }
            />
          <br/><br/>

          <Card.Text style={{fontSize:"13px", color:"grey"}}>
              {titleCase(this.props.item.description.substring(0,40))+"..." ?? "Sorry No Description"}
              <button
              style={{
                background:"white",
                border: "none",
                color: "#71BCEE",
                fontSize:"13px"
              }}
              onClick={() => this.handleRenderItem()}
            >
              See More
            </button>
            </Card.Text>

            <Card.Subtitle className="float-left " style={{color:"#71D4EE"}}>
              ${this.props.item.price ?? "?.??"}{" "}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <Button style={{backgroundColor:"white", fontSize:"12px", color:"#71D4EE", borderRadius:"18px", border: '2px solid #71D4EE'}} variant="info" > Add To Cart</Button>
            </Card.Subtitle>

          </Card.Body>
        </Card>
      </Col>
    );
  }
}
