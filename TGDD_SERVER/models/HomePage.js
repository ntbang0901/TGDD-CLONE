const { default: mongoose } = require("mongoose");

const homePageSchema = new mongoose.Schema(
  {
    firstBanner: {
      type: Array,
    },
    firstSliders: {
      type: Array,
    },
    saleBanner: {
      type: Array,
    },
    productSales: {
      type: Array,
    },
    titleEvents: {
      type: String,
    },
    bannerEvents: {
      type: Array,
    },
    productEvents: {
      type: Array,
    },
    productTrends: {
      type: Array,
    },
    sliderPayOnlines: {
      type: Array,
    },
    productRecommends: {
      type: Array,
    },
    sliderBrands: {
      type: Array,
    },
    sliderDeals: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);
const HomePage = mongoose.model("homepages", homePageSchema);
module.exports = HomePage;

// module.exports = mongoose.model("homepage", homePageSchema);


