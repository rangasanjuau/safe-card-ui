
export default function CreateCardForm({ name, pan, setName, setPan, onCreate }) {
  return (
    <form onSubmit={onCreate} style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.5rem' }}>
      <input
        placeholder="Cardholder Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        placeholder="Card Number (PAN)"
        value={pan}
        onChange={(e) => setPan(e.target.value.replace(/[^0-9\s]/g, ''))}
        required
      />
      <button type="submit">Create Card</button>
    </form>
  );
}
