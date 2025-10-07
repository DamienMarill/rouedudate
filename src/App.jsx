import React, { useState, useRef } from 'react';
import { RefreshCw, Zap } from 'lucide-react';

const SpeedDatingWheel = () => {
    const [spinning, setSpinning] = useState(false);
    const [result, setResult] = useState(null);
    const [rotation, setRotation] = useState(0);
    const wheelRef = useRef(null);

    const items = [
        { text: "Décris ta journée parfaite en 30 secondes", type: "question", color: "#5DADE2", emoji: "☀️" },
        { text: "Parle comme un commentateur sportif pendant ta prochaine phrase", type: "gage", color: "#48C9B0", emoji: "🎙️" },
        { text: "Quelle est la dernière chose qui t'a fait rire aux éclats ?", type: "question", color: "#F39C12", emoji: "😂" },
        { text: "Fais le meilleur compliment possible sur le lieu où on est", type: "gage", color: "#AF7AC5", emoji: "✨" },
        { text: "Si tu avais un superpouvoir pour 24h, ce serait quoi ?", type: "question", color: "#58D68D", emoji: "⚡" },
        { text: "Raconte ton pire fail de cuisine", type: "question", color: "#EC7063", emoji: "🍳" },
        { text: "Invente un nom de cocktail inspiré de ta personnalité", type: "gage", color: "#5DADE2", emoji: "🍹" },
        { text: "Montagne ou plage ? Défends ton choix passionnément !", type: "question", color: "#48C9B0", emoji: "🏔️" },
        { text: "Quelle série tu peux revoir en boucle sans t'en lasser ?", type: "question", color: "#F39C12", emoji: "📺" },
        { text: "Fais deviner ton film préféré en 3 émojis", type: "gage", color: "#AF7AC5", emoji: "🎬" },
        { text: "Si tu pouvais dîner avec n'importe qui (vivant), qui ce serait ?", type: "question", color: "#58D68D", emoji: "🍽️" },
        { text: "Raconte ton moment le plus gênant en 20 secondes", type: "gage", color: "#EC7063", emoji: "🙈" },
        { text: "Thé ou café ? Pourquoi cette guerre existe selon toi ?", type: "question", color: "#5DADE2", emoji: "☕" },
        { text: "Quel talent inutile aimerais-tu avoir ?", type: "question", color: "#48C9B0", emoji: "🎪" },
        { text: "Fais une phrase avec les 3 objets les plus proches de toi", type: "gage", color: "#F39C12", emoji: "🎯" },
        { text: "Si ta vie était un jeu vidéo, quel serait son titre ?", type: "question", color: "#AF7AC5", emoji: "🎮" },
        { text: "Décris ton dernier voyage ou celui dont tu rêves", type: "question", color: "#58D68D", emoji: "✈️" },
        { text: "Invente une fact totalement fausse mais crédible sur toi", type: "gage", color: "#EC7063", emoji: "🤥" },
        { text: "Pizza hawaïenne : pour ou contre ? Défends ta position !", type: "question", color: "#5DADE2", emoji: "🍕" },
        { text: "Qu'est-ce qui te fait sortir de ta zone de confort ?", type: "question", color: "#48C9B0", emoji: "🚀" },
        { text: "Trouve 3 points communs entre vous deux en 30 secondes", type: "gage", color: "#F39C12", emoji: "🤝" },
        { text: "Quel est ton comfort food ultime ?", type: "question", color: "#AF7AC5", emoji: "🍜" },
        { text: "Si tu pouvais apprendre une langue instantanément, laquelle ?", type: "question", color: "#58D68D", emoji: "🌍" },
        { text: "Raconte l'histoire la plus bizarre qui te soit arrivée", type: "question", color: "#EC7063", emoji: "🎭" }
    ];

    const spinWheel = () => {
        if (spinning) return;

        setSpinning(true);
        setResult(null);

        // 1. D'abord choisir l'item aléatoire
        const randomIndex = Math.floor(Math.random() * items.length);
        const selectedItem = items[randomIndex];

        // 2. Calculer l'angle du centre de cet item (dans le référentiel de la roue)
        const degreesPerItem = 360 / items.length;
        const itemCenterAngle = randomIndex * degreesPerItem + (degreesPerItem / 2);

        // 3. Calculer la rotation finale
        // On part de la position actuelle et on ajoute les tours + ajustement
        const spins = Math.round(8 + Math.random() * 2); // 8-10 tours complets
        // Pour savoir où on doit arriver : on prend la position normalisée de l'item
        const currentNormalized = rotation % 360;
        const targetAngle = 360 - itemCenterAngle; // Position cible normalisée (le haut = 0°/360°)

        // On calcule le delta pour arriver à la cible depuis la position actuelle
        let delta = targetAngle - currentNormalized;
        if (delta < 0) delta += 360; // Toujours tourner dans le sens positif

        const finalRotation = rotation + (360 * spins) + delta;

        console.log('Item:', randomIndex, 'Angle item:', itemCenterAngle, 'Current:', rotation, 'Normalized:', currentNormalized, 'Target:', targetAngle, 'Delta:', delta, 'Final:', finalRotation);

        setRotation(finalRotation);

        setTimeout(() => {
            setSpinning(false);
            setResult(selectedItem);
        }, 5000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Zap className="text-yellow-300" size={32} />
                        <h1 className="text-4xl font-bold text-white">Roue de la Chance</h1>
                        <Zap className="text-yellow-300" size={32} />
                    </div>
                    <p className="text-white/90 text-lg">Le brise-glace parfait ! 🎯</p>
                </div>

                {/* Wheel Container */}
                <div className="relative mb-8">
                    {/* Triangle pointer at top */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 -translate-y-2">
                        <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-t-[40px] border-t-yellow-400 drop-shadow-2xl" />
                    </div>

                    {/* Wheel */}
                    <div className="relative w-full aspect-square max-w-md mx-auto">
                        <div className="absolute inset-0 rounded-full bg-white shadow-2xl overflow-hidden border-4 border-yellow-400">
                            <svg
                                ref={wheelRef}
                                viewBox="0 0 200 200"
                                className="w-full h-full"
                                style={{
                                    transform: `rotate(${rotation}deg)`,
                                    transition: spinning ? 'transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
                                }}
                            >
                                {items.map((item, index) => {
                                    const angle = (360 / items.length) * index;
                                    const nextAngle = (360 / items.length) * (index + 1);
                                    const middleAngle = (angle + nextAngle) / 2;

                                    // Calculate path for each slice
                                    const startAngle = (angle - 90) * (Math.PI / 180);
                                    const endAngle = (nextAngle - 90) * (Math.PI / 180);

                                    const x1 = 100 + 100 * Math.cos(startAngle);
                                    const y1 = 100 + 100 * Math.sin(startAngle);
                                    const x2 = 100 + 100 * Math.cos(endAngle);
                                    const y2 = 100 + 100 * Math.sin(endAngle);

                                    // Position for emoji (70% of radius from center)
                                    const emojiAngle = (middleAngle - 90) * (Math.PI / 180);
                                    const emojiX = 100 + 70 * Math.cos(emojiAngle);
                                    const emojiY = 100 + 70 * Math.sin(emojiAngle);
                                    const emojiRotation = middleAngle;

                                    return (
                                        <g key={index}>
                                            <path
                                                d={`M 100 100 L ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2} Z`}
                                                fill={item.color}
                                                stroke="white"
                                                strokeWidth="2"
                                            />
                                            <text
                                                x={emojiX}
                                                y={emojiY}
                                                fontSize="16"
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                transform={`rotate(${emojiRotation}, ${emojiX}, ${emojiY})`}
                                            >
                                                {item.emoji}
                                            </text>
                                        </g>
                                    );
                                })}

                                {/* Center circle */}
                                <circle cx="100" cy="100" r="20" fill="#FFD700" stroke="#FFA500" strokeWidth="3" />
                                <text
                                    x="100"
                                    y="100"
                                    fontSize="24"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                >
                                    🎯
                                </text>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Result Display */}
                {result && !spinning && (
                    <div className="mb-6 animate-fade-in">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
                            <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold mb-4">
                                {result.emoji} {result.type === 'question' ? 'Question' : 'Gage'}
                            </div>
                            <p className="text-2xl font-bold text-gray-800 leading-relaxed">
                                {result.text}
                            </p>
                        </div>
                    </div>
                )}

                {/* Button */}
                <div className="flex justify-center">
                    <button
                        onClick={spinWheel}
                        disabled={spinning}
                        className={`
              flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg
              transition-all duration-200 shadow-lg
              ${spinning
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-white text-purple-600 hover:bg-purple-50 hover:scale-105 active:scale-95'
                        }
            `}
                    >
                        <RefreshCw className={spinning ? 'animate-spin' : ''} size={24} />
                        {spinning ? 'La roue tourne...' : 'Lancer la roue !'}
                    </button>
                </div>
            </div>

            {/* Styling */}
            <style jsx="true">{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
        </div>
    );
};

export default SpeedDatingWheel;
