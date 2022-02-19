import { React, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Row, Col, Table, Nav } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { PRODUCT_CREATE_RESET } from '../constants/productContants'

function ProductListScreen() {
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, pages, page } = productList
  let location = useLocation()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: delLoading,
    success: delSuccess,
    error: errorDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: createLoading,
    success: createSuccess,
    error: errorCreate,
    product: ProductCreate,
  } = productCreate

  let keyword = location.search

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (!userInfo.is_staff) {
      navigation('/login')
    }

    if (createSuccess) {
      navigation(`/admin/product/${ProductCreate.id}`)
    } else {
      dispatch(listProducts(keyword))
    }
  }, [dispatch, userInfo, delSuccess, createSuccess, ProductCreate, keyword])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id))
    }
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <div>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="flex-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>

      {createLoading && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}

      {delLoading && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product.id}`}>
                      <Button variant="primary" className="btn-sm">
                        <i
                          className="fas fa-edit"
                          style={{ color: 'white' }}
                        ></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={pages} page={page} isAdmin={true}></Paginate>
        </div>
      )}
    </div>
  )
}

export default ProductListScreen
