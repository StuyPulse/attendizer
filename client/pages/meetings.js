import Button from 'react-bootstrap/Button';
import Meta from '../components/Meta';
import MeetingEntry from '../components/MeetingEntry';
import MeetingDeleteModal from '../components/MeetingDeleteModal';
import ExportModal from '../components/ExportModal';
import Table from 'react-bootstrap/Table';
import styles from '../styles/Home.module.css';
import ErrorToast from '../components/ErrorToast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import KeyModal from '../components/KeyModal';

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
      router.replace(router.asPath);
  };

  const [errorToasts, setErrorToasts] = useState([]);

  // Export modal states
  const [exportShow, setExportShow] = useState(false);
  
  // Edit modal states
  const [delShow, setDelShow] = useState(false);
  const [delMeetingId, setDelMeetingId] = useState('');

  const delFormStates = {
    meetingId: delMeetingId,
    setMeetingId: setDelMeetingId,
    error: errorToasts,
    setError: setErrorToasts
  };
  const [keyShow, setKeyShow] = useState(false);

  const [ editKey, setEditKey ] = useState('');
  const keyFormStates = {
    key: editKey,
    setKey: setEditKey,
  }
  const closeKeyModal = () => setKeyShow(false);

  const showExportModal = (e) => {
      refreshData();
      setExportShow(true);
  }

  const showDelModal = (e) => {
    console.log(e.target.id);
    setDelShow(true);
    setDelMeetingId(e.target.id.split(", ")[0]);
  };

  const closeDelModal = () => {
    setDelShow(false)
  };
  
  const closeExportModal = () => setExportShow(false);

  useEffect(() => {
    setKeyShow(true);
  }, []);

  return (
    <>
    <Meta title="Meeting Panel" />

    <div className={styles.container}>
      <main className={styles.main}>
      <h1 className={styles.title}>Admin Panel</h1>

      <Table>
        <thead>
        <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Name</th>
            <th></th>
        </tr>
        </thead>

        <tbody id="studentTableBody">
          {meetings.map((meeting) => (
            <MeetingEntry
              key={meeting.id}
              id={"" + meeting.id + ", " + meeting["students.id"]}
              date={meeting.date}
              name={meeting["students.name"]}
              showDelete={showDelModal}
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

    <MeetingDeleteModal
      show={delShow}
      closeModal={closeDelModal}
      refresh={refreshData}
      formStates={delFormStates}
      keyState={keyFormStates}
    />

    <ToastContainer position="top-end" className="p-3">
        {errorToasts.map((errorToast, index) => (
        <ErrorToast key={index} message={errorToast} />
        ))}
    </ToastContainer>
    <KeyModal
      show={ keyShow }
      closeModal={ closeKeyModal }
      formStates={ keyFormStates }
      />
    </main>
  </div>
  </>
);
}