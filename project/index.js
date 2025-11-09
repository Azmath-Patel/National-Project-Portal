const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require('./models/User');
const Subscriber = require('./models/Subscriber');
const Person = require('./models/Person');
const Contact = require('./models/contact'); 
const Project = require('./models/Project');
const path = require('path');
const app = express();
const port = process.env.PORT || 7060;
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
const nodemailer = require('nodemailer');

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 

// Set EJS as the View Engine
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose
  .connect("mongodb+srv://ganahemaraja:capmongo@cluster0.edt8x.mongodb.net/cap-7",{
    serverSelectionTimeoutMS: 50000,
    socketTimeoutMS: 45000 ,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Routes 
app.get("/", (req, res) => {
  res.render("home",{
    title: "Home Page",
    homeUrl: "/",
    aboutUrl: "/about",
    contactUrl : "/contact",
    financeUrl : "/finance",
    projectUrl : "/project",
    adminUrl : "/admin",
    itUrl : "/it",
    actionUrl: "/login",
    personUrl: "/person",
    donationActionUrl :"/payment",
    ecomUrl: 'http://localhost:5173/', 
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
    title: "Login Page",
    heading: "Log In",
    actionUrl: "/login",
    forgotPasswordUrl: "/forgot-password",
    signUpUrl: "/sign-up",
    homeUrl: "/",
    aboutUrl: "/about",
    contactUrl : "/contact",
    financeUrl : "/finance",
    projectUrl : "/project",
    itUrl : "/it",
    personUrl: "/person",
    ecomUrl: 'http://localhost:3001/admin',
  });
});

app.get('/sign-up', (req, res) => {
  res.render('Sign-up',{
    title: "Sign Up Page",
    signUpUrl: "/sign-up",
    actionUrl: "/login",
    homeUrl: "/" ,
    aboutUrl: "/about",
    contactUrl : "/contact",
    welcomeUrl : "/welcome",
    financeUrl : "/finance",
    projectUrl : "/project",
    itUrl : "/it",
    personUrl: "/person",
    ecomUrl: 'http://localhost:3001/admin',
  });
});

app.get('/forgot-password', (req, res) => {
  res.render('forgot-password',{
    title: "Forgot-password Page",
    forgotPasswordUrl: "/forgot-password",
    actionUrl: "/login",
    homeUrl: "/" ,
    aboutUrl: "/about",
    contactUrl : "/contact",
    welcomeUrl : "/welcome",
    financeUrl : "/finance",
    projectUrl : "/project",
    itUrl : "/it",
    personUrl: "/person",
    ecomUrl: 'http://localhost:3001/admin',
  });
});

app.get('/about', (req, res) => {
  res.render('about',{
    title: "About Us Page",
    aboutUrl: "/about",
    homeUrl: "/",
    contactUrl : "/contact",
    financeUrl : "/finance",
    projectUrl : "/project",
    actionUrl: "/login",
    itUrl : "/it",
    personUrl: "/person",
    ecomUrl: 'http://localhost:3001/admin',
  });
});

app.get('/contact', (req, res) => {
  res.render('contact',{
    title: "Contact Page",
    contactUrl : "/contact",
    homeUrl: "/",
    aboutUrl: "/about",
    welcomeUrl : "/welcome",
    financeUrl : "/finance",
    projectUrl : "/project",
    actionUrl: "/login",
    itUrl : "/it",
    personUrl: "/person",
    ecomUrl: 'http://localhost:3001/admin',
  });
});

app.get('/welcome', (req, res) => {
  res.render('welcome',{
    title: "Welcome Page",
    welcomeUrl : "/welcome",
    contactUrl : "/contact",
    homeUrl: "/",
    aboutUrl: "/about",
    actionUrl: "/login",
    forgotPasswordUrl: "/forgot-password",
    signUpUrl: "/sign-up",
    financeUrl : "/finance",
    projectUrl : "/project",
    adminUrl : "/admin",
    itUrl : "/it",
    personUrl : "/person",
    ecomUrl: 'http://localhost:3001/admin',
  });
});

app.get('/finance', (req, res) => {
  res.render('finance',{
    title: "Budget Page",
    financeUrl : "/finance",
    contactUrl : "/contact",
    homeUrl: "/",
    aboutUrl: "/about",
    actionUrl: "/login",
    forgotPasswordUrl: "/forgot-password",
    signUpUrl: "/sign-up",
    projectUrl : "/project",
    personUrl: "/person",
    ecomUrl: 'http://localhost:3001/admin',
  });
});


app.get('/it', async (req, res) => {
  try {
    
    const projects = await Project.find({}); 
    const projectCount = projects.length; 
    
    res.render('it', { 
      projects,
      projectCount ,
      title: "It Resource Page",
      itUrl : "/it",
      projectUrl : "/project",
      financeUrl : "/finance",
      contactUrl : "/contact",
      homeUrl: "/",
      aboutUrl: "/about",
      actionUrl: "/login",
      forgotPasswordUrl: "/forgot-password",
      signUpUrl: "/sign-up",
      personUrl: "/person",
      ecomUrl: 'http://localhost:3001/admin',
     }); 
  } catch (error) {
    console.error('Error retrieving projects:', error);
    res.status(500).send('Error retrieving projects');
  }
});

app.get('/person', (req, res) => {
  res.render('person',{
    title: "Public User Page",
    personUrl: '/person',
    homeUrl: "/",
    projectUrl : "/project",
    financeUrl : "/finance",
    aboutUrl: "/about",
    contactUrl : "/contact",
    actionUrl: "/login",
    ecomUrl: 'http://localhost:3001/admin',
  });
});

app.get("/pr1", (req, res) => {
  res.render("pr1",{
    title: "Project Details Page",
    homeUrl: "/",
    aboutUrl: "/about",
    contactUrl : "/contact",
    financeUrl : "/finance",
    projectUrl : "/project",
    adminUrl : "/admin",
    itUrl : "/it",
    actionUrl: "/login",
    personUrl: "/person",
    ecomUrl: 'http://localhost:3001/admin',
  });
});

app.get("/pr2", (req, res) => {
  res.render("pr2",{
    title: "Project Details Page",
    homeUrl: "/",
    aboutUrl: "/about",
    contactUrl : "/contact",
    financeUrl : "/finance",
    projectUrl : "/project",
    adminUrl : "/admin",
    itUrl : "/it",
    actionUrl: "/login",
    personUrl: "/person",
    ecomUrl: 'http://localhost:3001/admin',
  });
});

app.get("/pr3", (req, res) => {
  res.render("pr3",{
    title: "Project Details Page",
    homeUrl: "/",
    aboutUrl: "/about",
    contactUrl : "/contact",
    financeUrl : "/finance",
    projectUrl : "/project",
    adminUrl : "/admin",
    itUrl : "/it",
    actionUrl: "/login",
    personUrl: "/person",
    ecomUrl: 'http://localhost:3001/admin',
  });
});

app.get('/admin', async (req, res) => {
  try {
      const people = await Person.find({});
      const users = await User.find({}); 
      const subscribers = await Subscriber.find({});
      const contacts = await Contact.find({});
      const projects = await Project.find({}); 
      const projectCount = projects.length; 
     
      res.render('admin', {
          people, 
          users, 
          subscribers,
          contacts,
          projects,
          projectCount ,
          title: "Admin Page",
          adminUrl: "/admin",
          homeUrl: "/",
          projectUrl: "/project",
          financeUrl: "/finance",
          aboutUrl: "/about",
          contactUrl: "/contact",
          welcomeUrl: "/welcome",
          actionUrl: "/login",
          personUrl: "/person",
          ecomUrl: 'http://localhost:3001/admin',
      });
  } catch (error) {
      console.error('Error fetching people:', error);
      res.status(500).send('Internal Server Error');
  }
});

app.get('/project', async (req, res) => {
  try {
    const projects = await Project.find({}); 
    const projectCount = projects.length; 
    
    res.render('project', { 
      projects,
      projectCount ,
      title: "Project Page",
      projectUrl : "/project",
      financeUrl : "/finance",
      contactUrl : "/contact",
      homeUrl: "/",
      aboutUrl: "/about",
      actionUrl: "/login",
      forgotPasswordUrl: "/forgot-password",
      signUpUrl: "/sign-up",
      personUrl: "/person",
      ecomUrl: 'http://localhost:3001/admin',
     }); 
  } catch (error) {
    console.error('Error retrieving projects:', error);
    res.status(500).send('Error retrieving projects');
  }
});

app.get('/projects/:id', async (req, res) => {
  try {
    const projectId = req.params.id; 
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).send('Project not found');
    }

    res.render('projectDetails', { 
      project ,
      title: "Project  Details Page",
      projectUrl : "/project",
      financeUrl : "/finance",
      contactUrl : "/contact",
      homeUrl: "/",
      aboutUrl: "/about",
      actionUrl: "/login",
      forgotPasswordUrl: "/forgot-password",
      signUpUrl: "/sign-up",
      personUrl: "/person",
      ecomUrl: 'http://localhost:3001/admin',
    }); 
  } catch (error) {
    console.error('Error retrieving project:', error);
    res.status(500).send('Error retrieving project');
  }
});

