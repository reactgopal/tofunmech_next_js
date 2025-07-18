import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        backgroundColor: '#ffffff'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 30,
    },
    logo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    logoSubtext: {
        fontSize: 10,
        color: '#666',
        marginTop: 2,
    },
    invoiceTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    invoiceInfo: {
        fontSize: 11,
        color: '#333',
        marginBottom: 2,
    },
    billToSection: {
        marginBottom: 30,
    },
    billToTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#000',
    },
    billToText: {
        fontSize: 11,
        color: '#333',
        marginBottom: 2,
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#f8f9fa',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#000000',
        marginBottom: 0,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',

    },
    tableCol1: { width: '50%' },
    tableCol2: { width: '15%', textAlign: 'center' },
    tableCol3: { width: '15%', textAlign: 'center' },
    tableCol4: { width: '20%', textAlign: 'right' },
    tableHeaderText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#000000',
    },
    tableText: {
        fontSize: 11,
        color: '#333',
    },
    itemDescription: {
        fontSize: 11,
        color: '#333',
        fontWeight: 'bold',
    },
    itemSubtext: {
        fontSize: 9,
        color: '#666',
        marginTop: 2,
    },
    totalsSection: {
        marginTop: 20,
        alignItems: 'flex-end',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
        marginBottom: 5,
    },
    totalLabel: {
        fontSize: 11,
        color: '#333',
    },
    totalValue: {
        fontSize: 11,
        color: '#333',
        fontWeight: 'bold',
    },
    grandTotalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 2,
        borderTopColor: '#000',
    },
    grandTotalLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000',
    },
    grandTotalValue: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000',
    },
    billSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footer: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    paymentMethod: {
        width: '45%',
    },
    contact: {
        marginTop: 25,
        width: '45%',
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#000',
    },
    footerText: {
        fontSize: 10,
        color: '#333',
        marginBottom: 2,
    },
    signature: {
        marginTop: 30,
        alignItems: 'flex-end',
    },
    signatureText: {
        fontSize: 10,
        color: '#333',
        marginBottom: 2,
    },
    terms: {
        marginTop: 30,
    },
    termsText: {
        fontSize: 9,
        color: '#666',
        lineHeight: 1.4,
    },
});
const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
    }).format(value || 0);
