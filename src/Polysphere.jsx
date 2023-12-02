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
  let initialPieces = {
    initialPieces: [
      {
        symbol: "A",
        pieceIndex: 0,
        indices: [31, 32, 33, 36, 38],
      },
      {
        symbol: "B",
        pieceIndex: 1,
        indices: [24, 9, 54, 29, 13],
      },
      {
        symbol: "C",
        pieceIndex: 2,
        indices: [43, 37, 20, 6, 2],
      },
    ],
  };

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

  const testPositions = [
    {
      symbol: "A",
      color: "#e4240d",
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
      color: "#ee69a3",
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
      color: "#f5a4c8",
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
      color: "#179ad9",
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
      color: "#fee83a",
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
      color: "#b96bae",
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
      color: "#8e58a5",
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
      color: "#65bc68",
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
      color: "#f3742b",
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
      color: "#1b8841",
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
      color: "#edb02e",
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
      color: "#89c8ec",
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
  const [currentSolution, setCurrentSolution] = useState(testPositions);

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
    //handle API call to solve
    setSteps(0);
    axios
      .post("http://localhost:8010/pyramid/", initialPieces)
      .then((response) => {
        const solvedSolutions = response.data.data.solutions;
        console.log("1 solutions", solvedSolutions[0]);
        console.log("length", solvedSolutions.length);
        setTotalSolutions(solvedSolutions.length);
        setSolutions(solvedSolutions);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (solutions.length > 0) {
      console.log("fired");
      setCurrentSolution(solutions[steps]);
    }
  }, [steps]);

  return (
    <>
      <Row>
        <Col style={{ marginTop: "1%", marginLeft: "2%" }} md={6}>
          <Card style={{ background: "black" }}>
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
            <h2 style={{ background: "white" }}>
              Solutions: {steps + 1} out of {totalSolutions}
            </h2>
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
              <Radio.Group buttonStyle="solid" style={{ marginLeft: "2%" }}>
                <Radio.Button value="a">L1</Radio.Button>
                <Radio.Button value="b">L2</Radio.Button>
                <Radio.Button value="c">L3</Radio.Button>
                <Radio.Button value="c">L4</Radio.Button>
                <Radio.Button value="c">L5</Radio.Button>
                {/* <Radio.Button value="c">L5</Radio.Button> */}
              </Radio.Group>

              <Button
                style={{
                  background: "gray",
                  color: "white",
                  borderColor: "gray",
                  marginLeft: "1%",
                }}
              >
                Add
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
