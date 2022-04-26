import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const Table = () => {
    const [products, setProducts] = useState([])
    const [totalProducts, setTotalProducts] = useState(0);
    const [page, setPage] = useState(1);
    const [limit] = useState(2);
    const [isLoading, setIsLoading] = useState(false);
    const getProducts = async () => {
        setIsLoading(true)
        const res = await (await fetch(`http://localhost:3000/api/products?page=${page}&limit=${limit}`)).json();
        setProducts(res.products)
        setIsLoading(false)
        setTotalProducts(res.totalCount)
    }
    const nextPage = () => {
        getProducts();
        setPage(page + 1)

    }
    const prevPage = () => {
        getProducts();
        setPage(page - 1)

    }
    const deleteProducts = async (id) => {
        console.log(id);
        const res = await (await fetch('http://localhost:3000/api/products/' + id, {
            method: "DELETE"
        })).json();
        if (res.success) {
            const newProdcuts = products.filter((item) => item.id !== id);
            setProducts(newProdcuts);
            alert(res.message);
            getProducts()
        } else {
            alert(res.message);
        }

    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div>
            {isLoading && <div className="text-center text-3xl">isLoading.....</div>}
            <div className="container mx-auto shadow p-4">
                {!isLoading && <table className="w-full table-auto">
                    <thead>
                        <tr className="border-b w-full my-2 mx-2">
                            <th className="text-left px-4 py-4 ">ID</th>
                            <th className="text-left px-4 py-4 ">Title</th>
                            <th className="text-left px-4 py-4 ">Content</th>
                            <th className="text-left px-4 py-4">Price</th>
                            <th className="text-left px-4 py-4">Edit</th>
                            <th className="text-left px-4 py-4">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="my-4">
                        {products && products.map((val, index) => {
                            return (
                                <tr className="border-b" key={val._id}>
                                    <td className="px-4 py-4">{index + 1}</td>
                                    <td className="px-4 py-4">{val.title}</td>
                                    <td className="px-4 py-4">{val.content}</td>
                                    <td className="px-4 py-4">{val.price}</td>
                                    <td className="px-4 py-4">
                                        <Link href={`/update-products/${val._id}`}>
                                            <button className="rounded text-sm py-2 px-6 bg-green-500 hover:bg-green-600 text-white">Edit</button></Link>
                                    </td>
                                    <td className="px-4 py-4">
                                        <button
                                            onClick={() => { deleteProducts(val._id) }}
                                            className="rounded text-sm py-2 px-6 bg-red-500 hover:bg-red-600 text-white">Delete</button>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>}
                <div className="flex justify-between my-5">
                    <button onClick={prevPage} disabled={page <= 1} className={`rounded text-sm py-2 px-6 bg-pink-500 hover:bg-pink-600 text-white ${page <= 1 ? 'bg-gray-400 hover:bg-gray-400' : ''}`}>Prev</button>
                    <button onClick={nextPage} className="rounded text-sm py-2 px-6 bg-pink-500 hover:bg-pink-600 text-white">Next</button>
                </div>
            </div>
        </div >

    )
}
export default Table