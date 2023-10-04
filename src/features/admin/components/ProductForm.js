import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearUpdatePrudct,
  selectAllProductsBrands,
  selectAllProductsCategories,
  selectProduct,
} from '../../product-list/productListSlice';
import {
  createProduct,
  getProductById,
  productUpdate,
} from '../../product-list/productListAPI';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { selectError } from '../../auth/authSlice';

export default function ProductForm() {
  const dispatch = useDispatch();
  const params = useParams();
  const categories = useSelector(selectAllProductsCategories);
  const brands = useSelector(selectAllProductsBrands);
  const selectproduct = useSelector(selectProduct);

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /**
   * get single product and clear selectProduct
   */
  useEffect(() => {
    if (params.id) {
      dispatch(getProductById(params.id));
    } else {
      dispatch(clearUpdatePrudct());
    }
  }, [params.id, dispatch, reset]);

  /**
   * Updated Product
   */
  useEffect(() => {
    if (selectproduct && params.id) {
      setValue('title', selectproduct.title);
      setValue('description', selectproduct.description);
      setValue('price', selectproduct.price);
      setValue('rating', selectproduct.rating);
      setValue('discountPercentage', selectproduct.discountPercentage);
      setValue('stock', selectproduct.stock);
      setValue('brand', selectproduct.brand);
      setValue('category', selectproduct.category);
      setValue('image1', selectproduct.images[0]);
      setValue('image2', selectproduct.images[1]);
      setValue('image3', selectproduct.images[2]);
      setValue('thumbnail', selectproduct.thumbnail);
    }
  }, [setValue, selectproduct, params.id]);

  /**
   * Deleted product
   */
  const handleDelete = () => {
    const product = { ...selectproduct };
    product.deleted = true;
    dispatch(productUpdate(product));
    reset();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
        <div className="lg:col-span-3">
          <form
            className="bg-white px-5"
            noValidate
            onSubmit={handleSubmit((data) => {
              const product = { ...data };

              product.images = [product.image1, product.image2, product.image3];
              delete product['image1'];
              delete product['image2'];
              delete product['image3'];
              console.log(product);
              if (params.id) {
                product.id = params.id;
                product.rating = selectproduct.rating ? product.rating : 0;
                dispatch(productUpdate(product));
              } else {
                dispatch(createProduct(product));
              }
              reset();
            })}
          >
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                  Add New Product Form
                </h2>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Product Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('title', {
                          required: 'title is required',
                        })}
                        name="title"
                        id="title"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>{' '}
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('description', {
                          required: 'description is required',
                        })}
                        name="description"
                        id="description"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Price
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        {...register('price', {
                          required: 'price is required',
                        })}
                        name="price"
                        id="price"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="discountPercentage"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Discount Percentage
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        {...register('discountPercentage', {
                          required: 'discountPercentage is required',
                        })}
                        name="discountPercentage"
                        id="discountPercentage"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="stock"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Stock
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        {...register('stock', {
                          required: 'stock is required',
                        })}
                        id="stock"
                        name="stock"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Categories
                    </label>
                    <div className="mt-2">
                      <select
                        id="category"
                        {...register('category', {
                          required: 'category is required',
                        })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value=""> --choose Category-- </option>
                        {categories?.map((item, index) => (
                          <option key={index} value={item.value}>
                            {item.value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>{' '}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="brand"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Brands
                    </label>
                    <div className="mt-2">
                      <select
                        id="brand"
                        {...register('brand', {
                          required: 'brand is required',
                        })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      >
                        <option value=""> --choose Brand-- </option>

                        {brands?.map((item, index) => (
                          <option key={index} value={item.value}>
                            {item.value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Thumbnail
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('thumbnail', {
                          required: 'thumbnail is required',
                        })}
                        id="thumbnail"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image 1
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('image1', {
                          required: 'image1 is required',
                        })}
                        id="image1"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="pinCode"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image 2
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('image2', {
                          required: 'image2 is required',
                        })}
                        id="image2"
                        autoComplete="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>{' '}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image 3
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('image3', {
                          required: 'image3 is required',
                        })}
                        id="image3"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Reset
                </button>{' '}
                {selectproduct && (
                  <button
                    type="button"
                    onClick={() => handleDelete()}
                    className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    Delete
                  </button>
                )}
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
