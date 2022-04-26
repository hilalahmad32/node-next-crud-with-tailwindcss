import nc from "next-connect";
import connectDb from "../../../connection/config";
import Product from "../../../models/Product";
connectDb();
const handler = nc()
    .put(async (req, res) => {
        const id = req.query.id;
        const products = await Product.findById({ _id: id });
        res.send({ products })

    })
    .patch(async (req, res) => {
        const id = req.query.id;
        const { title, content, price } = req.body;
        const products = await Product.findByIdAndUpdate({ _id: id }, {
            title, content, price
        });
        if (products) {
            res.send({
                success: true, message: "Update Successfully"
            })
        } else {
            res.send({
                success: false,
                message: " Not Update Successfully"
            })
        }

    })
    .delete(async (req, res) => {
        const id = req.query.id;
        const products = await Product.findByIdAndDelete({ _id: id })
        if (products) {
            res.send({
                success: true, message: "Delete Successfully"
            })
        } else {
            res.send({
                success: false,
                message: " Not Delete Successfully"
            })
        }
    });

export default handler;