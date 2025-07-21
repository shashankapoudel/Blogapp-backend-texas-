const Blog = require("../models/Blog");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/AsyncHandler");


const createBlog = asyncHandler(async (req, res) => {

    const { title, content, author } = req.body;

    const imageUrls = req.files.map((file) => file.path);

    if (!title || !content || !author) {
        throw new ApiError(404, 'Title ,content and author is required')
    }

    const blog = await Blog.create({
        title,
        content,
        author,
        images: imageUrls
    })

    res.status(201).json(new ApiResponse(200, blog, 'Blog created successfully'))

})


const getAllBlogs = asyncHandler(async (req, res) => {

    const blogs = await Blog.find()

    if (!blogs) {
        throw new ApiError(400, "Blogs not found")
    }
    res.status(200).json(new ApiResponse(200, blogs, 'Blogs found successfully'))
})


const getSingleBlogById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const blog = await Blog.findById(id)

    if (!blog) {
        throw new ApiError(400, 'Blog not found')
    }

    return res.status(200).json(new ApiResponse(200, blog, 'Blog found'))

})


const updateBlog = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const { author, title, content } = req.body;

    const blog = await Blog.findByIdAndUpdate(id, {
        author,
        title,
        content
    },
        { new: true }
    )

    return res.status(201).json(new ApiResponse(200, blog, "Blog updated successfully"))

})


const deleteBlog = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
        throw new ApiError(400, 'Blog not found')
    }

    res.status(200).json(new ApiResponse(200, "Blog deleted successfully"))
})



module.exports = { createBlog, getAllBlogs, deleteBlog, getSingleBlogById, updateBlog }