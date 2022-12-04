import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Col, Card } from "react-bootstrap"
import { UserAuth } from "../Context/AuthContext";
import axios from "axios";


const ACCESS_POINT = process.env.REACT_APP_ACCESS_POINT;
const API_KEY = process.env.REACT_APP_API_KEY;

export default function RecipeDetails() {
  const [nutrition, setNutrition] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [directions, setDirections] = useState('');
  const [prices, setPrices] = useState([])

  let { id } = useParams();
  const { user } = UserAuth();
  const [profile, setProfile] = useState({
    uid: "",
    cal: "",
    fat: "",
    carb: "",
    protein: "",
    recipes: [],
  })

  const handleBookmark = () => {
    setProfile({ ["uid"]: user.uid, ["cal"]: 100, ["fat"]: 10, ["carb"]: 5, ["protein"]: 10 })
  };

  const handleTrack = () => {
    setProfile({ ["uid"]: user.uid, ["cal"]: 100, ["fat"]: 10, ["carb"]: 5, ["protein"]: 10 })
    console.log(profile)
  };
  useEffect(() => {

    axios
      .get(
        `${ACCESS_POINT}/${id}/nutritionWidget.json?apiKey=${API_KEY}`
      )
      .then((res) => setNutrition(res.data))
      .catch((error) => console.error(error));

    axios
      .get(
        `${ACCESS_POINT}/${id}/ingredientWidget.json?apiKey=${API_KEY}`
      )
      .then((res) => setIngredients(res.data))
      .catch((error) => console.error(error));

    axios
      .get(
        `${ACCESS_POINT}/${id}/analyzedInstructions?apiKey=${API_KEY}`
      )
      .then((res) => {
        setInstructions(res.data)
        setDirections(res.data[0].steps[0].step)
      })
      .catch((error) => console.error(error));

    axios
      .get(
        `${ACCESS_POINT}/${id}/priceBreakdownWidget.json?apiKey=${API_KEY}`
      )
      .then((res) => setPrices(res.data.ingredients))
      .catch((error) => console.error(error));

  }, []);

  let ingredient = ingredients.ingredients;
  let price = prices;

  let priceSum = 0;
  let priceArr = price.map((item) => Number(item.price))
  priceArr.forEach(amount => {
    priceSum += amount;
    return priceSum;
  })

  

  return (
    <article className="RecipeDetails">
      <h6>Recipe ID:{id}</h6>
      <br></br>
      <h1>Nutritional Information</h1>
      <br></br>
      <br></br>
      <span>
        <h3>Calories: {nutrition.calories}al</h3>
        <h6>*Note: kal is a unit of energy. To ease calculations, energy is expressed in 1000-calorie units known as kilocalories. That is, 1 Calorie is equivalent to 1 kilocalorie; the capital C in Calories denotes kcal on food labels, calories and kilocalories are used interchangeably to mean the same thing. For example: 1kal is equivalent to 1 calorie.</h6>
        <h3>Fat: {nutrition.fat}</h3>
        <h3>Carbohydrates: {nutrition.carbs}</h3>
        <h3>Protein: {nutrition.protein}</h3>
      </span>
      <br></br>
      <br></br>
      <h1>Ingredients</h1>
      <article>
        {ingredient && ingredient.map(item => {
          return (
            <Card bg="warning" variant="light" style={{ alignItems: "center" }}>
              <Card.Title>{item.amount.us.value} {item.amount.us.unit}  of {item.name} </Card.Title>
            </Card>
          )
        })}
      </article>
      <br></br>
      <br></br>
      <h1>Ingredients Price Breakdown</h1>
      <article>
        {price && price.map(item => {
          return (
            <Card bg="warning" variant="light" style={{ alignItems: "center" }}>
              <Card.Title>{item.name} : ${Math.round(10 * item.price) / 100} </Card.Title>
            </Card>
          )
        })}

        <h3>Total Price: ${priceSum / 10}</h3>
      </article>
      <br></br>
      <br></br>
      <h1>Instructions</h1>
      <article>
        <Card bg="warning" variant="light" style={{ alignItems: "center" }}>
          <Card.Title>{directions}</Card.Title>
        </Card>
      </article>
      <br></br>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ gap: ".5rem" }}
      >
        <Button variant="light" onClick={handleTrack}>
          Track
        </Button>
        <Button variant="light" onClick={handleBookmark}>
          Bookmark
        </Button>
      </div>
    </article>
  );
}