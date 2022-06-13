import Meta from '../../components/Meta';
import StudentEntry from '../../components/StudentEntry';
import styles from '../../styles/Home.module.css';

export default function Home() {
  function addStudent() {
    const studentTableBody = document.getElementById('studentTableBody');
    // TODO: finish
  }

  return (
    <>
      <Meta title="Admin Panel" />

      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Admin Panel</h1>

          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>OSIS</th>
                <th>UID</th>
                <th></th>
              </tr>
            </thead>

            <tbody id="studentTableBody">
              <StudentEntry
                id="0"
                name="John Doe"
                osis="123456789"
                uid="1234567890123"
              />
              <StudentEntry
                id="1"
                name="Dohn Joe"
                osis="987654321"
                uid="3210987654321"
              />
            </tbody>
          </table>

          <button onClick={addStudent} className="btn btn-primary">
            Add Student
          </button>
          {/* localhost:4000/reg?name=a&osis=1&uid=1 */}
          <br />
          <button className="btn btn-primary">Export as CSV</button>
        </main>
      </div>
    </>
  );
}
