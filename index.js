import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser';
import compression from 'compression';


let port = 5600;
let uri = "mongodb+srv://vishnumothukuru:Vittuvishnujob123@cluster0.1ewxygz.mongodb.net/Love_chatretryWrites=true&w=majority";
let app = express();
app.use(compression());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors("*"));
app.listen(port, () => {
    console.log('server has started at', port);
});

mongoose.connect(uri).then(() => {
    console.log('db connection established');
});

// creation a users schema/model
const usersModel = mongoose.model("users", {
    username: {
        type: String,
        required: true,
        unique : true
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    location: {
        type: String,
    },
    avatar: {
        type: String,
        default: 'https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg',
    }
});

// creation of message schema 
let messageModel = mongoose.model('messages', {
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usersModel'
    },
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        required: true
    }
})

app.post("/register", async (request, response) => {
    try {
        let { username, password, confirmpassword, email, location, bio, avatar } = request.body;
        let exists = await usersModel.findOne({email});
        if (exists) {
            return response.status(400).json({ exists: 'user-already exists' })
        }
        else {
            let newuser = new usersModel({
                email,
                username,
                password,
                confirmpassword,
                bio,
                location,
                avatar
            });
            await newuser.save();
            response.json({ success: 'Registered successfully' })
        }
    } catch (error) {
        console.log(error)
        response.status(400).send('oops internal server error');
    }
});

app.post("/login", async (request, response) => {
    try {
        let { username, password } = request.body;
        let exists = await usersModel.findOne({username})
        if (!exists) {
            return response.status(400).json({ exists: 'User Not found' })
        }
        if (exists.password != password) {
            response.status(400).json({ password: 'Password is incorrect ' })
        }
        let payload = {
            userid: exists.id,
            username: exists.username
        }

        let key = '9132b677f83c35b341e056a84e0c53b5d568e43b8005eed030c2a60c3cd6498c10df2312b7c428d7cb9126876d985a43b2b1d0f3fe3d23163531f9fb67e8019b';
        jwt.sign(payload, key, (err, token) => {
            if (err) {
                console.log('token error', err)
            }
            else {
                response.status(200).json({ 
                    success: 'Logged in successfully',
                     jwt: token,
                    username : exists.username })
            }
        })
    }
    catch (error) {
        console.log(error.data)
    }
})

async function verifyToken(req, res, next) {
    try {
        let key = '9132b677f83c35b341e056a84e0c53b5d568e43b8005eed030c2a60c3cd6498c10df2312b7c428d7cb9126876d985a43b2b1d0f3fe3d23163531f9fb67e8019b';
        let token = req.headers.authorization;
        if (!token || token == undefined || token == null) {
            res.status(400).json({ tokenError: "token not found for verification" })
        }
        else {
            jwt.verify(token, key, (err, payload) => {
                if (err) {
                    console.log('verification error', err)
                }
                else {
                    req.payload = payload;
                    next();
                }
            })
        }
    }
    catch (error) {
        console.log(error, 'Decode error')
    }
}

app.post('/sendchat', verifyToken, async (request, response) => {
    try {
        let { message } = request.body;
        let exists = await usersModel.findById(request.payload.userid)
        if (exists) {
            let newMessage = new messageModel({
                userid: exists.id,
                username: exists.username,
                avatar: exists.avatar,
                message,
            })
            await newMessage.save();
            let allMessages = await messageModel.find().lean();
            response.status(200).json(allMessages)
        }
    }
    catch (error) {
        console.log(error, "error from API PAI API")
    }
})

app.get('/getchat', verifyToken, async (request, response) => {
    try {
        let allMessages = await messageModel.find().lean()
        console.log(allMessages)
        return response.json(allMessages)
    }
    catch (error) {
        console.log(error, 'axio error')
        response.status(400).send(error)
    }
})

app.delete('/delete/:id', verifyToken, async (request, response) => {
    try {
        console.log(request.params.id)
        await messageModel.findByIdAndDelete(request.params.id)
        let allMessages = await messageModel.find()
        response.status(200).json(allMessages)
        console.log('deleted daaaaa')
        }
    catch (error) {
        response.status(400).json({ message: 'server erro ! Try after some time' })
    }
})

app.get('/myprofile', verifyToken, async (request, response) => {
    try {
        console.log(request.payload)
        let user = await usersModel.findOne({ _id: request.payload.userid })
        return response.status(200).json(user)
    }
    catch (error) {
        console.log('user-Error', error)
    }

})
app.get('/mynetwork', verifyToken, async (request, response) => {
    try {
        let current = request.payload.userid
        let user = await usersModel.find({ _id : {$ne : current}}).lean()
        return response.status(200).json(user)
    }
    catch (error) {
        response.status(400).json({ error : 'getting error'})
        console.log('user-Error', error)
    }

})

app.delete('/delete-account', verifyToken, async (request, response) => {
    try {
        await usersModel.findByIdAndDelete(request.payload.userid)
        response.status(200).json({ deleteAccount: 'Account deleted successfully ' })
    }
    catch (error) {
        response.status(400).json({ error: 'sever error ! try after some time' })
    }
})

app.put('/update-profile', verifyToken, async (request, response) => {
    try {
        const userId = request.payload.userid;
        const updateData = request.body;
        const updatedUser = await usersModel.findByIdAndUpdate(userId, updateData, { new: true });
        response.json({updatedUser});
    }
    catch (error) {
        console, log('updation error', error)
    }
})