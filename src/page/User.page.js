import React, {useEffect, useState} from 'react';
import {USER} from '../config/variables';
import {Link, withRouter} from 'react-router-dom';

import './User.style.css';

const initForm = {
  firstName: '',
  lastName: '',
  email: ''
}

const User = (props) => {
  const [form, setForm] = useState(initForm);

  useEffect(() => {
    didMount();
  }, []);

  const didMount = () => {
    const paths = getPath();
    if (paths.length === 2) {
      const users = JSON.parse(localStorage.getItem(USER));
      const foundedUser = users.find(user => user.id === Number(paths[1]));
      if (!foundedUser) return;
      setForm({
        firstName: foundedUser.firstName,
        lastName: foundedUser.lastName,
        email: foundedUser.email
      })
    }
  };

  const getPath = () => {
    const path = window.location.pathname.split('/');
    const result = [];
    path.forEach(item => {
      if (!!item) result.push(item);
    });
    return  result;
  }

  const saveUser = (data) => localStorage.setItem(USER, JSON.stringify(data));

  const handleSubmit = (event) => {
    event.preventDefault();
    const paths = getPath();
    const users = JSON.parse(localStorage.getItem(USER));
    if (paths.length === 2) {
      const id = Number(paths[1]);
      const foundedUser = users.find(user => user.id === id);
      const filteredUsers = users.filter(user => user.id !== id);
      filteredUsers.unshift({
        id,
        image: foundedUser ? foundedUser.image : '',
        name: `${form.firstName} ${form.lastName}`,
        ...form
      });
      saveUser(filteredUsers);
    } else {
      users.unshift({
        id: users.length + 1,
        image: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y',
        name: `${form.firstName} ${form.lastName}`,
        ...form,
      });
      saveUser(users);
    }
    props.history.push('/');
  }

  const setToForm = (key, value) => {
    setForm({...form, [key]: value});
  }

  const getImage = () => {
    if (getPath().length === 2) {
      const foundedUser = JSON.parse(localStorage.getItem(USER)).find(user => user.id === Number(getPath()[1]));
      return foundedUser ? foundedUser.image : 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y';
    }
    return 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y';
  }

  return (
    <div>
      <form className="landing-page" onSubmit={handleSubmit}>
        <figure className="img-container">
          <img className="person-img" src={getImage()} alt=""/>
        </figure>
        <div className="field">
          <label>First Name</label>
          <input className="input" value={form.firstName} type="text" onChange={({target}) => setToForm('firstName', target.value)} />
        </div>
        <div className="field">
          <label>Last Name</label>
          <input className="input" value={form.lastName} type="text" onChange={({target}) => setToForm('lastName', target.value)}/>
        </div>
        <div className="field">
          <label>Email</label>
          <input className="input" value={form.email} type="text" onChange={({target}) => setToForm('email', target.value)}/>
        </div>
        <div className="actions">
          <button className="add-btn" type="submit">{getPath().length === 2 ? 'Save' : 'Create'}</button>
          <Link className="cancel-btn" to={'/'}>Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default withRouter(User);
