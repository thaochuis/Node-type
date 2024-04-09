import React from 'react'
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from "joi";
import { useForm } from 'react-hook-form';
import { IProduct } from '../interfaces/products';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

// const signupSchema = Joi.object({
//     name: Joi.string().min(3).max(30).required().messages({
//         "any.required": "Trường Name là bắt buộc",
//         "string.empty": "Trường Name không được để trống",
//         "string.min": "Trường Name phải có ít nhất {#limit} ký tự",
//         "string.max": "Trường Name không được vượt quá {#limit} ký tự",
//     }),
//     email: Joi.string().email().required().messages({
//         "any.required": "Trường Email là bắt buộc",
//         "string.empty": "Trường Email không được để trống",
//         "string.email": "Trường Email phải là email hợp lệ",
//     }),
//     password: Joi.string().min(6).max(30).required().messages({
//         "any.required": "Trường Password là bắt buộc",
//         "string.empty": "Trường Password không được để trống",
//         "string.min": "Trường Password phải có ít nhất {#limit} ký tự",
//         "string.max": "Trường Password không được vượt quá {#limit} ký tự",
//     }),
//     confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
//         "any.required": "Trường Confirm Password là bắt buộc",
//         "any.only": "Mật khẩu không trùng khớp",
//     }),
//     avatar: Joi.string().uri().messages({
//         "string.uri": "Trường Avatar phải là đường dẫn hợp lệ",
//     }),

// });


const Sigup = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { register, handleSubmit, formState: { errors } } = useForm({
        // resolver: joiResolver(signupSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const { mutate } = useMutation({
        mutationFn: async (user) => {
            const { data } = await axios.post(`http://localhost:8080/api/auth/signup`, user);
            return data.user;
        },
        onSuccess: () => {
            alert("Đăng ký thành công thêm thành công")
            queryClient.invalidateQueries({
                queryKey: ["PRODUCTS"],
            })

        }

    })

    const onSubmit = (user) => {
        mutate(user);
        navigate(`/signin`)


    }
    return (
        <div className="container">
            <h2 className="mt-4">Đăng ký</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                    <label htmlFor="name" className="form-label">tên người dùng</label>
                    <input type="text" className="form-control" placeholder="tên người dùng" {...register("name", { required: true, minLength: 3 })} />

                    {errors?.name?.message && <span className="text-danger">lỗi</span>}
                </div>

                <div className="mt-4">
                    <label htmlFor="email" className="form-label">email</label>
                    <input type="email" className="form-control" placeholder="email" {...register("email", { required: true })} />

                    {errors?.email?.message && <span className="text-danger">lỗi</span>}
                </div>

                <div className="mt-4">
                    <label htmlFor="password" className="form-label">Mật khâủ</label>
                    <input type="password" className="form-control" placeholder="PassWord" {...register("password")} />
                    {errors?.password?.message && (<span className="text-danger">{errors?.password?.message}</span>)}
                </div>

                <div className="mt-4">
                    <label htmlFor="confirmPassword" className="form-label">nhập lại mật khẩu</label>
                    <input type="password" className="form-control" placeholder="PassWord" {...register("confirmPassword")} />
                    {errors?.confirmPassword?.message && (<span className="text-danger">{errors?.confirmPassword?.message}</span>)}
                </div>


                <button className="btn btn-primary">thêm tài khoản</button>
                <span>
                    <a href="/signin">
                        <p>bạn đã có tài khoản</p>
                    </a>
                </span>
            </form >

        </div >
    )
}

export default Sigup;