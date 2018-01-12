module.exports.listingSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  imageUrl: String,
  category: String,
  location: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports.Listing = mongoose.model('Listing', listingSchema);

module.exports.saveListing = (listingInfo, callback) => {
  Listing.create({
    title: listingInfo.title,
    description: listingInfo.description,
    imageUrl: listingInfo.imageUrl,
    category: listingInfo.category,
    location: listingInfo.location,
    email: listingInfo.email
  }, (err, listing) => {
    callback(err, listing);
  });
};