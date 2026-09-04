
(function(){

  const bank =
    window.NarutoQuizBank ||
    [];


  const qEl =
    document.getElementById(
      "questionText"
    );


  const aEl =
    document.getElementById(
      "answers"
    );


  const scoreEl =
    document.getElementById(
      "quizScore"
    );


  const progressEl =
    document.getElementById(
      "quizProgress"
    );


  const msgEl =
    document.getElementById(
      "quizMessage"
    );


  const nextBtn =
    document.getElementById(
      "nextQuestion"
    );


  const category =
    document.getElementById(
      "categoryFilter"
    );


  const difficulty =
    document.getElementById(
      "difficultyFilter"
    );


  const seenCount =
    document.getElementById(
      "seenCount"
    );


  const remainingCount =
    document.getElementById(
      "remainingCount"
    );


  const resetHistoryButton =
    document.getElementById(
      "resetQuestionHistory"
    );


  const HISTORY_KEY =
    "narutoQuizSeenQuestionIdsV8";


  document.getElementById(
    "bankCount"
  ).textContent =
    bank.length;


  let current =
    null;


  let locked =
    false;


  let sessionScore =
    0;


  let sessionCount =
    0;


  let seenIds =
    loadSeenIds();



  function loadSeenIds(){

    try{

      const saved =
        JSON.parse(
          localStorage.getItem(
            HISTORY_KEY
          ) ||
          "[]"
        );


      if(
        Array.isArray(
          saved
        )
      ){

        return new Set(
          saved
        );

      }

    }catch(
      error
    ){

      console.warn(
        "Istoricul quiz nu a putut fi citit:",
        error
      );

    }


    return new Set();

  }



  function saveSeenIds(){

    try{

      localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(
          Array.from(
            seenIds
          )
        )
      );

    }catch(
      error
    ){

      console.warn(
        "Istoricul quiz nu a putut fi salvat:",
        error
      );

    }

  }



  function markSeen(
    question
  ){

    if(
      !question ||
      !question.id
    ){

      return;

    }


    seenIds.add(
      question.id
    );


    saveSeenIds();

  }



  function baseFiltered(){

    return bank.filter(
      q =>

        (
          category.value ===
            "Toate" ||
          q.category ===
            category.value
        )

        &&

        (
          difficulty.value ===
            "Toate" ||
          q.difficulty ===
            difficulty.value
        )

    );

  }



  function unseenFiltered(){

    return baseFiltered()
      .filter(
        q =>
          !seenIds.has(
            q.id
          )
      );

  }



  function updateHistoryStats(){

    const base =
      baseFiltered();


    const unseen =
      base.filter(
        q =>
          !seenIds.has(
            q.id
          )
      );


    if(
      seenCount
    ){

      seenCount.textContent =
        String(
          seenIds.size
        );

    }


    if(
      remainingCount
    ){

      remainingCount.textContent =
        String(
          unseen.length
        );

    }

  }



  function updateHud(){

    scoreEl.textContent =
      sessionScore +
      " / " +
      sessionCount;


    progressEl.style.width =
      (
        sessionCount
          ? Math.min(
              100,
              (
                sessionScore /
                sessionCount
              ) *
              100
            )
          : 0
      ) +
      "%";


    updateHistoryStats();

  }



  function pickRandom(
    list
  ){

    if(
      !list.length
    ){

      return null;

    }


    return list[
      Math.floor(
        Math.random() *
        list.length
      )
    ];

  }



  function showFinishedState(){

    current =
      null;


    locked =
      true;


    qEl.textContent =
      "Ai terminat toate întrebările nevăzute pentru filtrul ales. 🏆";


    aEl.innerHTML =
      "";


    msgEl.textContent =
      "Schimbă filtrul sau resetează istoricul ca să le poți lua de la început.";


    nextBtn.disabled =
      true;


    updateHud();

  }



  function next(){

    const list =
      unseenFiltered();


    if(
      !list.length
    ){

      showFinishedState();

      return;

    }


    nextBtn.disabled =
      false;


    current =
      pickRandom(
        list
      );


    locked =
      false;


    msgEl.textContent =
      "";


    qEl.textContent =
      current.question;


    aEl.innerHTML =
      "";


    current.options.forEach(
      opt => {

        const b =
          document.createElement(
            "button"
          );


        b.className =
          "answer";


        b.type =
          "button";


        b.textContent =
          opt;


        b.addEventListener(
          "click",
          () =>
            answer(
              b,
              opt
            )
        );


        aEl.appendChild(
          b
        );

      }
    );


    /*
      O considerăm "văzută" când a fost afișată,
      nu doar când utilizatorul răspunde.
      Așa nu reapare nici dacă schimbă pagina.
    */
    markSeen(
      current
    );


    updateHud();

  }



  function answer(
    btn,
    opt
  ){

    if(
      locked ||
      !current
    ){

      return;

    }


    locked =
      true;


    sessionCount++;


    const p =
      NinjaApp.getProfile();


    p.quizAnswered =
      Number(
        p.quizAnswered ||
        0
      ) +
      1;


    if(
      opt ===
      current.answer
    ){

      sessionScore++;


      p.quizCorrect =
        Number(
          p.quizCorrect ||
          0
        ) +
        1;


      p.xp =
        Number(
          p.xp ||
          0
        ) +
        10;


      p.rank =
        NinjaApp.rankFromXP(
          p.xp
        );


      btn.classList.add(
        "correct"
      );


      msgEl.textContent =
        "Corect! +10 XP ⭐";

    }else{

      btn.classList.add(
        "wrong"
      );


      msgEl.textContent =
        "Răspuns corect: " +
        current.answer;

    }


    NinjaApp.saveProfile(
      p
    );


    [
      ...aEl.children
    ].forEach(
      b => {

        b.disabled =
          true;


        if(
          b.textContent ===
          current.answer
        ){

          b.classList.add(
            "correct"
          );

        }

      }
    );


    updateHud();

  }



  [
    "Toate"
  ]
    .concat(
      [
        ...new Set(
          bank.map(
            q =>
              q.category
          )
        )
      ]
        .sort()
    )
    .forEach(
      v => {

        const o =
          document.createElement(
            "option"
          );


        o.value =
          v;


        o.textContent =
          v;


        category.appendChild(
          o
        );

      }
    );



  nextBtn.addEventListener(
    "click",
    next
  );



  category.addEventListener(
    "change",
    function(){

      nextBtn.disabled =
        false;


      next();

    }
  );



  difficulty.addEventListener(
    "change",
    function(){

      nextBtn.disabled =
        false;


      next();

    }
  );



  if(
    resetHistoryButton
  ){

    resetHistoryButton.addEventListener(
      "click",
      function(){

        const ok =
          confirm(
            "Vrei să resetezi toate întrebările văzute? Ele vor putea apărea din nou."
          );


        if(
          !ok
        ){

          return;

        }


        seenIds =
          new Set();


        saveSeenIds();


        nextBtn.disabled =
          false;


        sessionScore =
          0;


        sessionCount =
          0;


        msgEl.textContent =
          "Istoricul a fost resetat. ✅";


        updateHud();


        setTimeout(
          next,
          250
        );

      }
    );

  }



  updateHud();

  next();

})();
