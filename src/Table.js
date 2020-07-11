import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import ReactTable from "react-table-v6";  
import "react-table-v6/react-table.css";
import { filterCaseInsensitive } from './helper';

function Table() {
  const [hasError, setErrors] = useState(false);
  const [user, setUser] = useState([]);
  async function fetchData() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users",
      { method:"GET" }
    );
    res
      .json()
      .then(res => {
        const data = res.map( item =>{
          var obj ={}
          obj.id = item.id;
          obj.name = item.name;
          obj.username = item.username;
          obj.email = item.email;
          obj.address = item.address.street + ', ' + item.address.suite + ', ' + item.address.city + ', ' + item.address.zipcode;
          obj.phone = item.phone;
          obj.website = item.website;
          obj.company = item.company.name + ', ' + item.company.catchPhrase + ', ' + item.company.bs;
          return obj;
        })
        setUser(data)
      })
      .catch(err => setErrors(err));
  }
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [{  
  Header: 'Name',  
  accessor: 'name',
  },{  
  Header: 'UserName',  
  accessor: 'username',
  },{  
  Header: 'Email',  
  accessor: 'email',
  },{  
  Header: 'Address',  
  accessor: 'address',
  },{  
  Header: 'Phone',  
  accessor: 'phone',
  },{  
  Header: 'Website',  
  accessor: 'website',
  },{  
  Header: 'Company',  
  accessor: 'company',
  },{  
    Header: 'Action',  
    accessor: 'action',
    columns: [{
      Header: "Open",
      Cell: props =>  <Link to={`/user?id=${props.original.id}`} target="_blank" ><button style={{backgroundColor:'green', width:'100%'}}>{"OPEN"}</button></Link>
    },{
        Header: "Delete",
        Cell: props => <button onClick={(e) => {
          const newArray = [...user];
          newArray.splice(props.index, 1);
          setUser(newArray);}} 
          style={{backgroundColor:'red', width:'100%'}}>{"DELETE"}</button>
      }]
    },];
    
  return (
    <div>
       <ReactTable  
            data={user}  
            columns={columns}  
            defaultPageSize = {10}  
            pageSizeOptions = {[5, 10, 15]}
            filterable = {true}
            className="-striped -highlight"
            defaultFilterMethod={(filter, row) => filterCaseInsensitive(filter, row) }
         />  
    </div>
  );
}

export default Table;
