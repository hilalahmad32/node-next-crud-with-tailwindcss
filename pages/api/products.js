import nc from "next-connect";
import connectDb from "../../connection/config";
import Product from "../../models/Product";
connectDb();
const handler = nc()
    .get(async (req, res) => {
        const limit = req.query.limit;
        const page = req.query.page;
        const skipIndex = (page - 1) * limit;
        const totalCount = await Product.countDocuments();
        const products = await Product.find({})
            .limit(limit)
            .skip(skipIndex)
            .exec();
        res.send({ products, totalCount });
    })
    .post(async (req, res) => {
        // create products
        const { title, content, price } = req.body;
        if (!title || !content || !price) {
            res.send({ success: false, message: "Plese fill all the field" })
        } else {
            const products = new Product({ title, content, price })
            const product = await products.save();
            if (products) {
                res.send({ success: true, message: "Product saved Successfully" })
            } else {
                res.send({ success: false, message: "Some problem occure" })
            }
        }
    });

export default handler;