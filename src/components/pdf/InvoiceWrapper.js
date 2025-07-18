'use client';
import { toast } from 'react-toastify';

export default function InvoiceWrapper({ order = [], total = 0 }) {
    if (!Array.isArray(order) || order.length === 0) return null;

    const handleDownload = async () => {
        try {
            const res = await fetch('/api/estimate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ order, total }),
            });

            if (!res.ok) throw new Error('Estimate generation failed');

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'estimate.pdf';
            link.click();
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            toast.error('Failed to download estimate.');
        }
    };

    return (
        <button className="btn__view_estimate" onClick={handleDownload}>
            Download Estimate
        </button>
    );
}