app.post('/sign-up', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, errors: 'Email and password are required' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, errors: 'Email already registered. Please use a different email.' });
    }

    user = new User({
      email: email,
      password: password,
    });

    await user.save();

    const data = { users: { id: user.id } };
    const token = jwt.sign(data, 'secret_ecom'); 

    res.json({ success: true, token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, errors: 'An error occurred during sign-up. Please try again later.' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    
    if (!user) {
      return res.status(400).json({ success: false, errors: "Wrong Email Id" });
    }

    const passCompare = req.body.password === user.password; 

    if (passCompare) {
      const data = {
        users: {
          id: user.id
        }
      };

      const token = jwt.sign(data, 'secret_ecom'); 

      return res.json({ success: true, token });
    } else {

      return res.status(400).json({ success: false, errors: "Wrong Password" });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, errors: 'An error occurred. Please try again later.' });
  }
});

app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const subscriber = new Subscriber({ email });
    await subscriber.save();
    res.status(201).json({ message: 'Subscription successful' });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: 'Email is already subscribed' });
    } else {
      res.status(500).json({ message: 'Server error' });
    }
  }
});

app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, error: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, error: 'User not found with this email' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'An error occurred. Please try again later.' });
  }
});

app.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ success: false, error: 'Email and new password are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, error: 'User not found' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: 'Password successfully updated!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'An error occurred. Please try again later.' });
  }
});

