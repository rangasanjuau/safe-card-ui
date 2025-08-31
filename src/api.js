export async function createCard(name, pan) {
    const res = await fetch(`${import.meta.env.VITE_API}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardholderName: name, pan })
    });
    if (!res.ok) throw new Error('Create failed');
    return res.json();
}

export async function searchByPan(pan) {
    const res = await fetch(`${import.meta.env.VITE_API}search?pan=${encodeURIComponent(pan)}`);
    if (!res.ok) throw new Error('Search failed');
    return res.json();
}

export async function searchByLast4(last4) {
    const res = await fetch(`${import.meta.env.VITE_API}search?last4=${encodeURIComponent(last4)}`);
    if (!res.ok) throw new Error('Search failed');
    return res.json();
}