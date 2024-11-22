import { Tbike } from './bike.interface';
import { Bike } from './bike.model';

const createBike = async (bikeData: Tbike) => {
  const result = await Bike.create(bikeData);
  return result;
};

const getAllBikeFromDB = async () => {
  const result = await Bike.find({});
  return result;
};

const getSingleBikeFromDB = async (id: string) => {
  const result = await Bike.findOne({_id: id });
  return result;
};
export const bikeService = {
  createBike,
  getAllBikeFromDB,
  getSingleBikeFromDB,
};
