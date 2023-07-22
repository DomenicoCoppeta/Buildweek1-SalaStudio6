const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: [
      "Ice Cream Sandwich",
      "Jelly Bean",
      "Marshmallow",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

// Caricamento della pagina
window.onload = function () {

  // Identifico gli elementi nel DOM
  const title = document.getElementsByClassName("question");
  const divForm = document.getElementById("form");
  const questionNumber = document.getElementById("questionNumber")
  const numQuestions = document.getElementById("numQuestions")
  const timer = document.getElementById("timer")
  const submitButton = document.getElementById("submit")
  const circularProgress = document.getElementById("circular-progress")

  // Variabili
  let punteggio = 0;
  let numDomande = questions.length;
  let currentQuestionIndex = 0;
  let time = 10; // Durata della domanda in Secondi
  let seconds = time; // Variabile temporanea per la funzione startTimer()
  let timerInterval; // Variabile temporanea per la funzione startTimer()

  // Funzioni

  // Funzione: creazione dell'array con tutte le risposte
  function allAnswers(object) {
    let array = object.incorrect_answers
    array.push(object.correct_answer)
    return array
  }

  // Funzione: creazione array con risposte in ordine casuale
  function mescola(arrayMain) {
    let array = arrayMain.slice();
    let currentIndex = array.length, temporaryValue, randomIndex; 
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1; 
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array
  }

  // Funzione: cambio titolo della pagina
  function changeTitle(object, currentIndex) {
    title[0].innerText = object[currentIndex].question
  }

  // Funzione: cerca se almento un radio button è selezionato
  function areAllRadioButtonsUnchecked(radioButtons) {
    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        return false; // Almeno uno è selezionato, restituisce false
      }
    }
    return true; // Nessuno è selezionato, restituisce true
  }

  // Funzione:
  function checkAnswers(object, currentIndex) {
    const selectedAnswer = document.querySelector("input[type=radio]:checked");
    const radioButtons = document.querySelectorAll("input[type=radio][name=answer]");

    if (selectedAnswer) {
      const selectedValue = selectedAnswer.value;

      if (!areAllRadioButtonsUnchecked(radioButtons)) {
        if (selectedValue === object[currentIndex].correct_answer) {
          punteggio += 1;
        }
      }
    } else {
      // Nessuna risposta selezionata, non fare nulla
    }
  }

  // Funzione: creazione domande e pulsanti
  function showQuestions(object, currentIndex) {
    title[0].innerText = ""; // Pulisco il titolo della domanda
    divForm.innerHTML = ""; // Pulisco il form dei pulsanti
    title[0].innerText = object[currentIndex].question // Assegno il testo della domanda
    let vettore2 = []
    vettore2 = mescola(allAnswers(object[currentIndex])) // Prendo tutte le domande e le mescolo
    changeTitle(object, currentIndex) // Assegno il titolo della domanda

    // Ciclo per creare i pulsanti
    for (let i = 0; i < vettore2.length; i++) {
      // Creo il pulsante
      let input = document.createElement("input");
      input.value = vettore2[i];
      input.type = "radio";
      input.name = "answer";
      // Creo il label
      let label = document.createElement("label");
      // Creo span1
      let span1 = document.createElement("span");
      span1.classList.add("custom-radio")
      // Creo span2
      let span2 = document.createElement("span");
      span2.classList.add("option-label")
      span2.innerText = vettore2[i];
      // Inserico il pulsante
      divForm.appendChild(label);
      label.appendChild(input);
      label.appendChild(span1);
      span1.appendChild(span2);
    }
  }

  // Funzione: iniziare il timer
  function startTimer() {
    timerInterval = setInterval(function () {
      seconds--; 
      if (seconds < 0) {
        clearInterval(timerInterval);
        timer.innerText = time // In modo che venga visualizzato subito il testo del timer
        // Simula il click sul pulsante submit 
        const event = new Event("click");
        submitButton.dispatchEvent(event);
      } else {
        timer.innerHTML = seconds; // Aggiorna il testo del timer 
      }
    }, 1000);
  }

  // Funzione: chiudi il timer
  function stopTimer() {
    clearInterval(timerInterval);
  }

  // Carico la prima domanda e inizializzo il timer
  timer.innerText = time // In modo che venga visualizzato subito il testo del timer
  showQuestions(questions, currentQuestionIndex)
  questionNumber.innerText = "QUESTION   " + (currentQuestionIndex + 1);
  numQuestions.innerText = '/' + numDomande;
  startTimer();

  submitButton.addEventListener("click", function (event) {
    if (currentQuestionIndex < numDomande) {

      // Se ci sono ancora domande: part 1
      checkAnswers(questions, currentQuestionIndex); // Valuto la risposta alla domanda
      currentQuestionIndex += 1; // Aggiorno la prossima domanda
      stopTimer(); // Fermo e cancello il timer precedente

      // Se le domande sono terinate
      if (currentQuestionIndex === numDomande) {
        // Mostra il punteggio finale nel titolo
        title[0].innerText = ""; // Rimuovo il titolo della domanda
        questionNumber.innerText = ""; // Rimuovo il numero della domanda
        numQuestions.innerText = ""; // // Rimuovo il totale delle domande
        divForm.innerText = ""; // Rimuovo il form dei pulsanti
        title[0].innerText = "Exam completed! Your total score is: " + punteggio + " out of " + numDomande;
        submitButton.style.display = "none"; // Rimuovo il messaggio "Timer"
        timer.style.display = "none"; // Rimuovo il messaggio "Timer"
        circularProgress.style.display = "none"; // Rimuovo il messaggio "Circular Progress"

      // Se ci sono ancora domande: part 2
      } else { 
        timer.innerText = time // In modo che venga visualizzato subito il testo del timer
        seconds=time; // Rinserisco i secondi nella domanda
        startTimer(); // Rinizializzo il timer
        title[0].innerText = ""; // Rimuovo il titolo della domanda
        questionNumber.innerText = ""; // Rimuovo il numero della domanda
        numQuestions.innerText = ""; // Rimuovo il totale delle domande
        showQuestions(questions, currentQuestionIndex); // Aggiungo la domanda nella pagina
        questionNumber.innerText = "QUESTION   " + (currentQuestionIndex + 1); // Aggiungo il numero della domanda nella pagina
        numQuestions.innerText = '/' + numDomande; // Aggiungo il totale di domande
      }
    }
  });
}