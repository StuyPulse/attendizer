import { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import ErrorToast from '../../components/ErrorToast';
import ExportModal from '../../components/ExportModal';
import KeyModal from '../../components/KeyModal';
import MeetingDeleteModal from '../../components/MeetingDeleteModal';
import MeetingEntry from '../../components/MeetingEntry';
import Meta from '../../components/Meta';
import Table from 'react-bootstrap/Table';
import ToastContainer from 'react-bootstrap/ToastContainer';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';

export default function Page() {
  const router = useRouter();

  const [errorToasts, setErrorToasts] = useState([]);

  const [exportShow, setExportShow] = useState(false);
  
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
  const closeKeyModal = () => {
    setKeyShow(false);
    refreshData();
  }

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

  const refreshData = async () => {
    const meetings = await fetch(process.env.GET_MEETINGS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: editKey }),
    }).then((res) => res.json());

    const meeting = meetings[router.query.meetId];

    const entries = await fetch(process.env.GET_ENTRIES_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: editKey }),
    }).then((res) => res.json());
  }
  
  return (
    <>
    <Meta title="Meeting" />

    <div className={styles.container}>
      <main className={styles.main}>
      <h1 className={styles.title}>Meeting {router.query.meetId}</h1>
      <div className={styles.tcontainer}>
        <Table striped hover>
          <thead style={{position: "sticky", top: "-1px", background:"white"}}>
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
      </div>

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
