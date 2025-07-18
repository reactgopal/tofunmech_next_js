

import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Styles
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
const EstimateInvoice = ({ order = [], total = 0 }) => {
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
                    </View>
                </View>

                {/* Bill To Section */}
                <View style={styles.billSection}>
                    <View style={styles.billToSection}>
                        <Text style={styles.billToTitle}>Bill To:</Text>
                    </View>

                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.billToTitle}>Total Due:</Text>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>USD: $ {total}</Text>
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
                {order.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                        <View style={styles.tableCol1}>
                            <Text style={styles.itemDescription}>{item?.product?.name}</Text>
                        </View>
                        <View style={styles.tableCol2}>
                            <Text style={styles.tableText}>₹{item?.price}</Text>
                        </View>
                        <View style={styles.tableCol3}>
                            <Text style={styles.tableText}>{item?.qty}</Text>
                        </View>
                        <View style={styles.tableCol4}>
                            <Text style={styles.tableText}>
                                ₹{(item?.price * item?.qty).toFixed(2)}
                            </Text>
                        </View>
                    </View>
                ))}

                {/* Totals Section */}
                <View style={styles.totalsSection}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>SUB TOTAL</Text>
                        <Text style={styles.totalValue}>
                            ₹{order.reduce((sum, item) =>
                                sum + (parseFloat(item?.price) * parseInt(item?.qty)), 0).toFixed(2)}
                        </Text>
                    </View>

                    <View style={styles.grandTotalRow}>
                        <Text style={styles.grandTotalLabel}>Grand Total</Text>
                        <Text style={styles.grandTotalValue}>₹{total}</Text>
                    </View>
                </View>

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
};

export default EstimateInvoice;