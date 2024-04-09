import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useForm } from 'react-hook-form'
import { useLocalStorage } from './hook/useStorage';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';



const signinSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).min(3).required(),
    password: Joi.string().min(6).required()

})


const Sigin = () => {

    const [, setUser] = useLocalStorage("user", {});



    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(signinSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const { mutate } = useMutation({
        mutationFn: async (formData: { email: string; password: string }) => {
            const { data } = await axios.post("http://localhost:8080/api/auth/signin", formData);
            return data;

        },
        onSuccess: (data) => setUser(data),
        onError: (error) => console.log(error)

    });

    const onSubmit = (formData: { email: string; password: string }) => {
        mutate(formData);


    }




    return (
        < div className="container" >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                    <label htmlFor="email" className="form-label">email</label>
                    <input type="email" className="form-control"  {...register("email", { required: true, minLength: 3 })} placeholder="email" />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div className="mt-4">
                    <label htmlFor="confirmPassword" className="form-label">nhập lại mật khẩu</label>
                    <input type="password" className="form-control"  {...register("password", { required: true, maxLength: 6 })} placeholder="passWord" />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>


                <button className="btn btn-primary" >Đăng nhập</button>
            </form>
        </div >

    )

}

export default Sigin