import React, { useState, useEffect }  from 'react';
import "react-table-v6/react-table.css";
import { getParameterByName } from './helper';
import './index.css';

function User() {
  const [hasError, setErrors] = useState(false);
  const [user, setUser] = useState([]);
  const userID = getParameterByName('id');
  async function fetchData() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}`,
      { method:"GET" }
    );
    res
      .json()
      .then(res => {
          var obj ={}
          obj.id = res.id;
          obj.name = res.name;
          obj.username = res.username;
          obj.email = res.email;
          obj.address = res.address.street + ', ' + res.address.suite + ', ' + res.address.city + ', ' + res.address.zipcode;
          obj.phone = res.phone;
          obj.website = res.website;
          obj.company = res.company.name + ', ' + res.company.catchPhrase + ', ' +              res.company.bs;
        setUser(obj)
      })
      .catch(err => setErrors(err));
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <div>
    <h3 className='head'>USER DETAILS</h3> 
    <div className='wrapper'>
       <div className= 'userrow'>
           <div className= 'column'>Name</div>
           <div className= 'column'>{user['name']}</div>
       </div>
       <div className= 'userrow'>
           <div className= 'column'>UserName</div>
           <div className= 'column'>{user['username']}</div>
       </div>
       <div className= 'userrow'>
           <div className= 'column'>Email</div>
           <div className= 'column'>{user['email']}</div>
       </div>
       <div className= 'userrow'>
           <div className= 'column'>Address</div>
           <div className= 'column'>{user['address']}</div>
       </div>
       <div className= 'userrow'>
           <div className= 'column'>Phone</div>
           <div className= 'column'>{user['phone']}</div>
       </div>
       <div className= 'userrow'>
           <div className= 'column'>Website</div>
           <div className= 'column'>{user['website']}</div>
       </div>
       <div className= 'userrow'>
           <div className= 'column'>Company</div>
           <div className= 'column'>{user['company']}</div>
       </div>
    </div>
    </div>
  );
}

export default User;
