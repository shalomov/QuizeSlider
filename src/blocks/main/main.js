const questionEl = document.querySelector('.slider-title')
const choicesEl = document.querySelector('.choices')
const buttonEl = document.querySelector('.nav-buttons')
const containerEl = document.querySelector('.slider-wrapper')
const containerImg = document.querySelector('.my-img')
let nextButton




const survey = [
    {
        id: 1,
        question: 'Проверьте, насколько безопасен ваш ПК',
        img: '/themes/triolcorpru/assets/teasier/img/quiz/slider-item1.png',
        choices: [],
        correctAnswer: '',
        answer: null,
        idElem: 'first'
    },
    {
        id: 2,
        question: 'Вы используете дату рождения в качестве пароля?',
        img: '/themes/triolcorpru/assets/teasier/img/quiz/slider-item2.png',
        choices: ['Конечно, это единственный пароль, который я никогда не забуду', 'Я люблю выдумать хороший пароль, но иногда я его забываю', 'Я давно уже пользуюсь TEasier'],
        correctAnswer: 'Я давно уже пользуюсь TEasier',
        answer: null,
        idElem: 'second'
    },
    {
        id: 3,
        question: 'Пользуетесь ли Вы двухфакторной  аутентификацией? Например, ввод пароля + ПИН?',
        img: '/themes/triolcorpru/assets/teasier/img/quiz/slider-item3.png',
        choices: ['Да, я хочу чтобы мой компьютер был защищён', 'Нет, достаточно моего сложного пароля! Но... главное, его не забыть', 'Незачем, с TEasier не нужны ни ПИНы, ни пароли, всё просто!'],
        correctAnswer: 'Незачем, с TEasier не нужны ни ПИНы, ни пароли, всё просто!',
        answer: null,
        idElem: 'third'
    },
    {
        id: 4,
        question: 'Как часто Вы меняете пароль?',
        img: '/themes/triolcorpru/assets/teasier/img/quiz/slider-item4.png',
        choices: ['Не помню, когда менял(а) последний раз', 'Раз в неделю или чаще', 'Нет необходимости, ведь с TEasier моя уникальная внешность и есть мой пароль'],
        correctAnswer: 'Нет необходимости, ведь с TEasier моя уникальная внешность и есть мой пароль',
        answer: null,
        idElem: 'four'
    },
    {
        id: 5,
        question: 'Часто ли Вы работаете за своим ПК не дома?',
        img: '/themes/triolcorpru/assets/teasier/img/quiz/slider-item5.png',
        choices: ['Да, люблю поработать с ноутбуком вне дома, но прохожие постоянно смотрят в мой ПК', 'Нет, мне хватает работы дома /в офисе', 'Конечно, и даже перерыв на кофе не проблема; с TEasier информация надёжно защищена от взглядов посторонних'],
        correctAnswer: 'Конечно, и даже перерыв на кофе не проблема; с TEasier информация надёжно защищена от взглядов посторонних',
        answer: null,
        idElem: 'five'
    },
    {
        id: 6,
        question: 'Боитесь ли Вы отойти на минутку от Вашего ПК, когда работаете над сложным и важным проектом?',
        img: '/themes/triolcorpru/assets/teasier/img/quiz/slider-item6.png',
        choices: ['Конечно! Не хочу, чтобы информацию увидели мои коллеги', 'Почему бы не сделать перерыв? Но голова перегружена и я снова могу забыть свой пароль', 'Совсем не боюсь, ведь с TEasier достаточно одного взгляда на камеру, чтобы включить или выключить сеанс, работает моментально!'],
        correctAnswer: 'Совсем не боюсь, ведь с TEasier достаточно одного взгляда на камеру, чтобы включить или выключить сеанс, работает моментально!',
        answer: null,
        idElem: 'six'
    }
]


const surveyState = {
    currentQuestion: 1
}


const navigateButtonClick = (e) => {
    
    if(e.target.id == 'start') {
        surveyState.currentQuestion++
        initialSurvey()
    }

    if(e.target.id == 'next') {
        surveyState.currentQuestion++
        initialSurvey()
        
    }

    if(e.target.id == 'prev') {
        surveyState.currentQuestion--
        initialSurvey()
    }

}


  
const checkBoxHandler = (e, question) => {    

    if(!e.target.checked) {
        e.target.checked = false
        question.answer = null
        return
    
    }

    const allCheckBoxes = choicesEl.querySelectorAll('input')
    allCheckBoxes.forEach(checkBox => checkBox.checked = false)
    e.target.checked = true
    question.answer = e.target.value


    choicesEl.onchange = function() {
        nextButton.disabled = false
    }
}


const getResults = () => {
    const correctAnswerCount = survey.filter(question => question.answer == question.correctAnswer).length
    const emptyQuestionCount = survey.filter(question => question.answer === null).length
    const wrongQuestionCount = survey.filter(question => question.answer !== null && question.answer != question.correctAnswer).length

    return {
        correct: correctAnswerCount,
        empty: emptyQuestionCount,
        wrong: wrongQuestionCount
    }
}


