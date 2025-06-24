import React, { Fragment } from "react";
import {
    Image,
    Text,
    View,
    Page,
    Document,
    StyleSheet,
} from "@react-pdf/renderer";
// import mechx from "../images/mechx.png";

const EstimateInvoice = ({ order, total = 0 }) => {
    if (!Array.isArray(order)) {
        return null; // Prevent errors if order is not an array
    }
    console.log(order, "EstimateInvoice")
    const user = JSON.parse(localStorage.getItem('USER'));
    // 

    const styles = StyleSheet.create({
        page: {
            fontSize: 11,
            paddingTop: 20,
            paddingLeft: 40,
            paddingRight: 40,
            lineHeight: 1.6,
            flexDirection: "column",
        },
        spaceBetween: {
            flexDirection: "row",
            justifyContent: "space-between !important",
            alignItems: 'flex-start',
            color: "#3E3E3E",
        },
        titleContainer: { flexDirection: "row", marginTop: 16 },
        logo: { width: 100, height: 40 },
        reportTitle: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#2c3e50",
            marginLeft: 10,
        },
        invoice: {
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 4,
        },
        invoiceNumber: {
            fontSize: 10,
            color: "#333",
            marginBottom: 2,
        },
        addressTitle: {
            fontSize: 12,
            fontWeight: "bold",
            marginBottom: 3,
        },
        address: {
            fontSize: 10,
            lineHeight: 1.4,
        },
        theader: {
            fontSize: 10,
            fontWeight: "bold",
            padding: 5,
            flex: 1,
            backgroundColor: "#E8E8E8",
            borderColor: "#D3D3D3",
            borderWidth: 1,
        },
        theader2: { flex: 2 },
        tbody: {
            fontSize: 9,
            padding: 5,
            flex: 1,
            borderColor: "#E8E8E8",
            borderWidth: 1,
            textTransform: "capitalize",
        },
        tbody2: { flex: 2 },
        total: {
            fontSize: 9,
            padding: 5,
            flex: 1.5,
            borderColor: "#E8E8E8",
            borderWidth: 1,
        },
        invoiceFooterRow: {
            width: "100%",
            flexDirection: "row",
            marginTop: 25,
        },
        pageNumber: {
            position: "absolute",
            fontSize: 9,
            bottom: 10,
            right: 40,
        },
        reportTitle: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#2c3e50",
            // marginLeft: 10, // Remove or adjust this
        },

    });

    const InvoiceTitle = () => (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            {/* <Image style={styles.logo} src={mechx} alt="Mech-x" /> */}
            <Text style={styles.reportTitle}>Mech-X Enterprises</Text>
        </View>
    );

    const Address = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <View>
                    <Text style={styles.invoice}>Estimate</Text>
                    <Fragment >
                        <Text style={styles.invoiceNumber}>Email : {user?.data?.email}</Text>
                    </Fragment>
                </View>
            </View>
        </View>
    );

    const TableHead = () => (
        <View style={{ width: "100%", flexDirection: "row", marginTop: 10 }}>
            <View style={[styles.theader, styles.theader2]}>
                <Text>Items</Text>
            </View>
            <View style={styles.theader}>
                <Text>Price</Text>
            </View>
            <View style={styles.theader}>
                <Text>Qty</Text>
            </View>
            <View style={styles.theader}>
                <Text>Amount</Text>
            </View>
        </View>
    );

    const TableBody2 = () =>
        order?.map((receipt) => (
            <Fragment key={receipt.id}>
                <View style={{ width: "100%", flexDirection: "row" }}>
                    <View style={[styles.tbody, styles.tbody2]}>
                        <Text>
                            {/* {receipt?.product?.name} ({receipt.product?.PN}) */}
                            {/* {receipt?.name} */}
                            {receipt?.product?.name ? receipt?.product?.name : receipt?.name}
                        </Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{receipt.price}/- </Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{receipt.qty}</Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{(receipt.price * receipt.qty).toFixed(2)}/-</Text>
                    </View>
                </View>
            </Fragment>
        ));

    const SubTableTotal = () => (
        <View style={{ width: "100%", flexDirection: "row" }}>
            <View style={styles.total}>
                <Text></Text>
            </View>
            <View style={styles.total}>
                <Text> </Text>
            </View>
            <View style={styles.tbody}>
                <Text>SubTotal</Text>
            </View>
            <View style={styles.tbody}>
                <Text>{total}/-</Text>
            </View>
        </View>
    );

    const TableDiscount = () => (
        <View style={{ width: "100%", flexDirection: "row" }}>
            <View style={styles.total}>
                <Text></Text>
            </View>
            <View style={styles.total}>
                <Text> </Text>
            </View>
            <View style={styles.tbody}>
                <Text>Discount</Text>
            </View>
            <View style={styles.tbody}>
                <Text>0</Text>
            </View>
        </View>
    );

    const TableTotal = () => (
        <View style={{ width: "100%", flexDirection: "row" }}>
            <View style={styles.total}>
                <Text></Text>
            </View>
            <View style={styles.total}>
                <Text> </Text>
            </View>
            <View style={styles.tbody}>
                <Text>Total Estimate</Text>
            </View>
            <View style={styles.tbody}>
                <Text>{total}/-</Text>
            </View>
        </View>
    );

    const Footer = () => (
        <View style={styles.footer}>
            <Text>Your total estimate is {total} /-</Text>
            <Text>Thank you for your business!</Text>
        </View>
    );

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <InvoiceTitle />
                <Address />
                <TableHead />
                <TableBody2 />
                <SubTableTotal />
                <TableDiscount />
                <TableTotal />
                <Footer />
            </Page>
        </Document>
    );
};

export default EstimateInvoice;