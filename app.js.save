let currentQuestion = 0; // Tracks the current question
let score = 0; // Tracks the number of questions answered correctly on the first try
let attemptedOnce = false; // Tracks if the user has already attempted the current question
let questions = []; // Placeholder for the questions array

// Function to load the questions from the JSON file
function fetchQuestions() {
    fetch("../questions.json")
        .then((response) => response.json())
        .then((data) => {
            questions = data;
            loadQuestion(); // Load the first question
        })
        .catch((error) => console.error("Error fetching questions:", error));
}

// Function to load a question
function loadQuestion() {
    const questionDiv = document.getElementById("question");
    const optionsList = document.getElementById("options");
    const explanationDiv = document.getElementById("explanation");
    const nextButton = document.getElementById("next-button");
    const successRateDiv = document.getElementById("success-rate");

    // Clear explanation, hide the Next button, and reset styles
    explanationDiv.textContent = "";
    explanationDiv.style.display = "none"; // Hide explanation initially
    explanationDiv.style.backgroundColor = ""; // Reset background color
    nextButton.style.display = "none"; // Hide the Next button initially

    // Reset first attempt tracker
    attemptedOnce = false;

    // Check if there are more questions
    if (currentQuestion < questions.length) {
        // Display the success rate before the new question (if not the first question)
        if (currentQuestion > 0) {
            const successRate = ((score / currentQuestion) * 100).toFixed(2);
            successRateDiv.textContent = `Current Success Rate: ${successRate}%`;
            successRateDiv.style.display = "block"; // Show success rate
        } else {
            successRateDiv.style.display = "none"; // Hide success rate for the first question
        }

        // Update the question and options
        questionDiv.textContent = questions[currentQuestion].text;
        optionsList.innerHTML = ""; // Clear previous options

        questions[currentQuestion].options.forEach((option, index) => {
            const li = document.createElement("li");
            li.textContent = option;

            // Add click event listener to each option
            li.addEventListener("click", () => selectAnswer(index));
            optionsList.appendChild(li);
        });
    } else {
        // Display final success rate after completing all questions
        const finalSuccessRate = ((score / questions.length) * 100).toFixed(2);
        questionDiv.textContent = `You've completed all the questions! Your final success rate: ${finalSuccessRate}%`;
        optionsList.innerHTML = ""; // Clear options
        explanationDiv.style.display = "none"; // Hide explanation
        nextButton.style.display = "none"; // Hide Next button
        successRateDiv.style.display = "none"; // Hide success rate
    }
}

// Function to handle answer selection
function selectAnswer(selectedIndex) {
    const explanationDiv = document.getElementById("explanation");
    const nextButton = document.getElementById("next-button");
    const isCorrect = selectedIndex === questions[currentQuestion].correct;

    // Provide feedback through the explanation box
    if (isCorrect) {
        // Show the explanation
        explanationDiv.textContent = questions[currentQuestion].explanation;
        explanationDiv.style.display = "block"; // Show explanation
        explanationDiv.style.backgroundColor = "rgb(144, 238, 144)"; // Set background color to yellow

        // Increment score if this is the first attempt
        if (!attemptedOnce) {
            score++;
        }

        // Show the Next button
        nextButton.style.display = "inline-block";
    } else {
        explanationDiv.textContent = "Incorrect! Try again.";
        explanationDiv.style.display = "block"; // Show explanation
        explanationDiv.style.backgroundColor = "rgb(241, 126, 126)"; // Set background color to red
        attemptedOnce = true; // Mark that the user has already attempted this question
    }
}

// Event listener for the Next button
document.getElementById("next-button").addEventListener("click", () => {
    currentQuestion++;
    loadQuestion(); // Load the next question
});

// Fetch and load questions when the page loads
fetchQuestions();
