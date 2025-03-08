import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://13.60.163.190:5000/show_random_meaningg'
})

const ShowWords = () => {



    const fetchWordsAndMeanings = async () => {

        // axios.get('http://13.60.163.190:5000/show_random_meaningg').then( res => {

        //     console.log(res)
        // })

        await fetch('http://13.60.163.190:5000/show_random_meaningg', {
            method: 'GET',
            // headers: {
            //     "Content-Type": "appliction/json"
            // }
            mode: 'no-cors'
        }).then((data) => {
            data.json().then((response) => {
                console.log(response)
            });
        });

    }

    useEffect(() => {

        fetchWordsAndMeanings()

    }, [])



    return (
        <div>
            ShowWords
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

