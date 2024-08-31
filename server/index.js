const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Initialize express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.knujmnx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const productCollection = client
      .db("prsCollection")
      .collection("productData");
    const userDataCollection = client
      .db("prsCollection")
      .collection("userData");
    const requestedProductCollection = client
      .db("prsCollection")
      .collection("requestedProduct");

    // Test API
    const testUserCollection = client
      .db("prsCollection")
      .collection("testUser");

    app.post("/addUser", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userDataCollection.findOne(query);

      if (existingUser) {
        return res.send({ message: "user already exists" });
      }

      const result = await userDataCollection.insertOne(user);
      res.send(result);
    });

    app.get("/userData", async (req, res) => {
      const userEmail = req.query.email;
      if (!userEmail) {
        res.send([]);
      }

      const query = { email: userEmail };
      const result = await userDataCollection.find(query).toArray();
      res.send(result);
    });

    // Admin APIs
    app.get("/users/admin/:email", async (req, res) => {
      const email = req.params.email;

      const query = { email: email };
      const user = await userDataCollection.findOne(query);
      const result = { admin: user?.role === "Admin" };
      res.send(result);
    });

    // Employee APIs
    app.get("/users/employee/:email", async (req, res) => {
      const email = req.params.email;

      const query = { email: email };
      const user = await userDataCollection.findOne(query);
      const result = { employee: user?.role === "User" };
      res.send(result);
    });

    // app.get("/myRequest", async (req, res) => {
    //   const email = req.query.email;

    //   if (!email) {
    //     res.send([]);
    //   }

    //   const query = { userEmail: email };

    //   const result = await requestedProductCollection.find(query).toArray();
    //   res.send(result);
    // });

    app.get("/myRequest", async (req, res) => {
      try {
        const email = req.query.email;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search ? req.query.search.trim() : "";

        if (!email) {
          return res.status(400).json({ message: "Email is required" });
        }

        const query = {
          userEmail: email,
          $or: [
            { userName: { $regex: search, $options: "i" } },
            { productName: { $regex: search, $options: "i" } },
            { date: { $regex: search, $options: "i" } },
            { currentStock: { $regex: search, $options: "i" } },
            { requestQuantity: { $regex: search, $options: "i" } },
            { unit: { $regex: search, $options: "i" } },
            { unitPrice: { $regex: search, $options: "i" } },
            { totalPrice: { $regex: search, $options: "i" } },
            { remarks: { $regex: search, $options: "i" } },
            { status: { $regex: search, $options: "i" } },
            { prNo: { $regex: search, $options: "i" } },
            { deliveredQuantity: { $regex: search, $options: "i" } },
          ],
        };

        const total = await requestedProductCollection.countDocuments(query);
        const requests = await requestedProductCollection
          .find(query)
          .skip((page - 1) * limit)
          .limit(limit)
          .toArray();

        res.json({ total, requests });
      } catch (error) {
        console.error("Error retrieving requests:", error);
        res.status(500).json({ message: "Server error", error });
      }
    });

    // app.get("/myRequest", async (req, res) => {
    //   try {
    //     const email = req.query.email;
    //     if (!email) {
    //       return res.status(400).json({ message: "Email is required" });
    //     }

    //     const page = parseInt(req.query.page) || 1;
    //     const limit = parseInt(req.query.limit) || 10;
    //     const search = req.query.search ? req.query.search.trim() : '';

    //     const query = {
    //       userEmail: email,
    //       $or: [
    //         { userName: { $regex: search, $options: 'i' } },
    //         { productName: { $regex: search, $options: 'i' } },
    //         // Add other fields as needed...
    //       ]
    //     };

    //     const total = await requestedProductCollection.countDocuments(query);
    //     const requests = await requestedProductCollection.find(query)
    //       .skip((page - 1) * limit)
    //       .limit(limit)
    //       .toArray();

    //     res.json({ total, requests });
    //   } catch (error) {
    //     console.error("Error retrieving requests:", error);
    //     res.status(500).json({ message: "Server error", error });
    //   }
    // });

    // app.get("/myPurchaseRequest", async (req, res) => {
    //   const email = req.query.email;

    //   if (!email) {
    //     res.send([]);
    //   }

    //   const query = {
    //     userEmail: email,
    //     prNo: { $ne: "" },
    //     status: "Purchase request approved",
    //   };

    //   const result = await requestedProductCollection.find(query).toArray();
    //   res.send(result);
    // });

    app.get("/myRequest", async (req, res) => {
      try {
        const email = req.query.email;
        if (!email) {
          return res.status(400).json({ message: "Email is required" });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search ? req.query.search.trim() : "";

        const query = {
          userEmail: email,
          $or: [
            { userName: { $regex: search, $options: "i" } },
            { productName: { $regex: search, $options: "i" } },
            // Add other fields as needed...
          ],
        };

        const total = await requestedProductCollection.countDocuments(query);
        const requests = await requestedProductCollection
          .find(query)
          .skip((page - 1) * limit)
          .limit(limit)
          .toArray();

        res.json({ total, requests });
      } catch (error) {
        console.error("Error retrieving requests:", error);
        res.status(500).json({ message: "Server error", error });
      }
    });

    app.patch("/request/store/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: "Requested for store",
        },
      };

      const result = await requestedProductCollection.updateOne(
        filter,
        updateDoc
      );
      res.send(result);
    });

    app.delete("/deleteMyRequest/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await requestedProductCollection.deleteOne(query);
      res.send(result);
    });

    // StoreMan APIs
    app.get("/users/storeMan/:email", async (req, res) => {
      const email = req.params.email;

      const query = { email: email };
      const user = await userDataCollection.findOne(query);
      const result = { storeMan: user?.role === "Store" };
      res.send(result);
    });

    app.delete("/deleteProduct/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.send(result);
    });

    app.patch("/editProduct/:id", async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = { $set: updateData };

      const result = await productCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    app.get("/addPr", async (req, res) => {
      const cursor = requestedProductCollection.find({
        status: "Purchase request approved",
        prNo: "",
      });
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/deliverProductData", async (req, res) => {
      const cursor = requestedProductCollection.find({
        $or: [
          { status: "Purchase request approved" },
          { status: "Store request approved" },
        ],
        deliveredQuantity: "",
      });
      const result = await cursor.toArray();
      res.send(result);
    });

    // app.get("/addPrDone", async (req, res) => {
    //   const cursor = requestedProductCollection.find({
    //     $or: [{ prNo: { $ne: "" } }, { deliveredQuantity: { $ne: "" } }],
    //   });
    //   const result = await cursor.toArray();
    //   res.send(result);
    // });

    app.get("/addPrDone", async (req, res) => {
      const { page = 1, limit = 50, search = "" } = req.query;
    
      // Define the search query
      const searchQuery = {
        $or: [
          { prNo: { $ne: "" } },
          { deliveredQuantity: { $ne: "" } },
          {
            $or: [
              { userName: { $regex: search, $options: "i" } },
              { productName: { $regex: search, $options: "i" } },
              { date: { $regex: search, $options: "i" } },
              { currentStock: { $regex: search, $options: "i" } },
              { requestQuantity: { $regex: search, $options: "i" } },
              { unit: { $regex: search, $options: "i" } },
              { unitPrice: { $regex: search, $options: "i" } },
              { totalPrice: { $regex: search, $options: "i" } },
              { remarks: { $regex: search, $options: "i" } },
              { status: { $regex: search, $options: "i" } },
              { deliveredQuantity: { $regex: search, $options: "i" } }
            ]
          }
        ]
      };
    
      // Count total documents matching the query
      const totalDocuments = await requestedProductCollection.countDocuments(searchQuery);
    
      // Find documents with pagination and search
      const cursor = requestedProductCollection
        .find(searchQuery)
        .sort({ date: -1 })  // Sort by date in descending order
        .skip((page - 1) * limit)  // Skip to the right page
        .limit(parseInt(limit));   // Limit the number of documents
    
      const result = await cursor.toArray();
    
      // Send response with pagination details
      res.send({
        totalDocuments,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalDocuments / limit),
        data: result,
      });
    });
    
    app.patch("/addPrNo/:id", async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = { $set: updateData };

      const result = await requestedProductCollection.updateOne(
        filter,
        updateDoc
      );
      res.send(result);
    });

    app.patch("/addDeliverQuantity/:id", async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = { $set: updateData };

      const result = await requestedProductCollection.updateOne(
        filter,
        updateDoc
      );
      res.send(result);
    });

    // app.patch("/updateCurrentStock/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const updateData = req.body;
    //   const filter = { _id: new ObjectId(id) };
    //   const updateDoc = { $set: updateData };

    //   const result = await productCollection.updateOne(filter, updateDoc);
    //   res.send(result);
    // });

    app.patch("/updateCurrentStock/:id", async (req, res) => {
      const id = req.params.id;
      const subQuantity = req.body.deliverQuantity;
      try {
        const product = await productCollection.findOne({
          _id: new ObjectId(id),
        });

        if (!product) {
          return res.status(404).send({ error: "Product not found" });
        }

        const updatedQuantity = product.quantity - subQuantity;

        if (updatedQuantity < 0) {
          return res.status(400).send({ error: "Quantity cannot be negative" });
        }

        const updateDoc = {
          $set: { quantity: updatedQuantity },
        };

        const result = await productCollection.updateOne(
          { _id: new ObjectId(id) },
          updateDoc
        );
        res.send(result);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .send({ error: "An error occurred while updating the stock" });
      }
    });

    // Manager APIs
    app.get("/users/manager/:email", async (req, res) => {
      const email = req.params.email;

      const query = { email: email };
      const user = await userDataCollection.findOne(query);
      const result = { manager: user?.role === "Manager" };
      res.send(result);
    });

    app.patch("/request/approve/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: "Purchase request approved",
        },
      };

      const result = await requestedProductCollection.updateOne(
        filter,
        updateDoc
      );
      res.send(result);
    });

    app.patch("/request/deny/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: "Purchase request rejected",
        },
      };

      const result = await requestedProductCollection.updateOne(
        filter,
        updateDoc
      );
      res.send(result);
    });

    app.patch("/request/storeApprove/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: "Store request approved",
        },
      };

      const result = await requestedProductCollection.updateOne(
        filter,
        updateDoc
      );
      res.send(result);
    });

    app.patch("/request/storeDeny/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: "Store request rejected",
        },
      };

      const result = await requestedProductCollection.updateOne(
        filter,
        updateDoc
      );
      res.send(result);
    });

    app.get("/requestedProduct", async (req, res) => {
      const cursor = requestedProductCollection.find({
        status: "Requested for purchase",
      });
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/storeRequestedProduct", async (req, res) => {
      const cursor = requestedProductCollection.find({
        status: "Requested for store",
      });
      const result = await cursor.toArray();
      res.send(result);
    });

    // Product APIs
    app.post("/addProduct", async (req, res) => {
      const addProduct = req.body;
      const result = await productCollection.insertOne(addProduct);
      res.send(result);
    });

    app.get("/allProduct", async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 70;
      const search = req.query.search ? req.query.search.trim() : "";

      // Define the fields you want to include in the search
      let query = {};

      if (search) {
        const terms = search.match(/\b\w+\b/g) || [];

        // Build $or array with $regex for each term in each field
        const searchQueries = terms.map((term) => ({
          $or: [
            { productName: { $regex: term, $options: "i" } },
            { description: { $regex: term, $options: "i" } },
            { unit: { $regex: term, $options: "i" } },
            { quantity: { $regex: term, $options: "i" } },
            // Add more fields as needed
          ],
        }));

        // Combine search queries with $and
        query = { $and: searchQueries };
      }

      try {
        const total = await productCollection.countDocuments(query);
        const products = await productCollection
          .find(query)
          .skip((page - 1) * limit)
          .limit(limit)
          .toArray();

        res.send({ total, products });
      } catch (error) {
        res.status(500).send({ message: "Error retrieving products", error });
      }
    });

    app.post("/requestProduct", async (req, res) => {
      const addRequestedProduct = req.body;

      const result = await requestedProductCollection.insertOne(
        addRequestedProduct
      );
      res.send(result);
    });

    app.get("/allUser", async (req, res) => {
      const cursor = userDataCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // test Api

    app.get("/allRequest", async (req, res) => {
      const cursor = requestedProductCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // test API

    app.post("/testUser", async (req, res) => {
      const vvvv = req.body;

      const result = await testUserCollection.insertOne(vvvv);
      res.send(result);
    });

    app.patch("/makeManager/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: "Manager",
        },
      };

      const result = await userDataCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    app.patch("/makeStoreMan/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: "Store",
        },
      };

      const result = await userDataCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    app.patch("/makeUser/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          role: "User",
        },
      };

      const result = await userDataCollection.updateOne(filter, updateDoc);
      res.send(result);
    });
  } finally {
    // Ensuring client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
