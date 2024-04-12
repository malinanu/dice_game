import { useState, useEffect } from "react";
import { gameStates, useGameStore } from "../services/store";
import "../index.css";

export const Menu = ({ jump, respawn, collidedValue, collided }) => {
  const { startGame, gameState, goToMenu } = useGameStore((state) => ({
    startGame: state.startGame,
    gameState: state.gameState,
    goToMenu: state.goToMenu,
  }));

  const [selectedOption, setSelectedOption] = useState(null);
  const [resultMessage, setResultMessage] = useState(null);
  const [isThrowButtonVisible, setIsThrowButtonVisible] = useState(false);
  const [betAmount, setBetAmount] = useState(0);
  const [coins, setCoins] = useState(100);
  const [scoreValue, setScoreValue] = useState(null);
  const isThrowButtonDisabled = !selectedOption;

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleBetChange = (event) => {
    setBetAmount(parseInt(event.target.value, 10) || 0);
  };

  const checkResult = (option, value) => {
    const isLow = value <= 9;
    const isHigh = value >= 12;

    if ((option === "low" && isLow) || (option === "high" && isHigh)) {
      setResultMessage("You won!");
    } else {
      setResultMessage("You lost!");
    }
  };

  const handlePlayAgain = (newScoreValue) => {
    setScoreValue(newScoreValue);
    setBetAmount(betAmount);
  };

  const handleRespawn = () => {
    respawn();
    setResultMessage(null);
    setSelectedOption(null);
  };

  /**
   * with an interval updating check result function
   */

  useEffect(() => {
    let intervalId = null;

    function startChecking() {
      intervalId = setInterval(() => {
        if (collidedValue !== null && selectedOption) {
          checkResult(selectedOption, collidedValue);
          setSelectedOption(null);
        }
      }, 1000);
    }

    function stopChecking() {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }

    startChecking();

    return stopChecking;
  }, [collidedValue, selectedOption]);

  useEffect(() => {
    if (resultMessage) {
      const newCoins =
        resultMessage === "You won!" ? coins + betAmount : coins - betAmount;
      setCoins(newCoins);
    }
  }, [resultMessage]);

  return (
    <>
      <div className="menu">
        {isThrowButtonVisible && (
          <button
            className="play-button"
            onClick={() => {
              jump();
              setIsThrowButtonVisible(false);
            }}
          >
            throw
          </button>
        )}
        <div className="coinbar">
          <img src="./src/assets/images/72ppi/redbar.png" className="redbar" />
          <img src="./src/assets/images/72ppi/coin.png" className="coin" />
          <div className="coin-display">
            <h1>{coins}</h1>
          </div>
        </div>
      </div>

      <div
        className={`menu ${gameState !== gameStates.MENU ? "menu--hidden" : ""}`}
      >
        <div className="form-card">
          <h1 className="form-title">Coins : {coins}</h1>{" "}
          <h5 className="form-title">Amount you gonna bet?</h5>
          <div className="input-container">
            <input
              type="tel"
              min="0"
              value={betAmount}
              onChange={handleBetChange}
              style={{
                width: "100px",
                marginLeft: "auto",
                marginRight: "auto",
                fontSize: "18px",
                fontWeight: "bold",
                textAlign: "center",
                padding: "10px",
              }}
            />
          </div>
          <h5 className="form-title">
            Are you going for <br />
            low or high?
          </h5>
          <div className="button-container">
            <button
              className="high-menu-button"
              onClick={() => {
                handleOptionClick("high");
              }}
              disabled={selectedOption}
            >
              high
            </button>
            <button
              className="low-menu-button"
              onClick={() => {
                handleOptionClick("low");
              }}
              disabled={selectedOption}
            >
              low
            </button>
          </div>
          <br />
          <div>
            <button
              className="submit"
              onClick={() => {
                handlePlayAgain(1);
                startGame();
                setIsThrowButtonVisible(true);
              }}
              disabled={isThrowButtonDisabled}
            >
              bet
            </button>
          </div>
          <br />
        </div>
        <br />
      </div>
      <div
        className={`scores ${collided !== scoreValue ? "scores--hidden" : ""}`}
      >
        {resultMessage && (
          <div
            className={resultMessage === "You won!" ? "win-card" : "lost-card"}
          >
            <div className="form-card">
              {resultMessage === "You won!" && (
                <div className="result-message" style={{ textAlign: "center" }}>
                  <h1 className="menu-heading">{resultMessage}</h1>
                  <h6 className="menu-heading">Current Bet: {betAmount}</h6>
                  <h6 className="menu-heading">Winnings : {betAmount}</h6>
                  <h6 className="menu-heading">Loosings : 0</h6>
                  <h4 className="menu-heading">
                    FINAL AMOUNT <br />
                    {coins}
                  </h4>
                </div>
              )}
              {resultMessage === "You lost!" && (
                <div
                  className="lost-image"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h1 className="menu-heading">{resultMessage}</h1>
                  <img
                    src="./src/assets/images/72ppi/Sad_Face.png"
                    alt="Lost Game"
                  />
                  <h4 className="menu-heading">
                    FINAL AMOUNT <br />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {coins}
                    </div>
                  </h4>
                </div>
              )}

              <button
                className="submit"
                style={{ width: "125px" }}
                onClick={() => {
                  handlePlayAgain(Math.random());
                  handleRespawn();
                  goToMenu();
                }}
              >
                Play again
              </button>
              <br />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
