import {useSelector} from "react-redux";
import Main from "../home/Main";
import {Button, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import BillService from "../../services/BillService";
import Bill from "./Bill";

export default function BillList() {

    const user = useSelector((state) => state.auth);

    const [bills, setBills] = useState([]);

    useEffect(() => {
        BillService.getAllBills(user.userId, user.accessToken)
            .then(response => setBills(response.data.data))
            .catch(error => console.error(error));
    }, [])

    const billListDiv = (
        <div style={{padding: 30}}>
            <Button href={'/addBill'}>New Bill</Button>
            <hr/>
            <h2>Bills</h2>
            <p>Click on the row to update or delete.</p>
            <Table responsive striped bordered hover>
                <thead>
                <tr>
                    <th>Category</th>
                    <th>Bill Name</th>
                    <th>Amount</th>
                    <th>Updated Date</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    bills && bills.map(bill => <Bill key={bill.billId} {...bill} />)
                }
                </tbody>
            </Table>
        </div>
    );

    return user.accessToken ? billListDiv : <Main/>
}