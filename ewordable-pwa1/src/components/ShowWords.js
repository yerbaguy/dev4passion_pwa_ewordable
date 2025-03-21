import React, { useState, useEffect } from 'react'

const ShowWords = () => {
    const [wordData, setWordData] = useState(null);
    const [error, setError] = useState(null);

    const [wordData1, setWordData1] = useState(null);

    //  const [randomMeaningsToTheWord, setRandomMeaningsToTheWord] = useState(null);
    const [randomMeaningsToTheWord, setRandomMeaningsToTheWord] = useState([]);



    const fetchRandomMeanings = async () => {

        try {
            const response = await fetch('http://13.60.163.190:5000/show_random_meanings_to_the_word', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Random meanings to the word:', data);

            setRandomMeaningsToTheWord([data])
            // setRandomMeaningsToTheWord(...randomMeaningsToTheWord, data)
            //setWordData1(data)
            // setWordData(data);
            //  setRandomMeaningsToTheWord(data);
            // data = "lajsdf"
            // setRandomMeaningsToTheWord([...randomMeaningsToTheWord, data])
            // console.log("random-meanings", randomMeaningsToTheWord)
            console.log("randomMeaningsToTheWord", randomMeaningsToTheWord)
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message);
        }

    }

    const fetchWordsAndMeanings = async () => {
        try {
            const response = await fetch('http://13.60.163.190:5000/show_random_meaningg', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Response data:', data);
            setWordData(data);
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message);
        }
    };


    useEffect(() => {

        // console.log("Updated randomMeaningsToTheWord:", randomMeaningsToTheWord);
        fetchWordsAndMeanings()
        fetchRandomMeanings()

    }, [])

  return (
    // <div>
    //   ShowWords

    //       <h1>ShowWords</h1>
    //       {error ? (
    //           <p>Error: {error}</p>
    //       ) : wordData ? (
    //           <div>
    //               <p><strong>Message:</strong> {wordData.message}</p> {/* Adjust based on your actual response */}
    //           </div>
    //       ) : (
    //           <p>Loading...</p>
    //       )}


    // </div>

      <div>
          ShowWords

          <h1>ShowWords</h1>
          {error ? (
              <p>Error: {error}</p>
          ) : wordData ? (
              <div>
                  <p><strong>Message:</strong> {wordData.word}</p> {/* Adjust based on your actual response */}
                  <p><strong>Phonetic:</strong> {wordData.phonetic}</p> 
                  <p><strong>Part Of Speech:</strong> {wordData.partOfSpeech}</p> 
              </div>
              
          ) : (
              <p>Loading...</p>
          )}


        
          


      </div>

  )
}

export default ShowWords


