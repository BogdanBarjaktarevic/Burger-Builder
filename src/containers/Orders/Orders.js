import React, { Component } from 'react';
import Order from '../Orders/Order/Order';
import axios from '../../axios-orders';

class Orders extends Component {

    state = {
        orders: []
    }

    componentDidMount(){
        axios.get('/orders.json')
             
            .then(res => {
                const fetchedOrders = []
                for(let order in res.data){
                    fetchedOrders.push({
                        ...res.data[order],
                        id: order
                    })
                }
                this.setState({orders: fetchedOrders})
            })
    }


    render(){
        return (
            <div>
                {this.state.orders.map(order => {
                    console.log(order)
                   return <Order key={order.id} price={+order.price} ingredients={order.ingredients}/>
                })}
            </div>
        )
    }
}

export default Orders;