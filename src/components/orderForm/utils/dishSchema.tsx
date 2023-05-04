import { makeValidate } from 'mui-rff';
import { mixed, number, object, string } from 'yup';

const dishSchema = object().shape({
  name: string().max(30).required(),
  preparation_time: string().required(),
  type: mixed().oneOf(['pizza', 'soup', 'sandwich']).required(),
  no_of_slices: number().when('type', {
    is: 'pizza',
    then: no_of_slices => no_of_slices.required().min(1).max(8),
  }),
  diameter: number().when('type', {
    is: 'pizza',
    then: diameter => diameter.required().min(18).max(40),
  }),
  spiciness_scale: number().when('type', {
    is: 'soup',
    then: spiciness => spiciness.required().min(1).max(10),
  }),
  slices_of_bread: number().when('type', {
    is: 'sandwich',
    then: slices_of_bread => slices_of_bread.required().min(0).max(4),
  }),
});

// 'as any' is used here because of mui-rff library incompatibility
// eslint-disable-next-line
export const validateDish = makeValidate(dishSchema as any);
