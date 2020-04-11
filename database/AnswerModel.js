const Sequelize = require('sequelize');
const connectionDB = require('./db');
const QuestionModel = require('./AnswerModel');
console.log('asdadasdsad')
const Answer = connectionDB.define('answer', {
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    questionId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'questions',
            key: 'id'
        }
    }
});

Answer.sync({force: false}).then((result) => { // if table exists, do not recreate!
    console.log('Database: Answer.sync() executed successfully.')
}).catch((err) => {
    console.log(err)
}); 

module.exports = Answer;