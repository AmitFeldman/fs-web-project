import mongoose from 'mongoose';

const isIdValid = id => id && mongoose.Types.ObjectId.isValid(id);

export {isIdValid};
