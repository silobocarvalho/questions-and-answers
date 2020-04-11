const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const connectionDB = require('./database/db');
const QuestionModel = require('./database/QuestionModel');
const AnswerModel = require('./database/AnswerModel');

//EJS, Express and Session Flash configuration - BEGIN
app.set('view engine', 'ejs');
app.use(express.static('public'));
//EJS and Express configuration - END

//Body-parser lib configuration - BEGIN
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//Body-parser lib configuration - END

//Database configuration - BEGIN
connectionDB.authenticate().then(() => {
    console.log('MySQL authenticated!');
}).catch((error) => {
    console.log(error);
});
//Database configuration - END

//Variables definition - BEGIN
const serverPortNumber = process.env.PORT || 5555
//Variables definition - END

//Routes - BEGIN
app.get('/', (request, response) => {
    QuestionModel.findAll({ raw: true, order: [['updatedAt', 'DESC']] }).then((questions) => { //get only important data with raw = true.
        response.render('home', { questions: questions });
    }).catch((err) => {
        response.render('home', {error_msg: err});
    });
});

app.get('/doquestion', (request, response) => {
    response.render('doQuestion');
})

app.post('/savequestion', (request, response) => {
    let questionTitle = request.body.questiontitle;
    let questionContent = request.body.questioncontent;
    QuestionModel.create({
        title: questionTitle,
        description: questionContent
    }).then(() => {
        response.redirect('/');
    }).catch((err) => {
        response.render('doQuestion', {error_msg: err});
    }
    )
})

app.get('/question/:id', (request, response) => {
    let id = request.params.id;
    QuestionModel.findOne({
        where: { id: id }
    }).then((question) => {
        if (question != null && question != undefined) {

            AnswerModel.findAll({
                where: { questionId: question.id },
                order: [['updatedAt', 'DESC']]
            }).then(answers => {
                response.render('answerquestion', { question: question, answers: answers });
            }).catch(err => {
                response.render('answerquestion', { error_msg: err });
            })
        } else {
            response.redirect('/');
        }
    }).catch((err) => {
        response.render('/', {error_msg: err});
    });
})

app.post('/saveanswer', (request, response) => {
    let answerContent = request.body.answercontent;
    let questionId = request.body.questionId;
    console.log(answerContent)
    console.log(questionId)
    AnswerModel.create({
        content: answerContent,
        questionId: questionId
    }).then(() => {
        response.redirect('/question/' + questionId);
    }).catch((err) => {
        response.render('home', { error_msg: err });
    }
    )
})

//Routes - END

app.listen(serverPortNumber, () => {
    console.log("Server started at port: " + serverPortNumber);
});
