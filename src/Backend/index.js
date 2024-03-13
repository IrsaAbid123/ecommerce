const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const cors = require('cors');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const User = require("./models/user");
const bcrypt = require('bcrypt');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDb connected Sucessfully')
}).catch((err) => {
    console.log('Error conneting MongoDb', err)
})


//------------------------------------------------ endpoints for registering the User------------------------------------------------

// generation of secret key

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString('hex')
    return secretKey
}

secretKey = generateSecretKey()




app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('User is already registered');
            return res.status(400).json({ message: 'Email already registered' });
        } else {
            // Create a new User
            const newUser = new User({ name, email, password});

            // Generate verification token
            const verificationToken = crypto.randomBytes(20).toString('hex');
            newUser.verificationToken = verificationToken;

            // Save the user in the database
            await newUser.save();

            // Optionally, send a verification email to the user here

            res.status(200).json({ message: "Registration successful", verificationToken });
        }

    } catch (error) {
        console.log('Error registering the user', error);
        res.status(500).json({ message: "Registration failed" });
    }
});

// ------------------------------------endPoint for verifying the email----------------------------------------

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // find if the user exist or not through the email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email does not exist' }); // Added return statement
        }

        // Check if password is correct or not?
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        if (user.verificationToken) {
            user.verificationToken = undefined; // Or you can delete the field entirely if you prefer
            await user.save();
        }

        // generate a token
        const token = jwt.sign({ userId: user._id }, secretKey);

        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ message: 'Email Verification failed' });
    }
});


// ------------------------------------endPoint for adresses---------------------------------
// Define a route to handle POST requests to "/adresses/:userId"
app.post('/adresses/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const address = req.body;

        // Find user by its id
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Push the address object to the array
        user.addresses.push(address);
        
        // Save the user to the database
        await user.save();

        res.status(200).json({ message: 'Address added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding address' });
    }
});



app.get('/adresses/:userId', async (req, res) => {
    try{
     const userId = req.params.userId
    //  find user by its id
    
    const user = await User.findById(userId)
    if(!user) {
        return res.status(404).json({message: 'User is not found'})
    }
//    getting adresses by its id
   const adresses = user.addresses
   console.log(adresses)
   res.status(200).json(adresses)
    
    }catch(error){
        res.status(500).json({message: 'Error getting adresses'})
    }
})

app.delete('/addresses/:userId/:addressId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const addressId = req.params.addressId;

        // Find the user document by userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the address with the given addressId exists in the user's addresses array
        const addressIndex = user.addresses.findIndex(address => address._id == addressId);

        if (addressIndex === -1) {
            return res.status(404).json({ message: 'Address not found' });
        }

        // Remove the address from the addresses array
        user.addresses.splice(addressIndex, 1);

        // Save the updated user document
        await user.save();

        res.status(200).json({ message: 'Address deleted successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting the address', error: error.message });
    }
});

app.listen(port, () => {
    console.log('Server running on the port 8000 sucessfully')
})