export function maskPan(pan) {
    const digits = pan.replace(/\s+/g, '');
    return digits.split('').map((ch, i) => {
        const show = i < 6 || i >= digits.length - 4;
        return show ? ch : '*';
    }).map((ch, i) => ((i + 1) % 4 === 0 && i !== digits.length - 1) ? ch + ' ' :
        ch).join('');
}