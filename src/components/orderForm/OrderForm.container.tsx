import { Typography } from '@mui/material';
import OrderForm, { Dish } from './OrderForm.component';
import axios from 'axios';

const OrderFormContainer = () => {
  const onSubmit = async (values: Dish) => {
    axios
      .post(`${import.meta.env.VITE_BASE_URL}dishes/`, {
        name: values.name,
        preparation_time: values.preparation_time,
        type: values.type,
        no_of_slices: values.no_of_slices,
        diameter: values.diameter,
        spiciness_scale: values.spiciness_scale,
        slices_of_bread: values.slices_of_bread,
      })
      .then(function (response) {
        console.log(response.data);
        values.name = '';
        values.preparation_time = '';
        values.type = undefined;
        values.no_of_slices = undefined;
        values.diameter = undefined;
        values.spiciness_scale = undefined;
        values.slices_of_bread = undefined;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <Typography mb={2} variant="h4">
        Dish Order
      </Typography>
      <OrderForm onSubmit={onSubmit} />
    </>
  );
};

export default OrderFormContainer;
