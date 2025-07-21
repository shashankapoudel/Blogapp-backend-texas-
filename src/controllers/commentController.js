const Comment = require("../models/Comment");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const asyncHandler = require("../utils/AsyncHandler");

const createComment = asyncHandler(async (req, res) => {
    const blogId = req.params.id; //blogid
    const userId = req.user._id; //userId

    const { text } = req.body;

    if (!text) {
        throw new ApiError(400, 'text is required')
    }

    const comment = await Comment.create({
        blog: blogId,
        user: userId,
        text
    })

    return res.status(200).json(new ApiResponse(200, comment, 'Comment added successfully'))
})



const getCommentsByBlogId = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const comment = await Comment.find({ blog: id }).populate('user', 'name')
        .sort({ createdAt: -1 })


    if (!comment) {
        throw new ApiError(400, "Comment not found")
    }

    return res.status(201).json(new ApiResponse(200, comment, 'Comment sent succesfully'))

})



// const getCommentsByBlogId = asyncHandler(async (req, res) => {

//     const { id } = req.params;

//     const comment = await Comment.find({ blog: id }).populate('user', 'name')
//         .sort({ createdAt: -1 })

//     return res.status(201).json(new ApiResponse(200, comment, 'Comment sent successfully'))

// })

module.exports = { createComment, getCommentsByBlogId }