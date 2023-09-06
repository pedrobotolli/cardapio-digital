import { baseUrl } from '../constants';

export async function getAllOrders() {
    const response = await fetch(`${baseUrl}/api/orders`);
    const data = await response.json();
    return data;
}

export async function getOrderById(orderId) {
    const response = await fetch(`${baseUrl}/api/orders/${orderId}`)
    const data = await response.json()
    return data
}

export async function getAllOrderStatuses() {
    const response = await fetch(`${baseUrl}/api/order-status`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });
    const data = await response.json();
    return data;
}

export async function getProduct(productId) {
    const response = await fetch(`${baseUrl}/api/products/${productId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });
    const data = await response.json();
    return data;
}

export async function getAllCategories() {
    const response = await fetch(`${baseUrl}/api/categories`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });
    const data = await response.json();
    return data;
}