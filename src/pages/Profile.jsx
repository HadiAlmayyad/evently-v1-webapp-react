import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import maleImg from "../assets/male.png";
import femaleImg from "../assets/female.png";
import adminImg from "../assets/admin.jpeg";

function Profile() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(storedUser || {});
  const [imagePreview, setImagePreview] = useState(getDefaultImage(storedUser?.role));
  const [defaultImage] = useState(getDefaultImage(storedUser?.role));

  useEffect(() => {
    if (!storedUser) navigate("/login");
  }, [storedUser, navigate]);

  function getDefaultImage(role) {
    switch (role) {
      case "Admin": return adminImg;
      case "Organizer": return femaleImg;
      default: return maleImg;
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = () => setImagePreview(defaultImage);

  const toggleEdit = () => {
    if (editMode) {
      const latest = JSON.parse(localStorage.getItem("user"));
      setUser(latest);
      setImagePreview(getDefaultImage(latest.role));
    }
    setEditMode((prev) => !prev);
  };

  const handleSave = () => {
    const prevEmail = storedUser.email;
    const updatedUser = { ...user };

    if (updatedUser.email !== prevEmail) {
      localStorage.removeItem(`profile_${prevEmail}`);
    }

    localStorage.setItem("user", JSON.stringify(updatedUser));
    localStorage.setItem(`profile_${updatedUser.email}`, JSON.stringify(updatedUser));
    setEditMode(false);
    alert("Profile saved!");
  };

  return (
    <>
      <Navbar showLogout={true} />
      <div
        className="d-flex flex-column align-items-center"
        style={{
          minHeight: "100vh",
          paddingTop: "100px",
          paddingBottom: "40px",
          background: "linear-gradient(to bottom, #4b0082, #000000)",
        }}
      >
        <h2
          style={{
            fontSize: "3rem",
            fontWeight: "800",
            color: "#ffffff",
            textShadow: "0 0 12px rgba(138, 43, 226, 0.8)",
            marginBottom: "40px",
            letterSpacing: "1.5px",
          }}
        >
          Your Profile
        </h2>

        {/* Profile Image */}
        <div className="d-flex align-items-center mb-4">
          <div
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid #9b5de5",
              boxShadow: "0 0 20px rgba(155, 93, 229, 0.7)",
              background: "radial-gradient(circle, #3d1a78 0%, #1f1235 100%)",
            }}
          >
            <img
              src={imagePreview}
              alt="profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>

        {/* Profile Card */}
        <div
          className="p-5 text-white"
          style={{
            width: "100%",
            maxWidth: "650px",
            backgroundColor: "#1f1235",
            borderRadius: "24px",
            boxShadow: "0 6px 14px rgba(0, 0, 0, 0.45)",
            border: "1px solid #2d1e50",
            fontSize: "1.1rem",
          }}
        >
          <div className="mb-3">
            <strong>Full Name:</strong>{" "}
            {editMode ? (
              <input type="text" name="fullName" value={user.fullName} onChange={handleInputChange} className="form-control mt-2" />
            ) : (
              user.fullName
            )}
          </div>

          <div className="mb-3">
            <strong>Email:</strong>{" "}
            {editMode ? (
              <input type="email" name="email" value={user.email} onChange={handleInputChange} className="form-control mt-2" />
            ) : (
              user.email
            )}
          </div>

          {/* Only show for non-admins */}
          {user.role !== "Admin" && (
            <>
              <div className="mb-3">
                <strong>ID:</strong>{" "}
                {editMode ? (
                  <input type="text" name="id" value={user.id} onChange={handleInputChange} className="form-control mt-2" />
                ) : (
                  user.id
                )}
              </div>

              <div className="mb-3">
                <strong>Role:</strong> {user.role}
              </div>

              <div className="mb-3">
                <strong>Major:</strong>{" "}
                {editMode ? (
                  <input type="text" name="major" value={user.major} onChange={handleInputChange} className="form-control mt-2" />
                ) : (
                  user.major
                )}
              </div>

              <div className="mb-3">
                <strong>Gender:</strong>{" "}
                {editMode ? (
                  <input type="text" name="gender" value={user.gender} onChange={handleInputChange} className="form-control mt-2" />
                ) : (
                  user.gender
                )}
              </div>
            </>
          )}

          {/* Upload image */}
          {editMode && (
            <div className="mb-3">
              <label htmlFor="profilePic" className="form-label">Upload Profile Picture</label>
              <input type="file" className="form-control" id="profilePic" accept="image/*" onChange={handleImageChange} />
              <button className="btn btn-sm mt-2 btn-light" onClick={handleResetImage}>
                Reset Image
              </button>
            </div>
          )}

          {/* Buttons */}
          <div className="d-flex justify-content-end gap-2">
            {editMode ? (
              <>
                <button
                  className="btn mt-3"
                  onClick={handleSave}
                  style={{
                    backgroundColor: "#6C4AB6",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    padding: "10px 20px",
                    fontWeight: "bold",
                    boxShadow: "0 0 15px rgba(108, 74, 182, 0.6)",
                  }}
                >
                  Save Changes
                </button>
                <button
                  className="btn mt-3 btn-secondary"
                  onClick={toggleEdit}
                  style={{
                    borderRadius: "10px",
                    padding: "10px 20px",
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className="btn mt-3"
                onClick={toggleEdit}
                style={{
                  backgroundColor: "#6C4AB6",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  boxShadow: "0 0 15px rgba(108, 74, 182, 0.6)",
                }}
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;

