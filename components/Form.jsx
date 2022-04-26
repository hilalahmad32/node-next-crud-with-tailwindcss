import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const Form = () => {
    const router = useRouter();

    const [products, setProducts] = useState({
        title: '',
        content: '',
        price: ''
    })
    const onChangeHandle = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProducts({ ...products, [name]: value });
    };
    const submitHandle = async (e) => {
        e.preventDefault();
        const { title, content, price } = products;
        if (!title || !content || !price) {
            alert("Please fill the Field")
        } else {
            const data = {
                title: title,
                content: content,
                price: price
            };
            const res = await (await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })).json();
            if (res.success) {
                alert(res.message)
                setProducts({
                    title: '',
                    content: '',
                    price: ''
                });
                router.push("/")
            } else {
                alert(res.message)
            }
        }
    }
    return (
        <div className="container mx-auto max-w-xl ">
            <div className="my-10">
                <Link href="/" >
                    <button className="rounded px-6 py-2 my-4 bg-gray-500 text-white hover:bg-gray-600">Go Back</button></Link>
                <div className="shadow">
                    <h1 className="text-xl text-center">Create product</h1>
                    <form action="" className="p-4" onSubmit={submitHandle}>
                        <div className="my-2">
                            <lable className="text-md text-semiblod">Enter the title</lable>
                            <input type="text" value={products.title} onChange={onChangeHandle} name="title" id="" className="w-full rounded bg-transparent border outline-pink-500 px-3 py-2 text-black text-md mt-2" />
                        </div>
                        <div className="my-2">
                            <lable className="text-md text-semiblod">Enter the Content / Description</lable>
                            textarea
                            <textarea col="4" row="6" type="text" name="content" value={products.content} onChange={onChangeHandle} id="" className="w-full rounded bg-transparent border outline-pink-500 px-3 py-2 text-black text-md mt-2"></textarea>
                        </div>
                        <div className="my-2">
                            <lable className="text-md text-semiblod">Enter the Price</lable>
                            <input type="number"
                                value={products.price} onChange={onChangeHandle} name="price" id="" className="w-full rounded bg-transparent border outline-pink-500 px-3 py-2 text-black text-md mt-2" />
                        </div>
                        <button className="rounded px-6 py-2 my-4 bg-pink-500 text-white hover:bg-pink-600">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Form