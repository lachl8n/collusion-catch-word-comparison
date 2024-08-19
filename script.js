/*======================================================================================================================================================================================================================================================================================================================================
Declaring Global Variables
======================================================================================================================================================================================================================================================================================================================================*/
// Declaring global variables outside of the main program so it can be accessible throughout the entire program.
let wordSentenceA = ''; // Declaring string variable to hold the first sentence.
let wordSentenceB = '' // Declaring string variable to hold the second sentence.

let wordsArrayA = []; // Declaring an array to hold the words for the first sentence.
let wordsArrayB = []; // Declaring an array to hold the words for the second sentence.

//The following code is used to create a word and character count which updates using an event listener for input in the textarea fields.
let sentenceA = document.querySelector("#sentenceA"); // Declare a variable to hold the user input in the text area
let wordCountA = document.querySelector("#wordCountA"); // Declare a variable holding the location of where the word count will be displayed.
let charCountA = document.querySelector("#charCountA"); // Declare a variable holding the location of where the character count will be displayed.
let charCountNoSpaceA = 0; // Declare a variable that will hold the number of characters without the spaces.
            
wordCharCount(sentenceA, charCountA, wordCountA); // Calls a function to count the number of characters and words in the sentence.

let sentenceB = document.querySelector("#sentenceB"); // Declare a variable to hold the user input in the text area
let wordCountB = document.querySelector("#wordCountB"); // Declare a variable holding the location of where the word count will be displayed.
let charCountB = document.querySelector("#charCountB"); // Declare a variable holding the location of where the character count will be displayed.
let charCountNoSpaceB = 0; // Declare a variable that will hold the number of characters without the spaces.

wordCharCount(sentenceB, charCountB, wordCountB); // Calls a function to count the number of characters and words in the sentence.

document.addEventListener('scroll', () => { // Using an event listener, the program checks the user's position on the page whenever they scroll to determine whether the button to go back to the top is needed.
    if (window.scrollY !== 0) { // An if statement is used to test whether the number of pixels scrolled vertically is not 0 (i.e. not at the top).
        document.querySelector("#scrollUpButton").style.opacity = "100%"; // If the user is not at the top of the page, the program will set the "opacity" property of the "scroll up" button to 100%, making it visible. 
    } else {
        document.querySelector("#scrollUpButton").style.opacity = "0"; // If the user at the top of the page, the program will set the "opacity" property of the "scroll up" button to 0, making it invisible. 
    }
})

/*======================================================================================================================================================================================================================================================================================================================================
Word and Character Count
======================================================================================================================================================================================================================================================================================================================================*/
function wordCharCount(sentence, charCount, wordCount) {
    sentence.addEventListener("input", () => { // Using an event listener, the program checks if the user has changed the input to update the counters accordingly. 
        // Everytime the user changes the input, the program must assign the value of the text fields to variables so if the user clears the program without submitting the comparison, they can still reload it as there are values stored in the variables. 
        wordSentenceA = document.querySelector("#sentenceA").value;
        wordSentenceB = document.querySelector("#sentenceB").value;
        
        charCount.textContent = sentence.value.length; // The textContent value of the character count, linked to the paragraph using IDs, changes to the length of the current input held in 'sentence'.

        if (sentence.value === "") { // If the user provides text but then removes it, the word count will return 1 as it has registered the empty space as a word. Hence, an if statement has been used to check if there is any input in the input fields to rectify this issue. 
            wordCount.textContent = 0; // If there is no input, there are zero words and thus the program assigns zero to the word count value.
        } else {
            wordCount.textContent = sentence.value.trim().split(/\s+/g).length; // The program will then assign the word count value with the length of the sentence string which has been split into separate words.
        }

        // When the user changes the input, the program also must hide the "Reload Previous Text" button as they are providing new text to compare.
        let documentNumber = ''; // Declaring the variable that will hold the target input field that the user is providing text in and therefore needs its button hidden.
        if (parseInt(charCount.textContent)>0) { // An if statement is used to test if the character count is above zero as this indicates that the user has provided input.
            if (sentence === sentenceA) { // Another if statement is then used to determine which input field it wants to clear. 
                documentNumber = "A"; // If the sentence is from Document A, the program assigns the document number as "A" which it will use to find the correct "Reload Previous Text" button to hide. 
            } else if (sentence === sentenceB) {
                documentNumber = "B"; // If the sentence is from Document A, the program assigns the document number as "B" which it will use to find the correct "Reload Previous Text" button to hide. 
            }
            hideShowReloadPreviousTextButton("0", documentNumber); // Links to a function that changes the "opacity" property of the button the reloads the previous text in the input field. The value "0" has been provided to change the opacity to 0 (i.e. show it) and the target input field to reload is held in the variable documentNumber.
        }
    })
}

