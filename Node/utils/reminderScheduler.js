const cron = require("node-cron");
const db = require("../config/db");
const { getTemplate, replacePlaceholders, sendEmail } = require("./messageService");

function startReminders() {
  const schedules = ["0 9 * * *", "0 18 * * *"]; // 9 AM & 6 PM

  schedules.forEach(schedule => {
    cron.schedule(schedule, () => {
      console.log("Checking seva reminders...");

      const query = `
        SELECT * FROM sevabookings
        WHERE DATE(sevaDate) = DATE_ADD(CURDATE(), INTERVAL 2 DAY)
        AND status = 'active'
      `;

      db.query(query, (err, bookings) => {
        if (err) return console.error(err);

        bookings.forEach(booking => {
          getTemplate("Seva Reminder", (err, template) => {
            if (err) return console.error(err);

            const subject = template.subject || template.title;
            const html = replacePlaceholders(template.body, {
              name: booking.name,
              sevaDate: booking.sevaDate,
              sevaName: booking.sevaName,
            });

            sendEmail(booking.email, subject, html, (err) => {
              if (err) console.error("Reminder email failed:", err);
              else console.log("Reminder sent to:", booking.email);
            });
          });
        });
      });
    });
  });
}

module.exports = { startReminders };
