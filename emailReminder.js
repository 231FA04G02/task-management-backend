// emailReminder.js
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendInstantEmail(user, taskName) {
  try {
    const msg = {
      to: user.email,
      from: "singhayush5432@gmail.com", // 👈 must be verified in SendGrid
      subject: "New Task Added Successfully ✅",
      text: `Hello ${user.name}, your new task "${taskName}" has been added successfully!`,
      html: `<h2>Hello ${user.name},</h2>
             <p>Your new task <b>${taskName}</b> has been added successfully!</p>
             <p>Best regards,<br>Task Management System</p>`,
    };

    await sgMail.send(msg);
    console.log(`📧 Instant email sent to ${user.email} for task: ${taskName}`);
  } catch (error) {
    console.error("❌ Error sending instant email:", error);
  }
}

module.exports = { sendInstantEmail };



// // backend/emailReminder.js
// const sgMail = require("@sendgrid/mail");
// const dotenv = require("dotenv");
// const { SignupUser } = require("./usermodel");
// dotenv.config();

// // ✅ Configure SendGrid
// if (process.env.SENDGRID_API_KEY) {
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// } else {
//   console.error("❌ SENDGRID_API_KEY not set in .env file");
// }

// const LEAD_MIN = Number(process.env.REMINDER_LEAD_MINUTES) || 10;

// /**
//  * Schedule a reminder email for a user's task using SendGrid's sendAt
//  */
// async function scheduleEmailReminder(user, taskName, taskTime) {
//   try {
//     const taskDate = new Date(taskTime);
//     if (isNaN(taskDate)) {
//       console.warn("⚠️ Invalid taskTime for:", taskName);
//       return;
//     }

//     await sendEmail(user, taskName, taskDate);
//     console.log(`📅 Reminder scheduled via SendGrid for ${user.email} at ${taskDate.toLocaleString()}`);
//   } catch (err) {
//     console.error("Error scheduling reminder:", err.message);
//   }
// }

// /**
//  * Send (or schedule) reminder email via SendGrid
//  */
// async function sendEmail(user, taskName, taskTime) {
//   if (!process.env.SENDGRID_API_KEY) {
//     console.error("❌ Missing SENDGRID_API_KEY");
//     return;
//   }

//   const sendAtUnix = Math.floor(new Date(taskTime).getTime() / 1000) - (LEAD_MIN * 60);
//   const formatted = new Date(taskTime).toLocaleString();

//   const msg = {
//     to: user.email,
//     from: process.env.SENDGRID_FROM,
//     subject: `⏰ Reminder: ${taskName} is due soon`,
//     text: `Hey ${user.name}, your task "${taskName}" is due at ${formatted}.`,
//     html: `<p>Hey <b>${user.name}</b>,</p>
//            <p>Your task <b>"${taskName}"</b> is due at <b>${formatted}</b>.</p>
//            <p>Finish it on time! — TaskFlow</p>`,
//     sendAt: sendAtUnix, // ⏰ Schedule email sending via SendGrid
//   };

//   try {
//     await sgMail.send(msg);
//     console.log(`✅ Scheduled email to ${user.email} for ${new Date(sendAtUnix * 1000).toLocaleString()}`);
//   } catch (err) {
//     console.error("❌ SendGrid email schedule error:", err.message);
//   }
// }

// /**
//  * Re-schedule all tasks (optional for startup)
//  */
// async function rescheduleAllTasks() {
//   try {
//     const users = await SignupUser.find({});
//     let count = 0;

//     for (const user of users) {
//       for (const task of user.taskArray || []) {
//         if (task.taskName && task.taskTime) {
//           await scheduleEmailReminder(user, task.taskName, task.taskTime);
//           count++;
//         }
//       }
//     }

//     console.log(`🔁 Rescheduled ${count} reminders via SendGrid.`);
//   } catch (err) {
//     console.error("rescheduleAllTasks error:", err.message);
//   }
// }

// module.exports = { scheduleEmailReminder, rescheduleAllTasks };



// // // backend/emailReminder.js
// // const sgMail = require("@sendgrid/mail");
// // const dotenv = require("dotenv");
// // const { SignupUser } = require("./usermodel");
// // dotenv.config();

// // // ✅ Configure SendGrid
// // if (process.env.SENDGRID_API_KEY) {
// //   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// // } else {
// //   console.error("❌ SENDGRID_API_KEY not set in .env file");
// // }

// // const LEAD_MIN = Number(process.env.REMINDER_LEAD_MINUTES) || 10;

// // /**
// //  * Schedule a reminder email for a user's task using SendGrid's sendAt
// //  */
// // async function scheduleEmailReminder(user, taskName, taskTime) {
// //   try {
// //     const taskDate = new Date(taskTime);
// //     if (isNaN(taskDate)) {
// //       console.warn("⚠️ Invalid taskTime for:", taskName);
// //       return;
// //     }

