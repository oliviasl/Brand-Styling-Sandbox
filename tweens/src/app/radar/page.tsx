"use client";

import { Radar } from "react-chartjs-2";
import { useState, useEffect } from "react";

import "chartjs-plugin-dragdata";
import "chart.js/auto";
import { styled } from 'styled-components';

const Container = styled.div`
    margin: 0;
    padding: 0;
`;

const Canvas = styled.div`
    background-color: #eee;
    position: absolute;
    width: 100vw;
    height: 100vh;
`;

export default function Page() {

    const [attributes, setAttributes] = useState({
        corporate: 5,
        universal: 7,
        sporty: 3,
        fun: 5,
        abstract: 1,
        friendly: 7,
    });

    useEffect(() => {
        console.log(attributes);
    }, [attributes]);

    const data = {
        labels: ["Corporate", "Universal", "Sporty", "Fun", "Abstract", "Friendly" ],
        datasets: [
            {
                label: "",
                data: Object.values(attributes),
                fill: true,
                tension: 0,
                borderWidth: 3,
                pointHitRadius: 25,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
            },
        ],
    }

    const options = {
        scales: { 
            r: {
                ticks: {
                  display: false,
                  beginAtZero: true,
                },
                suggestedMin: 0,
                suggestedMax: 10,
            }
        },
        plugins: {
            dragData: {
              onDrag(event: any, di: any, index: any, value: any) {
                // console.log("drag", { event, di, index, value });
              },
              onDragEnd(event: any, di: any, index: any, value: any) {
                setAttributes(attributes => ({
                    ...attributes,
                    [Object.keys(attributes)[index]]: value
                }));

                // console.log("drag end", { event, di, index, value });
              },
              onDragStart(event: any, di: any, index: any, value: any) {
                // console.log("drag start", { event, di, index, value });
              },
            },
            datalabels: { display: false },
            legend: {
                display: false, // Hide the legend
            },
        },
    }

    return (
        <Container>
            <Canvas>
                <Radar data={data} options={options} />
            </Canvas>
        </Container>
    );
}