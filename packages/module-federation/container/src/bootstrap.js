import { mount as mountProduct } from "products/index" 
import { mount as mountCart } from "cart/index"

mountProduct(document.querySelector('#prod-products'))
mountCart(document.querySelector('#prod-cart'))