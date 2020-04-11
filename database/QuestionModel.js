const Sequelize = require('sequelize');
const connectionDB = require('./db');

const Question = connectionDB.define('question', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Question.sync({force: false}).then((result) => { // if table exists, do not recreate!
    console.log('Database: Question.sync() executed successfully.')
}).catch((err) => {
    console.log(err)
}); 

module.exports = Question;