const mongoose = require('mongoose');

const keywordValidators = [
  // Temporary disabled
  // {
  //   validator: (array) => {
  //     return array.length > 0 && array.length <= 5;
  //   },
  //   msg: 'Add 1 to 5 keywords!',
  // },
  // {
  //   validator: (array) => {
  //     return new Set(array).size === array.length;
  //   },
  //   msg: 'Duplicate keywords!',
  // },
];

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required!'],
      minlength: [3, 'Name with 3 or more characters required!'],
    },
    keywords: {
      type: Array,
      validate: keywordValidators,
    },
    description: {
      type: String,
      required: [true, 'Description is required!'],
      minlength: [10, 'Description with 10 or more characters required!'],
    },
    tasks: {
      type: Array,
    },
    status: {
      type: String,
      required: [true, 'Status is required!'],
      enum: {
        values: ['new', 'inProgress', 'completed'],
        message: 'Valid statuses: new, inProgress, completed',
      },
      default: 'new',
    },
    ownerId: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
);

const itemModel = mongoose.model('item', itemSchema);

module.exports = itemModel;
