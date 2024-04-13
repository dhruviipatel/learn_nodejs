const User = require('../models/userModel')

async function handleGetAllUsers(req, res) {
    const allusers = await User.find({});
    return res.status(200).json(allusers)
}

async function handleCreateNewuser(req, res) {
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.gender || !body.job_title || !body.email) {
        return res.json({ message: "All fields are required" })
    }
    const newuser = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        jobTitle: body.job_title,
        gender: body.gender
    })

    return res.status(201).json({ message: 'user created successfully' })
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ error: "User not found" })
    return res.json(user);
}

async function handleDeleteUserById(req, res) {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ error: "User not found" })
    return res.json({ message: 'User deleted successfully' })
}

async function handleEditUserById(req, res) {
    const userfields = {};
    const body = req.body;
    if ('first_name' in body) {
        userfields.firstName = body.first_name
    }
    if ('last_name' in body) {
        userfields.lastName = body.last_name
    }
    if ('email' in body) {
        userfields.email = body.email
    }
    if ('gender' in body) {
        userfields.gender = body.gender
    }
    if ('job_title' in body) {
        userfields.jobTitle = body.job_title
    }
    const user = await User.findByIdAndUpdate(req.params.id, userfields, { new: true })
    if (!user) return res.status(404).json({ error: "User Not Found" })
    return res.json({ message: 'User Updated Successfully', user: user });
}

async function handleShowDataInHtml(req, res) {
    const allusers = await User.find({})
    const html = `<ul>
            ${allusers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join("")}
    </ul>`
    return res.send(html)
}
module.exports = {
    handleGetAllUsers,
    handleCreateNewuser,
    handleGetUserById,
    handleDeleteUserById,
    handleEditUserById,
    handleShowDataInHtml,
}

