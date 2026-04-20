import {
  cancelOrder,
  createOrder,
  getOrdersOfRestaurant,
  getUserOrders,
  updateOrderStatus,
} from "../services/orderService.js";
// customer order controllers
export async function createOrderController(req, res) {
  try {
    const order = req.body;
    const user = req.user;
    const paymentResponse = await createOrder(order, user);
    res.status(200).json(paymentResponse);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
    else res.status(500).json({ error: "Internal Server error" });
  }
}

export async function getUserOrdersController(req, res) {
  try {
    const user = req.user;
    const userOrders = await getUserOrders(user._id);
    res.status(200).json(userOrders);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
    else res.status(500).json({ error: "Internal Server error" });
  }
}

// admin order controllers
export async function deleteOrder(req, res) {
  try {
    const { orderId } = req.params;
    await cancelOrder(orderId);
    res.status(200).json({ message: "order deleted successfully." });
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
    else res.status(500).json({ error: "Internal Server error" });
  }
}

export async function getAllRestaurantOrdersController(req, res) {
  try {
    const { restaurantId } = req.params;
    const { orderStatus } = req.query;
    const orders = await getOrdersOfRestaurant(restaurantId, orderStatus);
    res.status(200).json(orders);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
    else res.status(500).json({ error: "Internal Server error" });
  }
}

export async function updateOrderStatusController(req, res) {
  try {
    const { orderId,orderStatus } = req.params;
    const order = await updateOrderStatus(orderId, orderStatus);
    res.status(200).json(order);
  } catch (error) {
    if (error instanceof Error) res.status(400).json({ error: error.message });
    else res.status(500).json({ error: "Internal Server error" });
  }
}