app.post('/person', async (req, res) => {
  console.log('Received data:', req.body); 

  try {
    const {
      fullName,
      age,
      gender,
      contactNumber,
      alternateContactNumber,
      permanentAddress,
      currentLocation,
      geoCoordinates,
      medicalConditions,
      injuries,
      medicationNeeds,
      numberOfFamilyMembers,
      familyDetails,
      missingFamilyDetails,
      foodRequirements,
      clothingSizes,
    } = req.body;

    if (!fullName || !age || !gender || !permanentAddress || !currentLocation) {
      return res.status(400).json({ error: 'Full Name, Age, Gender, Permanent Address, and Current Location are required.' });
    }

    const newPerson = new Person({
      fullName,
      age,
      gender,
      contactNumber,
      alternateContactNumber,
      permanentAddress,
      currentLocation,
      geoCoordinates,
      medicalConditions,
      injuries,
      medicationNeeds,
      numberOfFamilyMembers,
      familyDetails,
      missingFamilyDetails,
      foodRequirements,
      clothingSizes,
    });

    await newPerson.save();
    res.status(201).json({ message: 'Person data submitted successfully!' });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error saving data to database' });
  }
});

app.post('/contact', async (req, res) => {
  console.log('Received contact message:', req.body); 

  try {
    const { message, email } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const newContact = new Contact({
      message,
      email,
    });

    await newContact.save();

    res.status(201).json({ message: 'Message submitted successfully!' });
    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error saving message to database' });
  }
});

app.delete('/admin/delete-user/:id', async (req, res) => {
  const userId = req.params.id;

  try {
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
          return res.status(404).json({ success: false, message: "User not found." });
      }

      return res.status(200).json({ success: true, message: "User deleted successfully." });
  } catch (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ success: false, message: "Error deleting user." });
  }
});

