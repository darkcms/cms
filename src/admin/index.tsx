import * as React from "react";
import { Routes, Route } from "react-router-dom";
import Editor from "@monaco-editor/react";

const AdminPanel = () => {
    return (
        <Routes>
            <Route index element={<Admin1 />} />
            <Route path="2" element={<Admin2 />} />
        </Routes>
    );
}

const Admin1 = () => {
    function handleEditorChange(value, event) {
        console.log("here is the current model value:", value);
    }

    return (
        <Editor
            height="90vh"
            defaultLanguage="javascript"
            defaultValue="// some comment"
            onChange={handleEditorChange}
        />
    );
}
const Admin2 = () => {

    const [pages, setPages] = React.useState<any[]>([]);

    React.useEffect(() => {
        fetch("http://localhost:3000/api/pages")
            .then(response => response.json())
            .then(data => setPages(data));
    });

    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">Template</th>
                    <th scope="col">Route</th>
                </tr>
            </thead>
            <tbody>
                {
                    pages.map(page => (
                        <tr key={page.id}>
                            <td>{page.template}</td>
                            <td>{page.route}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default AdminPanel;