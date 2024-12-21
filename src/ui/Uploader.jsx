import toast from 'react-hot-toast';
import { products } from '../dev-data/data-products';
import supabase from '../services/supabase';
import Button from './Button';

function Uploader() {
  async function hanldeClick() {
    const { data, error } = await supabase
      .from('product')
      .insert(products)
      .select();

    if (error) throw new Error('Product could not be loaded');
    toast.success('Data uploaded successfully');
  }
  return (
    <div style={{ marginBottom: '20px' }}>
      <Button onClick={hanldeClick} size="medium">
        Upload data
      </Button>
    </div>
  );
}

export default Uploader;
