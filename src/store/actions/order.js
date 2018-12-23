import * as actionTypes from './actionType';
import axios from '../../axios-orders';

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurgerSucces = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post("/orders.json", orderData)
      .then(response => dispatch(purchaseBurgerSucces(response.data, orderData)))
      .catch(error => dispatch(purchaseBurgerFail(error)));
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSucces = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
             
            .then(res => {
                const fetchedOrders = []
                for(let order in res.data){
                    fetchedOrders.push({
                        ...res.data[order],
                        id: order
                    })
                }
                dispatch(fetchOrdersSucces(fetchedOrders))
            })
            .catch(error => {
                dispatch(fetchOrdersFail(error))
            })
    }
}