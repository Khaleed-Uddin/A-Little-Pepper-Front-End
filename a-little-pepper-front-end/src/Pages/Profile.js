import axios from "axios";
import { UserAuth } from "../Context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row } from "react-bootstrap";
import CalorieTracker from "../Components/CalorieTracker";
import RecipeCard from "../Components/RecipeCard";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logOut } = UserAuth();
  const [profile, setProfile] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const API = process.env.REACT_APP_API_URL;
  const [create, setCreate] = useState(false)

  useEffect(() => {
    axios.get(`${API}/profiles/${user.uid}`).then((response) => {
      setProfile(response.data);
      setSavedRecipes(response.data.recipes);
    });
  }, [create]);

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  const createProfile = () => {
    axios.post(`${API}/profiles`, {"uid": user.uid,
    "name": user.displayName,
    "cal": 0,
    "fat": 0,
    "carb": 0,
    "protein": 0,
    "recipes": []})
    .then(() => {
      setCreate(!create)
      console.log("post sent")
    })
  }

  return (
    <div className="my-5" style={{ color: "black" }}>
      {profile.id ? (
        <>
          <article className="mb-5">
            <CalorieTracker />
          </article>
          <div>
            <Card style={{ backgroundColor: "orange", alignItems: "center" }}>
              <Card.Img
                variant="top"
                // src={profile.picture}
                // style={{ width: "300px" ,borderRadius: "50%"}}
              />
              <Card.Body>
                {/* <h1>lol</h1> */}
                <Card.Title>{user.displayName}</Card.Title>
                <Card.Text>Calories: {profile.cal}</Card.Text>
                <Card.Text>Fat: {profile.fat}</Card.Text>
                <Card.Text>Carbs: {profile.carb}</Card.Text>
                <Card.Text>Protein: {profile.protein}</Card.Text>
              </Card.Body>
            </Card>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ gap: ".5rem" }}
            >
              <Button variant="light" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
            <section className="my-5">
              <h2>Bookmarked Recipes</h2>
              {/* <Row xs={1} md={2} lg={3} className="g-5 py-5">
            {savedRecipes.map((recipe) => {
              return (
                <>
                  <RecipeCard recipe={recipe} />
                </>
              );
            })}
          </Row> */}
            </section>
          </div>
        </>
      ) : (
        <Button onClick={createProfile} className="mb-5" variant="primary">
          Create Profile
        </Button>
      )}
    </div>
  );
}












