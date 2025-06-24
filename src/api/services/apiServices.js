import axios from "axios";
import authHeader from "./apiHeader";

// const BASE_URL = "http://192.168.100.51:8000";
// const BASE_URL = "https://adminbood.hypehy.com"
// const BASE_URL = "https://admin.tofunmech.com"
const BASE_URL = "https://tofun.online"

export const Product = async (data) => {

    // const response = await axios.post(`${BASE_URL}/api/products?limit=10&offset=0`, data);
    const response = await axios.post(`${BASE_URL}/api/products?limit=${data.limit}&offset=${data.offset}`, data);
    if (response?.status) {
        return response.data;
    } else {
        console.log("error");
    }
};

// export const CheckOutProduct = async (data) => {
//   const response = await axios.post(`${BASE_URL}/api/checkout`, data);
//   if (response?.status) {
//     return response.data;
//   } else {
//     console.log("error");
//   }
// };

export const Categories = async () => {
    const response = await axios.get(`${BASE_URL}/api/category`);

    if (response?.status) {
        return response.data;
    } else {
        console.log("error");
    }
};

export const SingleCategory = async (name) => {
    const response = await axios.get(`${BASE_URL}/api/category/${name}`);
    if (response?.status) {
        return response.data;
    } else {
        console.log("error");
    }
};

export const SingleProductDetails = async (id, PN) => {
    console.log(id, "id")
    console.log(PN, "PN")
    const response = await axios.get(`${BASE_URL}/api/product/${id}/${PN}`, { headers: authHeader() });
    console.log(response, "response fo single product details");
    console.log(response.status, "status fo single product details");
    if (response?.status) {
        return response.data;
    } else {
        console.log("error");
    }
};

export const SearchProduct = async (pn) => {
    const response = await axios.get(`${BASE_URL}/api/search/${pn}`);
    if (response?.status) {
        return response.data;
    } else {
        console.log("error");
    }
};

export const CategoryProduct = async (id) => {
    const response = await axios.get(`${BASE_URL}/api/category/${id}`);
    if (response?.status) {
        return response.data;
    } else {
        console.log("error");
    }
};

export const CarCompanies = async () => {
    const response = await axios.get(`${BASE_URL}/api/companies`);
    if (response?.data) {
        return response.data;
    } else {
        console.log("error");
    }
};

export const CarModel = async (id) => {
    const response = await axios.get(`${BASE_URL}/api/models/${id}`);
    if (response?.status) {
        return response.data;
    } else {
        console.log("error");
    }
};

export const CarModelModification = async (data) => {
    const response = await axios.get(
        `${BASE_URL}/api/submodels/${data.carValName}/${data.val}`
    );
    if (response?.status) {
        return response.data;
    } else {
        console.log("error");
    }
};

export const Brands = async () => {
    const response = await axios.get(`${BASE_URL}/api/brand`);
    if (response?.data) {
        return response.data;
    } else {
        console.log("error");
    }
};

export const LogIn = async (data) => {
    const response = await axios.post(`${BASE_URL}/api/login`, data);
    if (response?.data) {
        return response.data;
    } else {
        console.log("login error");
    }
};

export const Register = async (data) => {
    const response = await axios.post(`${BASE_URL}/api/register`, data);
    if (response?.data) {
        return response.data;
    } else {
        console.log("login error");
    }
};

export const Add_To_cart_Login = async (data) => {
    const response = await axios.post(`${BASE_URL}/api/cart`, data, {
        headers: authHeader(),
    });
    if (response?.data) {
        return response.data;
    } else {
        console.log("login error");
    }
};

export const CartList = async () => {
    const response = await axios.get(`${BASE_URL}/api/listcart`, {
        headers: authHeader(),
    });
    if (response?.data) {
        return response.data;
    } else {
        console.log("error");
    }
};

export const CartLoginDelete = async (id) => {
    const response = await axios.delete(`${BASE_URL}/api/cart/${id}`, {
        headers: authHeader(),
    });
    if (response?.data) {
        return response.data;
    } else {
        console.log("error");
    }
};

