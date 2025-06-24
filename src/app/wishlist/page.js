'use client';
import { AiOutlineClose } from "react-icons/ai";

export default function WishList() {
    const wishlistItems = [
        {
            product_id: 1,
            product: {
                id: 101,
                name: "1 SET BRAKE DISCS WITHBRAKE PADS VAG (VW, AUDI, SKODA) 8V0...3021",
                PN: "PROD001",
                Description: "1 set brake discs withbrake pads",
                temp_price: "100.00",
                discount_price: "70.00",
                image: "/assets/img/shop-list/1.webp"
            }
        },
        {
            product_id: 2,
            product: {
                id: 102,
                name: "1 SET BRAKE DISCS WITHBRAKE PADS VAG (VW, AUDI, SKODA) 8V0...3021",

                PN: "PROD002",
                Description: "1 set brake discs withbrake pads",
                temp_price: "250.00",
                image: "/assets/img/shop-list/1.webp"
            }
        },
        {
            product_id: 3,
            product: {
                id: 103,
                name: "1 SET BRAKE DISCS WITHBRAKE PADS VAG (VW, AUDI, SKODA) 8V0...3021",

                PN: "PROD003",
                Description: "1 set brake discs withbrake pads",
                temp_price: "135.00",
                image: "/assets/img/shop-list/1.webp"
            }
        }
    ];

    return (
        <div className="wishlist_area">
            <div className="container py-5">
                {/* <h2 className="mb-4 fw-bold">My Wishlist</h2> */}
                <div className="table-responsive">
                    <table className="table align-middle text-center">
                        <thead className="table-light h2">
                            <tr className="my-2">
                                <th scope="col">Product Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Stock Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {wishlistItems.map((item, index) => (
                                <tr key={index}>
                                    {/* Product Name + Image + Remove */}
                                    <td className="text-start d-flex align-items-center gap-3">
                                        <button
                                            className="wishlist_remove"
                                            onClick={() => console.log('Remove', item.product_id)}
                                        >
                                            <AiOutlineClose size={18} />
                                        </button>
                                        <img
                                            src={item.product.image}
                                            alt="product"
                                            style={{ width: "90px", height: "auto", borderRadius: "5px" }}
                                        />
                                        <div>
                                            <div className="h3">{item.product.name}</div>
                                            <small className="p">{item.product.Description}</small>
                                        </div>
                                    </td>

                                    {/* Price */}
                                    <td>
                                        {item.product.discount_price ? (
                                            <>
                                                <span className="text-decoration-line-through text-muted me-2">
                                                    €{item.product.temp_price}
                                                </span>
                                                <span className="fw-bold text-success">
                                                    €{item.product.discount_price}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="fw-bold">€{item.product.temp_price}</span>
                                        )}
                                    </td>

                                    {/* Stock */}
                                    <td>
                                        <span className="badge bg-success">In Stock</span>
                                    </td>

                                    {/* Actions */}
                                    <td>
                                        <button className="btn__wishlist">View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
