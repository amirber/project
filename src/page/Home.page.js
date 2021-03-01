import React, {useEffect, useState} from 'react';
import users from '../asset/data/users.json';
import {USER} from '../config/variables';
import {Link} from "react-router-dom";

import './Home.style.css';

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    didMount();
  }, []);

  const didMount = () => {
    const data = JSON.parse(localStorage.getItem(USER))
    if (!data) {
      saveUser(users);
    }
    setUserData(data ? data : users);
  };

  const saveUser = (data) => localStorage.setItem(USER, JSON.stringify(data));

  const handleDeleteUser = (id) => {
    const deleted = window.confirm('Are you sure?');
    if (deleted) {
      const deletedUsers = userData.filter(user => user.id !== id);
      setUserData(deletedUsers);
      saveUser(deletedUsers);
    }
  };

  const handleSearch = ({target}) => {
    setSearch(target.value);
    const searchValue = target.value.toLowerCase();
    const data = JSON.parse(localStorage.getItem(USER)) || users;
    const searchedData = data.filter(user => user.name.toLowerCase().includes(searchValue));
    setUserData(searchedData);
  };

  return (
    <div>
      <div className="header">
        <Link className="add-btn" to={'/user'}>Add a user</Link>
        <div className="search">
          <span>Search: </span>
          <input className="input" value={search} onChange={handleSearch}/>
        </div>
      </div>
      {
        userData.map(user => (
          <section key={user.id} className="landing-page">
            <figure className="img-container">
              <img className="person-img" src={user.image} alt={`${user.name}-image`}/>
            </figure>
            <div>
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
            <div>
              <Link className="edit-btn" to={`/user/${user.id}`}>Edit</Link>
              <button className="delete-btn" type="button" onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </div>
          </section>
        ))
      }
    </div>
  );
};

export default Home;