export const AddOrderList = async () => {
    const response = await axios.get(`${BASE_URL}/api/order`, {
        headers: authHeader(),
    });
    if (response?.data) {
        return response.data;
    } else {
        console.log("error");
    }
};

export const EstimateOrders = async () => {
    const response = await axios.get(`${BASE_URL}/api/estimate`, {
        headers: authHeader(),
    });
    if (response?.data) {
        return response.data;
    } else {
        console.log("error");
    }
};


export const EstimateOrdersList = async () => {
    const response = await axios.get(`${BASE_URL}/api/estimate-list`, {
        headers: authHeader(),
    });
    if (response?.data) {
        return response.data;
    } else {
        console.log("error");
    }
};

export const AddReviewList = async (data) => {
    const response = await axios.post(`${BASE_URL}/api/reviews`, data, {
        headers: authHeader(),
    });
    if (response?.data) {
        return response.data;
    } else {
        console.log("error");
    }
};


export const GetAddressUser = async () => {
    const response = await axios.get(`${BASE_URL}/api/get-all-address`, {
        headers: authHeader(),
    });
    if (response?.data) {
        return response.data;
    } else {
        console.log("error");
    }
};

export const AddAddressUser = async (data) => {
    const response = await axios.post(`${BASE_URL}/api/add-address`, data, {
        headers: authHeader(),
    });
    if (response?.data) {
        return response.data;
    } else {
        console.log("error");
    }
};

export const DeleteAddress = async (id) => {
    const response = await axios.get(`${BASE_URL}/api/delete-address/${id}`, {
        headers: authHeader(),
    });
    console.log(response);
    if (response?.data) {
        return response.data;
    } else {
        console.log("error");
    }
};

export const Coupon = async () => {
    const response = await axios.get(`${BASE_URL}/api/coupon`);
    if (response?.data) {
        return response.data;
    } else {
        console.log("error");
    }
};

export const GetCouponCode = async (data) => {
    const response = await axios.get(`${BASE_URL}/api/coupon/${data}`, data);
    if (response?.data) {
        return response.data;
    } else {
        console.log("error");
    }
};

export const WishListLogin = async () => {
    const response = await axios.get(
        `${BASE_URL}/api/get-product-from-watchlist`,
        { headers: authHeader() }
    );
    if (response?.data) {
        return response.data;
    } else {
        console.log("error");
    }
};

export const WishListLoginDelete = async (data) => {
    const response = await axios.post(
        `${BASE_URL}/api/add-remove-watchlist`,
        data,
        { headers: authHeader() }
    );
    if (response?.data) {
        return response.data;
    } else {
        console.log("error");
    }
};

//  Order List ========================================================================================================================

export const MakeOrderId = async (data) => {
    const response = await axios.post(`${BASE_URL}/api/make-orderid`, data);
    if (response?.data) {
        return response.data;
    } else {
        console.log("error");
    }
};

export const OrderComplete = async (data) => {
    const response = await axios.post(`${BASE_URL}/api/complete-order`, data, {
        headers: authHeader(),
    });
    if (response?.data) {
        return response.data;
    } else {
        return response.data;
    }
};

export const BrandProduct = async (id) => {
    const response = await axios.get(`${BASE_URL}/api/brand/${id}`);
    if (response?.status) {
        return response.data;
    } else {
        console.log("error");
    }
};

export const OffersBanner = async () => {
    const response = await axios.get(`${BASE_URL}/api/slider`);
    if (response?.status) {
        return response.data;
    } else {
        console.log("error");
    }
};

export const BrandWiseFilter = async (id) => {
    const response = await axios.post(`${BASE_URL}/api/products?brand=${id}`);
    if (response?.status) {
        return response.data;
    } else {
        console.log("error");
    }
};

export const searchProducts = async (searchTerm) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/products`, {
            search: searchTerm,
        });

        if (response?.data) {
            return response?.data;
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

export const InsuranceCompanyList = async () => {
    const response = await axios.get(`${BASE_URL}/api/insurance`);
    if (response?.status) {
        return response.data;
    } else {
        console.log("error");
    }
};