import Button from 'react-bootstrap/Button';
import Meta from '../components/Meta';
import StudentEntry from '../components/StudentEntry';
import StudentDeleteModal from '../components/StudentDeleteModal';
import StudentEntryModal from '../components/StudentEntryModal';
import Table from 'react-bootstrap/Table';
import styles from '../styles/Home.module.css';
import ErrorToast from '../components/ErrorToast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useRouter } from 'next/router';
import { useState } from 'react';

var xlsx = require("xlsx-color");

export async function getServerSideProps() {
  // Fetch all students from backend
  const studentres = await fetch(process.env.GET_STUDENTS_URL);
  const students = await studentres.json();
  const meetingres = await fetch(process.env.GET_MEETINGS_URL);
  const meetings = await meetingres.json();

  return { props: { students, meetings } };
}

export default function Admin({ students, meetings }) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  // Error modal state
  const [errorToasts, setErrorToasts] = useState([]);

  // Add modal states
  const [addShow, setAddShow] = useState(false);

  const [delShow, setDelShow] = useState(false);

  const [addName, setAddName] = useState('');
  const [addOsis, setAddOsis] = useState('');
  const [addUid, setAddUid] = useState('');

  // Edit modal states
  const [editShow, setEditShow] = useState(false);
  const [editName, setEditName] = useState('');
  const [editOsis, setEditOsis] = useState('');
  const [editUid, setEditUid] = useState('');
  const [editId, setEditId] = useState('');
  // Delete modal states
  const [delId, setDelId] = useState('');
  const addFormStates = {
    name: addName,
    setName: setAddName,
    osis: addOsis,
    setOsis: setAddOsis,
    uid: addUid,
    setUid: setAddUid,
    error: errorToasts,
    setError: setErrorToasts
  };

  const editFormStates = {
    name: editName,
    setName: setEditName,
    osis: editOsis,
    setOsis: setEditOsis,
    uid: editUid,
    setUid: setEditUid,
    id: editId,
    setId: setEditId,
    error: errorToasts,
    setError: setErrorToasts
  };

  const delFormStates = {
    id: delId,
    setId: setDelId,
  }
  const showAddModal = () => setAddShow(true);
  const closeAddModal = () => {
    setAddShow(false);

    // Clear form
    setAddName('');
    setAddOsis('');
    setAddUid('');
  };
  const showDeleteModal = (e) => {
    setDelShow(true);
    // const deletedStudent = students[e.target.id - 1];
    setDelId(e.target.id);

  }
  const showEditModal = (e) => {
    setEditShow(true);

    // Get student data based on database id (might not be accurate)
    let editingStudent;

    for(let i in students){
      if(students[i].id == e.target.id){
        editingStudent = students[i];
        continue;
      }
    }

    setEditName(editingStudent.name);
    setEditOsis("0".repeat(9 - editingStudent.osis.toString().length) + editingStudent.osis);
    setEditUid("0".repeat(13 - editingStudent.uid.toString().length) + editingStudent.uid);
    setEditId(e.target.id);
  };
  const closeEditModal = () => setEditShow(false);
  const closeDelModal = () => setDelShow(false);

  const exportData = () => {
    refreshData();
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

    // console.log(workbook.Sheets["Meetings"]["B2"])
    for(let i in workbook.Sheets["Meetings"]){
      console.log(workbook.Sheets["Meetings"][i])

      if(workbook.Sheets["Meetings"][i].t == "b"){
        workbook.Sheets["Meetings"][i].t = "s";

        if(workbook.Sheets["Meetings"][i].v){
          workbook.Sheets["Meetings"][i].v = "Present";
          workbook.Sheets["Meetings"][i].s = {
            fill: {
              patternType: "solid",
              fgColor: { rgb: "36ff6b" }
            }
          }
        } else {
          workbook.Sheets["Meetings"][i].v = "Absent";
          workbook.Sheets["Meetings"][i].s = {
            fill: {
              patternType: "solid",
              fgColor: { rgb: "ff3636" }
            }
          }
        }
      }
    }
    workbook.Sheets["Students"]["!cols"] = [
      {wch:5}, {wch:12}, {wch:15}, {wch:20}
    ]

    xlsx.writeFile(workbook, "Students.xlsx", { compression: true });
  }

    

  // Rendered page
  return (
    <>
      <Meta title="Admin Panel" />

      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Admin Panel</h1>

          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>OSIS</th>
                <th>UID</th>
                <th></th>
              </tr>
            </thead>

            <tbody id="studentTableBody">
              {students.map((student) => (
                <StudentEntry
                  key={student.id}
                  id={student.id}
                  name={student.name}
                  osis={"0".repeat(9 - student.osis.toString().length) + student.osis}
                  uid={"0".repeat(13 - student.uid.toString().length) + student.uid}
                  show={showEditModal}
                  showDelete={showDeleteModal}
                />
              ))}
            </tbody>
          </Table>

          {/* Add student modal */}
          <Button variant="primary" onClick={showAddModal}>
            Add Student
          </Button>
          <StudentEntryModal
            show={addShow}
            closeModal={closeAddModal}
            action="Add"
            refresh={refreshData}
            formStates={addFormStates}
          />
          {/* Edit student modal */}
          <StudentEntryModal
            show={editShow}
            closeModal={closeEditModal}
            action="Edit"
            refresh={refreshData}
            formStates={editFormStates}
          />
          <StudentDeleteModal
            show={delShow}
            closeModal={closeDelModal}
            refresh={refreshData}
            formStates={delFormStates}
          />
          <br />

          <Button variant="primary" onClick = {exportData}>Export as CSV</Button>

          <ToastContainer position="top-end" className="p-3">
            {errorToasts.map((errorToast, index) => (
              <ErrorToast key={index} message={errorToast} />
            ))}
          </ToastContainer>
        </main>
      </div>
    </>
  );
}
