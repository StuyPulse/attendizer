import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

var xlsx = require("xlsx-js-style");

export default function StudentExportModal(props) {
    const { show, closeModal, students, meetings} = props;
    const exportAction = async (e) => {
      meetings.sort(function(a, b){return a.date > b.date})
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

      const workbook = xlsx.utils.book_new();

      let meetingTable = [["","","","","","# at Meeting"],["","","","","","% at Meeting"],["ID", "Name", "Student ID", "Student UID", "# Attended", "% Attendend"]];
      students.forEach(student => {
        meetingTable.push([student.id, student.name, student.osis, student.uid]);
      });

            
      if(meetings[0]){
        let meetingList = [[meetings[0].date]];
        meetingTable[2].push(meetings[0].date);
        meetingTable[0].push(0);

        for(let i = 1; i<meetings.length; i++){
          if(meetings[i].date != meetings[i-1].date){
            meetingList.push([meetings[i].date]);
            meetingTable[0].push(0);
            meetingTable[2].push(meetings[i].date);
          }
        }

        let count = 0;
        for(let i = 0; i<meetings.length; i++){
          if(meetingList[count][0] != meetings[i].date){
            count++;
          }
          meetingList[count].push(meetings[i]["students.name"]);
        }

        console.log(meetingTable);

        let meetingNum = meetingList.length;
        for(let j = 3; j<meetingTable.length; j++){
          let totalMeetings = 0;
          for(let i = 0; i<meetingList.length; i++){
            meetingTable[j].push(meetingList[i].includes(meetingTable[j][1]));
            if(meetingList[i].includes(meetingTable[j][1])){
              totalMeetings++;
              meetingTable[0][i+6]++;
            }
          }
          meetingTable[j].splice(4, 0, totalMeetings);
          meetingTable[j].splice(5, 0, totalMeetings * 100/meetingNum);
        }

        for(let i = 6; i<meetingTable[0].length; i++){
          meetingTable[1].push(meetingTable[0][i] * 100 / students.length);
        }

        let meetingSheet = xlsx.utils.aoa_to_sheet(meetingTable);
        xlsx.utils.book_append_sheet(workbook, meetingSheet, "Meetings");
      }

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
      if(meetings[0]){
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
      }
      if(meetings[0]){
        workbook.Sheets["Meetings"]["!cols"] = [{wch:5},{wch:14},{wch:10},{wch:14}];

        for(let i = 4; i<meetingTable[0].length; i++){
          workbook.Sheets["Meetings"]["!cols"].push({wch:10});
        }
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