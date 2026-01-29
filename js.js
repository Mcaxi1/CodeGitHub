    const easyQuestions = [
        { question: "2 + 2 = ?", answers: ["3", "4", "5"], correct: 1 },
        { question: "Welche Farbe hat der Himmel?", answers: ["Blau", "Grün", "Rot"], correct: 0 },
        { question: "Wie viele Tage hat eine Woche?", answers: ["5", "7", "10"], correct: 1 },
        { question: "Welches Tier miaut?", answers: ["Hund", "Katze", "Kuh"], correct: 1 },
        { question: "Wie viele Beine hat ein Mensch?", answers: ["2", "4", "6"], correct: 0 },
        { question: "Welche Zahl kommt nach 5?", answers: ["4", "6", "7"], correct: 1 },
        { question: "Was trinkt man?", answers: ["Wasser", "Stein", "Sand"], correct: 0 },
        { question: "Welche Jahreszeit ist kalt?", answers: ["Sommer", "Winter", "Frühling"], correct: 1 },
        { question: "Wie viele Kontinente gibt es?", answers: ["5", "6", "7"], correct: 2 },
        { question: "Was ist die Hauptstadt von Deutschland?", answers: ["Berlin", "Hamburg", "Köln"], correct: 0 }
    ];

    const hardQuestions = [
        { question: "Wie viele Minuten hat ein Tag?", answers: ["1440", "1240", "1340"], correct: 0 },
        { question: "Was ist die Wurzel aus 144?", answers: ["10", "11", "12"], correct: 2 },
        { question: "Welches Element hat das Symbol O?", answers: ["Gold", "Sauerstoff", "Silber"], correct: 1 },
        { question: "Wie viele Bits hat ein Byte?", answers: ["4", "8", "16"], correct: 1 },
        { question: "Was ist kein Planet?", answers: ["Mars", "Pluto", "Venus"], correct: 1 },
        { question: "Wer schrieb Faust?", answers: ["Schiller", "Goethe", "Kafka"], correct: 1 },
        { question: "Wie viele Nullen hat eine Million?", answers: ["5", "6", "7"], correct: 1 },
        { question: "Was ist H2O?", answers: ["Wasser", "Sauerstoff", "Wasserstoff"], correct: 0 },
        { question: "Wie viele Seiten hat ein Würfel?", answers: ["4", "6", "8"], correct: 1 },
        { question: "Was ist schneller?", answers: ["Schall", "Licht", "Wind"], correct: 1 }
    ];

    let quizData = [];
    let currentQuestion = 0;
    let score = 0;

    function startQuiz(level) {
        quizData = level === "easy" ? easyQuestions : hardQuestions;
        document.getElementById("start").style.display = "none";
        document.getElementById("quiz").style.display = "block";
        loadQuestion();
    }

    function loadQuestion() {
        const q = quizData[currentQuestion];
        document.getElementById("question").innerText = q.question;

        const answersDiv = document.getElementById("answers");
        answersDiv.innerHTML = "";

        q.answers.forEach((answer, index) => {
            answersDiv.innerHTML += `
                <label>
                    <input type="radio" name="answer" value="${index}">
                    ${answer}
                </label>
            `;
        });
    }

    function nextQuestion() {
        const selected = document.querySelector('input[name="answer"]:checked');
        if (!selected) return;

        if (parseInt(selected.value) === quizData[currentQuestion].correct) {
            score++;
        }

        currentQuestion++;

        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            document.getElementById("quiz").style.display = "none";
            document.getElementById("result").innerText =
                `Du hast ${score} von ${quizData.length} Fragen richtig!`;
        }
    }