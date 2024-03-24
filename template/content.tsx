import React from "react";

const content = () => {
  return (
    <div className="flex flex-col">
      <h1>Fälle</h1>
      <div>
        <h2>Nominativ</h2>
        <p>
          der Wer-Fall, bezieht sich auf das Subjekt: Der Mann geht über die
          Straße.
        </p>
        <h2>Genitiv</h2>
        <p>
          der Wessen-Fall, bezieht sich meist auf ein präpositionales Objekt:
          Der Schirm des Mannes flog davon.
        </p>
        <h2>Dativ</h2>
        <p>
          der Wem-Fall, bezieht sich auf ein indirektes oder ein präpositionales
          Objekt: Maria gab dem Mann einen Zettel.
        </p>
        <h2>Akkusativ</h2>
        <p>
          der Wen-Fall, bezieht sich auf ein direktes oder ein präpositionales
          Objekt: Sie hätte den Mann fast übersehen.
        </p>
      </div>
    </div>
  );
};

export default content;
