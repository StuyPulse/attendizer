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

  // Modal states
  const [addShow, setAddShow] = useState(false);
  const showAddModal = () => setAddShow(true);
  const closeAddModal = () => setAddShow(false);

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
                  name={student.name}
                  osis={student.osis}
                  uid={student.uid}
                  refresh={refreshData}
                />
              ))}
            </tbody>
          </Table>

          {/* Add student */}
          <Button variant="primary" onClick={showAddModal}>
            Add Student
          </Button>
          <StudentEntryModal
            show={addShow}
            closeModal={closeAddModal}
            action="Add"
            refresh={refreshData}
          />

          <br />

          <Button variant="primary">Export as CSV</Button>
        </main>
      </div>
    </>
  );
}
