import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import Plane from "./components/Plane";
import Pyramid from "./components/Pyramid";
import Spinner from "./components/Spinner";
import axios from "axios";

import "./styles.css";
import { Row, Col, Card, Button, Radio, Checkbox } from "antd";
import { StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons";
import Piece from "./components/Piece";
import Mapping from "./mapping.json";
import PiecePlacement from "./piecePlacements.json";
import { Alert } from "reactstrap";
import { filter } from "lodash";

const Polysphere = () => {
  const initialPyramid = [
    {
      symbol: "A",
      color: "#808080",
      coordinates: [
        {
          x: 1,
          y: 0,
          z: 1,
        },
        {
          x: 1,
          y: 0,
          z: 2,
        },
        {
          x: 2,
          y: 1,
          z: 3,
        },
        {
          x: 3,
          y: 2,
          z: 4,
        },
      ],
      indices: [],
    },
    {
      symbol: "B",
      color: "#808080",
      coordinates: [
        {
          x: 2,
          y: 2,
          z: 3,
        },
        {
          x: 2,
          y: 3,
          z: 3,
        },
        {
          x: 3,
          y: 1,
          z: 3,
        },
        {
          x: 3,
          y: 2,
          z: 3,
        },
        {
          x: 3,
          y: 3,
          z: 3,
        },
      ],
      indices: [],
    },
    {
      symbol: "C",
      color: "#808080",
      coordinates: [
        {
          x: 3,
          y: 0,
          z: 4,
        },
        {
          x: 4,
          y: 0,
          z: 4,
        },
        {
          x: 4,
          y: 1,
          z: 4,
        },
        {
          x: 4,
          y: 2,
          z: 4,
        },
        {
          x: 4,
          y: 3,
          z: 4,
        },
      ],
      indices: [],
    },
    {
      symbol: "D",
      color: "#808080",
      coordinates: [
        {
          x: 0,
          y: 0,
          z: 3,
        },
        {
          x: 1,
          y: 0,
          z: 3,
        },
        {
          x: 1,
          y: 1,
          z: 3,
        },
        {
          x: 2,
          y: 0,
          z: 3,
        },
        {
          x: 3,
          y: 0,
          z: 3,
        },
      ],
      indices: [],
    },
    {
      symbol: "E",
      color: "#808080",
      coordinates: [
        {
          x: 0,
          y: 0,
          z: 4,
        },
        {
          x: 1,
          y: 0,
          z: 4,
        },
        {
          x: 2,
          y: 0,
          z: 4,
        },
        {
          x: 2,
          y: 1,
          z: 4,
        },
        {
          x: 3,
          y: 1,
          z: 4,
        },
      ],
      indices: [],
    },
    {
      symbol: "F",
      color: "#808080",
      coordinates: [
        {
          x: 3,
          y: 3,
          z: 4,
        },
        {
          x: 3,
          y: 4,
          z: 4,
        },
        {
          x: 4,
          y: 4,
          z: 4,
        },
      ],
      indices: [],
    },
    {
      symbol: "G",
      color: "#808080",
      coordinates: [
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: 0,
          y: 0,
          z: 1,
        },
        {
          x: 1,
          y: 1,
          z: 1,
        },
        {
          x: 0,
          y: 0,
          z: 2,
        },
        {
          x: 2,
          y: 2,
          z: 2,
        },
      ],
      indices: [],
    },
    {
      symbol: "H",
      color: "#808080",
      coordinates: [
        {
          x: 0,
          y: 2,
          z: 2,
        },
        {
          x: 1,
          y: 1,
          z: 2,
        },
        {
          x: 1,
          y: 2,
          z: 2,
        },
        {
          x: 2,
          y: 0,
          z: 2,
        },
        {
          x: 2,
          y: 1,
          z: 2,
        },
      ],
      indices: [],
    },
    {
      symbol: "I",
      color: "#808080",
      coordinates: [
        {
          x: 0,
          y: 3,
          z: 4,
        },
        {
          x: 0,
          y: 4,
          z: 4,
        },
        {
          x: 1,
          y: 4,
          z: 4,
        },
        {
          x: 2,
          y: 3,
          z: 4,
        },
        {
          x: 2,
          y: 4,
          z: 4,
        },
      ],
      indices: [],
    },
    {
      symbol: "J",
      color: "#808080",
      coordinates: [
        {
          x: 0,
          y: 1,
          z: 1,
        },
        {
          x: 0,
          y: 1,
          z: 2,
        },
        {
          x: 0,
          y: 1,
          z: 3,
        },
        {
          x: 0,
          y: 1,
          z: 4,
        },
      ],
      indices: [],
    },
    {
      symbol: "K",
      color: "#808080",
      coordinates: [
        {
          x: 0,
          y: 2,
          z: 3,
        },
        {
          x: 0,
          y: 3,
          z: 3,
        },
        {
          x: 1,
          y: 2,
          z: 3,
        },
        {
          x: 1,
          y: 3,
          z: 3,
        },
      ],
      indices: [],
    },
    {
      symbol: "L",
      color: "#808080",
      coordinates: [
        {
          x: 0,
          y: 2,
          z: 4,
        },
        {
          x: 1,
          y: 1,
          z: 4,
        },
        {
          x: 1,
          y: 2,
          z: 4,
        },
        {
          x: 1,
          y: 3,
          z: 4,
        },
        {
          x: 2,
          y: 2,
          z: 4,
        },
      ],
      indices: [],
    },
  ];

  const [count, setCount] = useState(0);
  const [steps, setSteps] = useState(0);
  const [totalSolutions, setTotalSolutions] = useState(0);
  const [solutions, setSolutions] = useState([]);
  const [currentSolution, setCurrentSolution] = useState(initialPyramid);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [level, setLevel] = useState(5);

  const [piecesCounter, setPiecesCounter] = useState(0);
  const [piecesArray, setPiecesArray] = useState(PiecePlacement);

  const [initialPieces, setInitialPieces] = useState([]);

  // Rules
  const [limitFromLevel1, setLimitFromLevel1] = useState(false);
  const [limitBorders, setLimitBorders] = useState(false);

  const handleNext = () => {
    setPiecesCounter(0);
    setError(false);

    if (count <= 10) setCount(count + 1);

    if (count === 11) setCount(0);
  };

  const handlePrevious = () => {
    setPiecesCounter(0);
    setError(false);
    if (count >= 1) setCount(count - 1);
  };

  const handleNextSolution = () => {
    if (steps + 1 <= totalSolutions - 1) setSteps(steps + 1);

    // if (totalSolutions === 0) {
    //   handleSolve();
    // }
  };

  const handlePreviousSolution = () => {
    if (steps + 1 >= 2) setSteps(steps - 1);
  };

  const handleSolve = () => {
    let initialPiecesLoaded = "";
    if (initialPieces.length > 0) {
      initialPiecesLoaded = { initialPieces: initialPieces };
    }

    setSteps(0);
    setIsLoading(true);
    axios
      .post("http://localhost:8010/pyramid/", initialPiecesLoaded)
      .then((response) => {
        const solvedSolutions = response.data.data.solutions;
        setTotalSolutions(solvedSolutions.length);

        if (solvedSolutions.length > 0) {
          setCurrentSolution(solvedSolutions[0]);
          setSteps(1);
          setIsLoading(false);
        } else {
          setErrorMessage("No Solution found");
          setError(true);
          setTimeout(() => {
            setError(false);
          }, [2000]);

          setCurrentSolution(initialPyramid); //set the pyramid to its initial shape
          setInitialPieces([]); //remove all pieces from the initial pieces array
          setIsLoading(false);
        }
        setSolutions(solvedSolutions);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleRemoveShape = (currentPiece) => {
    let obj = {
      symbol: currentPiece.shapeindex,
      pieceIndex: currentPiece.blockIndex,
      indices: currentPiece.indices,
      color: "#808080",
      coordinates: currentPiece.coordinates,
    };

    const filteredSoln = currentSolution.filter(
      (item) =>
        (item.indices !== currentPiece.indices) &
        (currentPiece.color !== item.color)
    );

    setCurrentSolution(filteredSoln);
    setCurrentSolution((solution) => [...solution, obj]);
  };

  const handleLimitLevels = (e) => {
    setLimitFromLevel1(e.target.checked);
  };

  const handleBorders = (e) => {
    setLimitBorders(e.target.checked);
  };

  const handleButtonChange = (e) => {
    handleReset();
    setLevel(e.target.value);
  };

  const handleAddShape = (currentPiece) => {
    let obj = {
      pieceIndex: piecesArray[count][piecesCounter].blockIndex,
      indices: piecesArray[count][piecesCounter].indices,
      color: piecesArray[count][piecesCounter].color,
      coordinates: piecesArray[count][piecesCounter].coordinates,
    };

    const occupancyCheck = initialPieces.filter(
      (item) => item.color === currentPiece.color
    );

    const filteredPieces = initialPieces.filter(
      (item) => item.color !== currentPiece.color
    );

    if (findIntersectingMembersStatus(obj, currentSolution)) {
      if (
        // limit level and borders
        limitFromLevel1 &
        !restrictLevel(obj) &
        !restrictBorders(obj) &
        limitBorders
      ) {
        setCurrentSolution((currentSolution) => [...currentSolution, obj]);
      } else if (
        // limit level only
        limitFromLevel1 &
        !restrictLevel(obj) &
        !limitBorders
      ) {
        setCurrentSolution((currentSolution) => [...currentSolution, obj]);
      } else if (
        // limit borders only
        !limitFromLevel1 &
        limitBorders &
        !restrictBorders(obj)
      ) {
        setCurrentSolution((currentSolution) => [...currentSolution, obj]);
      } else if (!limitFromLevel1 && !limitBorders) {
        // no limitations

        setCurrentSolution((currentSolution) => [...currentSolution, obj]);
      } else {
        setError(true);
        setErrorMessage("Piece Position Restricted");
        setTimeout(() => {
          setError(false);
        }, 2000);
      }
    } else { // Trying this out
      setError(true);
      setErrorMessage("Piece Position Restricted");
      setTimeout(() => {
        setError(false);
      }, 2000);
    }

    if (occupancyCheck.length > 0) {
      setInitialPieces(filteredPieces);
      setInitialPieces((initialPieces) => [...initialPieces, obj]);
    } else {
      setInitialPieces([...initialPieces, obj]);
    }
  };

  const handleReset = () => {
    setSolutions([]);
    setInitialPieces([]);
    setCurrentSolution(initialPyramid);

    setError(false);
    setSteps(0);
    setTotalSolutions(0);
  };

  const handleNextvariation = () => {
    let currentPiece = "";

    if (piecesCounter > 0) {
      currentPiece = piecesArray[count][piecesCounter - 1];
    } else {
      currentPiece = piecesArray[count][piecesCounter];
    }

    if (findIntersectingMembersStatus(currentPiece, currentSolution)) {
      handleRemoveShape(currentPiece);
    }

    setPiecesCounter(piecesCounter + 1);

    handleAddShape(currentPiece);
  };

  const generateNumbers = (start, end) => {
    const numbers = [];
    for (let i = start; i <= end; i++) {
      numbers.push(i);
    }
    return numbers;
  };

  const restrictLevel = (piece) => {
    let restrictedIndices = [];

    if (level == 1) {
      restrictedIndices = [1];
    } else if (level == 2) {
      restrictedIndices = generateNumbers(2, 5);
    } else if (level == 3) {
      restrictedIndices = generateNumbers(6, 14);
    } else if (level == 4) {
      restrictedIndices = generateNumbers(15, 30);
    } else if (level == 5) {
      restrictedIndices = generateNumbers(31, 55);
    }

    return areMembersContained(restrictedIndices, piece.indices);
  };

  const restrictBorders = (piece) => {
    let finalArray = [];
    let restrictedIndices = [
      6, 7, 8, 9, 11, 12, 14, 15, 16, 17, 18, 19, 22, 23, 26, 27, 28, 29, 30,
      31, 32, 33, 34, 35, 36, 41, 46, 51, 52, 53, 54, 55, 50, 45, 40,
    ];

    restrictedIndices.filter((element) => {
      if (piece.indices.includes(element)) {
        finalArray.push(true); // false will say that the piece conflicts with the current soln
      } else {
        finalArray.push(false);
      }
    });

    if (finalArray.includes(true)) {
      return true;
    } else return false;
  };

  const areMembersContained = (arr1, arr2) => {
    return arr2.every((item) => arr1.includes(item));
  };

  const findIntersectingMembersStatus = (array2, currentSolution) => {
    let finalArray = [];
    currentSolution.map((item) => {
      if (item.indices.length > 0) {
        let array1 = item.indices;

        array1.filter((element) => {
          if (
            array2.indices.includes(element) &
            (item.color !== "#808080") &
            (item.color !== array2.color)
          ) {
            finalArray.push(false); // false will say that the piece conflicts with the current soln
          } else {
            finalArray.push(true);
          }
        });
      }
    });

    if (finalArray.includes(false)) {
      return false;
    } else return true;
  };

  useEffect(() => {
    if (solutions.length > 0) {
      setCurrentSolution(solutions[steps]);
    }
  }, [steps]);

  return (
    <>
      <Row>
        <Col style={{ marginTop: "1%", marginLeft: "2%" }} md={6}>
          <Card style={{ background: "black" }}>
            {/* <h2 style={{color:"white"}}>Solution controls</h2> */}
            <Button type="primary" onClick={handlePreviousSolution}>
              Previous
            </Button>
            <Button
              onClick={handleNextSolution}
              style={{
                background: "green",
                color: "white",
                borderColor: "gray",
                marginLeft: "1%",
              }}
            >
              Next
            </Button>
            <Button
              onClick={handleSolve}
              type="primary"
              style={{
                marginLeft: "1%",
              }}
            >
              Solve
            </Button>
            <Button
              onClick={handleReset}
              type="primary"
              style={{
                marginLeft: "1%",
                background: "red",
              }}
            >
              Reset
            </Button>

            {error ? (
              <Alert color="danger" style={{ background: "red" }}>
                <div>
                  <h2>{errorMessage}</h2>
                </div>
              </Alert>
            ) : isLoading ? (
              <Spinner />
            ) : (
              <h3 style={{ background: "white" }}>
                Solutions: {steps + 1} out of {totalSolutions.toLocaleString()}
              </h3>
            )}
          </Card>
        </Col>

        <Col
          style={{ marginTop: "3%", marginLeft: "1%", zIndex: 10000 }}
          md={1}
        >
          <Button onClick={handlePrevious} icon={<StepBackwardOutlined />}>
            Previous Piece
          </Button>
        </Col>

        <Col md={8}>
          <Canvas>
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 15, 10]} angle={0.3} />
            <Physics>
              <Piece position={piecesArray[count][piecesCounter]} />
            </Physics>
          </Canvas>
        </Col>

        <Col style={{ marginTop: "3%", zIndex: 10000 }} md={1}>
          <Button onClick={handleNext} icon={<StepForwardOutlined />}>
            Next Piece
          </Button>
        </Col>

        <Col style={{ marginTop: "1%", marginLeft: "10%" }} md={4}>
          <Card style={{ background: "black" }}>
            <Button onClick={handleNextvariation}>Rotate piece</Button>
            <Row>
              <Checkbox
                style={{ color: "white", marginTop: "2%" }}
                onChange={handleLimitLevels}
              >
                Restrict Horizontal orientation on Level
              </Checkbox>

              <Radio.Group
                onChange={handleButtonChange}
                buttonStyle="solid"
                defaultValue="5"
              >
                <Radio.Button value="1">1</Radio.Button>
                <Radio.Button value="2">2</Radio.Button>
                <Radio.Button value="3">3</Radio.Button>
                <Radio.Button value="4">4</Radio.Button>
                <Radio.Button value="5">5</Radio.Button>
              </Radio.Group>
            </Row>
            <Row>
              <Checkbox style={{ color: "white" }} onChange={handleBorders}>
                Avoid Piece Touching Borders
              </Checkbox>
            </Row>
          </Card>
        </Col>
      </Row>

      <Canvas>
        <OrbitControls />
        <Stars />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <Physics>
          <Pyramid positions={currentSolution} />
        </Physics>
      </Canvas>
    </>
  );
};

export default Polysphere;
