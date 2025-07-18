import { NextResponse } from 'next/server';
import { pdf } from '@react-pdf/renderer';
import EstimateInvoice from '@/components/pdf/EstimateInvoice';

export async function POST(req) {
    const body = await req.json();
    const { order, total } = body;

    try {
        const pdfBuffer = await pdf(<EstimateInvoice order={order} total={total} />).toBuffer();

        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename=estimate.pdf', // 👈 key change here
            },
        });
    } catch (error) {
        console.error('PDF generation error:', error);
        return new NextResponse(JSON.stringify({ error: 'PDF generation failed' }), {
            status: 500,
        });
    }
}