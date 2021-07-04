import { MinusSmIcon, PlusIcon, StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";

import {
    addToBasket,
    removeFromBasket,
    removeGroupedFromBasket,
} from "../slices/basketSlice";

function CheckoutProduct({ id, title, price, rating, description, category, image, hasPrime, quantity}) {
    const dispatch = useDispatch();

    const addItemToBasket = () => {
        const product = {
            id,
            title,
            price,
            description,
            category,
            image,
            rating,
            hasPrime,
        };
        // Sending the product via an action to the redux store (= basket "slice")
        dispatch(addToBasket(product));
    };

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({ id }));
    };

    const removeGroupFromBasket = () => {
        dispatch(removeGroupedFromBasket({ id }));
    };

    return (
        // <div className="block py-4 sm:grid sm:grid-cols-5 my-16 sm:my-3">
        <div className="block py-4 sm:grid sm:grid-cols-5 my-16 sm:my-3">
            <Image
                src={image}
                width={200}
                height={200}
                objectFit="contain"
            />
            {/* Middle */}
            <div className="col-span-3 mx-5"> 
            {/* <div className="col-span-3 mx-5 mb-4 sm:mb-0">  */}
                <p className="my-3">{title}</p>
                <div className="flex">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <StarIcon key={i} className="h-5 text-yellow-500" />
                        ))}
                </div>
                <p className="text-xs my-2 line-clamp-3">{description}</p>
                {/* {quantity} × <Currency quantity={price} currency="EUR" /> ={" "} */}
                <span className="font-bold">
                    <Currency quantity={price} currency="EUR" />
                </span>
                {hasPrime && (
                    <div className="flex items-center space-x-2">
                        <img
                            loading="lazy"
                            className="w-12"
                            src="https://links.papareact.com/fdw"
                            alt=""
                        />
                        <p className="text-xs text-gray-500">
                            FREE Next-day Delivery
                        </p>
                    </div>
                )}
            </div> {/* Middle - end*/}
            {/* Buttons on the right of the products */}
            <div className="flex flex-col space-y-2 my-auto justify-self-end">
                <button className="button" onClick={addItemToBasket}>
                    Add another
                </button>
                <button className="button" onClick={removeItemFromBasket}> 
                    Remove from Basket
                </button>
            </div>  {/* Buttons - end*/}                
        </div>
    )
}

export default CheckoutProduct;
