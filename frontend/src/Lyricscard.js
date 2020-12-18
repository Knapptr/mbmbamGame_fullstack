import React from "react";

const lyricsText = (stanza) => {
  return stanza
    .map((line, index) => <p key={`line${index}`}>{line}</p>)
    .splice(0, 9);
};
const LyricsCard = (props) => {
  const splitIntoStanzasAndRandomlySelect = (lyrics) => {
    lyrics = lyrics.replace(/\.\.\./, "");
    let stanzas = lyrics.split(/\n\n/);
    console.log(stanzas);
    stanzas = stanzas.filter((stanza) => stanza !== "");
    console.log(stanzas);
    //split each into lines- keep in place
    stanzas = stanzas
      .map((stanza) => stanza.split(/\n/).filter((line) => line.length > 1))
      .filter((stanza) => stanza.length > 1);
    if (stanzas.length < 1) {
      props.getNewTrack();
    } else {
      console.log(stanzas);
      return stanzas[Math.floor(Math.random() * stanzas.length)];
    }
  };
  return (
    <div>
      <p>lines go here</p>
      {!props.loading
        ? lyricsText(splitIntoStanzasAndRandomlySelect(props.track.lyrics))
        : ""}
    </div>
  );
};

export default LyricsCard;
