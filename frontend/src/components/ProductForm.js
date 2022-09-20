import React, { useEffect, useState } from 'react'
import productsService from '../services/products'

const ProductForm = ({ productToUpdate, onProductUpdate }) => {
  const [newProductName, setNewProductName] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    await productsService.update(productToUpdate.product_i18n_id, {
      ...productToUpdate,
      name: newProductName,
    })
    setNewProductName('')
    onProductUpdate()
  }

  useEffect(() => {
    if (productToUpdate) {
      setNewProductName(productToUpdate.name)
    }
  }, [productToUpdate])

  return (
    <div>
      <form className="row g-3 pt-3" onSubmit={handleSubmit}>
        <div className="col-auto">
          <label htmlFor="new-product-name" className="visually-hidden">
            Product Name
          </label>
          <input
            type="text"
            className="form-control"
            id="new-product-name"
            value={newProductName}
            onChange={({ target }) => setNewProductName(target.value)}
          />
        </div>

        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3">
            Update
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm
