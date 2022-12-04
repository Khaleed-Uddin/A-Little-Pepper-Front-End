import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import ProgressBar from "./ProgressBar";
import { Form, Row } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function CalorieTracker() {
  const [recipes, setRecipes] = useState([]);
  const [totCal, setTotCal] = useState(2000);

  let calSum = 0;
  let calArr = recipes.map((recipe) => Number(recipe.cal));
  calArr.forEach((amount) => {
    calSum += amount;
    return calSum;
  });

  const calorieBar = [
    { bgcolor: "#6a1b9a", completed: Math.round((calSum / totCal) * 100) },
  ];

  return (
    <div>
      {/* <form>
        {calorieBar.map((item, idx) => (
          <ProgressBar
            key={idx}
            bgcolor={item.bgcolor}
            completed={item.completed}
          />
        ))}
      </form> */}

      <div>
        <h2>Tracker</h2>
        <Row className="justify-content-center g-2">
          <ProgressBar
            style={{ width: "51%" }}
            striped
            animated
            variant="success"
            now={1000/2000 * 100}
            label={`Calories`}
          />

          <ProgressBar
            style={{ width: "51%" }}
            striped
            animated
            variant="info"
            now={20}
            label={`Fat`}
          />
          <ProgressBar
            style={{ width: "51%" }}
            striped
            animated
            variant="warning"
            now={60}
            label={`Carbs`}
          />
          <ProgressBar
            style={{ width: "51%" }}
            striped
            animated
            variant="danger"
            now={80}
            label={`Protein`}
          />
        </Row>
      </div>
    </div>
  );
}
