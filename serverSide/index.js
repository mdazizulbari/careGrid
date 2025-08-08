require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SK_KEY);
const port = process.env.PORT || 3000;
const app = express();

// using firebase for jwt
// const decoded = Buffer.from(process.env.FB_SERVICE_KEY, "base64").toString(
//   "utf8"
// );
// var serviceAccount = JSON.parse(decoded);
// var admin = require("firebase-admin");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
// const { getAuth } = require("firebase-admin/auth");

// middleware
const corsOptions = {
  origin: ["http://localhost:5173", "https://caregrid-a12.netlify.app"],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const verifyToken = async (req, res, next) => {
  const token = req?.cookies?.token;
  console.log(req.cookieS);
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  const db = client.db("careGridDB");
  const campsCollection = db.collection("camps");
  const participantsCollection = db.collection("participants");
  const usersCollection = db.collection("users");
  const paymentsCollection = db.collection("payments");

  try {
    const verifyOrganizer = async (req, res, next) => {
      const email = req?.user?.email;
      const user = await usersCollection.findOne({ email });
      console.log(user?.role);

      if (!user || user?.role !== "organizer")
        return res.status(403).send({ message: "Organizer only access!" });
      next();
    };

    // save or update a users info in db
    app.post("/user", async (req, res) => {
      const userData = req.body;
      userData.role = "participant";
      userData.created_at = new Date().toISOString();
      userData.last_loggedIn = new Date().toISOString();

      const query = { email: userData?.email };
      const alreadyExists = await usersCollection.findOne(query);
      console.log("User already exists: ", !!alreadyExists);

      if (!!alreadyExists) {
        console.log("Updating user Data");
        const result = await usersCollection.updateOne(query, {
          $set: { last_loggedIn: new Date().toISOString() },
        });
        return res.send(result);
      }

      // return console.log(userData)
      const result = await usersCollection.insertOne(userData);
      res.send(result);
    });

    // get a user's role
    app.get("/user/role/:email", async (req, res) => {
      const email = req.params.email;
      const result = await usersCollection.findOne({ email });
      if (!result) return res.status(404).send({ message: "User not found" });
      res.send({ role: result?.role });
    });

    // get a user's image
    app.get("/user/image/:email", async (req, res) => {
      const email = req.params.email;
      const result = await usersCollection.findOne({ email });
      if (!result) return res.status(404).send({ message: "User not found" });
      res.send({ role: result?.image });
    });

    // get a single user by email
    app.get("/user/data/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const result = await usersCollection.findOne({ email });
      if (!result) return res.status(404).send({ message: "User not found" });
      res.send(result);
    });

    // Generate jwt token
    app.post("/jwt", async (req, res) => {
      const email = req.body;
      const token = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
      });
      // rules that we have to follow to make jwt work on production
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });

    // Logout user
    app.get("/logout", async (req, res) => {
      try {
        res
          .clearCookie("token", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // update a user data
    app.put("/update-user/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const userData = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = { $set: userData };
      try {
        const result = await usersCollection.updateOne(filter, updateDoc, {
          upsert: false,
        });
        console.log(userData, result);
        if (result.matchedCount === 0) {
          return res.status(404).send({ message: "User not found" });
        }
        res.send({ success: true, result });
      } catch (error) {
        console.error("Update error:", error);
        res.status(500).send({ message: "Server error updating user" });
      }
    });

    // add a camp data
    app.post("/add-camp", verifyToken, verifyOrganizer, async (req, res) => {
      const camp = req.body;
      const result = await campsCollection.insertOne(camp);
      console.log(camp);
      res.send(result);
    });

    // get all the camps data
    app.get("/camps", async (req, res) => {
      const result = await campsCollection.find().toArray();
      res.send(result);
    });

    // get a single camp data
    app.get("/camp/:id", async (req, res) => {
      const id = req.params.id;
      const result = await campsCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // update a camp data
    app.put(
      "/update-camp/:id",
      verifyToken,
      verifyOrganizer,
      async (req, res) => {
        const id = req.params.id;
        const campData = req.body;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = { $set: campData };
        const result = await campsCollection.updateOne(filter, updateDoc, {
          upsert: false,
        });
        console.log(campData, result);
        res.send({ result });
      }
    );

    // delete a camp
    app.delete(
      "/delete-camp/:id",
      verifyToken,
      verifyOrganizer,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await campsCollection.deleteOne(filter);
        res.send(result);
      }
    );

    // update participant count after adding new participant
    app.patch(
      "/participant-count-update/:id",
      verifyToken,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        let updateDoc = {
          $inc: { participantCount: 1 },
        };
        const result = await campsCollection.updateOne(filter, updateDoc);
        console.log(result);
        res.send(result);
      }
    );

    // add participant to db
    app.post("/participant", verifyToken, async (req, res) => {
      const participantData = req.body;
      const result = await participantsCollection.insertOne(participantData);
      console.log(result);
      res.send(result);
    });

    // get all participant data
    app.get("/participants", verifyToken, verifyOrganizer, async (req, res) => {
      const result = await participantsCollection.find().toArray();
      res.send(result);
    });

    // get all registered camps for single participant
    app.get("/participated-camps/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const filter = { participantEmail: email };
      const result = await participantsCollection.find(filter).toArray();
      res.send(result);
    });

    // update payment status
    app.patch("/payment-update/:id", async (req, res) => {
      const id = req.params.id;
      const { paymentConfirmation, paymentStatus } = req.body;
      const filter = { _id: new ObjectId(id) };
      console.log(filter);
      let updateDoc = {
        $set: {
          paymentConfirmation: paymentConfirmation,
          paymentStatus: paymentStatus,
          paymentDate: new Date(),
        },
      };
      const result = await participantsCollection.updateOne(filter, updateDoc);
      if (result.matchedCount === 0) {
        return res.status(404).send({ message: "Payment not found" });
      }
      console.log(result);
      res.send({ success: true, modifiedCount: result.modifiedCount });
    });

    // delete a participation / cancel registration as participant
    app.delete("/delete-participation/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await participantsCollection.deleteOne(filter);
      res.send(result);
    });

    // delete a participant / cancel registration as organizer
    app.delete(
      "/delete-registration/:id",
      verifyToken,
      verifyOrganizer,
      async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await participantsCollection.deleteOne(filter);
        res.send(result);
      }
    );

    // add payment data in db
    app.post("/add-payment", verifyToken, async (req, res) => {
      const paymentData = req.body;
      const result = await paymentsCollection.insertOne(paymentData);
      console.log(result);
      res.send(result);
    });

    // get payment history for single user
    app.get("/payments/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const filter = { participantEmail: email };
      const result = await paymentsCollection.find(filter).toArray();
      console.log(email);
      console.log(result);
      res.send(result);
    });

    // create payment intent for orderData
    app.post("/create-payment-intent", async (req, res) => {
      const { campId } = req.body;
      const camp = await participantsCollection.findOne({
        _id: new ObjectId(campId),
      });
      if (!camp) return res.status(404).send({ message: "Camp Not Found" });
      const totalPrice = camp?.campFee * 100;

      // stripe ...
      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalPrice,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      res.send({ clientSecret: paymentIntent.client_secret });
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello from CareGrid Server..");
});

app.listen(port, () => {
  console.log(`CareGrid is running on port ${port}`);
});
