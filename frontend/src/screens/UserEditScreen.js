import { React, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updUser } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { USER_UPDATE_RESET } from '../constants/userContants'

function UserEditScreen() {
  const { id } = useParams()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [is_staff, setIsStaff] = useState(false)

  const navigate = useNavigate()

  const location = useLocation()

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { error, loading, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      navigate('/admin/users/')
      dispatch({ type: USER_UPDATE_RESET })
    } else {
        if (!user.name || user.id !== Number(id)) {
          dispatch(getUserDetails(id))
        } else {
          setName(user.name)
          setEmail(user.email)
          setIsStaff(user.is_staff)
        }   
    }
  }, [user, id, successUpdate, navigate])

  const submitHandler = (e) => {
      e.preventDefault()
      dispatch(updUser({id: user.id, name, email, is_staff}))
  }

  return (
    <div>
      <Link to={`/admin/users`} className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit user</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="is_staff" className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Check
                type="checkbox"
                label="Is admin"
                checked={is_staff}
                onChange={(e) => setIsStaff(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  )
}

export default UserEditScreen
