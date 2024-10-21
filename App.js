// src/App.js
import React, { useState } from 'react';
import Sprite from './component/Sprite';
import Header from './Header'; // Import the Header component
import './styles.css';

const App = () => {
    const [sprites, setSprites] = useState([]);
    const [selectedSpriteIndex, setSelectedSpriteIndex] = useState(null);

    const addSprite = () => {
        const newSprite = {
            id: Date.now(),
            src: 'https://www.stemdetectivelab.com/wp-content/uploads/2019/07/scratch-mascot.png', // Placeholder image
            position: { x: 500, y: 150 }, // Updated default position to the right side
            rotation: 0,
        };
        setSprites([...sprites, newSprite]);
    };

    const removeSprite = () => {
        if (selectedSpriteIndex === null) return; // No sprite selected
        const updatedSprites = sprites.filter((_, index) => index !== selectedSpriteIndex);
        setSprites(updatedSprites);
        setSelectedSpriteIndex(null); // Reset selection after removing
    };

    const handleMove = (dx, dy) => {
        if (selectedSpriteIndex === null) return; // No sprite selected
        const updatedSprites = [...sprites];
        const sprite = updatedSprites[selectedSpriteIndex];
        sprite.position = {
            x: sprite.position.x + dx,
            y: sprite.position.y + dy,
        };
        setSprites(updatedSprites);
    };

    const handleRotate = (angle) => {
        if (selectedSpriteIndex === null) return; // No sprite selected
        const updatedSprites = [...sprites];
        const sprite = updatedSprites[selectedSpriteIndex];
        sprite.rotation = (sprite.rotation + angle) % 360;
        setSprites(updatedSprites);
    };

    const buttonStyle = {
        backgroundColor: '#6200ea',
        color: 'white',
        border: 'none',
        padding: '12px 20px',
        borderRadius: '50px',
        cursor: 'pointer',
        fontSize: '14px',
        marginBottom: '15px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s',
    };

    const cardStyle = {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px',
        textAlign: 'center',
    };

    const selectedButtonStyle = {
        backgroundColor: '#03dac5',
        color: 'white',
        padding: '8px 15px',
        borderRadius: '30px',
        cursor: 'pointer',
        border: 'none',
        marginTop: '10px',
        transition: 'background-color 0.3s',
    };

    const spriteAreaStyle = {
        display: 'flex',
        justifyContent: 'flex-end', // Align sprites to the right side
        flexWrap: 'wrap',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '20px',
        minHeight: '400px',
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#f3e5f5' }}>
            <Header />
            <div style={{ display: 'flex', flexGrow: 1 }}>
                <div style={{ padding: '40px', borderRight: '1px solid #ddd', backgroundColor: '#f3e5f5', width: '300px' }}>
                    <div style={cardStyle}>
                        <button onClick={addSprite} style={buttonStyle}>+ Add New Sprite</button>
                        <div>
                            <button onClick={() => handleMove(10, 0)} style={buttonStyle}>→ Right</button>
                        </div>
                        <div>
                            <button onClick={() => handleMove(-10, 0)} style={buttonStyle}>← Left</button>
                        </div>
                        <div>
                            <button onClick={() => handleMove(0, 10)} style={buttonStyle}>↓ Down</button>
                        </div>
                        <div>
                            <button onClick={() => handleMove(0, -10)} style={buttonStyle}>↑ Up</button>
                        </div>
                        <div style={{ marginTop: '15px' }}>
                            <label htmlFor="rotation" style={{ fontSize: '16px', color: '#6200ea', fontWeight: 'bold' }}>Rotate by:</label>
                            <select id="rotation" onChange={(e) => handleRotate(Number(e.target.value))} style={{ padding: '8px', borderRadius: '10px', marginLeft: '10px' }}>
                                <option value="0">0°</option>
                                <option value="15">15°</option>
                                <option value="30">30°</option>
                                <option value="45">45°</option>
                                <option value="60">60°</option>
                                <option value="90">90°</option>
                                <option value="180">180°</option>
                            </select>
                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <button onClick={removeSprite} style={{ ...buttonStyle, backgroundColor: '#d32f2f' }}>Remove Selected Sprite</button>
                        </div>
                    </div>
                </div>
                <div style={{ flexGrow: 1, padding: '20px' }}>
                    <div style={spriteAreaStyle}>
                        {sprites.map((sprite, index) => (
                            <div key={sprite.id} style={{ margin: '15px', textAlign: 'center' }}>
                                <Sprite
                                    src={sprite.src}
                                    position={sprite.position}
                                    rotation={sprite.rotation}
                                />
                                <button
                                    onClick={() => setSelectedSpriteIndex(index)}
                                    style={{
                                        ...selectedButtonStyle,
                                        backgroundColor: selectedSpriteIndex === index ? '#03dac5' : '#6200ea',
                                    }}
                                >
                                    {selectedSpriteIndex === index ? 'Selected' : 'Select'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
