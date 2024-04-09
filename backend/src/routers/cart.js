import { Router } from 'express';
import { addItemToCart, decreaseProductQuantity, getCartByUserId, increaseProductQuantity, removeFromCart, updateproductQuantity } from '../controllers/cart';

const router = Router();
router.get("/cart/:userId", getCartByUserId);
router.post("/cart/add-to-cart", addItemToCart);
router.post("/cart/update", updateproductQuantity);
router.post("/cart/remove", removeFromCart);
router.post("/cart/increase", increaseProductQuantity);
router.post("/cart/decrease", decreaseProductQuantity);



export default router;