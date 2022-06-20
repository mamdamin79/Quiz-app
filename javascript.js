// selectors
const questionText = document.querySelector(".question-text")
const questionNumber = document.querySelectorAll(".question-number")
const btnStart = document.getElementById("btn-start")
const quizBox = document.querySelector(".quiz-box")
const ruleBox = document.querySelector(".rule-box")
const exitButton = document.querySelector(".exit-btn")
const continueButton = document.querySelector(".continue-btn")
const finishButton = document.querySelector(".finish-btn")
// const choices = document.querySelector(".choices")
const remainingTime = document.querySelector(".remaining-time")
const nextButton = document.querySelector(".next-btn")
const resultBox = document.querySelector(".result-box")
// global variables
let correctAnswer
let arrayOfQuestions
let incorrect_answers
let questionObject
let labels
let choices
let i = -1
let pashm
let intId
let j = 0
let sag
// load questions from opentdb api
async function questionLoader(){
    const response = await fetch(`https://opentdb.com/api.php?amount=5&category=21&difficulty=medium&type=multiple`)
    const data  = await response.json()
    arrayOfQuestions = data.results
    console.log(arrayOfQuestions)
}
// render questions in DOM
function renderQuestions(){
    sag = Array.from(document.querySelectorAll(".salam"))
    if(sag.length > 0){
        j = j + 1
    }
    console.log(j)
    i++
    questionObject = arrayOfQuestions[i]
    console.log(questionObject)
    questionText.innerHTML = questionObject.question
    correctAnswer = [questionObject.correct_answer]
    incorrect_answers = questionObject.incorrect_answers
    console.log(correctAnswer)
    let unscrableArrayOfAnswer = [...incorrect_answers,...correctAnswer].sort()
    console.log(unscrableArrayOfAnswer)
    console.log(unscrableArrayOfAnswer.indexOf(questionObject.correct_answer))
    let html = `<div class="choice-container">
                    <input type="radio" name="Answer" id="choice1" ><label for="choice1">${unscrableArrayOfAnswer[0]}</label>
                </div>
                <div class="choice-container">
                    <input type="radio" name="Answer"  id="choice2"><label for="choice2">${unscrableArrayOfAnswer[1]}</label>
                    </div>
                <div class="choice-container">
                    <input type="radio" name="Answer"  id="choice3"><label for="choice3">${unscrableArrayOfAnswer[2]}</label>
                </div>
                <div class="choice-container">
                    <input type="radio" name="Answer"  id="choice4"><label for="choice4">${unscrableArrayOfAnswer[3]}</label>
                </div>`
                choices = document.querySelector(".choices")
                choices.innerHTML = html;
                choices.style.pointerEvents = "all"
                nextButton.classList.remove("active")


                labels =Array.from(document.querySelectorAll("label"))
                labels.map(lable =>{
                    if(questionObject.correct_answer == lable.innerHTML){
                        lable.setAttribute("id", "true") //here we set id for true Answer
                    }
                })

                choices.addEventListener("change",(e) => {
                    let selectedValue = e.target.nextElementSibling.innerHTML
                    let trueAnswer = document.getElementById("true") //here we get true answer and check it against user answer
                    if (selectedValue === trueAnswer.innerHTML) {
                        trueAnswer.parentElement.classList.add("true") //highlighte trueAnswer
                        trueAnswer.parentElement.classList.add("salam")
                        choices.style.pointerEvents = "none"
                    }
                    else{
                        e.target.parentElement.classList.add("false") //highlighte falseAnswer
                        trueAnswer.parentElement.classList.add("true") //highlighte trueAnswer
                        choices.style.pointerEvents = "none"
                    }
                    if(parseInt(questionNumber[0].innerHTML)<=4){
                        nextButton.classList.add("active")

                    }
                    else{
                        finishButton.classList.add("active")
                    }
                    if(e.target.nextElementSibling.parentElement.classList.contains("true")){
                        console.log("salam")
                    }
                    
                    
                    clearInterval(intId)
                    clearInterval(pashm)

                    
                })

}

function changeQNumber(){
    let arrayOfQuestionNumber =  Array.from(questionNumber)
    arrayOfQuestionNumber.map(item =>{
        if( parseInt(item.innerHTML)<5){
            item.innerHTML = parseInt(item.innerHTML)+1
        }
    })

}
// control timer


// eventlistener
nextButton.addEventListener("click", (e)=>{
    remainingTime.innerHTML = 15
    pashm = setInterval(() =>{
        if(parseInt(remainingTime.innerHTML)>0){
            remainingTime.innerHTML = parseInt(remainingTime.innerHTML)-1
        }
        else{
            if(parseInt(questionNumber[0].innerHTML)<5){
                remainingTime.classList.add("off")
                document.getElementById("true").parentElement.classList.add("true")
                choices.style.pointerEvents = "none"
                nextButton.classList.add("active")
                clearInterval(pashm)
            }
            else{
                document.getElementById("true").parentElement.classList.add("true")
                choices.style.pointerEvents = "none"
                clearInterval(pashm)
                finishButton.classList.add("active")
                

            }


        }
        
    
    },1000)
    
    if(parseInt(questionNumber[0].innerHTML)<=4){
        renderQuestions()
        

        
    }
    else{
        nextButton.classList.remove("active")
    }
    changeQNumber()
})


finishButton.addEventListener("click", ()=>{
    quizBox.classList.remove("active")
    resultBox.classList.add("active")
    sag = Array.from(document.querySelectorAll(".salam"))
    if(sag.length > 0){
        j = j + 1
    }
    document.querySelector(".tedad-dorost").innerHTML = j


})


btnStart.addEventListener("click", (e) => {
    btnStart.classList.add("deactive");
    ruleBox.classList.add("active");
    questionLoader() //for loading faster here call our loader function
})
continueButton.addEventListener("click", (e) => {
    ruleBox.classList.remove("active")
    quizBox.classList.add("active")
    renderQuestions()
    intId = setInterval(() =>{
        if(parseInt(remainingTime.innerHTML)>0){
            remainingTime.innerHTML = parseInt(remainingTime.innerHTML)-1
        }
        else{
            remainingTime.classList.add("off")
            document.getElementById("true").parentElement.classList.add("true")
            choices.style.pointerEvents = "none"
            nextButton.classList.add("active")
            clearInterval(intId)


        }
        
    
    },1000)
})
exitButton.addEventListener("click", (e) => {
    ruleBox.classList.remove("active")
    btnStart.classList.remove("deactive")

})