import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const Card = () => {
    const [products, setProducts] = useState(null)
    const getProducts = async () => {
        const res = await (await fetch('http://localhost:3000/api/products')).json();
        setProducts(res.products.length ? res.products.length : 0)
    }
    useEffect(() => {
        getProducts()
    }, [])
    return (
        <div className="my-4">
            <div className="container mx-auto shadow p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl">Products ({products})</h1>
                    <Link href="/create-products">
                        <button className="rounded text-sm text-center py-2 px-7 bg-pink-500 text-white hover:bg-pink-600 outline">New</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Card