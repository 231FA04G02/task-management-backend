
// const express = require("express");
// const app = express();
// const port = 3000;
// const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config();

// const mongoose = require("mongoose");
// mongoose.connect("mongodb+srv://singhayush5432_db_user:Ayush9122@cluster0.akzwfte.mongodb.net/taskmangement")
// .then(() => console.log("✅ MongoDB connected successfully"))
// .catch(err => console.error("❌ MongoDB connection error:", err));


// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// const { scheduleEmailReminder, rescheduleAllTasks } = require("./emailReminder");
// const { User, SignupUser, adminData } = require("./usermodel");
// console.log({ User, SignupUser, adminData });

// // -------------------- Routes --------------------

// // Test route
// app.get("/", (req, res) => {
//   res.send("Hey, server is running!");
// });

// // -------------------- Signup --------------------
// app.post("/signup", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const newUser = await SignupUser.create({
//       name: username,
//       email,
//       password,
//     });
//     console.log("New signup:", newUser);
//     res.status(201).json(newUser);
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).send("Error during signup.");
//   }
// });

// // -------------------- Login --------------------
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await SignupUser.findOne({ email });

//     if (!user) return res.status(404).send("User not found");
//     if (user.password !== password) return res.status(401).send("Invalid password");

//     res.status(200).json({
//       message: "Login successful!",
//       userId: user._id,
//       taskArray: user.taskArray,
//       name: user.name,
//       email: user.email,
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).send("Error during login.");
//   }
// });

// // -------------------- Add Task --------------------
// app.post("/user/:id", async (req, res) => {
//   const { id } = req.params;
//   const { taskName, category, taskTime } = req.body;

//   try {
//     const user = await SignupUser.findById(id);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     user.taskArray.push({ taskName, category, taskTime });
//     const data = await user.save();
//     console.log("after adding task: "+ data);
//     // Schedule the email reminder
//     scheduleEmailReminder(user, taskName, taskTime);

//     res.status(200).json({ message: "Task added successfully", user });
//   } catch (err) {
//     console.error("Error adding task:", err);
//     res.status(500).json({ error: "Error adding task" });
//   }
// });

// // -------------------- Read Tasks --------------------
// app.post("/read", async (req, res) => {
//   const { userId } = req.body;
//   try {
//     const user = await SignupUser.findById(userId);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     res.status(200).json({ message: "User found", taskArray: user.taskArray });
//   } catch (err) {
//     console.error("Error reading tasks:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // -------------------- Delete Task --------------------
// app.post("/delete", async (req, res) => {
//   console.log("asdas");
//   try {
//     const { userId, taskName } = req.body;
//     const user = await SignupUser.findById(userId);

//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.taskArray.pull({ taskName });
//     await user.save();

//     res.status(200).json({ message: "Task deleted successfully", updatedUser: user });
//   } catch (err) {
//     console.error("Error deleting task:", err);
//     res.status(500).json({ message: "Error deleting task" });
//   }
// });

// // -------------------- Admin Login --------------------
// app.post("/admin", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const admin = await adminData.findOne({ username, password });
//     if (!admin) return res.status(404).json({ message: "Admin not found" });

//     res.status(200).json({ message: "Admin found", data: admin });
//   } catch (err) {
//     console.error("Admin login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // -------------------- Admin Signup --------------------
// app.post("/adminsignup", async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const newAdmin = await adminData.create({ username, email, password });
//     res.status(200).json({ message: "Admin created successfully", data: newAdmin });
//   } catch (err) {
//     console.error("Admin signup error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // -------------------- Admin Assign Task --------------------
// app.post("/admindash/:adminId", async (req, res) => {
//   const { adminId } = req.params;
//   const { taskname, assignTo } = req.body;

//   try {
//     const user = await SignupUser.findOne({ email: assignTo });
//     if (!user) return res.status(404).json({ message: "Assigned user email not found" });

//     const admin = await adminData.findById(adminId);
//     if (!admin) return res.status(404).json({ message: "Admin not found" });

//     admin.taskAssignArray.push({ taskname, Assignto: assignTo });
//     await admin.save();

//     res.status(200).json({ message: `Task assigned to ${assignTo}`, data: admin });
//   } catch (err) {
//     console.error("Error in assigning task:", err);
//     res.status(500).json({ message: "Server error", error: err });
//   }
// });

// // -------------------- Admin Info --------------------
// app.post("/admin-info", async (req, res) => {
//   const { adminId } = req.body;
//   try {
//     const adminInfo = await adminData.findById(adminId);
//     res.status(200).json({ message: "Admin info retrieved", data: adminInfo });
//   } catch (err) {
//     console.error("Error in /admin-info:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // -------------------- User Notifications --------------------
// app.post("/notifications", async (req, res) => {
//   const { email } = req.body;
//   try {
//     const taskDocs = await adminData.find({ "taskAssignArray.Assignto": email });
//     const tasknames = [];

