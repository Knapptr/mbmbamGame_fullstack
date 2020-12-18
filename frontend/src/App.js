// MOVE the lyric selection process from the lyricsbox
// or the lyrics being presented can randomly change stanzas
import logo from "./logo.svg";
import "./App.css";
import LyricsCard from "./Lyricscard";
import AnswerBox from "./AnswerBox";
import ScoreBox from "./ScoreBox";
import Footer from "./Footer";
import Header from "./Header";
import MessageBox from "./MessageBox";
import FlagButton from "./FlagButton";
import RevealInfoBox from "./RevealBox";
import { api } from "./apiInfo";
import React, { useState, useEffect } from "react";

const fetchLyrics = async () => {
  return fetch(api.url + api.randomRoute)
    .then((res) => res.json())
    .then((res) => res);
};

function App() {
  const [track, updateTrack] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [answered, setAnswered] = useState(false);
  const [answerCorrect, setAnswerCorrect] = useState(undefined);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [artists, setArtists] = useState([]);
  const [message, setMessage] = useState();

  //Dummy placeholder until Backend has 'artists' route
  const dummySetArtists = () => {
    setArtists([
      { name: "Dave Matthews Band", _id: "5fd67774fc50ab24c100facf" },
      { name: "Phish", _id: "5fd67774fc50ab24c100face" },
    ]);
  };
  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch(api.url + api.randomRoute);
      let responseJSON = await response.json();

      updateTrack(responseJSON);
      setLoading(false);
    };
    dummySetArtists();
    fetchData();
  }, []);
  const resetValues = () => {
    setAnswered(false);
    setAnswerCorrect(undefined);
  };
  const getNewTrack = async () => {
    resetValues();
    setLoading(true);
    let response = await fetch(api.url + api.randomRoute);
    let responseJSON = await response.json();
    updateTrack(responseJSON);
    setLoading(false);
  };
  const submitAnswer = (artistID) => {
    setAnswered(true);
    setTotalQuestions(totalQuestions + 1);
    if (artistID === track.artist._id) {
      setAnswerCorrect(true);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setAnswerCorrect(false);
    }
  };
  const flagTrack = async (trackID) => {
    await fetch(api.url + api.flagRoute(trackID), {
      method: "POST",
      mode: "no-cors",
    });
    setMessage("Thanks for helping to keep tracks accurate!");
    setTimeout(() => {
      setMessage();
    }, 3000);
    getNewTrack();
  };
  return (
    <div className="App">
      <Header />
      <LyricsCard loading={loading} track={track} getNewTrack={getNewTrack} />
      {answered ? <RevealInfoBox track={track} /> : ""}
      <FlagButton loading={loading} track={track} flagTrack={flagTrack} />
      <AnswerBox
        answered={answered}
        submitAnswer={submitAnswer}
        loading={artists.length > 1 && loading}
        artists={artists}
        nextQuestion={getNewTrack}
      />
      <MessageBox message={message} />
      <ScoreBox
        correctAnswers={correctAnswers}
        totalQuestions={totalQuestions}
      />
      <Footer />
    </div>
  );
}

export default App;
