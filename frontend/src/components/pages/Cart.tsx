import { ChangeEvent } from "react";
import useCart from "../hook/useCart"

const CartPage = () => {

    const { data, mutate, handleQuantityChane, calculateTotal, isLoading, isError } = useCart();


    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error</p>

    return (
        <div className="container">
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.products.map((product: any, index: number) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td className="d-flex align-items-center">
                                <button className="btn btn-success btn-sm mr-2" onClick={() => mutate({ action: "INCREMENT", productId: product.productId })}>+</button>
                                <span>{product.quantity}</span>
                                <input type="number" className="border border-red-100" onInput={(e) => handleQuantityChane(product.productId, e as ChangeEvent<HTMLInputElement>)} />
                                <button className="btn btn-danger btn-sm ml-2" onClick={() => mutate({ action: "DECREMENT", productId: product.productId })}>-</button>
                            </td>
                            <td>${product.price * product.quantity}</td>


                            <td>
                                <button className="btn btn-danger btn-sm" onClick={() => mutate({ action: "REMOVE", productId: product.productId })}>Delete</button>
                            </td>


                        </tr>
                    ))}
                </tbody>
            </table>
            <p className="mt-3">Total: ${calculateTotal()}</p>
        </div>



    )
}

export default CartPage