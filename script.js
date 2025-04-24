// Sélection des éléments HTML nécessaires pour interagir avec l'utilisateur
const startBtn = document.querySelector('.start-btn'); // bouton "Commencer"
const popupInfo = document.querySelector('.popup-info'); // boîte d'information affichée au début
const exitBtn = document.querySelector('.exit-btn'); // bouton pour quitter la popup
const main = document.querySelector('.main'); // section principale de l'accueil
const continueBtn = document.querySelector('.continue-btn'); // bouton "Continuer" après la popup
const quizSection = document.querySelector('.quiz-section'); // section contenant le quiz
const quizBox = document.querySelector('.quiz-box'); // boîte où les questions s'affichent
const resultBox = document.querySelector('.result-box'); // boîte des résultats
const tryAgainBtn = document.querySelector('.tryAgain-btn'); // bouton "Réessayer"
const goHomeBtn = document.querySelector('.goHome-btn'); // bouton "Accueil"

// Lorsque l'utilisateur clique sur "Commencer"
startBtn.onclick = () => {
    popupInfo.classList.add('active'); // affiche la popup
    main.classList.add('active'); // assombrit ou désactive le fond (page principale)
}

// Lorsque l'utilisateur clique sur "Quitter"
exitBtn.onclick = () => {
    popupInfo.classList.remove('active'); // ferme la popup
    main.classList.remove('active'); // réactive la page principale
}

// Lorsque l'utilisateur clique sur "Continuer"
continueBtn.onclick = () => {
    quizSection.classList.add('active'); // montre la section quiz
    popupInfo.classList.remove('active'); // ferme la popup
    main.classList.remove('active'); // réactive la page principale
    quizBox.classList.add('active'); // affiche la boîte de questions

    showQuestions(0); // affiche la première question
    questionCounter(1); // met à jour le compteur de question
    headerScore(); // met à jour le score en haut
}

// Réinitialise le quiz lorsque l'utilisateur clique sur "Réessayer"
tryAgainBtn.onclick = () => {
    quizBox.classList.add('active'); // réaffiche la boîte de quiz
    nextBtn.classList.remove('active'); // cache le bouton "Suivant"
    resultBox.classList.remove('active'); // cache la boîte de résultats

    // Réinitialisation des variables
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    showQuestions(questionCount); // affiche la première question
    questionCounter(questionNumb); // met à jour le compteur
    headerScore(); // remet le score à zéro
}

// Revient à l'accueil depuis les résultats
goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    // Réinitialisation comme "Réessayer"
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    showQuestions(questionCount);
    questionCounter(questionNumb);
}

// Variables de contrôle
let questionCount = 0; // position de la question actuelle
let questionNumb = 1; // numéro visible par l'utilisateur
let userScore = 0; // score actuel

const nextBtn = document.querySelector('.next-btn'); // bouton pour passer à la question suivante

// Lorsqu'on clique sur "Suivant"
nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++; // question suivante
        showQuestions(questionCount); // affiche la nouvelle question

        questionNumb++;
        questionCounter(questionNumb); // met à jour le compteur

        nextBtn.classList.remove('active'); // désactive le bouton jusqu'à réponse
    } else {
        showResultBox(); // si dernière question, affiche les résultats
    }
}

const optionList = document.querySelector('.option-list'); // liste des options pour chaque question

// Affiche une question à partir de son index
function showQuestions(index) {
    const questionText = document.querySelector('.question-text'); // l'élément où la question est affichée
    questionText.textContent = questions[index].numb + '. ' + questions[index].question;

    // Crée dynamiquement les options de réponse
    let optionTag =
        '<div class="option"><span>' + questions[index].options[0] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[1] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[2] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[3] + '</span></div>';

    optionList.innerHTML = optionTag; // insère les options dans le DOM

    // Active la fonction `optionSelected()` lorsqu'on clique sur une option
    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

// Lorsqu'une option est sélectionnée
function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAnswer == correctAnswer) {
        answer.classList.add('correct'); // ajoute une classe verte
        userScore += 1; // ajoute un point
        headerScore(); // met à jour le score
    } else {
        answer.classList.add('incorrect'); // classe rouge
        // sélectionne automatiquement la bonne réponse
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }

    // Empêche de cliquer sur d'autres options après réponse
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.classList.add('active'); // montre le bouton "Suivant"
}

// Met à jour le compteur de question
function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = index + ' sur ' + questions.length + ' Questions';
}

// Met à jour le score dans l'en-tête
function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = 'Score: ' + userScore + ' / ' + questions.length;
}

// Affiche la boîte de résultats
function showResultBox() {
    quizBox.classList.remove('active'); // cache les questions
    resultBox.classList.add('active'); // affiche les résultats

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = 'Tu as obtenu ' + userScore + ' sur ' + questions.length + " 🎉 ";

    // Animation du cercle de progression
    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100; // pourcentage
    let speed = 20; // vitesse de l'animation

    let progress = setInterval(() => {
        progressStartValue++;

        // Affiche la progression en %
        progressValue.textContent = progressStartValue + '%';
        // Anime la barre circulaire avec un dégradé conique
        circularProgress.style.background = 'conic-gradient(#c40094 ' + (progressStartValue * 3.6) + 'deg, rgba(255, 255, 255, .1) 0deg)';

        // Arrête l'animation une fois atteinte
        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }

    }, speed);
}
