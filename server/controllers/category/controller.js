const Category = require("../../model/Category");



exports.createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const exists = await Category.findOne({ name });

        if (exists) {
            return res.status(400).json({ message: "Category already exists" })
        }
        const category = await Category.create({ name });

        res.status(201).json({ message: "Category Created Successfully", category })

    } catch (err) {
        res.status(500).json({ message: "Server Error" })
    }
}

// Get Category Public
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ isActive: true });

        res.status(200).json(categories)
    } catch (err) {
        res.status(500).json({ message: "Server Error" })
    }
}

// Delete Category (Admin)
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        
        // Soft delete by setting isActive to false
        category.isActive = false;
        await category.save();
        
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
}