export default function StudentEntry(props) {
  const editStudent = () => {
    // TODO: Specific row to edit
    console.log('h');
  };

  return (
    <tr id={props.id}>
      <td>{props.name}</td>
      <td>{props.osis}</td>
      <td>{props.uid}</td>

      <td>
        <button onClick={editStudent} className="btn btn-secondary">
          Edit
        </button>
      </td>
    </tr>
  );
}
