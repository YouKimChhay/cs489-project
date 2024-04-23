import {Button, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Main from "../home/Main";
import CategoryService from "../../services/CategoryService";
import Category from "./Category";


export default function CategoryList() {

    const user = useSelector((state) => state.auth);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        CategoryService.getAllCategories(user.userId, user.accessToken)
            .then((response => setCategories(response.data.data)))
            .catch(error => console.error(error));
    }, [])

    const categoriesDiv = (
        <div style={{padding: 30}}>
            <Button href={'/addCategory'}>New Category</Button>
            <hr/>
            <h2>Categories</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Budget</th>
                </tr>
                </thead>
                <tbody>
                {
                    categories && categories.map(category => <Category key={category.categoryId} {...category} />)
                }
                </tbody>
            </Table>
        </div>
    );

    return user.accessToken ? categoriesDiv : <Main/>;
}