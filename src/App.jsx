import axios from 'axios';
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'
import './style.css'

function App() {

  const [usersList, setUsersList] = useState([])

  const [userSelected, setUserSelected] = useState(null)

  const [showCard, setShowCard] = useState(0)
  //estado 0=> none; 1=> create; 2=> edit

  useEffect(() => {
    axios
      .get(`https://users-crud1.herokuapp.com/users/`)
      .then(res => setUsersList(res.data))
  }, [])

  const getUserList = () => {
    /* alert("leyendo...") */
    axios
      .get(`https://users-crud1.herokuapp.com/users/`)
      .then(res => setUsersList(res.data))
  }

  const selectUser = (user) => {
    /* alert("seleccionando....") */
    setUserSelected(user)
    setShowCard(1)
  }

  const deselectUser = () => setUserSelected(null)

  const deleteUser = (id) => {
    /* alert("eliminando...") */
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://users-crud1.herokuapp.com/users/${id}/`)
          .then(() => getUserList())
          .catch(error => console.log(error.response?.id))

        Swal.fire(
          'Deleted!', 'Your file has been deleted.', 'success'
        )
      }
    })

    /*  axios
      .delete(`https://users-crud1.herokuapp.com/users/${id}/`)
      .then(() => getUserList())
      .catch(error => console.log(error.response?.id)) */

  }

  const whatsIsYourCard = (aux) => { setShowCard(aux) }

  return (
    <div className="App">
      <div className='title'>
        <h1 style={{ textAlign: "left", fontWeight: "600" }}> Users </h1>
        <button className='btn add-btn' onClick={() => whatsIsYourCard(2)}>
          <i className="fa-solid fa-user-plus"> </i>
        </button>
      </div>
      <div className='line'></div>

      <div className='form-mayor'>
        {

          showCard === 1 ?
            <div>
            <h1 style={{textAlign: "center"}}> Edit User </h1>
            <UsersForm
              getUserList={getUserList}
              userSelected={userSelected}
              deselectUser={deselectUser}
              whatsIsYourCard={whatsIsYourCard}
            />
            </div>
            : (showCard === 2) ?
            <div>
            <h1 style={{textAlign: "center"}}> New User </h1>
              <UsersForm
                getUserList={getUserList}
                userSelected={null}
                deselectUser={deselectUser}
                whatsIsYourCard={whatsIsYourCard}
              />
              </div>
              :
              <div className='loader'> </div> 
             // <div className='ball-container'>
             //   <div className='ball'></div>
             //   <div className='shadow'></div>
             // </div>
        }

      </div>
      <UsersList
        usersList={usersList}
        selectUser={selectUser}
        deleteUser={deleteUser}
      />


    </div>
  )
}

export default App
