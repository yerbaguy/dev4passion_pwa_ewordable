import { useState, useEffect } from 'react';

const ShowWords = () => {
    const [error, setError] = useState(null);
    const [correctMeaning, setCorrectMeaning] = useState(null); // Single correct meaning
    const [incorrectMeanings, setIncorrectMeanings] = useState([]); // Array of incorrect meanings
    const [quizOptions, setQuizOptions] = useState([]); // Combined options for the quiz
    const [selectedOption, setSelectedOption] = useState(null); // User’s selected answer
    const [feedback, setFeedback] = useState(''); // Feedback on correctness

    // const text = "Correct meaning of a word: {correctMeaning.word || 'Unknown Word'} \n Phontic meaning: {correctMeaning.phonetic} ";



    // Fetch the correct meaning
    const fetchRandomMeaningg = async () => {
        try {
            const response = await fetch('http://13.60.163.190:5000/show_random_meaningg', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            console.log('Correct meaning response:', data);
            setCorrectMeaning(data);
            return data;
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message);
            return null;
        }
    };

    // Fetch incorrect meanings
    const fetchRandomMeanings = async () => {
        try {
            const response = await fetch('http://13.60.163.190:5000/show_random_meanings_to_the_word', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            console.log('Incorrect meaning response:', data);
            return data;
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message);
            return null;
        }
    };

    // Prepare quiz options: 1 correct + 2 incorrect meanings
    const prepareQuiz = async () => {
        // Fetch the correct meaning
        const correct = await fetchRandomMeaningg();
        if (!correct) {
            setError('Failed to fetch correct meaning');
            return;
        }

        // Fetch two incorrect meanings
        const incorrects = [];
        for (let i = 0; i < 2; i++) {
            const incorrect = await fetchRandomMeanings();
            if (incorrect) {
                incorrects.push(incorrect);
            } else {
                console.warn(`Failed to fetch incorrect meaning ${i + 1}`);
            }
        }

        console.log('Collected incorrect meanings:', incorrects);

        // Combine into quiz options
        const options = [
            { text: correct.meaning || correct.example || 'Correct meaning missing', isCorrect: true }, // Correct meaning
            ...incorrects.map((item, index) => ({
                text: item["meaning"][0]["definition"] || 'Incorrect meaning missing', // Adjusted based on your fix
                isCorrect: false,
            })),
        ];
        console.log("options", options);

        // Shuffle the options
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        setIncorrectMeanings(incorrects);
        setQuizOptions(options);
        setSelectedOption(null); // Reset selection
        setFeedback(''); // Reset feedback
    };

    // Handle user selection with auto-next on correct answer
    const handleOptionClick = (option) => {
        setSelectedOption(option);
        if (option.isCorrect) {
            setFeedback('Correct!');
            // Automatically fetch new word after a short delay
            setTimeout(() => {
                prepareQuiz();
            }, 1500); // 1.5-second delay to show feedback
        } else {
            setFeedback('Incorrect. Try again!');
        }
    };

    // Fetch data and prepare quiz on mount
    useEffect(() => {
        prepareQuiz();
    }, []);


    const text1 = "lkjasdf";

    return (
        <div style={{ padding: '20px' }}>
            {/* <h1>Guess the Correct Meaning</h1> */}
            <h1>guess meaning of a word</h1>

            {/* const text = 'Correct meaning of a word: {correctMeaning.word || 'Unknown Word'} \n Phontic meaning: {correctMeaning.phonetic} '; */}

            {/* Display error if any */}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {/* Display the word */}
            {correctMeaning && (
                // <h2>Word: {correctMeaning.word || 'Unknown Word'}</h2>
                // <h4>{correctMeaning.word || 'Unknown Word'}
                //      {correctMeaning.phonetic}</h4>

                <div>
                    a word to guess the meaning of: <strong>{correctMeaning.word || 'Unknown Word'} </strong><br />
                    phonetics of this word: <stong>{correctMeaning.phonetic || 'N/A'} </stong>
                </div>
               
               
                
                
            )}

            {/* Clickable list of options */}
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {quizOptions.length > 0 ? (
                    quizOptions.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            style={{
                                padding: '10px',
                                margin: '5px 0',
                                backgroundColor:
                                    selectedOption === option
                                        ? option.isCorrect
                                            ? '#d4edda' // Green for correct
                                            : '#f8d7da' // Red for incorrect
                                        : '#f1f1f1',
                                cursor: 'pointer',
                                borderRadius: '5px',
                                border: '1px solid #ccc',
                            }}
                        >
                            {option.text}
                        </li>
                    ))
                ) : (
                    <p>Loading options...</p>
                )}
            </ul>

            {/* Feedback */}
            {feedback && (
                <p style={{ color: feedback === 'Correct!' ? 'green' : 'red' }}>
                    {feedback}
                </p>
            )}

            {/* Optional: Keep the button for manual refresh if needed */}
            {/* <button
                onClick={prepareQuiz}
                style={{ marginTop: '20px', padding: '10px 20px' }}
            >
                Next Word (Manual)
            </button> */}
        </div>
    );
};

export default ShowWords;