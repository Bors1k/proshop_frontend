import { React, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions';


function ShippingScreen() {

    const cart = useSelector(state=>state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postCode, setPostCode] = useState(shippingAddress.postCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postCode, country}))
        navigate('/payment')
        console.log('continue')
    }

  return <FormContainer>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <h1>Shipping</h1>
    <Form onSubmit={submitHandler}>
        
    <Form.Group controlId="address" className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter address"
            value={address ? address : ''}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
    
        <Form.Group controlId="city" className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter City"
            value={city ? city : ''}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
    
        <Form.Group controlId="postCode" className="mb-3">
          <Form.Label>Post code</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Post code"
            value={postCode ? postCode : ''}
            onChange={(e) => setPostCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
    
        <Form.Group controlId="country" className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter country"
            value={country ? country : ''}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>

    </Form>
  </FormContainer>;
}

export default ShippingScreen;
