
const express = require('express'),
    app = express(),
    passport = require('passport'),
    port = process.env.PORT || 80,
    cors = require('cors'),
    cookie = require('cookie')

const bcrypt = require('bcrypt')

const db = require('./database.js')
let users = db.users

let Yans = {
    list:
        [
            { id: "001", band: 'Tesla', model: '3', hp: 450, price: "3,090,000" },

        ]
}

require('./passport.js')

const router = require('express').Router(),
    jwt = require('jsonwebtoken')

app.use('/api', router)
router.use(cors({ origin: 'http://localhost:3000', credentials: true }))
// router.use(cors())
router.use(express.json())
router.use(express.urlencoded({ extended: false }))


//ฟังก์ชั่นใหม่
//Yan
router.route('/Yans')
    .get((req, res) => res.json(Yans))
    .post((req, res) => {
        console.log(req.body)
        let newYan = {}
        newYan.id = (Yans.list.length) ? Yans.list[Yans.list.length-1].id+1 : 1
        newYan.band = req.body.band
        newYan.model = req.body.model
        newYan.hp = req.body.hp
        newYan.price  = req.body.price
        Yans = { list: [...Yans.list, newYan] }
        res.json(Yans)
    })

router.route('/Yans/:yan_id') //params
    .get((req, res) => {
        let id = Yans.list.findIndex((item) => (+item.id === +req.params.yan_id))
        
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            res.json(Yans.list[id])
        }
        

    })
    .put((req, res) => {
        let id = Yans.list.findIndex((item) => (+item.id === +req.params.yan_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            Yans.list[id].band = req.body.band
            Yans.list[id].model = req.body.model
            Yans.list[id].hp = req.body.hp
            Yans.list[id].price = req.body.price
            res.json(Yans)
        }


    })
    .delete((req, res) => {
       
        let id = Yans.list.findIndex((item) => (+item.id === +req.params.yan_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            Yans.list = Yans.list.filter((item) => +item.id !== +req.params.yan_id)
            res.json(Yans)
        }
    })






    let BuyYans = {
        list:
            [
                { id: "001", band: 'Tesla', model: '3', price: "3,090,000" },
    
            ]
    }

    router.route('/BuyYans')
    .get((req, res) => res.json(BuyYans))
    .post((req, res) => {
        console.log(req.body)
        let newYan = {}
        newYan.id = (BuyYans.list.length) ? BuyYans.list[BuyYans.list.length-1].id+1 : 1
        newYan.band = req.body.band
        newYan.model = req.body.model
        newYan.price  = req.body.price
        BuyYans = { list: [...BuyYans.list, newYan] }
        res.json(BuyYans)
    })

router.route('/BuyYans/:yan_id')
    .get((req, res) => {
        let id = BuyYans.list.findIndex((item) => (+item.id === +req.params.yan_id))
        
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            res.json(BuyYans.list[id])
        }
        

    })
    .put((req, res) => {
        let id = BuyYans.list.findIndex((item) => (+item.id === +req.params.yan_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            BuyYans.list[id].band = req.body.band
            BuyYans.list[id].model = req.body.model
            BuyYans.list[id].price = req.body.price
            res.json(BuyYans)
        }


    })
    .delete((req, res) => {
       
        let id = BuyYans.list.findIndex((item) => (+item.id === +req.params.yan_id))
        if (id === -1) {
            res.send('Not Found')
        }
        else {
            BuyYans.list = BuyYans.list.filter((item) => +item.id !== +req.params.yan_id)
            res.json(BuyYans)
        }
    })



    router.post('/login', (req, res, next) => {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            console.log('Login: ', req.body, user, err, info)
            if (err) return next(err)
            if (user) {
                const token = jwt.sign(user, db.SECRET, {
                    expiresIn: '1d'
                })
                // req.cookie.token = token
                res.setHeader(
                    "Set-Cookie",
                    cookie.serialize("token", token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== "development",
                        maxAge: 60 * 60,
                        sameSite: "strict",
                        path: "/",
                    })
                );
                res.statusCode = 200
                return res.json({ user, token })
            } else
                return res.status(422).json(info)
        })(req, res, next)
    })
    
    router.get('/logout', (req, res) => { 
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", '', {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: -1,
                sameSite: "strict",
                path: "/",
            })
        );
        res.statusCode = 200
        return res.json({ message: 'Logout successful' })
    })
    
    /* GET user profile. */
    router.get('/profile',
        passport.authenticate('jwt', { session: false }),
        (req, res, next) => {
            res.send(req.user)
        });
    
    router.post('/register',
        async (req, res) => {
            try {
                const SALT_ROUND = 10
                const { username, email, password } = req.body 
                if (!username || !email || !password)
                    return res.json( {message: "Cannot register with empty string"})
                if (db.checkExistingUser(username) !== db.NOT_FOUND)
                    return res.json({ message: "Duplicated user" })
    
                let id = (users.users.length) ? users.users[users.users.length - 1].id + 1 : 1
                hash = await bcrypt.hash(password, SALT_ROUND)
                users.users.push({ id, username, password: hash, email })
                res.status(200).json({ message: "Register success" })
            } catch {
                res.status(422).json({ message: "Cannot register" })
            }
        })
    
    router.get('/alluser', (req,res) => res.json(db.users.users))
    
    router.get('/', (req, res, next) => {
        res.send('Respond without authentication');
    });    



router.get('/alluser', (req,res) => res.json(db.users.users))

router.get('/', (req, res, next) => {
    res.send('Respond without authentication');
});

// Error Handler
app.use((err, req, res, next) => {
    let statusCode = err.status || 500
    res.status(statusCode);
    res.json({
        error: {
            status: statusCode,
            message: err.message,
        }
    });
});


// Start Server
app.listen(port, () => console.log(`Server is running on port ${port}`))
