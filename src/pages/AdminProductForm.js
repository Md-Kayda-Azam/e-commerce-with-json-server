import ProductForm from '../features/admin/components/ProductForm';
import Navbar from '../features/navbar/Navbar';

function AdminProductForm() {
  return (
    <div>
      <Navbar>
        <ProductForm></ProductForm>
      </Navbar>
    </div>
  );
}

export default AdminProductForm;
