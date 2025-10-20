import { useState, useEffect } from 'react';

interface GameState {
  money: number;
  food: number;
  bullets: number;
  oxen: number;
  clothing: number;
  wagon: number;
  distance: number;
  health: number;
  weather: string;
  pace: 'steady' | 'strenuous' | 'grueling';
  rations: 'filling' | 'meager' | 'bare';
  gameStatus: 'setup' | 'playing' | 'won' | 'lost';
  message: string;
  day: number;
}

export function OregonTrail() {
  const [gameState, setGameState] = useState<GameState>({
    money: 1000,
    food: 0,
    bullets: 0,
    oxen: 0,
    clothing: 0,
    wagon: 0,
    distance: 0,
    health: 100,
    weather: 'clear',
    pace: 'steady',
    rations: 'filling',
    gameStatus: 'setup',
    message: 'Welcome to Oregon Trail! Prepare for your journey.',
    day: 1
  });

  const [buyAmount, setBuyAmount] = useState<{ [key: string]: number }>({
    food: 0,
    bullets: 0,
    oxen: 0,
    clothing: 0
  });

  const prices = {
    food: 0.2,
    bullets: 2,
    oxen: 40,
    clothing: 10
  };

  const startJourney = () => {
    if (gameState.oxen < 2) {
      setGameState(prev => ({ ...prev, message: 'You need at least 2 oxen to start!' }));
      return;
    }
    if (gameState.food < 100) {
      setGameState(prev => ({ ...prev, message: 'You need at least 100 pounds of food!' }));
      return;
    }
    setGameState(prev => ({
      ...prev,
      gameStatus: 'playing',
      wagon: 1,
      message: 'Your journey begins! Head west to Oregon!'
    }));
  };

  const buyItem = (item: keyof typeof prices) => {
    const amount = buyAmount[item] || 0;
    const cost = amount * prices[item];

    if (cost > gameState.money) {
      setGameState(prev => ({ ...prev, message: 'Not enough money!' }));
      return;
    }

    setGameState(prev => ({
      ...prev,
      money: prev.money - cost,
      [item]: prev[item as keyof GameState] + amount,
      message: `Bought ${amount} ${item} for $${cost.toFixed(2)}`
    }));

    setBuyAmount(prev => ({ ...prev, [item]: 0 }));
  };

  const travel = () => {
    const distancePerDay = gameState.pace === 'steady' ? 10 : gameState.pace === 'strenuous' ? 15 : 20;
    const foodConsumption = gameState.rations === 'filling' ? 3 : gameState.rations === 'meager' ? 2 : 1;
    const healthChange = gameState.pace === 'grueling' ? -5 : gameState.rations === 'bare' ? -3 : 0;

    const newDistance = gameState.distance + distancePerDay;
    const newFood = gameState.food - foodConsumption;
    const newHealth = Math.max(0, Math.min(100, gameState.health + healthChange));

    if (newFood <= 0) {
      setGameState(prev => ({
        ...prev,
        gameStatus: 'lost',
        message: 'You ran out of food and starved!'
      }));
      return;
    }

    if (newHealth <= 0) {
      setGameState(prev => ({
        ...prev,
        gameStatus: 'lost',
        message: 'Your health deteriorated and you died!'
      }));
      return;
    }

    if (newDistance >= 2000) {
      setGameState(prev => ({
        ...prev,
        distance: 2000,
        gameStatus: 'won',
        message: 'Congratulations! You made it to Oregon!'
      }));
      return;
    }

    const randomEvent = Math.random();
    let eventMessage = 'You continue your journey west.';

    if (randomEvent < 0.1) {
      eventMessage = 'You found a river crossing. It was safe.';
    } else if (randomEvent < 0.15) {
      eventMessage = 'Bad weather slowed your progress.';
    } else if (randomEvent < 0.2) {
      eventMessage = 'You met friendly travelers who shared supplies!';
      setGameState(prev => ({ ...prev, food: prev.food + 20 }));
    }

    setGameState(prev => ({
      ...prev,
      distance: newDistance,
      food: newFood,
      health: newHealth,
      day: prev.day + 1,
      message: eventMessage
    }));
  };

  const hunt = () => {
    if (gameState.bullets < 10) {
      setGameState(prev => ({ ...prev, message: 'Not enough bullets to hunt! Need at least 10.' }));
      return;
    }

    const success = Math.random() > 0.3;
    const foodGained = success ? Math.floor(Math.random() * 100) + 50 : 0;
    const bulletsUsed = 10;

    setGameState(prev => ({
      ...prev,
      food: prev.food + foodGained,
      bullets: prev.bullets - bulletsUsed,
      message: success
        ? `Successful hunt! You gained ${foodGained} pounds of food.`
        : 'Hunt failed. No food gained.'
    }));
  };

  const rest = () => {
    setGameState(prev => ({
      ...prev,
      health: Math.min(100, prev.health + 10),
      day: prev.day + 1,
      message: 'You rested and recovered some health.'
    }));
  };

  const restart = () => {
    setGameState({
      money: 1000,
      food: 0,
      bullets: 0,
      oxen: 0,
      clothing: 0,
      wagon: 0,
      distance: 0,
      health: 100,
      weather: 'clear',
      pace: 'steady',
      rations: 'filling',
      gameStatus: 'setup',
      message: 'Welcome to Oregon Trail! Prepare for your journey.',
      day: 1
    });
  };

  if (gameState.gameStatus === 'setup') {
    return (
      <div className="h-full overflow-auto p-8 bg-card text-foreground">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-light">The Oregon Trail</h1>
            <p className="text-sm text-muted-foreground">{gameState.message}</p>
          </div>

          <div className="bg-muted/20 rounded-lg p-6 border border-border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">General Store</h2>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Money</div>
                <div className="text-xl font-medium">${gameState.money.toFixed(2)}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(prices).map(([item, price]) => (
                <div key={item} className="bg-card rounded-lg p-4 border border-border">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <div className="font-medium capitalize">{item}</div>
                      <div className="text-xs text-muted-foreground">${price} each</div>
                    </div>
                    <div className="text-lg font-medium">{gameState[item as keyof GameState]}</div>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="0"
                      value={buyAmount[item] || 0}
                      onChange={(e) => setBuyAmount(prev => ({ ...prev, [item]: parseInt(e.target.value) || 0 }))}
                      className="flex-1 px-3 py-1.5 border border-input rounded text-sm bg-background"
                    />
                    <button
                      onClick={() => buyItem(item as keyof typeof prices)}
                      className="px-4 py-1.5 bg-foreground text-background text-sm rounded hover:opacity-90"
                    >
                      Buy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted/20 rounded-lg p-6 border border-border">
            <h3 className="font-medium mb-3">Your Supplies</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Oxen:</span>
                <span className="font-medium">{gameState.oxen}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Food:</span>
                <span className="font-medium">{gameState.food} lbs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bullets:</span>
                <span className="font-medium">{gameState.bullets}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Clothing:</span>
                <span className="font-medium">{gameState.clothing}</span>
              </div>
            </div>
          </div>

          <button
            onClick={startJourney}
            className="w-full px-6 py-3 bg-foreground text-background rounded-lg hover:opacity-90 font-medium"
          >
            Start Journey
          </button>
        </div>
      </div>
    );
  }

  if (gameState.gameStatus === 'won' || gameState.gameStatus === 'lost') {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 bg-card text-foreground">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-6xl mb-4">
            {gameState.gameStatus === 'won' ? '🏆' : '💀'}
          </div>
          <h1 className="text-3xl font-light">
            {gameState.gameStatus === 'won' ? 'Victory!' : 'Game Over'}
          </h1>
          <p className="text-muted-foreground">{gameState.message}</p>

          <div className="bg-muted/20 rounded-lg p-6 border border-border space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Distance Traveled:</span>
              <span className="font-medium">{gameState.distance} miles</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Days on Trail:</span>
              <span className="font-medium">{gameState.day}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Final Health:</span>
              <span className="font-medium">{gameState.health}%</span>
            </div>
          </div>

          <button
            onClick={restart}
            className="px-8 py-3 bg-foreground text-background rounded-lg hover:opacity-90 font-medium"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-6 bg-card text-foreground">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-muted/20 rounded-lg p-6 border border-border">
          <div className="grid grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Day</div>
              <div className="text-lg font-medium">{gameState.day}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Distance</div>
              <div className="text-lg font-medium">{gameState.distance} / 2000 mi</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Health</div>
              <div className="text-lg font-medium">{gameState.health}%</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Food</div>
              <div className="text-lg font-medium">{gameState.food} lbs</div>
            </div>
          </div>
        </div>

        <div className="bg-muted/10 rounded-lg p-4 border border-border">
          <p className="text-sm text-center">{gameState.message}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/20 rounded-lg p-4 border border-border space-y-3">
            <h3 className="font-medium text-sm">Pace</h3>
            <div className="space-y-2">
              {(['steady', 'strenuous', 'grueling'] as const).map((pace) => (
                <button
                  key={pace}
                  onClick={() => setGameState(prev => ({ ...prev, pace }))}
                  className={`w-full px-4 py-2 rounded text-sm ${
                    gameState.pace === pace
                      ? 'bg-foreground text-background'
                      : 'bg-card border border-border hover:bg-muted/20'
                  }`}
                >
                  {pace.charAt(0).toUpperCase() + pace.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-muted/20 rounded-lg p-4 border border-border space-y-3">
            <h3 className="font-medium text-sm">Rations</h3>
            <div className="space-y-2">
              {(['filling', 'meager', 'bare'] as const).map((ration) => (
                <button
                  key={ration}
                  onClick={() => setGameState(prev => ({ ...prev, rations: ration }))}
                  className={`w-full px-4 py-2 rounded text-sm ${
                    gameState.rations === ration
                      ? 'bg-foreground text-background'
                      : 'bg-card border border-border hover:bg-muted/20'
                  }`}
                >
                  {ration.charAt(0).toUpperCase() + ration.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-muted/20 rounded-lg p-4 border border-border">
          <h3 className="font-medium text-sm mb-3">Supplies</h3>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bullets:</span>
              <span className="font-medium">{gameState.bullets}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Oxen:</span>
              <span className="font-medium">{gameState.oxen}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Clothing:</span>
              <span className="font-medium">{gameState.clothing}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={travel}
            className="px-4 py-3 bg-foreground text-background rounded-lg hover:opacity-90 font-medium"
          >
            Continue
          </button>
          <button
            onClick={hunt}
            className="px-4 py-3 bg-muted border border-border text-foreground rounded-lg hover:bg-muted/70"
          >
            Hunt
          </button>
          <button
            onClick={rest}
            className="px-4 py-3 bg-muted border border-border text-foreground rounded-lg hover:bg-muted/70"
          >
            Rest
          </button>
        </div>
      </div>
    </div>
  );
}
