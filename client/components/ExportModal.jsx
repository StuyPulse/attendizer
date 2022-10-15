import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

var xlsx = require("xlsx-js-style");

export default function StudentExportModal(props) {
    const { show, closeModal, students, meetings} = props;
    const exportAction = async (e) => {
      // console.log(students);
      // console.log(meetings);
      students.forEach(student => {
        delete student.createdAt
        delete student.updatedAt
      });
      meetings.forEach(meeting => {
        delete meeting.createdAt
        delete meeting.updatedAt
      });
      const studentSheet = xlsx.utils.json_to_sheet(students);
      // const meetingSheet = xlsx.utils.json_to_sheet(meetings);

      let meetingTable = [[""]];
      students.forEach(student => {
        meetingTable[0].push(student.name);
      });

      let studentTable = []
      let count = 0;

      for(let i = 0; i<meetings.length; i++){
        if(i>0){
          if(meetings[i].date != meetings[i-1].date){
            meetingTable.push([meetings[i].date]);
            studentTable.push([meetings[i]["students.name"]])
            count++
            studentTable[count].push(meetings[i]["students.name"])
          } else {
            studentTable[count].push(meetings[i]["students.name"])
          }
        } else {
          meetingTable.push([meetings[i].date]);
          studentTable.push([meetings[i]["students.name"]])
        }
      }

      console.log(meetingTable)
      console.log(studentTable)

      for(let i = 1; i<meetingTable[0].length; i++){
        for(let j = 0; j<studentTable.length; j++){
          let studentIn = false;
          for(let k = 0; k<studentTable[j].length; k++){
            if(studentTable[j][k] == meetingTable[0][i]){
              studentIn = true;
            }
          }

          meetingTable[j+1].push(studentIn);
        }
      }

      const meetingSheet = xlsx.utils.aoa_to_sheet(meetingTable);

      const workbook = xlsx.utils.book_new();
      xlsx.utils.book_append_sheet(workbook, studentSheet, "Students");
      xlsx.utils.book_append_sheet(workbook, meetingSheet, "Meetings");

      let defaultFormatting = {
        alignment: {
          horizontal: "left"
        }
      };

      for(let i in workbook.Sheets["Students"]){
        if(workbook.Sheets["Students"][i].t == "b" || workbook.Sheets["Students"][i].t == "s"){
          workbook.Sheets["Students"][i].s = JSON.parse(JSON.stringify(defaultFormatting));
        }
      }

      for(let i in workbook.Sheets["Meetings"]){
        if(workbook.Sheets["Meetings"][i].t == "b" || workbook.Sheets["Meetings"][i].t == "s"){
          workbook.Sheets["Meetings"][i].s = JSON.parse(JSON.stringify(defaultFormatting));
        }

        if(workbook.Sheets["Meetings"][i].t == "b"){
          workbook.Sheets["Meetings"][i].t = "s";

          if(workbook.Sheets["Meetings"][i].v){
            workbook.Sheets["Meetings"][i].v = "Present";
            workbook.Sheets["Meetings"][i].s.fill = {patternType: "solid", fgColor: { rgb: "36ff6b" }}
          } else {
            workbook.Sheets["Meetings"][i].v = "Absent";
            workbook.Sheets["Meetings"][i].s.fill= {patternType: "solid", fgColor: { rgb: "ff3636" }}
          }
        }
      }
      workbook.Sheets["Students"]["!cols"] = [
        {wch:5}, {wch:12}, {wch:15}, {wch:20}
      ]

      workbook.Sheets["Meetings"]["!cols"] = [{wch:10}];

      for(let i = 1; i<meetingTable[0].length; i++){
        workbook.Sheets["Meetings"]["!cols"].push({wch:12});
      }

      xlsx.writeFile(workbook, "Students.xlsx", { compression: true });
      closeModal();
    }
    return (
        <Modal show={show} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Export Student Data</Modal.Title>
            </Modal.Header>
            <Modal.Body closeButton>
                Please confirm to export the database information.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={closeModal}>No</Button>
                <Button variant="primary" onClick={exportAction}>Yes</Button>
            </Modal.Footer>
        </Modal>
    )
}