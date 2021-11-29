import React, { Component } from 'react';
import {Col, Row, Button} from 'react-bootstrap'
import ItemCard from '../components/ItemCard'


class Shop extends Component {
    constructor() {
        super();
        this.state={
            categories:[],
            items:[],
            itemStart: 0,
            itemEnd:15
        };
    };

    componentDidMount() {
        this.getAllCats();
        this.getAllItems();
    }

    
    //get all categories
    getAllCats = async() =>{
        await fetch('https://fakestoreapi.com/products/categories')
        .then((response) => response.json())
        .then(json=>{
            this.setState({categories:json}, ()=>console.log(json.data + "fetched all categories."))
        });
    }


    //get all items/products
    getAllItems = async() =>{
        await fetch('https://fakestoreapi.com/products')
        .then((response) => response.json())
        .then(json=>{
            this.setState({items:json}, ()=>console.log("fetched all items."))
        });
    }

    resetItemCounts = () =>{
        this.setState({itemStart:0, itemEnd:15});
    }


    //get all items by category
    getCatsItems = async(id)=>{
        let cat_id = this.state.categories[id];
        await fetch(`https://fakestoreapi.com/products/category/${cat_id}`)
        .then((response) => response.json())
        .then(json=>{
            this.setState({items:json}, ()=>console.log("fetched all products for category."))
        });
    }


    handleCat = async(id) =>{
        this.resetItemCounts()
        // since electronics has an id of 0
        if (id===-1){
            return await this.getAllItems();
        }
        return await this.getCatsItems(id);
        
    }

    
    handlePrev=()=>{
        const oldStart=this.state.itemStart;
        const oldEnd=this.state.itemEnd;
        this.setState({itemStart:oldStart-15, itemEnd:oldEnd-15});
    }

    handleNext=()=>{
        const oldStart=this.state.itemStart;
        const oldEnd=this.state.itemEnd;
        this.setState({itemStart:oldStart+15, itemEnd:oldEnd+15});
    }

    render() {
        const styles = {
            catButton:{
                backgroundColor: "white",
                color:"#69C1FC",
                width: '100%',
                border: '1px solid #BFE3FB',
                borderRadius: '15px',
                marginBottom:'8px',
                fontSize:'15px'
            },
            pageStyles:{
                backgroundColor: "white",
                padding:"20px"
            },
            headerStyles:{
                color:"black",
                fontSize:'20px'
            }
        }

        return (
            <div style={styles.pageStyles}>
                <center><img src="https://res.cloudinary.com/dzzbwxwsv/image/upload/v1638057557/banner3_q7fshc.jpg" width="1060px" height="300px" style={{marginLeft:"-10px", marginTop:"-10px"}}></img></center>
                <br/>
                <Row>
                    <Col md={3}>
                        {/* category section */}
                        <center><h3 style={styles.headerStyles}>SHOP BY CATEGORY</h3></center>
                        <hr/>
                        <ul style={{listStyleType:'none'}}>
                            <li>
                                <button style={styles.catButton} onClick={()=>this.handleCat(-1)}>PRODUCTS</button>
                            </li>
                            {/*  (c)=><li key={this.state.categories.indexOf(c)}> */}
                            {this.state.categories.map(
                                
                                (c)=><li key={this.state.categories.indexOf(c)}>
                                    <button style={styles.catButton} onClick={()=>this.handleCat(this.state.categories.indexOf(c))}>{c.toUpperCase()}</button>
                                </li>
                            )}

                        </ul>
                    </Col>
                    <Col md={9}>
                        {/* item section */}
                        <Row>
                            {this.state.items.slice(this.state.itemStart,this.state.itemEnd)
                                .map((i)=><ItemCard item={i} key={i.id} addToUserCart={this.props.addToUserCart}/>)}
                        </Row>
                        <div className="d-flex justify-content-center">
                            <Button className={"me-2 " + (this.state.itemStart===0?"disabled":'')} style={{backgroundColor:"#FB4807"}} onClick={()=>this.handlePrev()}>{"<< Prev"}</Button>
                            <Button className={" " + (this.state.items?.length<=this.state.itemEnd?"disabled":'')} style={{backgroundColor:"#4380C3"}} onClick={()=>this.handleNext()}>{"Next >>"}</Button>
                        </div>
                    </Col>

                </Row>
            </div>
        );
    }
}

export default Shop;