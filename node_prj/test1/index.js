const express = require('express')
const fs = require('fs')
const app = express()
const users = require('./MOCK_DATA.json')
const port = 8000

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    req.name = 'dhruvipatel'
    console.log('message from middleware 1')
    next();
})

app.use((req, res, next) => {
    console.log('msg from middleware 2', req.name)
    fs.appendFile('log.txt', ` \n ${Date.now()} ${req.method} ${req.path}`, (err, data) => {
        next();
    })

})

//display users data in html
app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`

    ).join("")}
    </ul>
    `;
    res.send(html);
});

//get users data in json
app.get('/api/users', (req, res) => {
    console.log(`middleware value ${req.name}`)
    return res.json(users);
});

//get specific user data in json 
app.route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id == id);
        return res.json(user);
    })

    .patch((req, res) => {
        //edit user using id

        const id = Number(req.params.id);
        const body = req.body;
        const userIndex = users.findIndex((user) => user.id === id);

        if (userIndex != -1) {
            if ('first_name' in body) {
                users[userIndex].first_name = req.body.first_name;
            }
            if ('last_name' in body) {
                users[userIndex].last_name = req.body.last_name;
            }
            if ('email' in body) {
                users[userIndex].email = req.body.email;
            }
            if ('gender' in body) {
                users[userIndex].gender = req.body.gender;
            }
            if ('job_title' in body) {
                users[userIndex].job_title = req.body.job_title;
            }

            fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
                if (err) {
                    return res.status(500).send('Internal server error')
                }
                return res.json({
                    status: 'success',
                    message: 'user edited successfully'
                })
            })

        } else {
            return res.status(404).json({ status: 'Error', message: 'User not found' });
        }

    })
    .delete((req, res) => {
        //delete user using id
        const id = Number(req.params.id);
        const userIndex = users.findIndex((user) => user.id == id);
        if (userIndex !== -1) {
            console.log(userIndex);
            users.splice(userIndex, 1);
            fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
                if (err) {
                    return res.status(500).send('Internal Server Error');
                }

                return res.json({
                    status: 'success',
                    message: 'user deleted successfully',
                    length: users.length
                });
            });

        } else {
            return res.status(404).json({ status: 'Error', message: 'User not found' });
        }
    });

app.post('/api/users', (req, res) => {
    //create new user
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ msg: 'All fields are required' })
    }
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile("./Mock_DATA.json", JSON.stringify(users), (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');

        } else {
            return res.json({ status: 'success', id: users.length })
        }
    })

})


app.listen(port, () => console.log('App started'))
