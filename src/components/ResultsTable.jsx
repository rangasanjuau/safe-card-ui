
export default function ResultsTable({ results }) {
  return (
    <table width="100%" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th align="left">Cardholder</th>
          <th align="left">Masked PAN</th>
          <th align="left">Created</th>
        </tr>
      </thead>
      <tbody>
        {results.map((r) => (
          <tr key={r.id} style={{ borderTop: '1px solid #eee' }}>
            <td>{r.cardholderName}</td>
            <td>{r.maskedPan}</td>
            <td>{new Date(r.createdAt).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