const renderQuestion = (question) => {    

    const lastQuestion = survey[survey.length - 1]


    if(surveyState.currentQuestion > lastQuestion.id ) {
        const results = getResults()
        if (results.correct > 0) {
            containerEl.innerHTML = `
            <section class="final-slide">
                <div class="survey-header">
                    <h2 class="slider-title">Ваш ПК надёжно защищён, <br> потому что у Вас уже есть TEasier!</h2>
                    <h3 class="final-subtitle">Спасибо, что пользуетесь нашей разработкой!</h3>
                </div>
                <div class="survey-body">
                    <form id="contact-form" data-request="PopupForm::onSend" data-request-redirect="/portal/teasier">
                        <h2 class="form-title">Для участия в розыгрыше сюрпризов от нас просто заполните поля ниже:</h2>
                        <div class="form-row">
                            <input type="hidden" name="text" value="Опросник Teasier">
                            <input type="hidden" name="to_send" value="опросник teasier">
                            <input type="hidden" name="company">
                            <input type="text" name="name" id="name" placeholder="Имя" required>
                            <input type="email" name="email" id="email" placeholder="E-mail" required>
                            <input type="tel" name="phone" id="phone" placeholder="Телефон" required>
                        </div>
                        <input type="submit" class="slider-btn" value="Отправить">
                    </form>
                </div>
                <p class="footer-desc">Присоединяйтесь к нам на <br> <a href="#" class="footer-link">портале TEasier</a> или <a href="#" class="footer-link">страничке Facebook!</a> <br> Вместе мы можем преобразовать целый мир!</p>
            </section>`
        } else {
            containerEl.innerHTML = `
            <section class="final-slide">
            <div class="survey-header">
                <h2 class="slider-title">Данные Вашего ПК защитить просто!</h2>
                <h3 class="final-subtitle">Обновлять пароль или делать его более сложным уже незачем. Программное обеспечение 
                    TEasier легко справится с защитой Вашего ПК! Ведь Вы и есть ваш пароль! Используйте свою уникальную 
                    внешность для получения безопасного и быстрого доступа к Вашему ПК.</h3>
            </div>
            <div class="survey-body offer-slide">
                <div class="col-wrapp">
                    <img src="img/offerimg.png" alt="offerimg">
                </div>
                <div class="col-wrapp">
                    <h2 class="slider-title">Установите TEasier прямо сейчас</h2>
                    <a href="#" class="slider-btn">Установить</a>
                </div>
            </div>
            <p class="footer-desc">Присоединяйтесь к нам на <br> <a href="#" class="footer-link">портале TEasier</a> или <a href="#" class="footer-link">страничке Facebook!</a> <br> Вместе мы можем преобразовать целый мир!</p>
            </section>`
        }

        return                
    } 


    choicesEl.innerHTML = ''
    buttonEl.innerHTML = ''



    questionEl.textContent = question.question
    containerImg.src = question.img
    containerEl.id = question.idElem

    question.choices.forEach(choice => {
        const questionRowEl = document.createElement('p')
        questionRowEl.setAttribute('class','question-row')
        questionRowEl.innerHTML = `<label class="label">                                        
                                        <span class="choise">${choice}</span>
                                    </label>`

        const checkBoxEl = document.createElement('input')
        checkBoxEl.setAttribute('type', 'radio')
        checkBoxEl.addEventListener('change', (e) => checkBoxHandler(e, question))
        checkBoxEl.value = choice
        if(question.answer === choice) {
            checkBoxEl.checked = true
        }

        questionRowEl.firstChild.prepend(checkBoxEl)
        choicesEl.appendChild(questionRowEl)
        
    })

        

    const prevButton = document.createElement('button')
    prevButton.classList.add('slider-btn')
    prevButton.id = 'prev'
    prevButton.textContent = 'Назад'
    prevButton.addEventListener('click', navigateButtonClick)

    nextButton = document.createElement('button')
    nextButton.classList.add('slider-btn')
    nextButton.id = 'next'
    nextButton.textContent = 'Вперёд'
    nextButton.disabled = true
    nextButton.addEventListener('click', navigateButtonClick)

    const startButton = document.createElement('button')
    startButton.classList.add('slider-btn')
    startButton.id = 'start'
    startButton.textContent = 'Начать тест'
    startButton.addEventListener('click', navigateButtonClick)

    if(question.id == 1){        
        buttonEl.appendChild(startButton)
    } else if (surveyState.currentQuestion == lastQuestion) {
        buttonEl.appendChild(prevButton)
    } else {
        buttonEl.appendChild(prevButton)
        buttonEl.appendChild(nextButton)
    }   
    
}

const initialSurvey = () => {

    const currentQuestion = survey.find(question => question.id === surveyState.currentQuestion)
    renderQuestion(currentQuestion)
}

initialSurvey()