app.put('/admin/update-user/:id', async (req, res) => {
  const userId = req.params.id;
  const { email, password } = req.body;

  try {
      const updatedUser = await User.findByIdAndUpdate(
          userId,
          { email, password },
          { new: true } 
      );
      
      if (!updatedUser) {
          return res.status(404).json({ success: false, message: "User not found." });
      }

      return res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({ success: false, message: "Error updating user." });
  }
});

app.delete('/admin/delete-subscriber/:id', async (req, res) => {
  const subscriberId = req.params.id;

  try {
      const deletedSubscriber = await Subscriber.findByIdAndDelete(subscriberId);

      if (!deletedSubscriber) {
          return res.status(404).json({ success: false, message: "Subscriber not found." });
      }

      return res.status(200).json({ success: true, message: "Subscriber deleted successfully." });
  } catch (err) {
      console.error("Error deleting subscriber:", err);
      return res.status(500).json({ success: false, message: "Error deleting subscriber." });
  }
});

app.delete('/admin/delete-person/:id', async (req, res) => {
  const personId = req.params.id;

  try {
      const deletedPerson = await Person.findByIdAndDelete(personId);

      if (!deletedPerson) {
          return res.status(404).json({ success: false, message: "Person not found." });
      }

      return res.status(200).json({ success: true, message: "Person deleted successfully." });
  } catch (err) {
      console.error("Error deleting person:", err);
      return res.status(500).json({ success: false, message: "Error deleting person." });
  }
});

app.put('/admin/update-person/:id', async (req, res) => {
  const personId = req.params.id;
  const updatedData = req.body;
  if (!mongoose.Types.ObjectId.isValid(personId)) {
      return res.status(400).json({ success: false, message: "Invalid person ID." });
  }

  try {
      const updatedPerson = await Person.findByIdAndUpdate(personId, updatedData, { new: true });

      if (!updatedPerson) {
          return res.status(404).json({ success: false, message: "Person not found." });
      }

      return res.status(200).json({ success: true, message: "Person updated successfully.", updatedPerson });
  } catch (err) {
      console.error("Error updating person:", err.message, err.stack);
      return res.status(500).json({ success: false, message: "Error updating person." });
  }
});

app.get('/admin/get-person/:id', async (req, res) => {
  const personId = req.params.id;

  try {
      const person = await Person.findById(personId);

      if (!person) {
          return res.status(404).json({ success: false, message: "Person not found." });
      }

      return res.status(200).json(person);
  } catch (err) {
      console.error("Error getting person:", err);
      return res.status(500).json({ success: false, message: "Error retrieving person." });
  }
});

app.post('/admin/create', (req, res) => {
  const { candidateName, candidateRole, projectTitle, projectDescription,driveLink} = req.body;

  const newProject = new Project({
      candidate: {
          name: candidateName,
          role: candidateRole
      },
      project: {
          title: projectTitle,
          description: projectDescription
      },
      driveLink: driveLink || '',
      
  });

  newProject.save()
      .then(() => {
          console.log('Project created successfully');
          res.redirect('/projects'); 
      })
      .catch((error) => {
          console.error('Error creating project:', error);
          res.status(500).send('Error creating project');
      });
});

app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.render('projects', { 
      projects,
      title: "Projects Page",
      homeUrl: "/",
      aboutUrl: "/about",
      contactUrl : "/contact",
      financeUrl : "/finance",
      projectUrl : "/project",
      adminUrl : "/admin",
      itUrl : "/it",
      actionUrl: "/login",
      personUrl: "/person",
      ecomUrl: 'http://localhost:3001/admin',
    });
  } catch (error) {
    console.error('Error retrieving projects:', error);
    res.status(500).send('Error retrieving projects');
  }
});

