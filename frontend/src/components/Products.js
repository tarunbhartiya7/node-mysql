import React, { useEffect, useState } from 'react'
import productsService from '../services/products'
import ProductForm from './ProductForm'

const Products = () => {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState()

  const getProducts = async () => {
    const data = await productsService.getAll()
    setProducts(data)
  }

  useEffect(() => {
    getProducts()
  }, [])

  const handleUpdate = () => {
    // selectedProduct(null)
    getProducts()
  }

  return (
    <>
      <ProductForm
        productToUpdate={selectedProduct}
        onProductUpdate={handleUpdate}
      />
      <h4>Product List: Click on any row to update product name</h4>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">I18N Name</th>
            <th scope="col">Model Number</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.product_i18n_id}
              onClick={() => setSelectedProduct(product)}
            >
              <td>{product.product_i18n_id}</td>
              <td>{product.name}</td>
              <td>{product.i18Name}</td>
              <td>{product.modelNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Products
