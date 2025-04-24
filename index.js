// let score = 0;
// console.log("\n Bienvenue au Quiz Biblique !" + "\n");

// for (let i = 0; i < questions.length; i++) {
//     let userAnswer = prompt.question (questions[i].question + " ");
//      //nettoie et mettre en minuscule
//     userAnswer = userAnswer.trim().toLowerCase();
//     //verification la réponse
//     if (userAnswer === questions[i].answer) {
//     console.log ("Bonne réponse !" + "\n");
//     score++;
//     }else {
//     console.log ("Mauvaise réponse. La bonne réponse est : "+ questions[i].answer + "\n");
//     }
// }

// console.log("Score final : " + score +" / " + questions.length);
// console.log ("Merci d' avoir joué ! 😉");

//questions et réponses
const prompt = require('prompt-sync')();

const questions = [
  { 
    question: "Quel est le premier livre de la Bible ?", 
    answer: "genèse" 
  },
  { 
    question: "Quel animal a parlé à Ève dans le jardin d'Éden ?", 
    answer: "serpent" 
  },
  { 
    question: "Quel disciple a marché sur l'eau avec Jésus ?", 
    answer: "pierre" 
  },
  { 
    question: "Qui a été avalé par un grand poisson ?", 
    answer: "jonas" 
  },
  { 
    question: "Quel était le métier de David avant de devenir roi ?", 
    answer: "berger" 
  },
  { 
    question: "Combien de jours Dieu a-t-il pris pour créer le monde ?", 
    answer: "6" 
  },
  { 
    question: "Comment s'appelle la mère de Jésus ?", 
    answer: "marie" 
  },
  { 
    question: "Qui a ouvert la mer rouge avec un bâton ?", 
    answer: "moïse" 
  },
  { 
    question: "Quel était le nom du géant vaincu par David ?", 
    answer: "goliath" 
  },
  { 
    question: "Qui est né dans une crèche à Bethléem ?", 
    answer: "jésus" 
  }
];

let score = 0;

function quiz() {
  console.log("\nBienvenue au Quiz Biblique !\n");

  for (let i = 0; i < questions.length; i++) {
    let reponseUtilisateur = prompt(questions[i].question + " ").trim().toLowerCase();

    if (reponseUtilisateur === questions[i].answer) {
      console.log("Bonne réponse !\n");
      score++;
    } else {
      console.log("Mauvaise réponse. La bonne réponse est : " + questions[i].answer + "\n");
    }
  }

  console.log("Score final : " + score + " / " + questions.length);
  console.log("Merci d'avoir joué ! 😉");
}

// Lancer le quiz
quiz();




/* .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px 10px;
    background: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
} */

/* .logo {
    font-size: 32px;
    color: #fff;
    text-decoration: none;
    font-weight: 700;
    filter: drop-shadow(0 0 5px #09001d);
} */

/* .navbar a {
    font-size: 18px;
    color: #fff;
    text-decoration: none;
    font-weight: 500;
    margin-left: 35px;
    transition: .3s;
} */

/* .navbar a:hover,
.navbar a.active {
    color: #c40094;
} */
