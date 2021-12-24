import React, { useEffect, useState, useHistory } from "react";
import MaterialTable from "material-table";
import tableIcons from "../../components/tableIcons";
import MuiButton from "@material-ui/core/Button";
import swal from "sweetalert";
import axios from "axios";

import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

function UserList(props) {
  const [userData, setUserData] = useState([]);

  const fetchRecord = async () => {
    const res = await fetch(`http://localhost:8000/users`, {
      method: "GET",
    });

    let data = await res.json();
    setUserData(data.data);
  };

  const handleEdit = (id) => {
    const url = `http://localhost:3000/edit-user/${id}`;
    console.log(url);
    window.location.href = url;
  };

  const handleDelete = (id) => {
    swal({
      title: "Do you want to delete this user?",
      text: "If you want to delete the user click on Yes, I am sure! button",
      type: "warning",
      buttons: ["No, cancel it!", "Yes, I am sure!"],
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const response = await axios({
          method: "DELETE",
          url: `http://localhost:8000/users/${id}`,
        });

        console.log("responseresponse", response);

        if (response.data.status === 200) {
          swal({
            title: "User deleted sucessfully",
            icon: "success",
            button: "Ok",
          }).then((willDelete) => {
            if (willDelete) {
              window.location.href = `http://localhost:3000/`;
              props.history.push("/");
            }
          });
        } else {
          console.log("Status error: ", response);
        }
      }
    });
    return;
  };

  useEffect(() => {
    fetchRecord();
  }, []);

  return (
    <div>
      <Button variant="contained" color="primary" style={{ marginTop: "50px" }}>
        <Link to="/create-user">Create User</Link>
      </Button>
      <MaterialTable
        icons={tableIcons}
        title="Users List"
        style={{ marginTop: "50" }}
        columns={[
          {
            title: "First Name",
            field: "first_name",
          },
          { title: "Last Name", field: "last_name" },
          { title: "Phone", field: "contact_number" },
          { title: "Email", field: "email" },
          { title: "CreatedOn", field: "createdAt" },
        ]}
        data={userData ? userData : []}
        options={{
          actionsColumnIndex: -1,
          pageSize: 5,
          sorting: true,
          headerStyle: {
            backgroundColor: "#01579b",
            color: "#FFF",
          },
        }}
        actions={[
          {
            tooltip: "Edit",
          },
          {
            tooltip: "Delete",
          },
        ]}
        components={{
          Action: (props) => {
            switch (props.action.tooltip) {
              case "Delete":
                return (
                  <MuiButton
                    color="default"
                    variant="contained"
                    onClick={(event) => handleDelete(props.data.id)}
                    style={{ textTransform: "none", color: "red" }}
                    size="small"
                  >
                    Delete
                  </MuiButton>
                );

              case "Edit":
                return (
                  <MuiButton
                    color="default"
                    variant="contained"
                    onClick={(event) => handleEdit(props.data.id)}
                    style={{ textTransform: "none", color: "green" }}
                    size="small"
                  >
                    Edit
                  </MuiButton>
                );
            }
          },
        }}
      />
    </div>
  );
}

export default UserList;
