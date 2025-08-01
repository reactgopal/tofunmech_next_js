'use client';

export default function EstimateTableSkeleton() {
    return (
        <div className="animate-pulse w-full">
            <table className="account__table w-full">
                <thead className="account__table--header">
                    <tr className="account__table--header__child">
                        {['Estimate ID', 'Date', 'Total Items', 'Total Amount', 'Invoice'].map((label, idx) => (
                            <th key={idx} className="account__table--header__child--items text-base">{label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="account__table--body">
                    {[...Array(3)].map((_, i) => (
                        <tr key={i} className="account__table--body__child">
                            {Array(5).fill(0).map((_, j) => (
                                <td key={j} className="account__table--body__child--items py-4">
                                    <div className="h-5 w-24 bg-gray-300 rounded-md mx-auto"></div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
