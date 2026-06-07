import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  subscribeToRoom,
  sendChatMessage,
  voteTopics,
  voteDifficulty,
  computeMajorityDifficulty,
  computeTopTopics,
  startGame,
  submitAnswer,
  finishGame,
  quitPlayer,
  votePlayAgain,
  resetRoom,
} from "../firebase/room";
import { generateQuestions, TOPICS } from "../services/questionService";
import { useLang, useT } from "../i18n.jsx";

// Sub-components
import Lobby from "../components/Lobby";
import GameScreen from "../components/GameScreen";
import ResultsScreen from "../components/ResultsScreen";
import Countdown from "../components/Countdown";

export default function Room() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { lang, setLang } = useLang();
  const tr = useT();
  const [player, setPlayer] = useState(null);
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const unsubRef = useRef(null);

  // Adopt the room's chosen language so everyone in the room matches.
  useEffect(() => {
    const roomLang = room?.settings?.language;
    if (roomLang && roomLang !== lang) setLang(roomLang);
  }, [room?.settings?.language]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const stored = sessionStorage.getItem("player");
    if (!stored) {
      navigate("/");
      return;
    }
    const p = JSON.parse(stored);
    setPlayer(p);

    // Subscribe to room
    const unsub = subscribeToRoom(code, (data) => {
      if (!data) {
        setError(tr("roomNotFound"));
        setLoading(false);
        return;
      }
      setRoom(data);
      setLoading(false);
    });

    unsubRef.current = unsub;
    return () => { if (unsubRef.current) unsubRef.current(); };
  }, [code, navigate]);

  if (loading) {
    return (
      <div className="app-container">
        <div className="bg-glow" />
        <div className="page-center" style={{ zIndex: 1, position: "relative" }}>
          <div className="logo-icon" style={{ fontSize: "3rem" }}>🏆</div>
          <p className="text-secondary mt-md">{tr("connecting", { code })}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="bg-glow" />
        <div className="page-center" style={{ zIndex: 1, position: "relative", textAlign: "center" }}>
          <div style={{ fontSize: "3rem" }}>😕</div>
          <h3 className="mt-md">{error}</h3>
          <button className="btn btn-primary mt-lg" onClick={() => navigate("/")}>{tr("goHome")}</button>
        </div>
      </div>
    );
  }

  if (!room || !player) return null;

  const status = room.status;

  if (status === "lobby" || status === "playAgain") {
    return (
      <Lobby
        room={room}
        code={code}
        player={player}
        onStartGame={async (questions, difficulty, topics) => {
          await startGame(code, questions, difficulty, topics);
        }}
      />
    );
  }

  if (status === "playing") {
    const myData = room.players?.[player.uid];
    return (
      <GameScreen
        room={room}
        code={code}
        player={player}
        myData={myData}
        onSubmitAnswer={(qIdx, ansIdx, timeMs) =>
          submitAnswer(code, player.uid, qIdx, ansIdx, timeMs, room.questions[qIdx])
        }
        onFinish={() => finishGame(code, player.uid)}
        onQuit={async () => {
          await quitPlayer(code, player.uid);
        }}
      />
    );
  }

  if (status === "results") {
    return (
      <ResultsScreen
        room={room}
        code={code}
        player={player}
        onPlayAgain={(vote) => votePlayAgain(code, player.uid, vote)}
        onResetRoom={() => resetRoom(code)}
      />
    );
  }

  return null;
}
