const Sequelize = require('sequelize');
var connection;

if(process.env.NODE_ENV == "production"){
    connection = new Sequelize('sql10332891', 'sql10332891', 'KYAKr9m9tb', {
        // the sql dialect of the database
        // currently supported: 'mysql', 'sqlite', 'postgres', 'mssql'
        dialect: 'mysql',
      
        // custom host; default: localhost
        host: 'sql10.freemysqlhosting.net',
        // for postgres, you can also specify an absolute path to a directory
        // containing a UNIX socket to connect over
        // host: '/sockets/psql_sockets'.
      
        // custom port; default: dialect default
        port: 3306,
      
        // custom protocol; default: 'tcp'
        // postgres only, useful for Heroku
        protocol: null,
      
        // disable logging or provide a custom logging function; default: console.log
        logging: false,      
        // the storage engine for sqlite
        // - default ':memory:'
        storage: 'path/to/database.sqlite',
      
        // disable inserting undefined values as NULL
        // - default: false
        omitNull: true,
      
        // a flag for using a native library or not.
        // in the case of 'pg' -- set this to true will allow SSL support
        // - default: false
        native: true,
      
        // Specify options, which are used when sequelize.define is called.
        // The following example:
        //   define: { timestamps: false }
        // is basically the same as:
        //   Model.init(attributes, { timestamps: false });
        //   sequelize.define(name, attributes, { timestamps: false });
        // so defining the timestamps for each model will be not necessary
        define: {
          underscored: false,
          freezeTableName: false,
          charset: 'utf8',
          dialectOptions: {
            collate: 'utf8_general_ci'
          },
          timestamps: true
        },
      
        // similar for sync: you can define this to always force sync for models
        sync: { force: true },
      
        // pool configuration used to pool database connections
        pool: {
          max: 5,
          idle: 30000,
          acquire: 60000,
        }
      })
}else{

    connection = new Sequelize('questions-and-answers', 'root', '123456789', {
        host: 'localhost',
        dialect: 'mysql'
    });

}



module.exports = connection;
