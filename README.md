# quizJs
make quizzes easily using js

#How to start?
1. Include Jquery in your page.
2. (optional) if you want to add drag and drop quesitons, add both jQuere-UI and dragNdropQ.js.
3. Include main.js in project.
4. Insert a div with id = quiz.
5. Inside that div you can start constructing your quiz using the templets in the section below.

#Templates
1. MCQ single correct answer section with 2 questions:
```html
<div class="quiz-section mcq" data-minutes="1">
    <div class="question single">What are you? <br>
        <input class="answer" type="radio" name="option1" value="1"> Human<br>
        <input class="answer" type="radio" name="option1" value="0"> Aliean<br>
        <input class="answer" type="radio" name="option1" value="0"> Other
    </div>
    <div class="question single">What are you? <br>
        <input class="answer" type="radio" name="option1" value="1"> Human<br>
        <input class="answer" type="radio" name="option1" value="0"> Aliean<br>
        <input class="answer" type="radio" name="option1" value="0"> Other
    </div>
</div>
```
2. MCQ multiple correct answers section with 2 questions:
```html
<div class="quiz-section mcq">
    <div class="question mult">What are you? <br>
        <input class="answer" type="checkbox" name="option1" value="1"> Human<br>
        <input class="answer" type="checkbox" name="option1" value="0"> Aliean<br>
        <input class="answer" type="checkbox" name="option1" value="1"> Other<br>
    </div>
    <div class="question mult">What are you? <br>
        <input class="answer" type="checkbox" name="option1" value="1"> Human<br>
        <input class="answer" type="checkbox" name="option1" value="0"> Aliean<br>
        <input class="answer" type="checkbox" name="option1" value="1"> Other<br>
    </div>
</div>
```
3. Drag n Drop section with 1 question:
```html
<div class="quiz-section dragndrop" data-minutes="0.5">
    <div class="question" data-points="0" data-attempts="1">Fill the blanks <br>
        <span class="drag" data-id="0">drop</span>
        <span class="drag" data-id="1">drag</span>
        <br />
        This is a sample 
        <div data-correct="1" class="drop" style="width:100px; height:100px; background-color:red;"></div>
        and 
        <div data-correct="0" class="drop" style="width:100px; height:100px; background-color:red;"></div>
        sentence.
    </div>
</div>
```
#classes/data-values explained:
1. data-minutes: used if you want to limit solving this section with an amount of time.
2. ```.quiz-section``` used to let js identify a section.
3. ```.mcq``` used to let js identify a mcq section to handle score counting.
4. ```.single``` is used when there is only one correct answer.
5. ```.mult``` is used when there are multiple correct answers.
6. ```.dragndrop``` used to let js identify a drag n drop section to handle score counting.
7. ```<input ... value="?">``` if value is 1 then this is the correct answer, if 0 it is incorrect.
8. in drag n drop question. ``` <span class"drag" data-id="#" ... <div class="drop" data-correct="#" ``` id number and correct number need to match, if the drag word needs to be in that drop spot.
9. data-points is the inital points given for a drag n drop quesiton.
10. data-attempts is the number of trails given for incorrect attempts. after that the question can't be solve. and you will recive the number of attempts in negative amount.
