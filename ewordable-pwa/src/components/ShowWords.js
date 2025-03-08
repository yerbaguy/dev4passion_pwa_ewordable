import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://13.60.163.190:5000/show_random_meaningg'
})

const ShowWords = () => {

    const [wordData, setWordData] = useState(null);
    const [error, setError] = useState(null);



    // const fetchWordsAndMeanings = async () => {

    //     // axios.get('http://13.60.163.190:5000/show_random_meaningg').then( res => {

    //     //     console.log(res)
    //     // })

    //     await fetch('http://13.60.163.190:5000/show_random_meaningg', {
    //         method: 'GET',
    //         // headers: {
    //         //     "Content-Type": "appliction/json"
    //         // }
    //         mode: 'no-cors'
    //     }).then((data) => {
    //         data.json().then((response) => {
    //             console.log(response)
    //         });
    //     });

    // }

    const fetchWordsAndMeanings = async () => {
        try {
            const response = await fetch('http://13.60.163.190:5000/show_random_meaningg', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json', // Optional, but good practice
                },
                // Remove mode: 'no-cors' to allow access to response body
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

        fetchWordsAndMeanings()

    }, [])



    return (
        <div>
            ShowWords

            <h1>ShowWords</h1>
            {error ? (
                <p>Error: {error}</p>
            ) : wordData ? (
                <div>
                    <p><strong>Word:</strong> {wordData.word}</p>
                    <p><strong>Phonetic:</strong> {wordData.phonetic}</p>
                    <p><strong>Part of Speech:</strong> {wordData.partOfSpeech}</p>
                    <p><strong>Meaning:</strong> {wordData.meaning}</p>
                    <p><strong>Example:</strong> {wordData.example}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}


// function ShowWords() {
//   return (
//     <div>
      
//     </div>
//   )
// }

export default ShowWords

