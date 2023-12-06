import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";
import Plane from "./components/Plane";
import Pyramid from "./components/Pyramid";
import axios from "axios";

import "./styles.css";
import { Row, Col, Card, Button, Radio } from "antd";
import { StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons";
import Piece from "./components/Piece";
import Mapping from "./mapping.json";

const Polysphere = () => {
  // let initialPieces = {
  //   initialPieces: [
  //     {
  //       symbol: "A",
  //       pieceIndex: 0,
  //       indices: [31, 32, 33, 36, 38],
  //     },
  //     {
  //       symbol: "B",
  //       pieceIndex: 1,
  //       indices: [24, 9, 54, 29, 13],
  //     },
  //     {
  //       symbol: "C",
  //       pieceIndex: 2,
  //       indices: [43, 37, 20, 6, 2],
  //     },
  //   ],
  // };

  const pieces = [
    {
      pieceIndex: 0,
      symbol: "A",
      color: "#e4240d",
      coordinates: [
        {
          x: 0,
          y: 0,
          z: 4,
        },
        {
          x: 0,
          y: 1,
          z: 4,
        },
        {
          x: 0,
          y: 2,
          z: 4,
        },
        {
          x: 1,
          y: 0,
          z: 4,
        },
        {
          x: 1,
          y: 2,
          z: 4,
        },
      ],
      indices: [31, 32, 33, 36, 38],
    },
    {
      pieceIndex: 1,
      symbol: "B",
      color: "#ee69a3",
      coordinates: [
        {
          x: 1,
          y: 0,
          z: 2,
        },
        {
          x: 2,
          y: 1,
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
          z: 3,
        },
        {
          x: 4,
          y: 3,
          z: 4,
        },
      ],
      indices: [24, 9, 54, 29, 13],
    },
    {
      pieceIndex: 2,
      symbol: "C",
      color: "#f5a4c8",
      coordinates: [
        {
          x: 0,
          y: 0,
          z: 1,
        },
        {
          x: 0,
          y: 0,
          z: 2,
        },
        {
          x: 1,
          y: 1,
          z: 3,
        },
        {
          x: 1,
          y: 1,
          z: 4,
        },
        {
          x: 2,
          y: 2,
          z: 4,
        },
      ],
      indices: [43, 37, 20, 6, 2],
    },
    {
      pieceIndex: 3,
      symbol: "D",
      color: "#179ad9",
      coordinates: [
        {
          x: 2,
          y: 4,
          z: 4,
        },
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
      indices: [49, 55, 50, 45],
    },
    {
      pieceIndex: 4,
      symbol: "E",
      color: "#fee83a",
      coordinates: [
        {
          x: 0,
          y: 0,
          z: 0,
        },
        {
          x: 1,
          y: 1,
          z: 1,
        },
        {
          x: 2,
          y: 2,
          z: 2,
        },
        {
          x: 2,
          y: 2,
          z: 3,
        },
        {
          x: 3,
          y: 3,
          z: 3,
        },
      ],
      indices: [25, 30, 14, 5, 1],
    },
    {
      pieceIndex: 5,
      symbol: "F",
      color: "#b96bae",
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
          y: 3,
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
      ],
      indices: [40, 35, 44, 39, 34],
    },
    {
      pieceIndex: 6,
      symbol: "G",
      color: "#8e58a5",
      coordinates: [
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
        {
          x: 3,
          y: 2,
          z: 4,
        },
        {
          x: 4,
          y: 2,
          z: 4,
        },
      ],
      indices: [48, 53, 42, 47],
    },
    {
      pieceIndex: 7,
      symbol: "H",
      color: "#65bc68",
      coordinates: [
        {
          x: 2,
          y: 0,
          z: 4,
        },
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
      ],
      indices: [51, 52, 46, 41],
    },
    {
      pieceIndex: 8,
      symbol: "I",
      color: "#f3742b",
      coordinates: [
        {
          x: 0,
          y: 1,
          z: 3,
        },
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
          y: 3,
          z: 3,
        },
        {
          x: 2,
          y: 3,
          z: 3,
        },
      ],
      indices: [16, 17, 18, 22, 26],
    },
    {
      pieceIndex: 9,
      symbol: "J",
      color: "#1b8841",
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
          x: 2,
          y: 0,
          z: 3,
        },
        {
          x: 3,
          y: 0,
          z: 3,
        },
        {
          x: 3,
          y: 1,
          z: 3,
        },
      ],
      indices: [28, 27, 23, 19, 15],
    },
    {
      pieceIndex: 10,
      symbol: "K",
      color: "#edb02e",
      coordinates: [
        {
          x: 0,
          y: 1,
          z: 2,
        },
        {
          x: 1,
          y: 2,
          z: 2,
        },
        {
          x: 1,
          y: 2,
          z: 3,
        },
      ],
      indices: [7, 21, 11],
    },
    {
      pieceIndex: 11,
      symbol: "L",
      color: "#f5a4c8",
      coordinates: [
        {
          x: 0,
          y: 1,
          z: 1,
        },
        {
          x: 1,
          y: 0,
          z: 1,
        },
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
          x: 2,
          y: 0,
          z: 2,
        },
      ],
      indices: [12, 4, 10, 3, 8],
    },
  ];

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
    },
  ];

  const [count, setCount] = useState(0);
  const [steps, setSteps] = useState(0);
  const [totalSolutions, setTotalSolutions] = useState(0);
  const [solutions, setSolutions] = useState([]);
  const [currentSolution, setCurrentSolution] = useState(initialPyramid);
  const [selectedLevel, setSelectedLevel] = useState("");

  const [initialPieces, setInitialPieces] = useState([]);

  const handleNext = () => {
    if (count <= 3) setCount(count + 1);

    if (count === 4) setCount(0);
  };

  const handlePrevious = () => {
    if (count >= 1) setCount(count - 1);
  };

  const handleNextSolution = () => {
    if (steps + 1 <= totalSolutions - 1) setSteps(steps + 1);

    if (totalSolutions === 0) {
      handleSolve();
    }
  };

  const handlePreviousSolution = () => {
    if (steps + 1 >= 2) setSteps(steps - 1);
  };

  const handleSolve = () => {
    let initialPiecesLoaded = "";
    if (initialPieces.length > 0) {
      initialPiecesLoaded = { initialPieces: initialPieces };
    }

    console.log(initialPiecesLoaded);

    setSteps(0);
    axios
      .post("http://localhost:8010/pyramid/", initialPiecesLoaded)
      .then((response) => {
        const solvedSolutions = response.data.data.solutions;
        console.log(11, response);

        setTotalSolutions(solvedSolutions.length);
        console.log("solutions length ar", solvedSolutions.length);

        if (solvedSolutions.length > 0) {
          setCurrentSolution(solvedSolutions[0]);
        } else {
          console.log("impo sana hapa")
          setCurrentSolution(initialPyramid); //set the pyramid to its initial shape
          setInitialPieces([]); //remove all pieces from the initial pieces array
        }
        setSolutions(solvedSolutions);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemoveShape = () => {
    let currentPiece = pieces[count]
    let symbol = currentPiece.symbol
    let indices = currentPiece.indices

    let obj = {
      symbol: currentPiece.symbol,
      pieceIndex: currentPiece.pieceIndex,
      indices: indices,
      color: "#808080", // grey it out
      coordinates: currentPiece.coordinates,
    };

    setCurrentSolution((currentSolution) => [...currentSolution, obj]);

  };

  const handleAddShape = () => {
    let currentPiece = pieces[count];
    let indices = [];
    let coordinates = [];

    if (selectedLevel !== "") {
      Object.keys(Mapping).map((key) =>
        Object.keys(Mapping[key]).map((newKey) => {
          if (Mapping[key][newKey] == selectedLevel && newKey === "z") {
            indices.push(parseInt(key));

            // coordinates.push(Mapping[key]);
          }
        })
      );
    }

    let obj = {
      symbol: currentPiece.symbol,
      pieceIndex: currentPiece.pieceIndex,
      indices: indices,
      color: currentPiece.color,
      coordinates: currentPiece.coordinates,
    };

    setCurrentSolution((currentSolution) => [...currentSolution, obj]);
    setInitialPieces((initialPieces) => [...initialPieces, obj]);
  };

  const handleReset = () => {
    setCurrentSolution(initialPyramid);
    setTotalSolutions(0);
  };

  const handleNextvariation = () =>{

  }

  const handlePreviousvariation = () =>{
    
  }

  useEffect(() => {
    if (solutions.length > 0) {
      setCurrentSolution(solutions[steps]);
      console.log(currentSolution);
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
            <h3 style={{ background: "white" }}>
              Solutions: {steps + 1} out of {totalSolutions}
            </h3>
          </Card>
        </Col>

        <Col style={{ marginTop: "3%", marginLeft: "1%" }} md={1}>
          <Button
            onClick={handlePrevious}
            icon={<StepBackwardOutlined />}
          ></Button>
        </Col>

        <Col md={8}>
          <Canvas>
            <OrbitControls />
            <ambientLight intensity={0.5} />
            {/* <spotLight position={[10, 15, 10]} angle={0.3} /> */}
            <Physics>
              <Piece
                position={pieces.filter((item) => item.pieceIndex === count)[0]}
              />
            </Physics>
          </Canvas>
        </Col>

        <Col style={{ marginTop: "3%", marginLeft: "1%" }} md={1}>
          <Button onClick={handleNext} icon={<StepForwardOutlined />}></Button>
        </Col>

        <Col style={{ marginTop: "1%", marginLeft: "1%" }} md={6}>
          <Card style={{ background: "black" }}>
            <Row>
              <Button>Next Variation</Button>
              <Button type="primary" style={{ marginLeft: "1%" }}>
                Previous Variation
              </Button>
              {/* <Radio.Group buttonStyle="solid" style={{ marginLeft: "2%" }}>
                <Radio.Button value="0" onClick={() => handleSelectLevel("0")}>
                  L1
                </Radio.Button>
                <Radio.Button value="1" onClick={() => handleSelectLevel("1")}>
                  L2
                </Radio.Button>
                <Radio.Button value="2" onClick={() => handleSelectLevel("2")}>
                  L3
                </Radio.Button>
                <Radio.Button value="3" onClick={() => handleSelectLevel("3")}>
                  L4
                </Radio.Button>
                <Radio.Button value="4" onClick={() => handleSelectLevel("4")}>
                  L5
                </Radio.Button>
              </Radio.Group> */}
            </Row>

            <Row style={{ marginTop: "2%", marginLeft: "1%" }}>
              <Button
                onClick={handleAddShape}
                style={{
                  background: "gray",
                  color: "white",
                  borderColor: "gray",
                  marginLeft: "1%",
                }}
              >
                Add Shape
              </Button>

              <Button
                onClick={handleRemoveShape}
                style={{
                  background: "red",
                  color: "white",
                  borderColor: "red",
                  marginLeft: "1%",
                }}
              >
                Remove Shape
              </Button>
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
