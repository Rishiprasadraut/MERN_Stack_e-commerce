const Product = require("../../model/Product")


// Admin can Create products

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category, countInStock } = req.body;

        if (!name || !description || price === undefined || !category || countInStock === undefined) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Product image required" });
        }

        const numericPrice = Number(price);

        if (isNaN(numericPrice)) {
            return res.status(400).json({ message: "Price must be a number" });
        }



        const product = await Product.create({
            name,
            description,
            price:numericPrice,
            category,
            image: req.file.path,     //Cloudinary URL
            countInStock,
        });

        res.status(201).json({ message: "Product Uploaded Successfully", product, })


    } catch (err) {
        res.status(500).json({ message: "Failed to create product" })
    }
}

//show All Products

exports.getAllProduct = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 8;
        const skip = (page - 1) * limit;

        const keyword = req.query.search
            ? { name: { $regex: req.query.search, $options: "i" } } : {};

        const categoryfilter = req.query.category
            ? { category: req.query.category } : {};

        const filter = {
            ...keyword,
            ...categoryfilter,
            isActive: true
        };


        const products = await Product.find(filter).populate("category", "name").skip(skip).limit(limit).sort({ createdAt: -1 });

        const totalProducts = await Product.countDocuments(filter);

        res.status(200).json({ products, page, totalProducts, pages: Math.ceil(totalProducts / limit) });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};


//find Product By Id

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category", "name");


        if (!product || !product.isActive) {
            return res.status(404).json({ message: "Product Not Found.." });
        }

        res.status(200).json(product);

    } catch (err) {
        res.status(400).json({ message: "Invalid Product ID" });
    }
};


//Update Product Details

exports.updateProducts = async (req, res) => {
    try {
        const allowedFields = [
            "name",
            "description",
            "price",
            "category",
            "image",
            "countInStock",
        ];

        const updateData = {};
        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product Not Found" })
        }

        res.status(200).json({ message: "Product Updated SuccessFully", product })
    } catch (err) {
        res.status(500).json({ message: "Failed to update product" });
    }
}

exports.updateProductImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Product image required" });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }

        product.image = req.file.path;
        await product.save();

        res.status(200).json({ message: "Product Image Updated Successfully", product });

    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
}

//Delete Products

exports.deleteProducts = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product Not Found" });
        }

        res.status(200).json({ message: "Product Deleted SuccessFully", product });
    } catch (err) {
        res.status(400).json({ message: "Invalid Product ID" });
    }
}



exports.getAllProductAdmin = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        // Only show active products in admin panel
        const products = await Product.find({ isActive: true })
            .populate("category", "name")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Product.countDocuments({ isActive: true });

        res.status(200).json({
            products,
            page,
            pages: Math.ceil(total / limit),
            total,
        });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }

}

exports.addProductReview = async (req, res) => {
    try {

        const { rating, comment } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product || !product.isActive) {
            return res.status(404).json({ message: "Product Not Found" });
        }

        //one Review per User

        const alreadyReviewed = product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            return res.status(400).json({ message: "Product Already Reviewed" });
        }

        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;

        product.averageReviews = product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length;

        await product.save();

        res.status(201).json({ message: "Review Added Successfully", review })

    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
}