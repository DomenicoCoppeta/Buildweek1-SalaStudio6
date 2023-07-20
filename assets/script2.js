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
window.onload = function() {


  // Identificare gli elementi nel DOM
  const title = document.getElementsByClassName("question");
  const divForm = document.getElementById("form");
  const divCheck = document.getElementById("divResult")
  const questionNumber = document.getElementById("questionNumber")
  const numQuestions = document.getElementById("numQuestions")


  // Creo le variabili
  let punteggio = 0
  let numDomande = questions.length
  let currentQuestionIndex = 0


  // FUNZIONE CREAZIONE ARRAY CON TUTTE LE RISPOSTE
  function allAnswers (object) {
    let array = object.incorrect_answers
    array.push(object.correct_answer)
    return array
  }

  // FUNZIONE CREAZIONE ARRAY DOMANDE CASUALI
  function mescola(arrayMain) {
    let array = arrayMain.slice()
    let currentIndex = array.length, temporaryValue, randomIndex; // Ci prendiamo la lunghezza dell'array e partiamo dal fondo!
    // Finché ci sono elementi da mescolare, iteriamo l'array
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex); // Prendiamo un indice a caso dell'array, purché sia compreso tra 0 e la lunghezza dell'array
        currentIndex -= 1; // Riduciamo di un'unità l'indice corrente
        
        // Una volta che abbiamo preso l'indice casuale, invertiamo l'elemento che stiamo analizzando alla posizione corrente (currentIndex) con quello alla posizione presa casualmente (randomIndex)
        temporaryValue = array[currentIndex];     // Variabile temporanea
        array[currentIndex] = array[randomIndex];    // Eseguiamo lo scambio
        array[randomIndex] = temporaryValue;
    }
    return array    
  }


  // FUNZIONE CAMBIARE IL TITOLO
  function changeTitle (object,currentIndex) {
    title[0].innerText = object[currentIndex].question
  }

    // FUNZIONE CONTROLLARE RISPOSTE
    function checkAnswers (object,currentIndex) {
      //let selectedAnswer = document.querySelector("input[type=radio]:checked");
      let selectedAnswer = document.querySelector("input[type=radio]:checked").value;
  
      if (selectedAnswer) {
          let selectedValue = selectedAnswer;
  
          if (selectedValue === object[currentIndex].correct_answer) {
              divCheck.innerText = "Correct";
              punteggio += 1
          } else {
              divCheck.innerText = "Incorrect";
          }
      } else {
          divCheck.innerText = "Please select an answer.";
      }
    };

  // FUNZIONE CREAZIONE DOMANDE E PULSANTI
  function showQuestions (object,currentIndex) {

    // Assegno il testo della domanda
    title[0].innerText = object[currentIndex].question
    
    // Prendo tutte le domande e le mescolo
    let vettore = []
    let vettore2 = []
    vettore = allAnswers(object[currentIndex])
    vettore2 = mescola(vettore)
    divForm.innerHTML = ""

    changeTitle(object,currentIndex)

    // Ciclo per creare i pulsanti
    for (let i = 0; i < vettore2.length; i++) {
        
        let input = document.createElement("input");
        input.value = vettore2[i];
        input.type = "radio";
        input.name = "answer";
        
        let label = document.createElement("label");

        let span1 = document.createElement("span");
        span1.classList.add("custom-radio")
        
        let span2 = document.createElement("span");
        span2.classList.add("option-label")
        span2.innerText = vettore2[i];

        divForm.appendChild(label);
        label.appendChild(input);
        label.appendChild(span1);
        span1.appendChild(span2);
    }

    setInterval(function() {
      checkAnswers(object,currentIndex);
    }, 100)

    // Passa alla domanda successiva
    //currentQuestionIndex += 1
  }

  // FUNZIONE CONTROLLARE RISPOSTE
  function checkAnswers (object,currentIndex) {
    //let selectedAnswer = document.querySelector("input[type=radio]:checked");
    let selectedAnswer = document.querySelector("input[type=radio]:checked").value;

    if (selectedAnswer) {
        let selectedValue = selectedAnswer;

        if (selectedValue === object[currentIndex].correct_answer) {
            divCheck.innerText = "Correct";
            punteggio += 1
        } else {
            divCheck.innerText = "Incorrect";
        }
    } else {
        divCheck.innerText = "Please select an answer.";
    }
  };

  // FUNZIONE PER CAMBIARE DOMANDA
  function changeQuestion() {
    if (currentQuestionIndex < numDomande) {
      showQuestions(questions, currentQuestionIndex);
      divCheck.innerText = ""; // Resetta il messaggio "Correct" o "Incorrect"
      currentQuestionIndex++; // Passa alla prossima domanda
      questionNumber.innerText = currentQuestionIndex;
      numQuestions.innerText = "/" + numDomande;
    } else {
      // Hai finito tutte le domande, esegui la ricarica della pagina
      console.log("Hai finito tutte le domande!");
      window.location.reload();
    }
  }

  // Mostra la prima domanda dopo 3 secondi
  setInterval(changeQuestion, 5000);

};