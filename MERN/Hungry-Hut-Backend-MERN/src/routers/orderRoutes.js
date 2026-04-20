import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { createOrderController, deleteOrder, getAllRestaurantOrdersController, getUserOrdersController, updateOrderStatusController } from "../controllers/orderController.js";

const orderRoutes = Router();

// customer
// create order
orderRoutes.post('/order',authenticate,createOrderController);
// get user orders
orderRoutes.post('/order/user',authenticate,getUserOrdersController);

// admin
// get restaurant Orders
orderRoutes.post('/admin/order/restaurant/:restaurantId',authenticate,getAllRestaurantOrdersController);
// delete order
orderRoutes.delete('/admin/order/:orderId',authenticate,deleteOrder);
//update Order Status
orderRoutes.post('/admin/order/:orderId/:orderStatus',authenticate,updateOrderStatusController);
export default orderRoutes;