import Button from 'react-bootstrap/Button';
import Meta from '../components/Meta';
import MeetingEntry from '../components/MeetingEntry';
import StudentDeleteModal from '../components/StudentDeleteModal';
import StudentEntryModal from '../components/StudentEntryModal';
import ExportModal from '../components/ExportModal';
import Table from 'react-bootstrap/Table';
import styles from '../styles/Home.module.css';
import ErrorToast from '../components/ErrorToast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useRouter } from 'next/router';
import { useState } from 'react';

export async function getServerSideProps() {
  const studentres = await fetch(process.env.GET_STUDENTS_URL);
  const students = await studentres.json();
  const meetingres = await fetch(process.env.GET_MEETINGS_URL);
  const meetings = await meetingres.json();

  return { props: { students, meetings } };
}

export default function Meetings({ students, meetings }){
  const router = useRouter();
  const refreshData = () => {
      router.replace(router.asPath());
  };

  const [errorToasts, setErrorToasts] = useState([]);

  // Export modal states
  const [exportShow, setExportShow] = useState(false);
  
  
  
  const showExportModal = (e) => {
      refreshData();
      setExportShow(true);
  }
  const closeExportModal = () => setExportShow(false);

  return (
    <>
    <Meta title="Meeting Panel" />

    <div className={styles.container}>
      <main className={styles.main}>
      <h1 className={styles.title}>Admin Panel</h1>

      <Table>
        <thead>
        <tr>
            <th>Date</th>
            <th>Name</th>
            <th></th>
        </tr>
        </thead>

        <tbody id="studentTableBody">
          {meetings.map((meeting) => (
            <MeetingEntry
              key={meeting.id}
              id={meeting.id}
              date={meeting.date}
              name={meeting["students.name"]}
              // show={showEditModal}
              // showDelete={showDeleteModal}
            />
          ))}
        </tbody>
      
      </Table>

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