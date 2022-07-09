import Button from 'react-bootstrap/Button';
import Meta from '../components/Meta';
import StudentEntry from '../components/StudentEntry';
import Table from 'react-bootstrap/Table';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router';

export async function getServerSideProps() {
  // Fetches all students from backend
  const res = await fetch(process.env.GET_URL);
  const students = (await res.json()).students;

  return { props: { students } };
}

export default function Admin({ students }) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const addStudent = () => {
    const studentTableBody = document.getElementById('studentTableBody');
    // TODO: finish
  };

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

          <Button variant="primary" onClick={addStudent}>
            Add Student
          </Button>
          {/* localhost:4000/reg?name=a&osis=1&uid=1 */}
          <br />
          <Button variant="primary">Export as CSV</Button>
        </main>
      </div>
    </>
  );
}
