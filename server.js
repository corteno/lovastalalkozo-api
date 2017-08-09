let express = require('express');
let bodyParser = require('body-parser');
let bcrypt = require('bcrypt');
let cors = require('cors');

let mongoose = require('./db/mongoose');
let message = require('./utils/message'); //Wrapper for {message: 'something'}


let {User} = require('./models/user');
let {Candidate} = require('./models/candidate');


let app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

app.use(cors());
app.use(bodyParser.json());

app.post('/register', (req, res) => {
    let user = new User({
        username: req.body.username,
        password: req.body.password
    });

    bcrypt.hash(req.body.password, 5).then((hash) => {
        user.password = hash;
    });


    console.log(mongoose);
    User.findOne({username: user.username}).then((doc) => {
        if (doc) {
            return res.status(400).send(message('User exists'));
        } else {
            user.save().then((doc) => {
                res.send(message('User created'));
            }, (e) => {
                res.status(400).send(message('Couldn\'t save user'));
            });
        }


    }, (e) => {
        console.log(e);
        res.status(400).send(message(e));
    });


});

app.post('/login', (req, res) => {
    let user = new User({
        username: req.body.username,
        password: req.body.password
    });

    User.findOne({username: user.username}).then((doc) => {
        if (doc) {

            bcrypt.compare(user.password, doc.password, (err, result) => {

                result
                    ? res.send(message('Successful login!'))
                    : res.status(400).send(message('Wrong username or password!'))

            });

            /*return res.send(message('Successful login!'));*/
        } else {
            return res.status(400).send(message('Wrong username or password!'));
        }

    }, (e) => {
        res.status(400).send(message(e));
    });

});

//Adding candidate
app.post('/signup', (req, res) => {
    let candidate = new Candidate({
        name: req.body.name,
        contact: req.body.contact,
        horsename: req.body.horsename,
        company: req.body.company,
        comments: req.body.comments
    });

    Candidate.findOne({contact: candidate.contact}).then((doc) => {
        if (doc) return res.status(400).send(message('Már regisztrált!'));

        candidate.save()
            .then((doc) => {
                res.send(message('Sikeres jelentkezés!'));
            })
            .catch((error) => {
                res.status(400).send(message('Nem sikerült regisztrálnunk a jelentkezését, kérjük próbálja újra!'));
            })

    })
        .catch((error) => {
            console.log(error);
        });


});

//Fetching candidates
app.get('/candidates', (req, res) => {
    Candidate.find({})
        .then((doc) => {
            return res.send(doc);
        })
        .catch((error) => {
            console.log(error);
        })
});

app.delete('/candidate/:id', (req, res) => {
    Candidate.findByIdAndRemove(req.params.id).then((doc) => {
        res.send(doc);
    })
        .catch((error) => {
            res.status(400).send(message('Hiba lépett fel'));
        });
});