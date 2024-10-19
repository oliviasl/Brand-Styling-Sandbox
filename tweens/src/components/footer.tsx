import * as React from "react";

export default function Footer() {
    return (
        <footer className="flex p-16 justify-between items-center text-footer">
            <div className="flex flex-row space-x-4 font-bold px-20">
                <h1>MADE BY</h1>
                <div className="flex flex-col p-y-4 font-normal">
                    <h2>COLE GAWIN</h2>
                    <h2>OLIVIA LAI</h2>
                    <h2>ELISSA MARTIAL</h2>
                    <h2>MEGAN PHI</h2>
                </div>
            </div>
            <div className="flex flex-row space-x-4 font-bold px-20">
                <h1>FOR</h1>
                <div className="flex flex-col p-y-4 font-normal">
                    <h2>GOOGLE LABS</h2>
                    <h2>CREATIVE MAKEATHON</h2>
                    <h2>OCTOBER 2024</h2>
                </div>
            </div>
        </footer>
    );
}