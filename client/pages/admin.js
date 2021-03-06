import Button from 'react-bootstrap/Button';
import Meta from '../components/Meta';
import StudentEntry from '../components/StudentEntry';
import StudentEntryModal from '../components/StudentEntryModal';
import Table from 'react-bootstrap/Table';
import styles from '../styles/Home.module.css';
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
    setUid: setAddUid
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

  const editFormStates = {
    name: editName,
    setName: setEditName,
    osis: editOsis,
    setOsis: setEditOsis,
    uid: editUid,
    setUid: setEditUid
  };

  const showEditModal = (e) => {
    setEditShow(true);

    // Get student data based on database id (might not be accurate)
    const editingStudent = students[e.target.id - 1];

    setEditName(editingStudent.name);
    setEditOsis(editingStudent.osis);
    setEditUid(editingStudent.uid);
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
                  osis={student.osis}
                  uid={student.uid}
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
        </main>
      </div>
    </>
  );
}
