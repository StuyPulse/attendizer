import Button from 'react-bootstrap/Button';
import Meta from '../components/Meta';
import StudentEntry from '../components/StudentEntry';
import StudentEntryModal from '../components/StudentEntryModal';
import Table from 'react-bootstrap/Table';
import styles from '../styles/Home.module.css';
import ErrorToast from '../components/ErrorToast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useRouter } from 'next/router';
import { useState } from 'react';

export async function getServerSideProps() {
  // Fetch all students from backend
  const res = await fetch(process.env.GET_URL);
  const students = await res.json();

  return { props: { students } };
}

export default function Admin({ students }) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  // Add modal states
  const [errorToasts, setErrorToasts] = useState([]);

  const [addShow, setAddShow] = useState(false);

  const [addName, setAddName] = useState('');
  const [addOsis, setAddOsis] = useState('');
  const [addUid, setAddUid] = useState('');

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

  const showAddModal = () => setAddShow(true);
  const closeAddModal = () => {
    setAddShow(false);

    // Clear form
    setAddName('');
    setAddOsis('');
    setAddUid('');
  };

  // Edit modal states
  const [editShow, setEditShow] = useState(false);

  const [editName, setEditName] = useState('');
  const [editOsis, setEditOsis] = useState('');
  const [editUid, setEditUid] = useState('');
  const [editId, setEditId] = useState('');

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

  const showEditModal = (e) => {
    setEditShow(true);

    // Get student data based on database id (might not be accurate)
    const editingStudent = students[e.target.id - 1];

    setEditName(editingStudent.name);
    setEditOsis("0".repeat(9 - editingStudent.osis.toString().length) + editingStudent.osis);
    setEditUid("0".repeat(13 - editingStudent.uid.toString().length) + editingStudent.uid);
    setEditId(editingStudent.id);
  };
  const closeEditModal = () => setEditShow(false);

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

          <br />

          <Button variant="primary">Export as CSV</Button>

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
