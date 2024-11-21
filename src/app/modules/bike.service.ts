import { Tbike } from './bike.interface';
import { Bike } from './bike.model';

const createBike = async (bikeData: Tbike) => {
  const result = await Bike.create(bikeData);
  return result;
};

export const bikeService = {
    createBike
}