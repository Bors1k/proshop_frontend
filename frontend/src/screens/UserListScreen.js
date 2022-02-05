import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Form, Button, Row, Col, Table, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, delUser } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'

function UserListScreen() {
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo} = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
      if(userInfo && userInfo.is_staff){
          dispatch(listUsers())
      }
      else {
          navigation('/login')
      }
  }, [dispatch, successDelete])

  const deleteHandler = (id)=>{
    if(window.confirm('Are you sure you want to delete this user?')){
      dispatch(delUser(id))
    }
  }

  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.is_staff ? (
                    <i className="fas fa-check" style={{ color: 'green' }}></i>
                  ) : (
                    <i className="fas fa-check" style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                    <LinkContainer to={`/admin/user/${user.id}`}>
                        <Button variant='primary' className='btn-sm'>
                        <i className="fas fa-edit" style={{ color: 'white' }}></i>
                        </Button>
                    </LinkContainer>
                    <Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(user.id)}>
                        <i className='fas fa-trash'></i>
                    </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default UserListScreen