// //     await sendEmail(user, taskName, taskDate);
// //     console.log(`📅 Reminder scheduled via SendGrid for ${user.email} at ${taskDate.toLocaleString()}`);
// //   } catch (err) {
// //     console.error("Error scheduling reminder:", err.message);
// //   }
// // }

// // /**
// //  * Send (or schedule) reminder email via SendGrid
// //  */
// // async function sendEmail(user, taskName, taskTime) {
// //   if (!process.env.SENDGRID_API_KEY) {
// //     console.error("❌ Missing SENDGRID_API_KEY");
// //     return;
// //   }

// //   const sendAtUnix = Math.floor(new Date(taskTime).getTime() / 1000) - (LEAD_MIN * 60);
// //   const formatted = new Date(taskTime).toLocaleString();

// //   const msg = {
// //     to: user.email,
// //     from: process.env.SENDGRID_FROM,
// //     subject: `⏰ Reminder: ${taskName} is due soon`,
// //     text: `Hey ${user.name}, your task "${taskName}" is due at ${formatted}.`,
// //     html: `<p>Hey <b>${user.name}</b>,</p>
// //            <p>Your task <b>"${taskName}"</b> is due at <b>${formatted}</b>.</p>
// //            <p>Finish it on time! — TaskFlow</p>`,
// //     sendAt: sendAtUnix, // ⏰ Schedule email sending via SendGrid
// //   };

// //   try {
// //     await sgMail.send(msg);
// //     console.log(`✅ Scheduled email to ${user.email} for ${new Date(sendAtUnix * 1000).toLocaleString()}`);
// //   } catch (err) {
// //     console.error("❌ SendGrid email schedule error:", err.message);
// //   }
// // }

// // /**
// //  * Re-schedule all tasks (optional for startup)
// //  */
// // async function rescheduleAllTasks() {
// //   try {
// //     const users = await SignupUser.find({});
// //     let count = 0;

// //     for (const user of users) {
// //       for (const task of user.taskArray || []) {
// //         if (task.taskName && task.taskTime) {
// //           await scheduleEmailReminder(user, task.taskName, task.taskTime);
// //           count++;
// //         }
// //       }
// //     }

// //     console.log(`🔁 Rescheduled ${count} reminders via SendGrid.`);
// //   } catch (err) {
// //     console.error("rescheduleAllTasks error:", err.message);
// //   }
// // }

// // module.exports = { scheduleEmailReminder, rescheduleAllTasks };
// // // backend/emailReminder.js
// // const sgMail = require("@sendgrid/mail");
// // const dotenv = require("dotenv");
// // const { SignupUser } = require("./usermodel");
// // dotenv.config();

// // // ✅ Configure SendGrid
// // if (process.env.SENDGRID_API_KEY) {
// //   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// // } else {
// //   console.error("❌ SENDGRID_API_KEY not set in .env file");
// // }

// // const LEAD_MIN = Number(process.env.REMINDER_LEAD_MINUTES) || 10;

// // /**
// //  * Schedule a reminder email for a user's task using SendGrid's sendAt
// //  */
// // async function scheduleEmailReminder(user, taskName, taskTime) {
// //   try {
// //     const taskDate = new Date(taskTime);
// //     if (isNaN(taskDate)) {
// //       console.warn("⚠️ Invalid taskTime for:", taskName);
// //       return;
// //     }

// //     await sendEmail(user, taskName, taskDate);
// //     console.log(`📅 Reminder scheduled via SendGrid for ${user.email} at ${taskDate.toLocaleString()}`);
// //   } catch (err) {
// //     console.error("Error scheduling reminder:", err.message);
// //   }
// // }

// // /**
// //  * Send (or schedule) reminder email via SendGrid
// //  */
// // async function sendEmail(user, taskName, taskTime) {
// //   if (!process.env.SENDGRID_API_KEY) {
// //     console.error("❌ Missing SENDGRID_API_KEY");
// //     return;
// //   }

// //   const sendAtUnix = Math.floor(new Date(taskTime).getTime() / 1000) - (LEAD_MIN * 60);
// //   const formatted = new Date(taskTime).toLocaleString();

// //   const msg = {
// //     to: user.email,
// //     from: process.env.SENDGRID_FROM,
// //     subject: `⏰ Reminder: ${taskName} is due soon`,
// //     text: `Hey ${user.name}, your task "${taskName}" is due at ${formatted}.`,
// //     html: `<p>Hey <b>${user.name}</b>,</p>
// //            <p>Your task <b>"${taskName}"</b> is due at <b>${formatted}</b>.</p>
// //            <p>Finish it on time! — TaskFlow</p>`,
// //     sendAt: sendAtUnix, // ⏰ Schedule email sending via SendGrid
// //   };