app.get('/payment', (req, res) => {
  const donationAmount = req.query.donationAmount;

  if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
    return res.status(400).send('Invalid donation amount');
  }

  const upiId = '8310274219@ybl'; // Replace with actual UPI ID
  const payeeName = 'Gana N H'; // Replace with actual name
  const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(payeeName)}&am=${donationAmount}&cu=INR`;

  QRCode.toDataURL(upiUrl, (err, qrCodeUrl) => {
    if (err) {
      console.error('Error generating QR code', err);
      return res.status(500).send('Error generating QR code');
    }
    res.render('payment', {
      donationAmount,
      qrCodeUrl,
      title: "Payment Page",
    financeUrl : "/finance",
    contactUrl : "/contact",
    homeUrl: "/",
    aboutUrl: "/about",
    actionUrl: "/login",
    forgotPasswordUrl: "/forgot-password",
    signUpUrl: "/sign-up",
    projectUrl : "/project",
    personUrl: "/person",
    donationActionUrl :"/payment",
    ecomUrl: 'http://localhost:3001/admin',
    });
  });
});

app.post('/process-card-payment', (req, res) => {
  const { cardNumber, expiryDate, cvv, cardHolderName, donationAmount } = req.body;

  console.log(`Processing card payment: ₹${donationAmount}`);
  console.log(`Card Details: ${cardNumber}, ${expiryDate}, CVV: ${cvv}, Name: ${cardHolderName}`);

  // Simulate payment gateway integration
  // Replace this with actual gateway logic
  res.status(200).json({
    success: true,
    message: `Card payment of ₹${donationAmount} successful! Thank you for your donation.`
  });
});

app.post('/process-payment', (req, res) => {
  const { donationAmount, paymentMethod } = req.body;

  console.log(`Donation Amount: ₹${donationAmount}, Payment Method: ${paymentMethod}`);

  if (paymentMethod === 'upi') {
    res.send('Redirecting to UPI payment...');
  } else if (paymentMethod === 'card') {
    res.send('Redirecting to Card payment...');
  } else {
    res.status(400).json({ success: true, message:'Invalid payment method selected.'});
  }
});

app.delete('/admin/contacts/:id', async (req, res) => {
  try {
      const { id } = req.params;
      await Contact.findByIdAndDelete(id); 
      res.status(200).send({ message: 'Contact message deleted successfully.' });
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Failed to delete contact message.' });
  }
});

app.post('/admin/send-email', async (req, res) => {
  const { email } = req.body;

  const message = `
      Dear User,

      Thank you for reaching out to us! We’ve received your message and will contact you shortly.

      If you have any additional questions or need further assistance in the meantime, feel free to reply to this email.

      Best regards,
      The AGRA Portal Team 😊🤝 
  `;

  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'sandy152k@gmail.com', 
          pass: 'hara mmrg ihcb cejh' 
      }
  });

  const mailOptions = {
      from: 'sandy152k@gmail.com',
      to: email,
      subject: 'Thank you for contacting us!',
      text: message
  };

  try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: 'Email sent successfully.' });
  } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
});

app.get('/admin/get/:id', async (req, res) => {
  try {
      const project = await Project.findById(req.params.id);
      if (!project) {
          return res.status(404).send({ success: false, message: 'Project not found.' });
      }
      res.status(200).send(project);
  } catch (error) {
      res.status(500).send({ success: false, message: 'Error fetching project.', error });
  }
});

app.put('/admin/edit/:id', async (req, res) => {
  try {
      const projectId = req.params.id;
      const updatedData = {
          candidate: {
              name: req.body.candidateName,
              role: req.body.candidateRole,
          },
          project: {
              title: req.body.projectTitle,
              description: req.body.projectDescription,
          },
          driveLink: req.body.driveLink,
      };

      const updatedProject = await Project.findByIdAndUpdate(projectId, updatedData, { new: true });
      res.status(200).send({ success: true, message: 'Project updated successfully.', project: updatedProject });
  } catch (error) {
      res.status(500).send({ success: false, message: 'Error updating project.', error });
  }
});

app.delete('/admin/delete/:id', async (req, res) => {
  try {
      await Project.findByIdAndDelete(req.params.id);
      res.status(200).send({ message: 'Project deleted successfully' });
  } catch (err) {
      console.error('Error deleting project:', err);
      res.status(500).send({ error: 'Failed to delete project' });
  }
});

// Start the Server
app.listen(port, (error) => {
  if (!error) {
    console.log(`Server Running on Port http://localhost:${port}`);
  } else {
    console.error("Error: ", error);
  }
});

module.exports = app;
