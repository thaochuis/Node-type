import React from 'react'
import useCart from '../hook/useCart';
import { useLocalStorage } from '../hook/useStorage';
import { IProduct } from '../../interfaces/products';
import { useForm } from "react-hook-form";
import { Button } from "../ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const OrderPage = () => {
    const form = useForm();
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    console.log(userId);

    const { data, calculateTotal } = useCart();
    console.log(data);


    const { mutate } = useMutation({
        mutationFn: async (order:
            {
                userId: string;
                items: [];
                totalPrice: Number;
                customeInfor: object
            }
        ) => {
            const { data } = await axios.post("http://localhost:8080/api/orders", order);
            return data;

        },
        onSuccess: () => {
            alert("đặt hàng thàng công");

        },

    })
    const onSubmit = (formData: object) => {
        mutate({
            userId,
            items: data?.products,
            totalPrice: calculateTotal(),
            customeInfor: formData,

        })
        // mutate({
        //     userId,
        //     items: data?.products,
        //     totalPrice: calculateTotal(),
        //     customeInfor: formData,


        // });
    }

    return (
        <div className="container mx-auto">
            <h1>Order</h1>
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="tên" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Số điện thoại</FormLabel>
                                        <FormControl>
                                            <Input type="tel" placeholder="số điện thoại" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit">hoàn thành đơn hàng</Button>
                        </form>
                    </Form>
                </div>

                <div className="col-span-4">
                    {data?.products?.map((item: IProduct) => (
                        <div>
                            <p>tên sản phẩm:{item.name}</p>
                            <p>Giá sản phẩm:{item.price}</p>
                            <p>số lượng:{item.quantity}</p>
                        </div>

                    ))}

                    <p className="mt-5">
                        <strong className="mr-2"> sản phẩm : </strong> {data?.products ? data?.products.length : 0}
                    </p>

                    <p className="">
                        <strong className="mr-2">tổng tiền:</strong> {calculateTotal()}
                    </p>


                </div>



            </div>
        </div>
    )
}

export default OrderPage 