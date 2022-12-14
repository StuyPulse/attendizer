import Button from 'react-bootstrap/Button';
import Meta from '../components/Meta';
import StudentEntry from '../components/StudentEntry';
import StudentDeleteModal from '../components/StudentDeleteModal';
import StudentEntryModal from '../components/StudentEntryModal';
import ExportModal from '../components/ExportModal';
import Table from 'react-bootstrap/Table';
import styles from '../styles/Home.module.css';
import ErrorToast from '../components/ErrorToast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import KeyModal from '../components/KeyModal';

export default function Admin({ }) {
  const [students, setStudents] = useState([]);
  const [meetings, setMeetings] = useState([]);

  const refreshData = async () => {
    const studentres = await fetch(process.env.GET_STUDENTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: editKey }),
    });
    students = await studentres.json();
    console.log(students);
    if(!students.message){
      students.sort(function(firStudent, secStudent){
        let a = firStudent.name.trim().split(" ");
        let b = secStudent.name.trim().split(" ");
        let firName = a[0];
        let secName = b[0];
        let firLast = a[a.length - 1];
        let secLast = b[b.length - 1];
        if(firLast == secLast){
          return firName.toString().localeCompare(secName)
        }
        return firLast.toString().localeCompare(secLast)
      });
      setStudents(students);
    }
    const meetingres = await fetch(process.env.GET_MEETINGS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: editKey }),
    });
    meetings = await meetingres.json();
    if(!meetings.message){
      setMeetings(meetings);
    }
  };

  // Error modal state
  const [errorToasts, setErrorToasts] = useState([]);

  // Add modal states
  const [addShow, setAddShow] = useState(false);
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
  const [delShow, setDelShow] = useState(false);
  const [delId, setDelId] = useState('');

  // Export modal states
  const [exportShow, setExportShow] = useState(false);
  
  const [ keyShow, setKeyShow ] = useState(false);
  const [ editKey, setEditKey ] = useState('');

  const keyFormStates = {
    key: editKey,
    setKey: setEditKey,
  }

  const closeKeyModal = async () => {
    setKeyShow(false)
    refreshData();
  };

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
  const showExportModal = (e) => {
    refreshData();
    setExportShow(true);
  }

  const closeEditModal = () => {
    setEditShow(false)

    // Clear form
    setAddName('');
    setAddOsis('');
    setAddUid('');
  };
  const closeAddModal = () => {
    setAddShow(false);

    // Clear form
    setAddName('');
    setAddOsis('');
    setAddUid('');
  };
  const closeDelModal = () => setDelShow(false);
  const closeExportModal = () => setExportShow(false);

  useEffect(() => {
    setKeyShow(true);
  }, []);

  // Rendered page
  return (
    <>
      <Meta title="Admin Panel"/>

      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Admin Panel</h1>
          <div className={styles.tcontainer}>
            <Table striped hover>
              <thead style={{position: "sticky", top: "-1px", background:"white"}}>
                <tr>
                  <th>ID</th>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th>OSIS</th>
                  <th>UID</th>
                  <th></th>
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
          </div>
          {/* Add student modal */}
          <Button variant="primary" onClick={showAddModal} style={{margin:"15px 0 15px 0"}}>
            Add Student
          </Button>
          <StudentEntryModal
            show={addShow}
            closeModal={closeAddModal}
            action="Add"
            refresh={refreshData}
            formStates={addFormStates}
            keyState={keyFormStates}
          />
          {/* Edit student modal */}
          <StudentEntryModal
            show={editShow}
            closeModal={closeEditModal}
            action="Edit"
            refresh={refreshData}
            formStates={editFormStates}
            keyState={keyFormStates}
          />
          <StudentDeleteModal
            show={delShow}
            closeModal={closeDelModal}
            refresh={refreshData}
            formStates={delFormStates}
            keyState={keyFormStates}
          />
          <KeyModal
            show={ keyShow }
            closeModal={ closeKeyModal }
            formStates={ keyFormStates }
          />

          <Button variant="primary" onClick = {showExportModal}>Export as XLSX</Button>
          <ExportModal
            show={exportShow}
            closeModal={closeExportModal}
            students={students}
            meetings={meetings}
          />

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
