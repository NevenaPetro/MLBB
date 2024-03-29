import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { applicationContext } from "../../src/context/AplicationContext";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { useLocation } from "react-router-dom";
import GameItemRaspored from "../components/GameItemRaspored";
import GameItemRezultati from "../components/GameItemRezultati";
import TableItem from "../components/Table/TableItem";
import "./_homepage.scss";
import { SearchSharp } from "@mui/icons-material";
import { storage } from "../firebase.config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function HomePage() {
  let data = useLocation();

  const {
    games,
    seasons,
    teams,
    setCreateGameModalData,
    setCreateTeamModalData,
    setEditTeamModalData,
    setDeleteTeamModalData,
  } = useContext(applicationContext);
  const { loggedIn, checkingStatus } = useAuthStatus();
  const [selectedSeason, setSelectedSeason] = useState(0);
  const [tableList, setTableList] = useState([]);
  const [imageToUpload, setImageToUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  const imageListRef = ref(storage, "images/");

  const handleSeasonSelect = (e) => {
    e.target.value && setSelectedSeason(e.target.value);
  };

  const uploadImage = () => {
    if (imageToUpload == null) return;
    const imageRef = ref(storage, `images/${imageToUpload.name + v4()}`);
    uploadBytes(imageRef, imageToUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    let serverImages = [];
    listAll(imageListRef).then((response) => {
      /* if (response.items) {setImageList([])}*/
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          if (serverImages.find((el) => el == url)) {
          } else {
            serverImages.push(url);
          }
        });
      });
      setImageList(serverImages);
    });
  }, []);

  useEffect(() => {
    let section = data.state ? data.state.section : null;

    if (section && section !== "ignore") {
      const element = document.getElementById(section);
      if (element) {
        data.state.section = "ignore";
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    } else if (section !== "ignore") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  });

  /*Puts last season to be selected when page is loaded*/
  useEffect(() => {
    const seasonNow = seasons && seasons[seasons.length - 1];
    seasonNow && setSelectedSeason(seasonNow.id);
  }, [seasons]);

  useEffect(() => {
    let finishedGames = games.filter((e) => e.played);
    let gamesInSeason = finishedGames.filter((e) => e.season == selectedSeason);
    let tableListTemp = [];
    gamesInSeason.forEach((game) => {
      let existing1 = tableListTemp.find((e) => e.teamId === game.team1);
      let existing2 = tableListTemp.find((e) => e.teamId === game.team2);
      let teamWins;
      let teamLoses;
      let teamPoints;
      if (game.scoreTeam1 > game.scoreTeam2) {
        teamWins = 1;
        teamLoses = 0;
        teamPoints = 2;
      } else {
        if (game.presenceTeam1) {
          teamWins = 0;
          teamLoses = 1;
          teamPoints = 1;
        } else {
          teamWins = 0;
          teamLoses = 1;
          teamPoints = 0;
        }
      }
      if (existing1) {
        existing1.gamesPlayed += 1;
        existing1.wins = existing1.wins + teamWins;
        existing1.loses = existing1.loses + teamLoses;
        existing1.points = existing1.points + teamPoints;
        existing1.pointsReceived = existing1.pointsReceived + game.scoreTeam2;
        existing1.pointsScored = existing1.pointsScored + game.scoreTeam1;
        existing1.pointsDifference =
          existing1.pointsDifference + (game.scoreTeam1 - game.scoreTeam2);
      } else {
        tableListTemp.push({
          teamId: game.team1,
          gamesPlayed: 1,
          wins: teamWins,
          loses: teamLoses,
          points: teamPoints,
          pointsReceived: +game.scoreTeam2,
          pointsScored: +game.scoreTeam1,
          pointsDifference: +(game.scoreTeam1 - game.scoreTeam2),
        });
      }
      if (game.scoreTeam2 > game.scoreTeam1) {
        teamWins = 1;
        teamLoses = 0;
        teamPoints = 2;
      } else {
        if (game.presenceTeam2) {
          teamWins = 0;
          teamLoses = 1;
          teamPoints = 1;
        } else {
          teamWins = 0;
          teamLoses = 1;
          teamPoints = 0;
        }
      }
      if (existing2) {
        existing2.gamesPlayed += 1;
        existing2.wins = existing2.wins + teamWins;
        existing2.loses = existing2.loses + teamLoses;
        existing2.points = existing2.points + teamPoints;
        existing2.pointsReceived = existing2.pointsReceived + game.scoreTeam1;
        existing2.pointsScored = existing2.pointsScored + game.scoreTeam2;
        existing2.pointsDifference =
          existing2.pointsDifference + (game.scoreTeam2 - game.scoreTeam1);
      } else {
        tableListTemp.push({
          teamId: game.team2,
          gamesPlayed: 1,
          wins: teamWins,
          loses: teamLoses,
          points: teamPoints,
          pointsReceived: +game.scoreTeam1,
          pointsScored: +game.scoreTeam2,
          pointsDifference: +(game.scoreTeam2 - game.scoreTeam1),
        });
      }
    });
    tableListTemp.sort((a, b) => b.points - a.points);
    setTableList(tableListTemp);
  }, [games, selectedSeason]);

  return (
    <div className="homepage-wrapper">
      <div id="welcomepage-wrapper">
        <div className="background-1"></div>
        <h1>
          <span className="big-letter">M</span>
          <span>ala&nbsp;</span>
          <span className="big-letter">L</span>
          <span>iga&nbsp;</span>
          <span className="big-letter">B</span>
          <span>ez&nbsp;</span>
          <span className="big-letter">B</span>
          <span>riga&nbsp;</span>
        </h1>
      </div>
      <section id="raspored">
        <h2>Raspored</h2>
        <ul>
          {games &&
            games.map(
              (e) =>
                !e.played && (
                  <li key={e.id}>
                    <GameItemRaspored item={e}></GameItemRaspored>
                  </li>
                )
            )}
        </ul>
        {loggedIn && (
          <div className="big-buttons">
            <button
              className="big-btn"
              onClick={() => {
                setCreateGameModalData(1);
              }}
            >
              Zakaži novu utakmicu:
            </button>
          </div>
        )}
      </section>
      <section id="rezultati">
        <div className="background-2"></div>
        <h2>Rezultati</h2>
        <ul>
          {games &&
            games.filter((e) => e.season == seasons[seasons.length-1].id).map(
              (e) =>
                e.played && (
                  <li key={e.id}>
                    <GameItemRezultati item={e}></GameItemRezultati>
                  </li>
                )
            )}
        </ul>
      </section>
      <section id="tabela">
        <div className="tabela-wrapper">
          <h2>Tabela</h2>
          {seasons.map((e) => {
            return (
              <button
                className={`season-btn ${
                  selectedSeason === e.id && "season-selected"
                }`}
                key={e.id}
                value={e.id}
                onClick={handleSeasonSelect}
              >
                {e.name}
              </button>
            );
          })}

          <table>
            <tbody>
              <tr>
                <th>TIM</th>
                <th>ODIGR.</th>
                <th>POB.</th>
                <th>POR.</th>
                <th>KOŠ+</th>
                <th>KOŠ-</th>
                <th>RAZ.</th>
                <th>BOD.</th>
              </tr>

              {tableList &&
                tableList.map((e) => (
                  <tr key={e.teamId}>
                    <TableItem item={e}></TableItem>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
      <section id="timovi">
        <div className="timovi-wrapper">
          <div className="background-3"></div>
          <h2>Timovi</h2>

          <ul>
            {teams &&
              teams.map((e) => (
                <li key={e.id}>
                  <p>{e.name}</p>
                  {loggedIn && (
                    <div className="big-buttons">
                      <button
                        className="big-btn"
                        onClick={() => {
                          setDeleteTeamModalData(e);
                        }}
                      >
                        Obriši
                      </button>
                      <button
                        className="big-btn"
                        onClick={() => {
                          setEditTeamModalData(e);
                        }}
                      >
                        Izmeni
                      </button>
                    </div>
                  )}
                </li>
              ))}
          </ul>
          {loggedIn && (
            <div className="in-front-from-background">
              <div className="big-buttons">
                <button
                  className="big-btn"
                  onClick={() => {
                    setCreateTeamModalData(1);
                  }}
                >
                  Kreiraj novi tim
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      <section id="media">
        <div className="media-wrapper">
          <h2>Media</h2>
          <div className="images">
            {imageList &&
              imageList.map((url) => <img key={url + v4()} src={url} />)}
          </div>
          <div className="input-choose-file-wrapper">
            {loggedIn && (
              <>
                <div className="input-choose-file">
                  <input
                    type="file"
                    onChange={(event) => {
                      setImageToUpload(event.target.files[0]);
                    }}
                  />
                </div>
                <div className="big-buttons">
                  <button className="big-btn" onClick={uploadImage}>
                    Ubaci sliku/video
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <section id="onama">
        <div className="onama-wrapper">
          <h2>O nama</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ullam
            ab iste optio eum eligendi distinctio laborum atque ea commodi modi
            consectetur, quasi ipsa id dolorum rem explicabo? Impedit porro
            velit maxime labore sed inventore rem nobis architecto illum,
            voluptates modi magnam, nam et! Nihil modi voluptates, eum, quos
            nesciunt commodi ratione sequi, quas mollitia ut labore dignissimos.
            Quo quisquam eligendi nostrum voluptatem modi tempore suscipit.
            Itaque nam minus eaque optio illo dignissimos iusto delectus,
            obcaecati accusamus deserunt dicta labore voluptate cupiditate quo
            modi aliquid! Eum, consequatur, aliquid neque dolore rerum cum, quis
            consequuntur ullam optio laudantium nesciunt voluptas sint?
          </p>
          <br />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est ullam
            ab iste optio eum eligendi distinctio laborum atque ea commodi modi
            consectetur, quasi ipsa id dolorum rem explicabo? Impedit porro
            velit maxime labore sed inventore rem nobis architecto illum,
            voluptates modi magnam, nam et! Nihil modi voluptates, eum, quos
            nesciunt commodi ratione sequi, quas mollitia ut labore dignissimos.
            Quo quisquam eligendi nostrum voluptatem modi tempore suscipit.
            Itaque nam minus eaque optio.
          </p>
        </div>
      </section>
      <section id="kontakt">
        <h2>Kontakt</h2>
        <div className="kontakt-wrapper">
          <h3>Telefoni:</h3>
          <p>+381 65 434 7600</p>
          <p>+381 63 592 290</p>
          <h3>Email:</h3>
          <p>banija003@gmail.com</p>
          <p>5ra.bojan.petrovic@gmail.com</p>
          <h3>Lokacije:</h3>
          <div className="map-wrapper">
            <div>
              <p>
                1. BTC Basketball Training Center <br /> Olimpijskih igara 14,
                Žarkovo, Beograd
              </p>
              <iframe
                className="contact-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d538.1932239067459!2d20.423558727832877!3d44.76190296188467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a71da3d5fd06d%3A0xf9ce1ef300494bcc!2sBTC%20Basketball%20Training%20Center!5e1!3m2!1sen!2srs!4v1687266162511!5m2!1sen!2srs"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div>
              <p>
                2. Osnovna škola „Jovan Ristić“ <br /> Bele Bartoka 48a, Borča,
                Beograd
              </p>
              <iframe
                className="contact-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5653.7252700249755!2d20.449093207875553!3d44.87491365398277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a648433dbc4a3%3A0x61ec9d3c4114bab4!2zT3Nub3ZuYSDFoWtvbGEg4oCeSm92YW4gUmlzdGnEh-KAnA!5e1!3m2!1sen!2srs!4v1687266991291!5m2!1sen!2srs"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