/*======================================================================================================================================================================================================================================================================================================================================
Validation
======================================================================================================================================================================================================================================================================================================================================*/
function validateInput() { // When the user clicks the button to compare the texts, the program must first execute this function to validate the input provided by the user before proceeding to comparisons to avoid invalid input and thus errors. 
    wordSentenceA = document.querySelector('#sentenceA').value; // Using the querySelector method, assigning the value contained within the first sentence being compared to a variable to house said text.
    wordSentenceB = document.querySelector('#sentenceB').value; //Using the querySelector method, assigning the value contained within the second sentence being compared to a variable to house said text.
    
    // A try...catch block has been included as a precautionary measure in the event of an unexpected error occuring in the program.
    // If the program does not run into any issues, the lines in the try block will be executed.
    // If it does run into issues, the program execute the catch block instead instead of crashing.
    try {
        // A decision control structure in the form of an if statement to conduct an existence check.
        // The program tests if either input fields has input, checking if the respective variable housing said input is blank or not.  
        if (wordSentenceA === '' || wordSentenceB === '') {
            // If either the first or second input field on the interface is empty, there is insufficient data to proceed. 
            // If such invalid data was allowed to continue through the program, it would yield an inaccurate and useless result, and has the possibility of creating issues when it is manipulated.
            alert("Please provide text to compare!"); // The program alerts the user of this issue and provides them with an opportunity to rectify the issue. 
        } else {
            compareText(); // It is only if both input fields possess text that the program will execute the function to compare their similarity.
        }
    } catch (err) { // If anything goes wrong, the program will catch this error and will execute the catch block. 
        alert("Something went wrong. Please try again!"); // The program alerts the user of something going wrong and the program does not execute.
        console.log(err); // The error is read into the console so developers can identify and rectify the issue.
    }
 
} 

