import React from 'react'
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from "joi";
import { useForm, } from 'react-hook-form';
import { IProduct } from '../interfaces/products';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Navigate, useNavigate, useParams, } from 'react-router-dom';

// const productSchema = Joi.object({
//     name: Joi.string().required().min(3),
//     price: Joi.number().positive().required(),
//     image: Joi.string(),
//     description: Joi.string()

// })


const ProductsEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({


    });

    const { data } = useQuery({
        queryKey: ['PRODUCTS', id],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:8080/api/products/${id}`);
            reset(data.product)
            return data.product;

        }

    })

    const { mutate } = useMutation({
        mutationFn: async (product: IProduct) => {
            const { data } = await axios.put(`http://localhost:8080/api/products/${product._id}`, product);
            return data.product
        },
        onSuccess: () => {
            alert("sửa thành công")
            queryClient.invalidateQueries({
                queryKey: ['PRODUCTS'],
            })

        }

    })

    const onSubmit = (product: IProduct) => {
        mutate(product);
        navigate(`/admin`)


    }
    return (
        <div className="container">
            <h2 className="mt-4">thêm sản phẩm</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                    <label htmlFor="name" className="form-label">tên sản phẩm</label>
                    <input type="text" className="form-control" placeholder="tên sản phẩm" {...register("name", { required: true, minLength: 3 })} />

                    {errors?.name?.message && <span className="text-danger">lỗi</span>}
                </div>

                <div className="mt-4">
                    <label htmlFor="price" className="form-label">giá sản phẩm</label>
                    <input type="number" className="form-control" placeholder="tên sản phẩm" {...register("price", { required: true })} />

                    {errors?.price?.message && <span className="text-danger">lỗi</span>}
                </div>

                <div className="mt-4">
                    <label htmlFor="image" className="form-label">ảnh sản phẩm</label>
                    <input type="text" className="form-control" placeholder="ảnh sản phẩm" {...register("image")} />

                </div>

                <div className="mt-4">
                    <label htmlFor="discount" className="form-label">mã giảm giá sản phẩm</label>
                    <input type="number" className="form-control" placeholder="mã giảm giá sản phẩm" {...register("discount")} />

                </div>

                <div className="mt-4">
                    <label htmlFor=" description" className="form-label">mô tả sản phẩm</label>
                    <textarea cols={30} rows={10} className="form-control" {...register("description")}></textarea>

                </div>

                <button className="btn btn-primary">Sửa sản phẩm</button>
            </form>

        </div>
    )
}

export default ProductsEdit;