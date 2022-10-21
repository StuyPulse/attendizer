import Button from 'react-bootstrap/Button';

// Display for each entry

export default function MeetingEntry(props) {
    const { date } = props;

    return (
        <tr>
            <td>{date}</td>
            <td>
                deleteButtonPlaceHolder
            </td>
        </tr>
    )
}