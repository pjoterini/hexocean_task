import { dishType } from './enums';

export interface IDish {
  name: string;
  preparation_time: string;
  type: dishType | undefined;
  no_of_slices?: number | undefined;
  diameter?: number | undefined;
  spiciness_scale?: number | undefined;
  slices_of_bread?: number | undefined;
}