//     taskDocs.forEach((doc) => {
//       doc.taskAssignArray.forEach((task) => {
//         if (task.Assignto === email) {
//           tasknames.push({
//             ...task,
//             assignedBy: doc.username || doc.name || doc.email,
//             taskname: task.taskname,
//           });
//         }
//       });
//     });

//     res.status(200).json({ message: "Tasks Found", data: tasknames });
//   } catch (err) {
//     console.error("Error in /notifications:", err);
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// });

// mongoose.connection.once("open", async () => {
//   console.log("🚀 Server running on port", port);
//   app.listen(port, async () => {
//     await rescheduleAllTasks();
//   });
// });



const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://singhayush5432_db_user:Ayush9122@cluster0.akzwfte.mongodb.net/taskmangement")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { scheduleEmailReminder, rescheduleAllTasks } = require("./emailReminder");
const { User, SignupUser, adminData } = require("./usermodel");

// -------------------- Routes --------------------

// Test route
app.get("/", (req, res) => {
  res.send("✅ Server is running on Vercel!");
});

// -------------------- Signup --------------------
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await SignupUser.create({ name: username, email, password });
    console.log("New signup:", newUser);
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).send("Error during signup.");
  }
});

// -------------------- Login --------------------
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await SignupUser.findOne({ email });

    if (!user) return res.status(404).send("User not found");
    if (user.password !== password) return res.status(401).send("Invalid password");

    res.status(200).json({
      message: "Login successful!",
      userId: user._id,
      taskArray: user.taskArray,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Error during login.");
  }
});

// -------------------- Add Task --------------------
app.post("/user/:id", async (req, res) => {
  const { id } = req.params;
  const { taskName, category, taskTime } = req.body;

  try {
    const user = await SignupUser.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    user.taskArray.push({ taskName, category, taskTime });
    const data = await user.save();

    // Schedule the email reminder via SendGrid
    await scheduleEmailReminder(user, taskName, taskTime);

    res.status(200).json({ message: "Task added successfully", user });
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json({ error: "Error adding task" });
  }
});

// -------------------- Read Tasks --------------------
app.post("/read", async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await SignupUser.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "User found", taskArray: user.taskArray });
  } catch (err) {
    console.error("Error reading tasks:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// -------------------- Delete Task --------------------
app.post("/delete", async (req, res) => {
  try {
    const { userId, taskName } = req.body;
    const user = await SignupUser.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.taskArray.pull({ taskName });
    await user.save();

    res.status(200).json({ message: "Task deleted successfully", updatedUser: user });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ message: "Error deleting task" });
  }
});

