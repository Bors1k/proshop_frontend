import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../actions/productActions'
import { useNavigate, useLocation } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { error, loading, products, page, pages } = productList

  let location = useLocation()

  let keyword = location.search

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <div>
      {!keyword && <ProductCarousel />}
      <h1>Latest products</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </div>
  )
}

export default HomeScreen
