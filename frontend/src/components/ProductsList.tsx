import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { IProduct } from '../interfaces/products'

const ProductsList = () => {
    const { data } = useQuery({
        queryKey: ['PRODUCTS'],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:8080/api/products`);
            return data.products;
        }

    })


    return (
        <div className="container">
            <div className="d-flex justify-content-between">
                <h2 className="mt-2">quản lý sản phẩm</h2>
                <Link to="products/add" className="btn btn-primary">thêm sản phẩm</Link>
            </div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Số thứ tự</th>
                        <th>tên sản phẩm</th>
                        <th>ảnh sản phẩm</th>
                        <th>giá sản phẩm</th>
                        <th>mô tả sản phẩm</th>
                        <th>mã giảm sản phẩm</th>
                        <th>Hành động</th>

                    </tr>
                </thead>
                <tbody>
                    {data?.map((product: IProduct, index: number) => (
                        <tr key={index} >
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td><img src={product.image} alt="" width={50} /></td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td>{product.discount}</td>
                            <td>
                                <button className=" btn btn-danger" >xóa</button>
                                <Link className="btn btn-primary" to={`/admin/products/${product._id}/edit`}>cập nhật</Link>

                            </td>
                        </tr>

                    ))}

                </tbody>
            </table>




        </div>
    )
}

export default ProductsList