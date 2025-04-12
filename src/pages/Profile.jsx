
import Navbar from "../components/Navbar";

function Profile() {
  return (
    <>
      <Navbar showLogout={true} /> {}
      <div className="d-flex flex-column align-items-center vh-100" style={{ background: "linear-gradient(to bottom, #4b0082, #000000)", paddingTop: "50px" }}>
        <h2 style={{ color: "white", marginBottom: "30px" }}>Your Profile</h2>

        <div className="d-flex align-items-center mb-4">
          <img
            src="https://via.placeholder.com/140"
            alt="Profile"
            style={{ width: "140px", height: "140px", borderRadius: "50%", backgroundColor: "white", marginRight: "20px" }}
          />
        </div>

        <div className="card p-5" style={{ width: "100%", maxWidth: "600px", backgroundColor: "#ffffff", borderRadius: "20px" }}>
          <p><strong>Full Name:</strong> ...............</p>
          <p><strong>Email:</strong> ...............</p>
          <p><strong>ID:</strong> ...............</p>
          <p><strong>Role:</strong> ...............</p>
          <p><strong>Major:</strong> ...............</p>
          <p><strong>Gender:</strong> ...............</p>

          <div className="d-flex justify-content-end">
            <button className="btn btn-primary mt-3" style={{ backgroundColor: "#6C4AB6", border: "none", borderRadius: "8px" }}>
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

