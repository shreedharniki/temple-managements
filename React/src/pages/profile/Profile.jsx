import "./Profile.css";

import Temple1 from "../../assets/images/temples/1.webp";
import Temple2 from "../../assets/images/temples/2.webp";
import Temple3 from "../../assets/images/temples/3.jpg";
import Temple4 from "../../assets/images/temples/4.webp";

export default function Profile() {
  const templeProfile = {
    name: "Krishna Mandir",
    location: "Bidar, Karnataka",
    description: "Historic Krishna temple with daily prayers and grand celebrations during Janmashtami.",
    established: "1985-06-15",
    phone: "+91 9876543210",
    email: "krishna@temple.com",
    website: "https://krishnamandir.bidar",
    mainDeity: "Lord Krishna",
    otherDeities: ["Radha", "Hanuman", "Ganesh"], 
    timings: "6:00 AM - 8:00 PM",
    festivals: ["Janmashtami", "Diwali", "Holi"],
    trust: "Krishna Trust",
    adminAssigned: "Shreedhar Pawar",
    donationDetails: {
      accountNumber: "1234567890",
      ifsc: "KRIS0001234",
      upi: "krishna@upi",
    },
    images: [
      Temple1,
   Temple2,
   Temple3,
   Temple4,
    ],
    descriptionDetails: {
      architecture: "South Indian style with intricate carvings and gold-plated sanctum.",
      history: "Built in 1985 by Krishna Trust to promote spiritual activities in Bidar.",
      activities: ["Daily Aarti", "Bhajan sessions", "Community service events"],
    },
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">🏛️ {templeProfile.name}</h2>
      <p className="profile-description">{templeProfile.description}</p>

      <div className="profile-grid">
        <div><strong>Location:</strong> {templeProfile.location}</div>
        <div><strong>Established:</strong> {templeProfile.established}</div>
        <div><strong>Phone:</strong> {templeProfile.phone}</div>
        <div><strong>Email:</strong> {templeProfile.email}</div>
        <div><strong>Website:</strong> <a href={templeProfile.website} target="_blank">{templeProfile.website}</a></div>
        <div><strong>Trust:</strong> {templeProfile.trust}</div>
        <div><strong>Admin:</strong> {templeProfile.adminAssigned}</div>
        <div><strong>Timings:</strong> {templeProfile.timings}</div>
        <div><strong>Main Deity:</strong> {templeProfile.mainDeity}</div>
        <div><strong>Other Deities:</strong> {templeProfile.otherDeities.join(", ")}</div>
        <div><strong>Festivals:</strong> {templeProfile.festivals.join(", ")}</div>
        <div><strong>Donation UPI:</strong> {templeProfile.donationDetails.upi}</div>
        <div><strong>Account No:</strong> {templeProfile.donationDetails.accountNumber}</div>
        <div><strong>IFSC:</strong> {templeProfile.donationDetails.ifsc}</div>
      </div>

      <div className="profile-section">
        <h3>🏗️ Architecture & History</h3>
        <p><strong>Architecture:</strong> {templeProfile.descriptionDetails.architecture}</p>
        <p><strong>History:</strong> {templeProfile.descriptionDetails.history}</p>
        <p><strong>Activities:</strong> {templeProfile.descriptionDetails.activities.join(", ")}</p>
      </div>

      <div className="profile-gallery">
        {templeProfile.images.map((img, index) => (
          <img key={index} src={img} alt={`Temple ${index}`} />
        ))}
      </div>
    </div>
  );
}
