import { faker } from "@faker-js/faker";
import { hashPassword } from "../../utils/hashPassword";
import {
    USERS,
    CATEGORIES
} from "../tableNames";


const userData = (data_number: number) => {
    var user_data_array = [];
    for (var i = 0; i < data_number; i++) {
        const name = faker.name.firstName();
        const email = faker.internet.email();
        const password = faker.internet.password();
        var obj = {
            name,
            email,
            password
        };
        user_data_array.push(obj);
    }
    return user_data_array;
};


// Function to generate a unique product
function generateProduct() {
    return {
        categoryName: faker.commerce.productName(),
    };
}

// Function to generate a list of unique products
function generateUniqueProducts(count: number) {
    const products = [];
    const uniqueNames = new Set();

    while (products.length < count) {
        const product = generateProduct();
        if (!uniqueNames.has(product.categoryName)) {
            products.push(product);
            uniqueNames.add(product.categoryName);
        }
    }

    return products;
}


exports.seed = async function (knex: any) {

    const args = process.argv
        .slice(6)
        .map((arg) => arg.split("="))
        .reduce((args: any, [value, key]) => {
            args[value] = key;
            return args;
        }, {});

    const table = args?.table || null;
    const count = args?.count || 10;

    if (table === "users") {
        await knex(USERS).insert(userData(count));
    } else if (table === "category") {
        await knex(CATEGORIES).insert(generateUniqueProducts(count));
    }
}