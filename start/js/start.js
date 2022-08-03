const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


function addAnswer(answerText, qIDX, idx) {
    let a = document.querySelector(".answerBox");
    let answer = document.createElement("button");
    answer.classList.add("answerList");
    answer.classList.add("my-3");
    answer.classList.add("p-2");
    answer.classList.add("fadeIn");

    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click", function() {
        let children = document.querySelectorAll(".answerList");

        for ( let i=0; i<children.length; i++ ) {
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(function() {
            let target = qnaList[qIDX].a[idx].type;
            for ( let i=0; i<children.length; i++ ) {
                select[target[i]] += 1;
            }

            for ( let i=0; i<children.length; i++ ) {
                children[i].style.display = "none";
            }
            goNext(++qIDX);
        },450);
    }, false);

}


function goNext(qIDX) {
    if(qIDX === endPoint){
        goResult();
        return;
    }

    let q = document.querySelector(".qBox");

    q.innerHTML = qnaList[qIDX].q;

    for (let i in qnaList[qIDX].a) {
        addAnswer(qnaList[qIDX].a[i].answer, qIDX, i);
    }

    let status = document.querySelector(".statusBar");
    status.style.width = (100/endPoint) * (qIDX+1) + '%';
}


function setResult() {
    let point = calResult();

    const resultName = document.querySelector(".resultName");
    resultName.innerHTML = infoList[point].name;

    let resultImg = document.createElement("img");
    let imgDiv = document.querySelector("#resultImg");
    let imgURL = "img/image-" + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector(".resultDesc");
    resultDesc.innerHTML = infoList[point].desc;
}

function goResult() {
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    
    setTimeout(function() {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        
        setTimeout(function() {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450);
    }, );
    setResult();
}

function calResult() {
    console.log(select);
    let result = select.indexOf(Math.max(...select));
    return result;
}

function begin() {
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    
    setTimeout(function() {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        
        setTimeout(function() {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450);
        let qIDX = 0;
        goNext(qIDX);
    }, 450);
}