// //   try {
// //     await sgMail.send(msg);
// //     console.log(`✅ Scheduled email to ${user.email} for ${new Date(sendAtUnix * 1000).toLocaleString()}`);
// //   } catch (err) {
// //     console.error("❌ SendGrid email schedule error:", err.message);
// //   }
// // }

// // /**
// //  * Re-schedule all tasks (optional for startup)
// //  */
// // async function rescheduleAllTasks() {
// //   try {
// //     const users = await SignupUser.find({});
// //     let count = 0;

// //     for (const user of users) {
// //       for (const task of user.taskArray || []) {
// //         if (task.taskName && task.taskTime) {
// //           await scheduleEmailReminder(user, task.taskName, task.taskTime);
// //           count++;
// //         }
// //       }
// //     }

// //     console.log(`🔁 Rescheduled ${count} reminders via SendGrid.`);
// //   } catch (err) {
// //     console.error("rescheduleAllTasks error:", err.message);
// //   }
// // }

// // module.exports = { scheduleEmailReminder, rescheduleAllTasks };



// // // // backend/emailReminder.js
// // // const schedule = require("node-schedule");
// // // const sgMail = require("@sendgrid/mail");
// // // const dotenv = require("dotenv");
// // // const { SignupUser } = require("./usermodel");
// // // dotenv.config();

// // // // ✅ Configure SendGrid
// // // if (process.env.SENDGRID_API_KEY) {
// // //   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// // // } else {
// // //   console.error("❌ SENDGRID_API_KEY not set in .env file");
// // // }

// // // const LEAD_MIN = Number(process.env.REMINDER_LEAD_MINUTES) || 10;
// // // const jobs = new Map(); // store active scheduled jobs

// // // /**
// // //  * Schedule a reminder email for a user's task
// // //  */
// // // async function scheduleEmailReminder(user, taskName, taskTime) {
// // //   try {
// // //     const taskDate = new Date(taskTime);
// // //     if (isNaN(taskDate)) {
// // //       console.warn("Invalid taskTime for:", taskName);
// // //       return;
// // //     }

// // //     const reminderTime = new Date(taskDate.getTime() - LEAD_MIN * 60 * 1000);
// // //     if (reminderTime <= new Date()) {
// // //       // console.log(`⏩ Skipping/ past task: "${taskName}"`);
// // //       return;
// // //     }

// // //     const key = `${user._id}-${taskName}-${taskDate.getTime()}`;
// // //     if (jobs.has(key)) jobs.get(key).cancel();

// // //     const job = schedule.scheduleJob(reminderTime, async () => {
// // //       console.log(`⏰ Sending reminder to ${user.email} — ${taskName}`);
// // //       await sendEmail(user, taskName, taskDate);
// // //       jobs.delete(key);
// // //     });

// // //     jobs.set(key, job);
// // //     console.log(`📅 Reminder set for ${user.email}: "${taskName}" at ${reminderTime.toLocaleString()}`);
// // //   } catch (err) {
// // //     console.error("Error scheduling reminder:", err.message);
// // //   }
// // // }

// // // /**
// // //  * Send reminder email via SendGrid
// // //  */
// // // async function sendEmail(user, taskName, taskTime) {
// // //   if (!process.env.SENDGRID_API_KEY) return;
// // //   const formatted = taskTime.toLocaleString();
// // //   const msg = {
// // //     to: user.email,
// // //     from: process.env.SENDGRID_FROM,
// // //     subject: `⏰ Reminder: ${taskName} is due soon`,
// // //     text: `Hey ${user.name}, your task "${taskName}" is due at ${formatted}.`,
// // //     html: `<p>Hey <b>${user.name}</b>,</p>
// // //            <p>Your task <b>"${taskName}"</b> is due at <b>${formatted}</b>.</p>
// // //            <p>Finish it on time! — TaskFlow</p>`
// // //   };
// // //   try {
// // //     await sgMail.send(msg);
// // //     console.log(`✅ Email sent to ${user.email}`);
// // //   } catch (err) {
// // //     console.error("❌ Email send error:", err.message);
// // //   }
// // // }

// // // /**
// // //  * Reschedule all reminders on server start
// // //  */
// // // async function rescheduleAllTasks() {
// // //   try {
// // //     // console.log("⏳ Rescheduling all reminders...");
// // //     const users = await SignupUser.find({});
// // //     let count = 0;

// // //     for (const user of users) {
// // //       for (const task of user.taskArray || []) {
// // //         if (task.taskName && task.taskTime) {
// // //           await scheduleEmailReminder(user, task.taskName, task.taskTime);
// // //           count++;
// // //         }
// // //       }
// // //     }

// // //     // console.log(`🔁 Rescheduled ${count} reminders.`);
// // //   } catch (err) {
// // //     console.error("rescheduleAllTasks error:", err.message);
// // //   }
// // // }

// // // module.exports = { scheduleEmailReminder, rescheduleAllTasks };
