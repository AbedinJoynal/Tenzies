import Die from './components/Die';
import './App.css';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

function App() {
    const [dice, setDice] = useState(randomdice());
    const [tenzies, setTenzies] = useState(false);

    useEffect(() => {
        const diceheld = dice.every((die) => die.isHeld);
        const firstdice = dice[0].value;
        const diceheldvalue = dice.every((die) => die.value === firstdice);
        if (diceheld && diceheldvalue) {
            setTenzies(true);
            console.log('YOU WONNN');
        }
    }, [dice]);

    function generatedie() {
        return {
            value: Math.floor(Math.random() * 6) + 1,
            isHeld: false,
            id: nanoid(),
        };
    }

    function randomdice() {
        const dicearray = [];
        for (let i = 0; i < 10; i++) {
            dicearray.push(generatedie());
        }
        return dicearray;
    }
    function handledice() {
        if (!tenzies) {
            setDice((prevdie) =>
                prevdie.map((dice) => {
                    return dice.isHeld ? dice : generatedie();
                })
            );
        } else {
            setDice(randomdice());
            setTenzies(false);
        }
    }
    const helddice = (id) => {
        setDice((prevdice) =>
            prevdice.map((dice) =>
                dice.id === id
                    ? {
                          ...dice,
                          isHeld: !dice.isHeld,
                      }
                    : dice
            )
        );
    };

    const diceelement = dice.map((die) => {
        return (
            <Die
                value={die.value}
                key={die.id}
                isHeld={die.isHeld}
                helddice={() => helddice(die.id)}
            />
        );
        //helddice={helddice(die.id)}
    });

    return (
        <div className="die-holder">
            <h2 className='die-title'>TENZIES</h2>
            <h3 className='die-content'>Roll Untill All The Dice Are Same </h3>
            <div className="die-capacity">
                
                {diceelement}</div>
            <button onClick={handledice} className="die-btn">
                {tenzies ? 'NEW GAME' : 'ROLL'}
            </button>
        </div>
    );
}

export default App;
