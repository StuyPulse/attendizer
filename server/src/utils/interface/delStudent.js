const req = require('express/lib/request');
const res = require('express/lib/response');
const dbinit = require('../../models/database.js');
const student = require('../../models/student.js');

module.exports = async (req, res) => {
    const db = await dbinit();

    studentId = req.body.id; 
    console.log(studentId)
    const removedStudent = await db.students.findOne({
        where: {
          id: studentId
        }
    });

    if(removedStudent == null){
        res.status(400).send({
            message: 'Could not find student from ID.'
        });
        return;
    }
    
    await removedStudent.destroy();
    
    res.send({
        message: "Student Deleted!"
    });
}