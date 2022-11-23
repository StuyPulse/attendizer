const dbinit = require('../../models/database.js');
const student = require('../../models/student.js');
require('dotenv').config();

module.exports = async (req, res) => {
  if (req.body.key != process.env.KEY) {
    res.status(400).send({
      message: 'Invalid key!'
    });
    return;
  }
    const db = await dbinit();
    let studentId = req.body.id; 
    console.log(req.body);
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