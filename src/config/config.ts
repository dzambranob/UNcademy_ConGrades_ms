export default {
    DB :{
        URI: process.env.MONGODB_URI || 'mongodb://localhost/UNcademy_ConGrades_db',
        USER: process.env.MONGODB_USER,
        PASWORD: process.env.MONGODB_PASS 
    }
}