/*======================================================================================================================================================================================================================================================================================================================================
Compare Text Function
======================================================================================================================================================================================================================================================================================================================================*/
function compareText() { // When the user has undergone validation, the program executes this function to conduct the text comparison.     
    // The program starts by storing all the statistical data relating to the text in variables so they can be used in later segments of the program.
    charCountA = sentenceA.value.length;
    charCountNoSpaceA = sentenceA.value.replaceAll(/\s+/g, "").length;
    wordCountA = sentenceA.value.split(/\s+/).filter((x) => x).length
    charCountB = sentenceB.value.length;
    charCountNoSpaceB = sentenceB.value.replaceAll(/\s+/g, "").length;
    wordCountB = sentenceB.value.split(/\s+/).filter((x) => x).length
    
    // In the event that the user clicks the compare button more than once, to prevent invalid formatting, this if statement has been concluded.
    if (document.querySelector("#resultContainer") != null) { // An if statement is used to test if the div housing the result has been created or not by testing if it is null.
        document.querySelector("#resultContainer").remove(); // If the div does exist (i.e. it is not null), the program will remove it from the HTML document in preparation for the next test.
    }

    extraStatsVisibility("none"); // Links to a function that changes the "display" property of the further statistics div, carrying the value "none" to hide the div.

    deleteTableData(); // Links to a function that clears all the table data to prevent duplicate data being added.

    console.clear(); // The program will clear the console.
    
    // The program creates an array of words by executing a function that splits the array by words and removes special characters. 
    wordsArrayA = splitSortCleanSentence(wordSentenceA, wordsArrayA); 
    wordsArrayB = splitSortCleanSentence(wordSentenceB, wordsArrayB); 

    let fullArray = []; // Declaring an array to house all the words in both chunks of text and their frequency.

    let totalValue = 0; // Declaring an integer variable that is used in the final calculation of cosine similarity to house the total dot product value.
    let subValue = 0; // Declaring an integer variable that is used in the final calculation of cosine similarity to house the value that is added to the total for every iteration. 

    let vectorALength = 0; // Declaring a float variable that is used to calculate the length of the vector created by the first set of words by treating each word as a vector component. 
    let vectorBLength = 0; // Declaring a float variable that is used to calculate the length of the vector created by the second set of words by treating each word as a vector component. 

    let similarity = 0; // Declaring a float variable that houses the final percentage of similarity between the two chunks of text. 

    function splitSortCleanSentence(sentence, array) { // A function used to modularise the process of splitting the string variable into the array by words and removing any unnecessary values such as extra spaces and special characters. 
        sentence = sentence.replaceAll("(", "").replaceAll(')',''); // The program replaces all instances of brackets in the string to ensure that words are not treated as different for being part of bracketed text.
        sentence = sentence.replaceAll("'", "");
        sentence = sentence.replace(/[^\w\s\']|_/g, ""); // Regular expressions are used to remove the majority of special characters in the string. This is done by replacing all such special characters with an empty string. 
        sentence = sentence.trim().toLowerCase(); // The string is cleaned up by trimming all spaces from the sides and making everything lowercase so capitalised letters are not treated as different words to their lowercase variants despite being the same word. 
        sentence = sentence.replaceAll(/\s+/g, ' ') // Due to user error and because of replacing the special characters with empty strings, multiple spaces sometimes occur which need to be removed or they will be treated as their own string. 
        array = sentence.split(' '); // The program, after cleaning the string, splits each word into an array.
        array.sort(); // The program then sorts the array for organisaion in alphabetical order.
        return array; // The function returns the array that has been cleaned, split and sorted.
    }

    // An iteration control structure in the form of a for loop has been used to check each word in the array for the first chunk of text.
    for (i=0;i<wordsArrayA.length;i++) {
            if (wordsArrayA[i] != wordsArrayA[i-1]) { // An if statement has been used for each word in the array for the first text that checks if the current word in the iteration is the same as the word from the previous iteration.
                // If the word is not the same (i.e. they are different words), the program can treat this word as the first occurence and pushes it onto the array housing all the words in both texts. 
                fullArray.push([wordsArrayA[i], wordsArrayA.filter(x=>x===wordsArrayA[i]).length]) // The word and their frequency is pushed onto the array. 
            } 
    }

    let wordExists = false; // Declaring a boolean variable indicating if the word already exists in the array holding every word in both texts. 

    // An iteration control structure in a for loop is used to check for each word in the array for the second chunk of text.
    for (i=0;i<wordsArrayB.length;i++) {
        // A nested for loop has been used to test every word in the array holding all words in both texts. 
        for (p=0;p<fullArray.length;p++) {
            if (fullArray[p][0] === wordsArrayB[i]) { // An if statement tests if the word currently selected in the iteration for the second text matches any word already recognised and added to the array holding all words (i.e. the word is not unique).
                wordExists = true; // The program assigns the boolean variable to true to indicate that the word already exists in the array holding all words. 
                break; // The program breaks from the nested for loop as there is no need to continue looping once it is known that the word already exists in the array.
            } else { 
                wordExists = false; // If the words are not the same, the program will continue leaving the boolean variable as false which will remain false at the end of the array if the word does not already exist. 
            }
        }

        if (wordExists === false) { // At the end of each iteration, the program uses an if statement to test if the boolean variable has been set to false as if it is false, it indicates that the word in the current iteration does not already exist in the array housing the full list of words in both strings.
            if (wordsArrayB[i] != wordsArrayB[i-1]) { // The program then tests if the word is unique in the second set of words by comparing the current word with the word from the previous iteration to test if they are not the same.
                    fullArray.push([wordsArrayB[i], 0]); // If the word is unique (i.e. it is not the same as the previous), the program pushes the new word onto the array with a zero indicating that it has no occurances in the first word which has been established through the boolean variable.
            }
        }
    }

    let number = 0; // Declaring an integer variable 

    // An iteration control structure is used as a for loop to iterate for every word in the full list of words for both texts.
    for (i=0;i<fullArray.length;i++) {
        // A nested for loop is used to iterate for every word in the second set of words.
        for (count=0;count<wordsArrayB.length;count++) {
            if (wordsArrayB[count] === fullArray[i][0]) { // An if statement is used to test if the current word in the loop is the same as a word in the second set of words.
                number = wordsArrayB.filter(x=>x===wordsArrayB[count]).length; // If the words are the same, the current word exists in the string and thus a function is used to count the number of occurances in the list. 
                break; // The program breaks from the nested for loop as it has successfully found the word and does not need to continue to iterate in the full list of words. 
            } else {
                number = 0; // If the current word from the full list of words does not exist in the second sentence, the number variable is set to 0 to indicate 0 occurances.
            }
        }

        fullArray[i].push(number); // At the end of each iteration for each word in the full list of words, the number of occurances established in the nested for loop is pushed onto the end of the respective word in question. 
    }

    fullArray.sort(); // The array is sorted in alphabetical order for organisational purposes.
    console.log(fullArray); // The program prints the array to the console to allow developers to see that the program is running as intended.

    // An iteration control structure is used to loop the program for every word in the full list of words to calculate the total dot product for each word. 
    for (i=0;i<fullArray.length;i++) { 
            subValue = parseInt(fullArray[i][1] * fullArray[i][2]); // For each word, the dot product is calculated by multiplying the occurances in the first sentence and in the second sentence.
            totalValue = parseInt(totalValue + subValue); // The program then adds the calculated dot product to a total dot product.
            subValue = 0; // The program then resets the subtotal for the next iteration.

            vectorALength = vectorALength + (fullArray[i][1]**2); // The program starts to calculate the total length of the first vector for the first sentence by adding the square root 
            vectorBLength = vectorBLength + (fullArray[i][2]**2); // The program then calculates the total length of the second vector for the second sentence by adding the square root 
    }

    // To calculate the length, the added squared values for each vector is square rooted.
    vectorALength = Math.sqrt(vectorALength); 
    vectorBLength = Math.sqrt(vectorBLength);

    similarity = (totalValue / vectorALength / vectorBLength) * 100; // The program calculating the similarity by dividing the added dot product value by both vector lengths. 

    console.log(similarity.toFixed(2) + "% similar!"); // The program prints the similarity out to the console for developmental purposes.

    /*======================================================================================================================================================================================================================================================================================================================================
    Finding the Word with the Highest Frequency
    ======================================================================================================================================================================================================================================================================================================================================*/
    //As an extra piece of statistical inference, the program will find the most common word between the two texts and display this fact. 
    let modeWord = ''; // Declaring a string variable to hold the most common word.
    let modeFrequency = 0; // Declaring an integer variable to hold the highest frequency value. 
    let blnMultipleModes = false; // Declaring a boolean variable that indicates whether there are multiple words with highest frequency (i.e. mode).

    for (i=0;i<fullArray.length;i++) { // A for loop is used to iterate throughout the array holding all the words to determine which one has the highest combined frequency.
        if ((fullArray[i][1]+fullArray[i][2]) > modeFrequency) { // An if statement is used and tests whether the total frequency for the word in the current iteration is greater than the frequency of the current highest frequency (starting at 0).
            modeFrequency = fullArray[i][1] + fullArray[i][2]; // If the combined frequency is greater, the program will assign the highest frequency to the new highest frequency word.
            modeWord = fullArray[i][0]; // The program then assigns the variable modeWord with the actual word to display.
            // The program is iterated for every word, changing the variable constantly as it continues to find words with higher frequencies.
        }
    }

    // The program must also consider the possibility that the word with the highest frequency has the same frequency as others.
    for (i=0;i<fullArray.length;i++) { // Hence, the program uses a for loop to iterate throughout the full list of words again to compare the highest frequency against the combined frequency to see if any are the same as the highest. 
        if (((fullArray[i][1]+fullArray[i][2]) === modeFrequency) && (fullArray[i][0] !== modeWord)) { // An if statement is used to make this comparison by testing if they are equal.
            blnMultipleModes = true; // If the program finds that there are multiple words with the highest frequency, the boolean variable is set to true so a different text can be read out. 
            break;
        } else {
            blnMultipleModes = false; // If the program finds there is only one word with the highest frequency, the boolean variable is set to false so the program knows to display the output of the most common word with its frequency.
        }
    }

    /*======================================================================================================================================================================================================================================================================================================================================
    Displaying Comparison Results
    ======================================================================================================================================================================================================================================================================================================================================*/
    // The program creates a new div element to attach to the side of the HTML document to display the similarity.
    let mainDiv = document.querySelector('#mainContainer'); // Declaring the existing div housing the textareas where input has been provided.
    mainDiv.style.width = "90%"; // The program changes the width of the div holding the textarea to make room for the similarity display.
    mainDiv.style.transition = "width 0.5s"; // The width has changed using a transition of 0.5 seconds.

    // The program now creates a new div element to hold the results from this text comparison.
    let resultsDiv = document.createElement('div'); // Declaring a variable to hold the new element held between <div> tags.
    resultsDiv.setAttribute("id", "resultContainer"); // Setting the id of the new div which links to styling in the CSS file. 
    resultsDiv.style.width = "500px"; // Setting the width property of the div to "500px" to define how wide it is.
    resultsDiv.style.opacity = "100%"; // Setting the opacity of the div to "100%" so it is visible to the user. 
    
    let resultsHeader = document.createElement('h3'); // Declaring a variable to hold a new header for the results div, held between <h3> tags. 
    resultsHeader.textContent = "Results"; // Changing the text content property of this header to "Results".
    resultsHeader.style.color = "black"; // Changing the text colour property of this header to black to stand out in the gray background.

    document.querySelector('#mainContainer').appendChild(resultsDiv); // Using appendChild, the program attaches the new div for the results to the element with "mainContainer" as its id.
    document.querySelector('#resultContainer').appendChild(resultsHeader); // The program then appends the header of the results section to the new div, now created with the id "resultContainer".

    let similarityDiv = document.createElement('div'); // The program creates another new element, held between <div> tags, to hold the field to display the similarity of the documents. 
    similarityDiv.setAttribute("id", "similarityContainer"); // Setting the id of the new div so it can be styled by the CSS file upon creation.
    similarityDiv.textContent = similarity.toFixed(2) + "% similar!"; // Changing the text content property of the div to display the similarity results.

    // To create the pie graph to visually depict the similarity to the user, a canvas is used.
    let canvas = document.getElementById("myCanvas"); // Finding the canvas element in the HTML file.
    let ctx = canvas.getContext("2d"); // Getting the canvas context and setting it to 2D for a two-dimensional shape.

    canvas.style.width = "90%"; // Setting the width of the canvas to be 90% of its defined area which allows the pie chart to fill the space.

    ctx.reset(); // Resetting the canvas for each iteration to prevent incorrect output. 

    let centerX = canvas.width / 2; // Assigning a variable with the horizontal middle of the canvas so the object will be centred.
    let centerY = canvas.height / 2; // Assigning a variable with the vertical middle of the canvas so the object will be centred.

    let radians = (similarity/100)*2*Math.PI; // Declaring and assigning a variable with the angle to end the circle at. The equivalent angle to the similarity can be calculated by diving it by 100 and multipling it by a full circle's angle (2pi).

    let concludingInferenceDiv = document.querySelector("#concludingInference"); // Before the if statement below is run, the program first finds an element that holds the concluding statement from the similarity check as it can be assigned.

    let similarityColour = ''; // A string variable is declared to hold the relevant colour to the result of the similarity check. 

    if (similarity <= 30) { // An if statement is used to determine the colour connotated with the resulting similarity.
         // If it is less than 30% similar, then the texts are not very similar and thus is a good outcome.
        similarityColour = 'green'; // This positive outcome is indicated by the colour green and this is assigned to the variable that will change the background colours of what is displayed.
        concludingInferenceDiv.textContent = "Hence, there is sufficient evidence to suggest that no collusion has occured! All is well!"; // The program changes the text content property of the concluding statement to reflect this outcome.
    } else if (similarity > 30 && similarity <= 60) {
        // If it is greater than 30% but less than 60%, the texts aren't very similar but the user is cautioned.
        similarityColour = 'orange'; // This average outcome is indicated by the colour orange and this is assigned to the variable that will change the background colours of what is displayed.
        concludingInferenceDiv.textContent = "Hence, there is sufficient evidence to suggest that collusion may have occured! Cautionary acceptance is advised."; // The program changes the text content property of the concluding statement to reflect this outcome.
    } else if (similarity > 60) {
        // If it is greater than 60%, there is high indication that collusion may have occurred due to the similarity.
        similarityColour = 'red'; // This unfavourable outcome is indicated by the colour red and this is assigned to the variable that will change the background colours of what is displayed.
        concludingInferenceDiv.textContent = "Hence, there is sufficient evidence to suggest that collusion is likely to have taken place! Do not accept! Follow-up action required!"; // The program changes the text content property of the concluding statement to reflect this outcome.
    }

    // After the if statement has been executed and the program has deciphered the correct colour that reflects the outcome, the program assigns this colour as the background colour to all relevant objects. 
    similarityDiv.style.background = similarityColour; 
    ctx.fillStyle = similarityColour;
    concludingInferenceDiv.style.background = similarityColour;

    document.querySelector('#resultContainer').appendChild(similarityDiv); // Using appendChild, the program attaches the new div holding the similarity of the comparison to the div holding the results of the comparison.

    // Once the colour of the pie chart has been decided, the program can now start drawing on the canvas. 
    ctx.beginPath(); // Beginning the draw path.
    ctx.moveTo(centerX,centerY); // Moving to the centre of the canvas to ensure the circle is in the middle.
    ctx.arc(centerX,centerY,(centerX)-10,-0.5*Math.PI, radians-0.5*Math.PI, false); // Moving in a clockwise direction, the program starts drawing an arc at the very top of the circle and ends at the angle in radians defined earlier. The program sets the radius as the middle value minus 10 to ensure it fits with the size of the screen.
    ctx.fill(); // The shape is filled with the colour found in the if statement above. 

    // If the texts are identical and have a 100% similarity, the pie chart will be completely filled and there is no need for grey-space 
    if (similarity.toFixed(2) < 100) { // Hence, the program uses an if statement to test whether the similarity (rounded to 2 decimal places) is less than 100.
        // If it is less, the program will fill the extra grey-space left behind in the chart with another colour. 
        ctx.fillStyle = '#c4cad0'; // The program sets the fill colour as a darker gray to fill the extra grey-space.
        ctx.beginPath(); // Beginning the draw path.
        ctx.moveTo(centerX,centerY); // Moving to the centre of the canvas to ensure the circle is in the middle.
        ctx.arc(centerX,centerY,(centerX)-10,radians-0.5*Math.PI, -0.5*Math.PI, false); // Moving in a clockwise direction, the program starts drawing an arc where the previous drawing left off and where the angle of similarity ends. The arc is then continued till the start.
        ctx.fill(); // The shape is filled with the colour declared above. 
    }

    // As some extra styling, the program draws a pivot point in the centre of the circle. 
    ctx.fillStyle = '#000'; // Setting the fill colour to fill the circle with black.
    ctx.beginPath(); // Beginning the draw path.
    ctx.moveTo(centerX,centerY); // Moving to the centre of the canvas to ensure the circle is in the middle.
    ctx.arc(centerX,centerY,3,0, 2*Math.PI, false);
    ctx.fill(); // The shape is filled with the colour declared above. 

    // The program labels the pivot point with the similarity so the user has a graphical understanding of what the chart represents. 
    ctx.font = "20px Verdana"; // Setting the font to Verdana and at 20px in side.
    ctx.fillStyle = 'black'; // Setting the colour of the text to black.
    ctx.fillText(similarity.toFixed(2) + "%", centerX+10, centerY+7); // Drawing the text on the canvas a little off-centre.

    // To make a cleaner chart, the program also makes an outline of the circle to make it more defined and more graphically appealing to users.
    ctx.strokeStyle = "black"; // Setting the colour of the stroke to black.
    ctx.beginPath(); // Beginning the draw path.
    ctx.arc(centerX,centerY,(centerX)-10,0, 2*Math.PI, false); // Drawing an arc in the clockwise direction of a full circle.
    ctx.lineWidth = 2; // Changing the thickness of the circle to make it thicker.
    ctx.stroke(); // Drawing the shape on the canvas.  

    let modeFrequencyOutput = ''; // Declaring a string variable to hold the output message about the most common word. 

    if (blnMultipleModes === true) { // An if statement is used to test whether the boolean variable informing whether there is one or multiple words with the highest frequency has been set to true or false.
        // If true, there are multiple words with the highest frequency and the program cannot display a singular word. Hence, the program assigns the output message that reflects this fact. 
        modeFrequencyOutput = "There are multiple words with the highest frequency in this comparison!"; 
    } else if (blnMultipleModes === false) {
        // If false, the is one word with the highest frequency and the program assigns the output message with a string that concatenates a sentence to display to the user showing this information. 
        modeFrequencyOutput = "The most frequent word was <strong>\"" + modeWord + "\"</strong> that appeared <strong>" + modeFrequency + "</strong> times in both documents!";
    }

    let statsDiv = document.createElement('div'); // The program creates a new element held between <div> tags to hold the statistics from the comparison.
    statsDiv.setAttribute("id", "statsContainer"); // Setting the id of the div to be styled in the CSS document. 
    // The program changing the innerHTML property of the div by having all of the resulting data being contained in this div and broken using line breaks. 
    statsDiv.innerHTML =  "<strong><u>Document A</u></strong>" + "<br>" + 
                            "Total Words: " + wordCountA + "<br>" + 
                            "Total Characters: " + charCountA + "<br>" + 
                            "Total Characters (w/o spaces): " + charCountNoSpaceA + "<br>" + 
                            "Total Sentences: " + parseInt(wordSentenceA.split('.').length) + "<br>" + "<br>" +
                            "-----------------" + "<br>" + "<br>" +
                            "<strong><u>Document B</u></strong>" + "<br>" + 
                            "Total Words: " + wordCountB + "<br>" + 
                            "Total Characters: " + charCountB + "<br>" + 
                            "Total Characters (w/o spaces): " + charCountNoSpaceB + "<br>" + 
                            "Total Sentences: " + parseInt(wordSentenceB.split('.').length) + "<br>" + "<br>" +
                            "-----------------" + "<br>" + "<br>" + 
                            modeFrequencyOutput + "<br>" + "<br>" + "<br>" + 
                            "<a class='btn' href='#extraStatsContainerOuter'>Further Statistics   <i class='fa fa-arrow-right'></i></a>" // The program also creates the button that will be used to show the further statistical analysis.
 
    document.querySelector('#resultContainer').appendChild(statsDiv); // Using appendChild, this new div holding the statistical information is attached to the section holding all of the comparison's results.

    extraStatsVisibility("block"); // Links to a function that changes the "display" property of the further statistics div, carrying the value "block" to show the div.

    let extraStatsMainDiv = document.querySelector('#extraStatsContainerMain'); // Declaring a variable to hold the existing HTML element where the extra statistical data is displayed so it can be accessed.
    extraStatsMainDiv.style.display = "flex"; // Changing the display property of the HTML element to "flex" so the objects are visible to the user.

    for (i=0;i<fullArray.length;i++) { // A for loop is used to iterate throughout the full list of words to display each row in the frequency table. 
        // In each iteration, the program creates a new table row in the existing table so each word and their frequencies are displayed.
        newRow = document.createElement('tr'); // Creating a new element held between <tr> tags for a new in the table.
        newRow.setAttribute("id", "frequencyTableData"); // Setting the id of the row to "frequencyTableData" so it can be referred to when being cleared. 
        td1 = document.createElement('td'); // Creating a new element held between <td> tags to hold the first item in the new row.
        td1.textContent = fullArray[i][0]; // The program changes the text content of this new item in the row by assigning it to the word in the current iteration. 
        td2 = document.createElement('td'); // Creating another new element held between <td> tags to hold the second item in the new row.
        td2.textContent = fullArray[i][1]; // The program changes the text content of this new item in the row by assigning it to the frequency of the word in Document A in the current iteration. 
        td3 = document.createElement('td'); // Creating another new element held between <td> tags to hold the third item in the new row.
        td3.textContent = fullArray[i][2]; // The program changes the text content of this new item in the row by assigning it to the frequency of the word in Document B in the current iteration. 
        
        // Using appendChild, the program attaches the new table data to the new row. 
        newRow.appendChild(td1);
        newRow.appendChild(td2);
        newRow.appendChild(td3);
        document.querySelector('table').appendChild(newRow); // Using appendChild, the program then attaches the new row to the end of the table. 
    }

    document.querySelectorAll('td').forEach( (x) => x.style.border = '3px solid black'); // Once the program has completed its iteration, the program uses an arrow function to iterate for every item in the table and places a border around each cell. 
}

/*======================================================================================================================================================================================================================================================================================================================================
Clear Individual Input Field Function
======================================================================================================================================================================================================================================================================================================================================*/
function clearInput(x) { // A function that is executed when the user clicks a clear button for an input field.
    clearTargetId = '#' + x; // The program creates a target ID by adding a hashtag to the ID of the string provided in the HTML file.
    
    clearTarget = document.querySelector(clearTargetId); // The program then uses the querySelector method to search for that ID in the document.

    if (clearTargetId === "#sentenceA") { // An if statement is used to test which input field is being selected.
        // If the targeted input field is for sentence A, the program clears the word and character count data from the input field for sentence A.
        wordSentenceA = document.querySelector("#sentenceA").value;
        document.querySelector('#wordCountA').textContent = 0;
        document.querySelector('#charCountA').textContent = 0;
        hideShowReloadPreviousTextButton("100%", "A");
    } else if (clearTargetId === "#sentenceB") {
        // If the targeted input field is for sentence B, the program clears the word and character count data from the input field for sentence B.
        wordSentenceB = document.querySelector("#sentenceB").value;
        document.querySelector('#wordCountB').textContent = 0;
        document.querySelector('#charCountB').textContent = 0;
        hideShowReloadPreviousTextButton("100%", "B");
    }

    if (clearTarget != "") { // An if statement is then used to test if the value in the target HTML input field is empty.
        clearTarget.value = ""; // If it is not empty, then the program will change the value of the HTML element to blank and thus clearing the user's input. 
    }    
}

/*======================================================================================================================================================================================================================================================================================================================================
Clear All Input Fields Function
======================================================================================================================================================================================================================================================================================================================================*/
function clearAllInput() { // A function that is executed when the user clicks a clear all button for everything in the program. 
    inputClearA = document.querySelector('#sentenceA'); // The program first searches for the input field of the first sentence in the HTML file.
    inputClearB = document.querySelector('#sentenceB'); // Then, the program searches for the input field of the second sentence in the HTML file.
    if ((inputClearA.value != "") || (inputClearB.value != "")) { // The program then uses an if statement to test if either inputs are not blank. If either input fields are blank, there is data to be cleared. 
        // If either input fields has input, the program clears both input fields by assigning their value to a blank string. 
        inputClearA.value = "";
        inputClearB.value = "";
    } 

    if (document.querySelector("#resultContainer") != null) { // An if statement is used to test if the div housing the result has been created or not by testing if it is null.
        document.querySelector("#resultContainer").remove(); // If the div does exist (i.e. it is not null), the program will remove it from the HTML document in preparation for the next test.
    }

    // The program resets the word and character counts to zero as clearing the input fields mean there is no input.
    // This is necessary as the program changes the word and character count using an event listener for input, but no input has been changed in this instance but the counters must still change. 
    document.querySelector('#wordCountA').textContent = 0;
    document.querySelector('#charCountA').textContent = 0;
    document.querySelector('#wordCountB').textContent = 0;
    document.querySelector('#charCountB').textContent = 0;

    console.clear(); // The program will clear the console.

    extraStatsVisibility("none"); // Links to a function that changes the "display" property of the further statistics div, carrying the value "none" to hide the div.

    deleteTableData(); // Links to a function that clears all the table data to prevent duplicate data being added

    hideShowReloadPreviousTextButton("100%", "A"); // Links to a function that changes the "opacity" property of the button the reloads the previous text in the input field. The value "100%" has been provided to change the opacity to 100% (i.e. show it) and "A" has been proved as the target input field to reload.
    hideShowReloadPreviousTextButton("100%", "B"); // Links to a function that changes the "opacity" property of the button the reloads the previous text in the input field. The value "100%" has been provided to change the opacity to 100% (i.e. show it) and "B" has been proved as the target input field to reload.
}

/*======================================================================================================================================================================================================================================================================================================================================
Reload Previous Text Function
======================================================================================================================================================================================================================================================================================================================================*/
function reloadPreviousText(documentNumber) {
    target = "#sentence" + documentNumber; // Sets a variable to hold the target input field to reload. This concatenation of the document number (A or B) allows the function to be used for both input fields and enhances the modularisation.
        
    let targetSentence = ''; // Declaring a string variable to hold the value of the target input field to reload into the current input field.
    if (documentNumber === "A") { // An if statement is used to determine which document the user wants to reload the input for.
        targetSentence = wordSentenceA; // If the document number is "A", the program will assign the text from the previous run into the string variable to be reloaded.
    } else if (documentNumber === "B") {
        targetSentence = wordSentenceB; // If the document number is "B", the program will assign the text from the previous run into the string variable to be reloaded.
    }

    document.querySelector(target).value = targetSentence; // The program changes the value of the target input field to contain the correct text defined by the if statement above. 
    hideShowReloadPreviousTextButton("0", documentNumber); // Links to a function that changes the opacity of the button, setting it to "0" for the target input field, using the document number found previously.

    // As no input has been provided by the user when this function is executed, it is necessary to also update the live word and character counts to reflect the current text in the input fields.
    document.querySelector("#wordCount" + documentNumber).textContent = targetSentence.split(/\s+/).filter((x) => x).length; // The program changes the text content property of the correct word count to the length of the text being put into the input field.
    document.querySelector("#charCount" + documentNumber).textContent = targetSentence.length; // The program changes the text content property of the correct character count to the number of characters of the text being put into the input field.
}

/*======================================================================================================================================================================================================================================================================================================================================
Change Visibility of Further Statistics Section Function
======================================================================================================================================================================================================================================================================================================================================*/
function extraStatsVisibility(x) {
    document.querySelector('#extraStatsContainer').style.display = x; // When the function is called, the program takes the value "x" provided as either "block" or "none" and changes the display CSS property to this value to determine whether it is visible or not.
}

/*======================================================================================================================================================================================================================================================================================================================================
Deleting All Table Data in the Frequency Table Function 
======================================================================================================================================================================================================================================================================================================================================*/
function deleteTableData() {
    // To clear the frequency table, the program uses an arrow function that loops through the list of all table data elements and removes each one.
    document.querySelectorAll("#frequencyTableData").forEach( (x) => { 
        x.remove(); 
    })
}

/*======================================================================================================================================================================================================================================================================================================================================
Change Visbility of 'Reload Previous Text' Button Function
======================================================================================================================================================================================================================================================================================================================================*/
function hideShowReloadPreviousTextButton(opacityPercent, documentNumber) {
    target = ".reloadPreviousText" + documentNumber; // The program assigns a variable with the target for the querySelector to find the correct button for the document chosen.
    document.querySelector(target).style.opacity = opacityPercent; // The program uses the target to search for the button for the correct document and changes its opacity property to the valid provided when the function was called depending if it needs to be shown or hidden. 
}

/*======================================================================================================================================================================================================================================================================================================================================
Changing the Arrow Direction and Height of References Section Function
======================================================================================================================================================================================================================================================================================================================================*/
let blnAngleUp = false; // A boolean variable is declared so the program knows which way the arrow icon is facing and whether it needs to be changed. It has been set to false as it is default facing down. 

function displayReferences() {
    let referencesDiv = document.querySelector("#referencesContainer"); // Declaring a variable to hold the HTML element where the references are placed.
    let angleDirection = ''; // Declaring a variable to hold the font awesome class value which indicates the current direction of the arrow icon.
    let newAngleDirection = ''; // Declaring a variable to hold the new font awesome class value which indicates the new direction of the arrow icon.

    if (blnAngleUp === true) { // An if statement is used that tests whether the boolean variable has been set to true or false to determine the current direction of the arrow. 
        referencesDiv.style.height = "50px"; // If the arrow is facing up, the program collapses the references section by changing the height to only be tall enough to fit the title. 
        angleDirection = ".fa-angle-up"; // The program also assigns a variable with the class of the current arrow so it can be searched and deleted.
        newAngleDirection = "fa fa-angle-down"; // The program also assigns a variable with the class of the new arrow so it can be created and added.
        blnAngleUp = false; // The boolean variable is set to false to indicate that the arrow is now facing down. 
    } else if (blnAngleUp === false) {
        referencesDiv.style.height = "100%"; // If the arrow is facing down, the program expands the references section by adjusting the height to be tall enough to fit al text content.
        angleDirection = ".fa-angle-down"; // The program also assigns a variable with the class of the current arrow so it can be searched and deleted.
        newAngleDirection = "fa fa-angle-up"; // The program also assigns a variable with the class of the new arrow so it can be created and added.
        blnAngleUp = true; // The boolean variable is set to true to indicate that the arrow is now facing up. 
    }

    let arrowIcon = document.querySelector(angleDirection); // The program then uses the found class of the current arrow and asssigns the HTML element to the variable.
    arrowIcon.remove(); // The program then, using the found HTML element, removes it from the document.

    let newArrowIcon = document.createElement("i"); // After removing the previous arrow icon, the program then creates a new element, held between <i> tags, to create the new arrow icon going in the oppositie direction. 
    newArrowIcon.setAttribute("class", newAngleDirection); // The program then sets the class of this new HTML element to the class of the new arrow found in the above if statement that uses font awesome to be an arrow icon.
    document.querySelector("#referencesExpandIcon").appendChild(newArrowIcon); // Using appendChild, the program then attaches this new icon to the existing <span> HTML element on the page to add it to the document. 
}