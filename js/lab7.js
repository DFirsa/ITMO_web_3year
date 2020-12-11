class Calculator{

    preorities = {'(': 0, ')': 1, '+' : 2, '-': 3, '*': 4, '/': 4, '^': 5}

    isDigit(str){
        var regex = new RegExp('[0-9]+')
        return regex.exec(str) !== null
    }

    isOperator(str){
        return "+-/*^()".indexOf(str) != -1
    }

    isDelimeter(str){
        return " =".indexOf(str) != -1
    }

    getExpression(input){
        let output = ""
        let operStack = []

        for (let i = 0; i < input.length; i++) {
            if (this.isDelimeter(input[i])) continue

            if (this.isDigit(input[i])){
                while (!this.isDelimeter(input[i]) && !this.isOperator(input[i])) {
                    output += input[i]
                    i++
                    if (i == input.length) break
                }

                output += " "
                i--;
            }

            if (this.isOperator(input[i])) {
                if (input[i] == '(') operStack.push(input[i])
                else if (input[i] == ')') {
                    let s = operStack.pop()
                    while (s != '('){
                        output += s + ' '
                        s = operStack.pop()
                    }
                }
                else{
                    if (operStack.Count > 0)
                        if(this.preorities[input[i]] <= this.preorities[operStack[operStack.length-1]])
                            output += operStack.pop() + " "
                    operStack.push(input[i])
                }
            }
        }

        while (operStack.length > 0){
            output += operStack.pop() + " "
        }

        return output;
    }

    count(input){
        let result = 0
        let temp = []

        for (let i = 0; i < input.length; i++) {
            if (this.isDigit(input[i])) {
                let a = ""

                while (!this.isOperator(input[i]) && !this.isDelimeter(input[i])){
                    a += input[i]
                    i++
                    if (i == input.length) break
                }
                temp.push(parseFloat(a))
                i--
            }
            else if(this.isOperator(input[i])){
                let a = temp.pop()
                let b = temp.pop()

                switch(input[i]){
                    case '+': result = b + a
                    break
                    case '-': result = b - a
                    break
                    case '*': result = b * a
                    break
                    case '/': result = b / a
                    break
                    case '^': result = b**a
                    break
                }
                temp.push(result)
            }
        }
        return temp.pop()
    }

    calculate(input_str){
        let output = this.getExpression(input_str)
        let result = this.count(output)
        return result
    }
}

function get_date(){
    var today = new Date();
    var date = today.toLocaleDateString();
    var time = today.toLocaleTimeString().substring(0, 5);
    return time + " " + date;
}

function answer(isExp, text){
    if (isExp){
        return new Calculator().calculate(text.substring(1))
    }
    else{
        var answer = first[Math.floor(Math.random()*10)] + " " 
        + second[Math.floor(Math.random()*10)] + " "
        + third[Math.floor(Math.random()*10)];
        return answer;
    }
}

function send(text, sender, isYour){
    var template = document.querySelector("#msg_tmpl").content.children[0];
    var msg = template.cloneNode(true);
    var chat = document.getElementById("chat");

    msg.children[0].children[0].textContent = sender;
    msg.children[0].children[1].textContent = get_date();
    msg.children[1].children[0].textContent = text;
    msg.children[0].children[2].onclick = () => {msg.parentNode.removeChild(msg);};

    if (isYour) msg.classList.add("youth_msg");
    else msg.classList.add("answer_msg");

    chat.appendChild(msg);
}

function get_words(path, word){

    var words = []
    $.getJSON(path)
        .done(function(data){
            data[word].forEach(element => {
                words.push(element);
            });
        });
    return words; 
}

function init_chat(){
    first = get_words("./js/dictionary.json", "first");
    second = get_words("./js/dictionary.json", "second");
    third = get_words("./js/dictionary.json", "third");
    var input = document.getElementById("chat_input");
    var btn = document.getElementById("chat_btn");

    btn.onclick = () => {
        let msg = input.value.trim();
        if(msg !== ""){
            input.value = "";
            send(msg, "You", true);
            let isExp = false;
            if(msg.charAt(0) === '=') isExp = true;
            send(answer(isExp, msg), "Bot", false);
        }
    }
}


var first, second, third
init_chat();
send("Пообщайся со мной!", "Bot", false)