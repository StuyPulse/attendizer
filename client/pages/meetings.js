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
import { useState } from 'react';

export async function getServerSideProps() {
    const meetingres = await fetch(process.env.GET_MEETINGS_URL);
    const meetings = await meetingres.json();

    return { props: { meetings } };
}

export default function Meetings({ meetings }){
    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath());
    };
    
}