# Create the README.md content

readme_content = """

# Node.js Product Management API

This is a Node.js application that provides an API for managing products stored in a MongoDB database. It supports operations like fetching, soft-deleting, and updating products.

## Features

- Add new products.
- Fetch all products where the `deleted` flag is `false`.
- Fetch a product by its ID (only if the `deleted` flag is `false`).
- Mark a product as deleted by its ID or name (soft delete).

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Framework for building APIs.
- **MongoDB**: NoSQL database for storing product information.
- **Mongoose**: ODM for MongoDB and Node.js.
