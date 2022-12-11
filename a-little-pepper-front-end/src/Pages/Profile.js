import axios from "axios";
import { UserAuth } from "../Context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row } from "react-bootstrap";
import CalorieTracker from "../Components/CalorieTracker";
import RecipeCard from "../Components/RecipeCard";
import CalorieModal from "../Components/CalorieModal";

export default function Profile() {
  const navigate = useNavigate();
  const { user, logOut } = UserAuth();
  const [profile, setProfile] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const API = process.env.REACT_APP_API_URL;
  const [create, setCreate] = useState(false);
  const [show, setShow] = useState(false);
  const [totCal, setTotCal] = useState(2000);
  const [totFat, setTotFat] = useState(55.56);
  const [totCarb, setTotCarb] = useState(250);
  const [totProtein, setTotProtein] = useState(125);

  useEffect(() => {
    if (!profile.id) {
      axios.get(`${API}/profiles/${user.uid}`).then((response) => {
        setProfile(response.data);
        setSavedRecipes(response.data.recipes);
      });
    }
  }, [create, user, show]);

  const handleShow = () => setShow(true);

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  const createProfile = () => {
    axios
      .post(`${API}/profiles`, {
        uid: user.uid,
        name: user.displayName,
        cal: 0,
        fat: 0,
        carb: 0,
        protein: 0,
        recipes: [],
      })
      .then(() => {
        setCreate(!create);
        console.log("post sent");
      });
  };

  return (
    <div className="my-5" style={{ color: "black" }}>
      {profile.id ? (
        <>
          <article className="mb-5">
            <CalorieTracker profile={profile} totCal={totCal} setTotCal={setTotCal} totFat={totFat} setTotFat={setTotFat} totCarb={totCarb} setTotCarb={setTotCarb} totProtein={totProtein} setTotProtein={setTotProtein} />
          </article>
          <CalorieModal show={show} setShow={setShow} profile={profile}/>
          <Button variant="primary" onClick={handleShow}>
        Add To Tracker
      </Button>
          <h2 style={{ color: "#FB8F00" }}>Tracked Nutrition</h2>
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Card
                className="my-3"
                style={{ width: "350px", alignItems: "center" }}
              >
                <Card.Title className="mt-4">{user.displayName}</Card.Title>
                <Card.Body>
                  <Card.Text>Calories: {profile.cal}kcal / {totCal}kcal</Card.Text>
                  <Card.Text>Fat: {profile.fat}g / {totFat}g</Card.Text>
                  <Card.Text>Carbs: {profile.carb}g / {totCarb}g</Card.Text>
                  <Card.Text>Protein: {profile.protein}g / {totProtein}g</Card.Text>
                </Card.Body>
                <Card.Footer>
                  Note: These are reccomended values for an average person.
                  Values may differ based on weight, height, and/or lifestyle.{" "}
                </Card.Footer>
              </Card>
            </div>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{ gap: ".5rem" }}
            >
              <Button variant="danger" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
            {profile.recipes.length > 0 ? (
              <section className="my-5 mx-5">
                <h2>Bookmarked Recipes</h2>
                <Row xs={1} md={2} lg={3} className="g-5 py-5">
                  {savedRecipes.map((recipe) => {
                    return (
                      <>
                        <RecipeCard recipe={recipe} />
                      </>
                    );
                  })}
                </Row>
              </section>
            ) : (
              <></>
            )}
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