export default function Invoice({ order }) {
    const {
        name,
        address,
        mobile,
        email,
        coupon_value,
        total_amount,
        order_detail,
        created_at,
        addresses,
    } = order;

    const invoice_number = `INV-${order.id}`;
    const invoice_date = new Date(created_at).toLocaleDateString("en-IN");
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logo}>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                                <View style={{
                                    width: 8,
                                    height: 8,
                                    backgroundColor: '#000',
                                    borderRadius: 4,
                                    marginRight: 3
                                }} />
                                <View style={{
                                    width: 8,
                                    height: 8,
                                    backgroundColor: '#000',
                                    borderRadius: 4,
                                    marginRight: 3
                                }} />
                                <View style={{
                                    width: 8,
                                    height: 8,
                                    backgroundColor: '#000',
                                    borderRadius: 4
                                }} />
                            </View>
                            <Text style={styles.logoText}>LOGO</Text>
                            <Text style={styles.logoSubtext}>Pin Up Your Loose</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.invoiceTitle}>Invoice</Text>
                        <Text style={styles.invoiceInfo}>Invoice#: {invoice_number}</Text>
                        <Text style={styles.invoiceInfo}>Date: {invoice_date}</Text>
                    </View>
                </View>

                {/* Bill To Section */}
                <View style={styles.billSection}>
                    <View style={styles.billToSection}>
                        <Text style={styles.billToTitle}>Bill To:</Text>
                        <Text style={styles.billToText}>{name}</Text>
                        <Text style={styles.billToText}>{address}</Text>
                        <Text style={styles.billToText}>{mobile}</Text>
                        <Text style={styles.billToText}>{email}</Text>
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.billToTitle}>Total Due:</Text>
                        {/* <Text style={{ fontSize: 16, fontWeight: 'bold' }}>USD: $ {grandTotal.toFixed(2)}</Text> */}
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>USD: $3000</Text>
                    </View>
                </View>

                {/* Table Header */}
                <View style={styles.tableHeader}>
                    <View style={styles.tableCol1}>
                        <Text style={styles.tableHeaderText}>ITEM DESCRIPTION</Text>
                    </View>
                    <View style={styles.tableCol2}>
                        <Text style={styles.tableHeaderText}>PRICE</Text>
                    </View>
                    <View style={styles.tableCol3}>
                        <Text style={styles.tableHeaderText}>QTY</Text>
                    </View>
                    <View style={styles.tableCol4}>
                        <Text style={styles.tableHeaderText}>TOTAL</Text>
                    </View>
                </View>

                {/* Table Rows */}
                {Array.isArray(order_detail) && order_detail.length > 0 ? (
                    order_detail.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <View style={styles.tableCol1}>
                                <Text style={styles.itemDescription}>{item?.product_name || 'Service Item'}</Text>
                                <Text style={styles.itemSubtext}>
                                    {item?.description || 'Company to popular belief Lorem Ipsum simply'}
                                </Text>
                            </View>
                            <View style={styles.tableCol2}><Text style={styles.tableText}>{formatCurrency(item?.price)}</Text></View>
                            <View style={styles.tableCol3}><Text style={styles.tableText}>{item?.qty || 1}</Text></View>
                            <View style={styles.tableCol4}>
                                <Text style={styles.tableText}>{formatCurrency(item?.price * item?.qty)}</Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol1}>
                                <Text style={styles.itemDescription}>Web Design</Text>
                                <Text style={styles.itemSubtext}>Company to popular belief Lorem Ipsum simply</Text>
                            </View>
                            <View style={styles.tableCol2}>
                                <Text style={styles.tableText}>$750.00</Text>
                            </View>
                            <View style={styles.tableCol3}>
                                <Text style={styles.tableText}>2</Text>
                            </View>
                            <View style={styles.tableCol4}>
                                <Text style={styles.tableText}>$1500.00</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol1}>
                                <Text style={styles.itemDescription}>Wedding Photography</Text>
                                <Text style={styles.itemSubtext}>popular belief Lorem Ipsum not simply</Text>
                            </View>
                            <View style={styles.tableCol2}>
                                <Text style={styles.tableText}>$1300.00</Text>
                            </View>
                            <View style={styles.tableCol3}>
                                <Text style={styles.tableText}>1</Text>
                            </View>
                            <View style={styles.tableCol4}>
                                <Text style={styles.tableText}>$1300.00</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol1}>
                                <Text style={styles.itemDescription}>Web Development</Text>
                                <Text style={styles.itemSubtext}>Company to popular belief Lorem lorem not</Text>
                            </View>
                            <View style={styles.tableCol2}>
                                <Text style={styles.tableText}>$300.00</Text>
                            </View>
                            <View style={styles.tableCol3}>
                                <Text style={styles.tableText}>4</Text>
                            </View>
                            <View style={styles.tableCol4}>
                                <Text style={styles.tableText}>$1200.00</Text>
                            </View>
                        </View>
                        <View style={styles.tableRow}>
                            <View style={styles.tableCol1}>
                                <Text style={styles.itemDescription}>Brochure Design</Text>
                                <Text style={styles.itemSubtext}>Company to popular belief Loremslam random</Text>
                            </View>
                            <View style={styles.tableCol2}>
                                <Text style={styles.tableText}>$1700.00</Text>
                            </View>
                            <View style={styles.tableCol3}>
                                <Text style={styles.tableText}>1</Text>
                            </View>
                            <View style={styles.tableCol4}>
                                <Text style={styles.tableText}>$3400.00</Text>
                            </View>
                        </View>
                    </>
                )}

                {/* Totals Section */}
                <View style={styles.totalsSection}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>SUB TOTAL</Text>
                        {/* <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text> */}
                        <Text style={styles.totalValue}>{total_amount}</Text>
                    </View>
                    {/* <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Tax Vat 18%</Text>
                        <Text style={styles.totalValue}>$132</Text>
                    </View> */}
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Discount 10%</Text>
                        <Text style={styles.totalValue}>- ${coupon_value}</Text>
                    </View>
                    <View style={styles.grandTotalRow}>
                        <Text style={styles.grandTotalLabel}>Grand Total</Text>
                        <Text style={styles.grandTotalValue}>
                            {formatCurrency(total_amount - (coupon_value || 0))}
                        </Text>
                    </View>
                </View>

                {/* Footer */}
                {/* <View style={styles.footer}> */}
                <View style={styles.paymentMethod}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    <Text style={styles.footerText}>Check razorpay to</Text>
                    <Text style={styles.footerText}>We accept Cheque</Text>
                    <Text style={styles.footerText}>Razorpay: razorpay@invoice.com Card</Text>
                </View>
                <View style={styles.contact}>
                    <Text style={styles.sectionTitle}>Contact</Text>

                    {addresses ? (
                        <View>
                            <Text style={styles.footerText}>
                                {addresses.address}, {addresses.city}, {addresses.state}, {addresses.country} - {addresses.pincode}
                            </Text>
                            <Text style={styles.footerText}>+91 {addresses.mobile}</Text>
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.footerText}>123 Street, Town Portal, Country</Text>
                            <Text style={styles.footerText}>www.123.456.789 | info@yourname.com</Text>
                            <Text style={styles.footerText}>+987 654 321</Text>
                        </View>
                    )}
                </View>

                {/* </View> */}

                {/* Signature */}
                {/* <View style={styles.signature}>
                    <Text style={styles.signatureText}>Mark Williams</Text>
                    <Text style={styles.signatureText}>Manager</Text>
                </View> */}

                {/* Terms */}
                <View style={styles.terms}>
                    <Text style={styles.sectionTitle}>Terms & Condition</Text>
                    <Text style={styles.termsText}>
                        Company to popular belief Lorem Ipsum not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                    </Text>
                </View>
            </Page>
        </Document>
    );
}
