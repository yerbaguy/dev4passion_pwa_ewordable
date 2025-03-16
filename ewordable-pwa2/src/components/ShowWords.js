import React, { useState, useEffect } from 'react'


const ShowWords = () => {


    const [ items, setItems ] = useState([]);
    const [ randomMeanings, setRandomMeanings ] = useState([]);
    const [error, setError] = useState(null);

    const [ randomMeaning, setRandomMeaning ] = useState([]);

    const [ concatarrays, setConcatarrays ] = useState([]);

    const [ correct, setCorrect ] = useState([]);

    const addToArray = () => {

        let x = "lkajdsf"

        setItems([...items, x])

    }

    const concattArrays = async () => {

        // let contatenated = concatarrays.concat(randomMeaning + randomMeanings);
        // setConcatarrays([...concatarrays, contatenated]);
        // return concatarrays;

        // let concat = "lajkdf";
        // console.log("concat", concat);

        // const concat = randomMeaning.concat(randomMeanings);

        // setConcatarrays(concatarrays => [...randomMeaning, ...randomMeanings])
        // console.log("concatarrays", concatarrays)

        if (randomMeaning.length > 0 && randomMeanings.length > 0) {
            setConcatarrays([...randomMeaning, ...randomMeanings]);
        }

    }


    const fetchRandomMeaningg = async () => {

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
            console.log('Random meaning to the word:', data);

            setRandomMeaning([...randomMeaning, data])

            // setRandomMeanings([...randomMeanings, data])

            // setRandomMeaningsToTheWord(...randomMeaningsToTheWord, data)
            //setWordData1(data)
            // setWordData(data);
            //  setRandomMeaningsToTheWord(data);
            // data = "lajsdf"
            // setRandomMeaningsToTheWord([...randomMeaningsToTheWord, data])
            // console.log("random-meanings", randomMeaningsToTheWord)

        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message);
        }

    }





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

            setRandomMeanings([...randomMeanings, data])
            // setRandomMeaningsToTheWord(...randomMeaningsToTheWord, data)
            //setWordData1(data)
            // setWordData(data);
            //  setRandomMeaningsToTheWord(data);
            // data = "lajsdf"
            // setRandomMeaningsToTheWord([...randomMeaningsToTheWord, data])
            // console.log("random-meanings", randomMeaningsToTheWord)
            
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message);
        }

    }

    

    useEffect(()=>{

        addToArray()
        console.log("items", items);

        fetchRandomMeaningg()
        console.log("random_meaning", randomMeaning)
       
        fetchRandomMeanings()
        console.log("random_meanings", randomMeanings)

        

       
        concattArrays();

        // let combined = randomMeaning.concat(randomMeanings)
        // console.log("combined", combined)        
       
        // let contatenated = concatarrays.concat(randomMeaning + randomMeanings);
        //  setConcatarrays([...randomMeaning, randomMeanings]);
        //  console.log("concatArrays", concatarrays)

        // let joinarrays = concatarrays.concat( randomMeaning + randomMeanings)
        // console.log("joinarrays", joinarrays)

        // console.log("randomMeaning1", randomMeaning)

        // concattArrays();
        // console.log("contattArrays", concatarrays);

        



    }, [])

    // useEffect(() => {
    //     console.log("Updated concatarrays:", concatarrays);
    // }, [concatarrays]);


    return (
        <div>
            ShowWords

           <ul>
            {
                items.map( item => (
                    <li>{item}</li>
                ))
            }

            
           </ul>


            {/* {
                randomMeaning.map( random_meaning => (
                    <h1>{random_meaning.word}</h1>
                ))   
            } */}

            {/* {randomMeaning.word}
            {randomMeaning.phonetic} */}


            {
                randomMeaning.map( randmeaning => (
                    <li>{randmeaning.word}  {randmeaning.phonetic}</li>
                ))
            }           




            {/* Render randomMeanings */}
            <h3>Random Meanings:</h3>
            {error && <p>Error: {error}</p>}

            {/* {randomMeanings.length === 0 ? (
                <p>Loading meanings...</p>
            ) : (
                <ul>
                    {randomMeanings.map((entry, entryIndex) => (
                        <li key={entryIndex}>
                            <strong>Word:</strong> {entry.word} ({entry.partOfSpeech}) - {entry.phonetic}
                            <ul>
                                {entry.meaning.map((meaning, meaningIndex) => (
                                    <li key={meaningIndex}>
                                        <strong>Definition:</strong> {meaning.definition}
                                        <ul>
                                            {meaning.examples.map((example, exampleIndex) => (
                                                <li key={exampleIndex}>{example}</li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )} */}


            {

                concatarrays.map( items=> (
                    <h4>items</h4>
                ))
            }


           





            










           
    
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
