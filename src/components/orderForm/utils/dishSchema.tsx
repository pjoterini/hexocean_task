import { makeValidate } from 'mui-rff';
import { mixed, number, object, string } from 'yup';
import { dishType } from '../enums';

const dishTypes = Object.values(dishType);

const dishSchema = object().shape({
  name: string().min(3).max(30).required(),
  preparation_time: string().min(8).required(),
  type: mixed().oneOf(dishTypes).required(),
  no_of_slices: number().when('type', {
    is: dishTypes[0],
    then: no_of_slices => no_of_slices.required().min(1).max(8),
  }),
  diameter: number().when('type', {
    is: dishTypes[0],
    then: diameter => diameter.required().min(18).max(40),
  }),
  spiciness_scale: number().when('type', {
    is: dishTypes[1],
    then: spiciness => spiciness.required().min(1).max(10),
  }),
  slices_of_bread: number().when('type', {
    is: dishTypes[2],
    then: slices_of_bread => slices_of_bread.required().min(0).max(4),
  }),
});

// 'as any' is used here because of mui-rff library incompatibility with yup
// eslint-disable-next-line
export const validateDish = makeValidate(dishSchema as any);