// -------------------- Admin Login --------------------
app.post("/admin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await adminData.findOne({ username, password });
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.status(200).json({ message: "Admin found", data: admin });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------- Admin Signup --------------------
app.post("/adminsignup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newAdmin = await adminData.create({ username, email, password });
    res.status(200).json({ message: "Admin created successfully", data: newAdmin });
  } catch (err) {
    console.error("Admin signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------------------- Admin Assign Task --------------------
app.post("/admindash/:adminId", async (req, res) => {
  const { adminId } = req.params;
  const { taskname, assignTo } = req.body;

  try {
    const user = await SignupUser.findOne({ email: assignTo });
    if (!user) return res.status(404).json({ message: "Assigned user email not found" });

    const admin = await adminData.findById(adminId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    admin.taskAssignArray.push({ taskname, Assignto: assignTo });
    await admin.save();

    res.status(200).json({ message: `Task assigned to ${assignTo}`, data: admin });
  } catch (err) {
    console.error("Error in assigning task:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

// -------------------- User Notifications --------------------
app.post("/notifications", async (req, res) => {
  const { email } = req.body;
  try {
    const taskDocs = await adminData.find({ "taskAssignArray.Assignto": email });
    const tasknames = [];

    taskDocs.forEach((doc) => {
      doc.taskAssignArray.forEach((task) => {
        if (task.Assignto === email) {
          tasknames.push({
            ...task,
            assignedBy: doc.username || doc.name || doc.email,
            taskname: task.taskname,
          });
        }
      });
    });

    res.status(200).json({ message: "Tasks Found", data: tasknames });
  } catch (err) {
    console.error("Error in /notifications:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

mongoose.connection.once("open", async () => {
  app.listen(port, async () => {
    console.log(`🚀 Server running on port ${port}`);
    await rescheduleAllTasks();
  });
});



// const express = require("express");
// const app = express();
// const port = 3000;
// const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config();

// const mongoose = require("mongoose");
// mongoose.connect("mongodb+srv://singhayush5432_db_user:Ayush9122@cluster0.akzwfte.mongodb.net/taskmangement")
// .then(() => console.log("✅ MongoDB connected successfully"))
// .catch(err => console.error("❌ MongoDB connection error:", err));


// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// const { scheduleEmailReminder, rescheduleAllTasks } = require("./emailReminder");
// const { User, SignupUser, adminData } = require("./usermodel");
// console.log({ User, SignupUser, adminData });

// // -------------------- Routes --------------------

// // Test route
// app.get("/", (req, res) => {
//   res.send("Hey, server is running!");
// });

// // -------------------- Signup --------------------
// app.post("/signup", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const newUser = await SignupUser.create({
//       name: username,
//       email,
//       password,
//     });
//     console.log("New signup:", newUser);
//     res.status(201).json(newUser);
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).send("Error during signup.");
//   }
// });

// // -------------------- Login --------------------
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await SignupUser.findOne({ email });

//     if (!user) return res.status(404).send("User not found");
//     if (user.password !== password) return res.status(401).send("Invalid password");

//     res.status(200).json({
//       message: "Login successful!",
//       userId: user._id,
//       taskArray: user.taskArray,
//       name: user.name,
//       email: user.email,
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).send("Error during login.");
//   }
// });

// // -------------------- Add Task --------------------
// app.post("/user/:id", async (req, res) => {
//   const { id } = req.params;
//   const { taskName, category, taskTime } = req.body;

//   try {
//     const user = await SignupUser.findById(id);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     user.taskArray.push({ taskName, category, taskTime });
//     const data = await user.save();
//     console.log("after adding task: "+ data);
//     // Schedule the email reminder
//     scheduleEmailReminder(user, taskName, taskTime);

//     res.status(200).json({ message: "Task added successfully", user });
//   } catch (err) {
//     console.error("Error adding task:", err);
//     res.status(500).json({ error: "Error adding task" });
//   }
// });

// // -------------------- Read Tasks --------------------
// app.post("/read", async (req, res) => {
//   const { userId } = req.body;
//   try {
//     const user = await SignupUser.findById(userId);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     res.status(200).json({ message: "User found", taskArray: user.taskArray });
//   } catch (err) {
//     console.error("Error reading tasks:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // -------------------- Delete Task --------------------
// app.post("/delete", async (req, res) => {
//   console.log("asdas");
//   try {
//     const { userId, taskName } = req.body;
//     const user = await SignupUser.findById(userId);

//     if (!user) return res.status(404).json({ message: "User not found" });

//     user.taskArray.pull({ taskName });
//     await user.save();

//     res.status(200).json({ message: "Task deleted successfully", updatedUser: user });
//   } catch (err) {
//     console.error("Error deleting task:", err);
//     res.status(500).json({ message: "Error deleting task" });
//   }
// });

// // -------------------- Admin Login --------------------
// app.post("/admin", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const admin = await adminData.findOne({ username, password });
//     if (!admin) return res.status(404).json({ message: "Admin not found" });

//     res.status(200).json({ message: "Admin found", data: admin });
//   } catch (err) {
//     console.error("Admin login error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // -------------------- Admin Signup --------------------
// app.post("/adminsignup", async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const newAdmin = await adminData.create({ username, email, password });
//     res.status(200).json({ message: "Admin created successfully", data: newAdmin });
//   } catch (err) {
//     console.error("Admin signup error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // -------------------- Admin Assign Task --------------------
// app.post("/admindash/:adminId", async (req, res) => {
//   const { adminId } = req.params;
//   const { taskname, assignTo } = req.body;

//   try {
//     const user = await SignupUser.findOne({ email: assignTo });
//     if (!user) return res.status(404).json({ message: "Assigned user email not found" });

//     const admin = await adminData.findById(adminId);
//     if (!admin) return res.status(404).json({ message: "Admin not found" });

//     admin.taskAssignArray.push({ taskname, Assignto: assignTo });
//     await admin.save();

//     res.status(200).json({ message: `Task assigned to ${assignTo}`, data: admin });
//   } catch (err) {
//     console.error("Error in assigning task:", err);
//     res.status(500).json({ message: "Server error", error: err });
//   }
// });

// // -------------------- Admin Info --------------------
// app.post("/admin-info", async (req, res) => {
//   const { adminId } = req.body;
//   try {
//     const adminInfo = await adminData.findById(adminId);
//     res.status(200).json({ message: "Admin info retrieved", data: adminInfo });
//   } catch (err) {
//     console.error("Error in /admin-info:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// });

// // -------------------- User Notifications --------------------
// app.post("/notifications", async (req, res) => {
//   const { email } = req.body;
//   try {
//     const taskDocs = await adminData.find({ "taskAssignArray.Assignto": email });
//     const tasknames = [];

//     taskDocs.forEach((doc) => {
//       doc.taskAssignArray.forEach((task) => {
//         if (task.Assignto === email) {
//           tasknames.push({
//             ...task,
//             assignedBy: doc.username || doc.name || doc.email,
//             taskname: task.taskname,
//           });
//         }
//       });
//     });

//     res.status(200).json({ message: "Tasks Found", data: tasknames });
//   } catch (err) {
//     console.error("Error in /notifications:", err);
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// });

// mongoose.connection.once("open", async () => {
//   console.log("🚀 Server running on port", port);
//   app.listen(port, async () => {
//     await rescheduleAllTasks();
//   });
// });
